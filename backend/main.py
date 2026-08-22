"""
FastAPI Main Application Server for Socratic Physics AI Tutor.
Exposes REST endpoints for Student Solver, Image/PDF Uploads, MCQ Quizzes, and Teacher Dashboard Analytics.
"""
import os
import sys
import uuid
from typing import Optional
from dotenv import load_dotenv

load_dotenv()

# Ensure backend package resolution
sys.path.insert(0, os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from fastapi import FastAPI, HTTPException, UploadFile, File, Form
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel

from backend.agent import corrective_rag_app, PRESET_PROBLEMS, generate_remedial_worksheet, call_gemini
from backend.teacher_store import teacher_store
from backend.scholarships import SCHOLARSHIPS_DATABASE, match_scholarships
from pypdf import PdfReader

# Create backend/uploads directory for file storage
UPLOADS_DIR = os.path.join(os.path.dirname(__file__), "uploads")
os.makedirs(UPLOADS_DIR, exist_ok=True)

app = FastAPI(
    title="Corrective RAG Socratic AI Tutor API",
    version="2.0.0",
    description="Live Gemini-powered Socratic tutoring system with PDF/Image assignment uploads, Teacher Diagnostics, and Scholarship Eligibility Matcher."
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Serve uploaded assignment files statically
app.mount("/uploads", StaticFiles(directory=UPLOADS_DIR), name="uploads")

class TutorRequest(BaseModel):
    image_data: Optional[str] = None
    user_message: Optional[str] = None
    preset_id: Optional[str] = None
    student_name: Optional[str] = "Aarav Sharma"
    class_grade: Optional[str] = "Class 10"
    subject_name: Optional[str] = "Physics"
    submission_source: Optional[str] = "Direct Web Query"

class MCQSubmitRequest(BaseModel):
    student_name: str
    subject_name: str
    chapter_name: str
    topic: str
    question: str
    selected_option: str
    correct_option: str
    explanation: Optional[str] = None
    conceptual_error: Optional[str] = None

class RemedialRequest(BaseModel):
    topic: str
    conceptual_error: str
    class_grade: Optional[str] = "Class 10"
    subject_name: Optional[str] = "Physics"
    student_name: Optional[str] = "Classroom Learners"

class ScholarshipMatchRequest(BaseModel):
    student_name: Optional[str] = "Student"
    class_grade: str = "Class 10"
    annual_income: float = 180000
    category: str = "OBC" # General, OBC, SC, ST, EWS
    gender: str = "Any" # Any, Female, Male
    stream: Optional[str] = "Science"
    state: Optional[str] = "All India"

class ScholarshipGuidanceRequest(BaseModel):
    scholarship_id: str
    student_name: str = "Student"
    class_grade: str = "Class 10"
    annual_income: float = 180000
    category: str = "OBC"
    gender: str = "Any"
    language: Optional[str] = "English"

@app.get("/")
def read_root():
    return {
        "status": "online",
        "service": "Socratic Physics AI Tutor API",
        "version": "2.0.0",
        "uploads_dir": UPLOADS_DIR
    }

@app.get("/api/presets")
def get_presets():
    return PRESET_PROBLEMS

@app.post("/api/tutor/solve")
async def solve_tutor_problem(
    image_data: Optional[str] = Form(None),
    user_message: Optional[str] = Form(None),
    preset_id: Optional[str] = Form(None),
    class_grade: Optional[str] = Form("Class 10"),
    student_name: Optional[str] = Form("Aarav Sharma"),
    subject_name: Optional[str] = Form("Physics"),
    submission_source: Optional[str] = Form("Uploaded Assignment (PDF/Image)"),
    file: Optional[UploadFile] = File(None)
):
    saved_file_name = None
    saved_file_url = None
    file_type = "text"
    extracted_pdf_text = ""

    # Process uploaded assignment file (PDF / JPEG / PNG / WEBP)
    if file:
        file_ext = os.path.splitext(file.filename)[1].lower()
        unique_fn = f"{uuid.uuid4().hex[:8]}_{file.filename}"
        file_path = os.path.join(UPLOADS_DIR, unique_fn)
        
        with open(file_path, "wb") as f_out:
            content = await file.read()
            f_out.write(content)
        
        saved_file_name = file.filename
        saved_file_url = f"/uploads/{unique_fn}"

        if file_ext == ".pdf":
            file_type = "pdf"
            try:
                reader = PdfReader(file_path)
                pages_text = [p.extract_text() for p in reader.pages if p.extract_text()]
                extracted_pdf_text = "\n".join(pages_text).strip()
            except Exception as pe:
                print(f"[PDF PARSE NOTICE] {pe}")
        else:
            file_type = "image"
            # Read base64 for image processing
            import base64
            image_data = "data:image/jpeg;base64," + base64.b64encode(content).decode("utf-8")

    combined_message = user_message or ""
    if extracted_pdf_text:
        combined_message += f"\n[PDF Document Content]:\n{extracted_pdf_text}"

    # Build LangGraph state
    initial_state = {
        "image_data": image_data,
        "user_message": combined_message,
        "preset_id": preset_id,
        "class_grade": class_grade or "Class 10",
        "subject_name": subject_name or "Physics",
        "retry_count": 0,
        "trace_logs": []
    }

    try:
        final_state = corrective_rag_app.invoke(initial_state)

        # Log submission to TeacherStore
        target_chapter = final_state.get("target_chapter") or f"{subject_name or 'STEM'} Concepts"
        conceptual_error = final_state.get("conceptual_error")
        socratic_resp = final_state.get("socratic_response") or "What foundational concept applies to this problem?"
        citation = final_state.get("citation") or f"(Ref: NCERT {class_grade or 'Class 10'} {subject_name or 'Science'})"

        log_entry = teacher_store.add_log(
            student_name=student_name,
            subject_name=subject_name,
            submission_source=submission_source or "Uploaded Assignment (PDF/Image)",
            chapter_name=target_chapter,
            topic=final_state.get("extracted_text", "Physics Concept")[:50],
            conceptual_error=conceptual_error,
            socratic_response=socratic_resp,
            citation=citation,
            file_name=saved_file_name,
            file_url=saved_file_url,
            file_type=file_type
        )

        detected_subj = final_state.get("detected_subject") or subject_name or "Physics"
        detected_grd = final_state.get("detected_grade") or class_grade or "Class 10"

        return {
            "status": "success",
            "extracted_text": final_state.get("extracted_text"),
            "intent_type": final_state.get("intent_type"),
            "detected_subject": detected_subj,
            "detected_grade": detected_grd,
            "conceptual_error": conceptual_error,
            "bounding_box": final_state.get("bounding_box"),
            "bounding_box_label": final_state.get("bounding_box_label"),
            "target_chapter": target_chapter,
            "socratic_response": socratic_resp,
            "citation": citation,
            "is_valid": final_state.get("is_valid"),
            "retrieved_docs": final_state.get("retrieved_docs", []),
            "trace_logs": final_state.get("trace_logs", []),
            "file_name": saved_file_name,
            "file_url": saved_file_url,
            "log_id": log_entry["id"]
        }

    except Exception as e:
        print(f"[API ERROR] Tutor execution failure: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/mcq/submit")
def submit_mcq_assignment(req: MCQSubmitRequest):
    is_correct = (req.selected_option.strip().lower() == req.correct_option.strip().lower())
    
    if is_correct:
        socratic_response = "Great job! Your answer matches NCERT principles."
        citation = f"(Ref: NCERT Chapter {req.chapter_name})"
        conceptual_error = None
    else:
        conceptual_error = req.conceptual_error or f"Selected {req.selected_option} instead of correct option {req.correct_option}."
        socratic_response = req.explanation or f"Which NCERT formula from Chapter {req.chapter_name} calculates the correct relationship?"
        citation = f"(Ref: NCERT Chapter {req.chapter_name})"

    log_entry = teacher_store.add_log(
        student_name=req.student_name,
        subject_name=req.subject_name,
        submission_source="Online MCQ Quiz",
        chapter_name=req.chapter_name,
        topic=req.topic,
        conceptual_error=conceptual_error,
        socratic_response=socratic_response,
        citation=citation,
        file_type="mcq",
        mcq_details={
            "question": req.question,
            "selected_option": req.selected_option,
            "correct_option": req.correct_option
        }
    )

    return {
        "status": "success",
        "is_correct": is_correct,
        "conceptual_error": conceptual_error,
        "socratic_response": socratic_response,
        "citation": citation,
        "log_id": log_entry["id"]
    }

@app.post("/api/teacher/clear")
def clear_teacher_logs():
    teacher_store.clear_logs()
    return {"status": "success", "message": "All teacher logs cleared."}

@app.post("/api/mcq/generate")
async def generate_ai_mcq(
    chapter_name: Optional[str] = "Light - Reflection and Refraction",
    class_grade: Optional[str] = "Class 10",
    subject_name: Optional[str] = "Physics"
):
    from backend.data.ncert_mcq_bank import get_fast_mcq, NCERT_MCQ_BANK
    
    chapter = chapter_name or "Light - Reflection and Refraction"
    
    # 1. Instant response (< 50ms) from fast question bank
    fast_question = get_fast_mcq(chapter)

    # 2. Async non-blocking background Gemini generator to keep question bank fresh
    async def generate_background_mcq():
        try:
            from backend.agent import call_gemini
            prompt = (
                f"You are an expert {class_grade or 'Class 10'} {subject_name or 'Physics'} test creator for NCERT curriculum on '{chapter}'.\n"
                "Generate a fresh concise conceptual MCQ. Return STRICT JSON:\n"
                "{\n"
                f'  "chapter_name": "{chapter}",\n'
                '  "topic": "...",\n'
                '  "question": "...",\n'
                '  "options": ["A", "B", "C", "D"],\n'
                '  "correct_option": "...",\n'
                '  "conceptual_error": "...",\n'
                '  "socratic_explanation": "..."\n'
                "}"
            )
            raw_text = call_gemini(prompt, preferred_model="gemini-2.5-flash")
            import re, json
            cleaned = re.sub(r'^```json\s*', '', raw_text, flags=re.MULTILINE)
            cleaned = re.sub(r'```$', '', cleaned, flags=re.MULTILINE).strip()
            parsed = json.loads(cleaned)
            if parsed.get("question") and parsed.get("options"):
                NCERT_MCQ_BANK.append(parsed)
        except Exception:
            pass

    import asyncio
    asyncio.create_task(generate_background_mcq())

    return {"status": "success", "mcq": fast_question}

@app.get("/api/teacher/logs")
def get_teacher_logs():
    return teacher_store.get_all_logs()

@app.get("/api/teacher/analytics")
def get_teacher_analytics():
    return teacher_store.get_analytics()

@app.api_route("/api/teacher/clear", methods=["POST", "GET"])
def clear_teacher_logs():
    teacher_store.clear_all_logs()
    return {"status": "success", "message": "All teacher logs cleared."}

@app.post("/api/teacher/generate_remedial")
def create_remedial_worksheet(req: RemedialRequest):
    """
    Teacher Remedial Intervention Generator:
    Creates a customized 3-part Socratic worksheet targeting specific student misconceptions.
    """
    worksheet = generate_remedial_worksheet(
        topic=req.topic,
        conceptual_error=req.conceptual_error,
        class_grade=req.class_grade,
        subject_name=req.subject_name,
        student_name=req.student_name
    )
    return worksheet

# ─── SCHOLARSHIP & AID MATCHER ENDPOINTS (PS 2 EQUITABLE ACCESS) ───

@app.get("/api/scholarships/all")
def get_all_scholarships():
    return {"status": "success", "count": len(SCHOLARSHIPS_DATABASE), "scholarships": SCHOLARSHIPS_DATABASE}

@app.post("/api/scholarships/match")
def match_student_scholarships(req: ScholarshipMatchRequest):
    profile = {
        "class_grade": req.class_grade,
        "annual_income": req.annual_income,
        "category": req.category,
        "gender": req.gender,
        "stream": req.stream or "Science",
        "state": req.state or "All India"
    }
    matches = match_scholarships(profile)
    eligible_count = sum(1 for m in matches if m["is_eligible"])
    total_aid_potential = sum(m["award_amount_num"] for m in matches if m["is_eligible"])

    return {
        "status": "success",
        "student_name": req.student_name,
        "profile": profile,
        "eligible_count": eligible_count,
        "total_aid_potential": f"₹{total_aid_potential:,}",
        "matches": matches
    }

@app.post("/api/scholarships/ai_guidance")
def get_scholarship_guidance(req: ScholarshipGuidanceRequest):
    matched_sch = next((s for s in SCHOLARSHIPS_DATABASE if s["id"] == req.scholarship_id), None)
    if not matched_sch:
        raise HTTPException(status_code=404, detail="Scholarship not found")

    prompt = (
        f"You are an expert Government Scholarship & Social Equity Advisor for Indian Students.\n"
        f"Target Scheme: {matched_sch['name']} ({matched_sch['offered_by']})\n"
        f"Grant Value: {matched_sch['award_amount']}\n"
        f"Student Profile: Grade {req.class_grade}, Category {req.category}, Gender {req.gender}, Annual Family Income: ₹{int(req.annual_income):,}\n"
        f"Preferred Language: {req.language}\n\n"
        "Provide a concise, practical 3-step action guide in strict JSON format:\n"
        "{\n"
        '  "eligibility_verdict": "...",\n'
        '  "key_documents_to_prepare": ["...", "...", "..."],\n'
        '  "step_by_step_application_flow": ["Step 1: ...", "Step 2: ...", "Step 3: ..."],\n'
        '  "expert_tip_to_win": "..."\n'
        "}"
    )

    try:
        raw = call_gemini(prompt, preferred_model="gemini-3.6-flash")
        cleaned = re.sub(r'^```json\s*', '', raw, flags=re.MULTILINE)
        cleaned = re.sub(r'```$', '', cleaned, flags=re.MULTILINE).strip()
        guidance = json.loads(cleaned)
    except Exception:
        guidance = {
            "eligibility_verdict": f"You are eligible to apply for {matched_sch['name']}.",
            "key_documents_to_prepare": matched_sch["required_documents"],
            "step_by_step_application_flow": [
                f"Register on official portal: {matched_sch['portal_url']}",
                "Upload Income Certificate and Academic Marksheets",
                "Verify Aadhaar with linked Bank Account for Direct Benefit Transfer (DBT)"
            ],
            "expert_tip_to_win": "Ensure all documents are updated for the current financial year to avoid portal rejection."
        }

    return {
        "status": "success",
        "scholarship_name": matched_sch["name"],
        "guidance": guidance
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)
