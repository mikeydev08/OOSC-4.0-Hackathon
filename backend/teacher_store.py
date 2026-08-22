"""
In-memory & File Persistent Teacher Analytics Data Store for Corrective RAG Socratic AI Tutor.
Stores student submissions, identified misconceptions, Socratic guidance sent,
submission sources (Uploaded PDF/Image vs Online MCQ Quiz), and student diagnostic profiles.
"""
import os
import json
from datetime import datetime
from typing import List, Dict, Any, Optional

TEACHER_LOGS_FILE = os.path.join(os.path.dirname(__file__), "teacher_logs.json")

class TeacherStore:
    def __init__(self):
        self.logs: List[Dict[str, Any]] = []
        self._load_from_disk()

    def _load_from_disk(self):
        if os.path.exists(TEACHER_LOGS_FILE):
            try:
                with open(TEACHER_LOGS_FILE, "r", encoding="utf-8") as f:
                    self.logs = json.load(f)
            except Exception:
                self.logs = []

    def _save_to_disk(self):
        try:
            with open(TEACHER_LOGS_FILE, "w", encoding="utf-8") as f:
                json.dump(self.logs, f, indent=2)
        except Exception:
            pass

    def clear_all_logs(self):
        self.logs = []
        try:
            with open(TEACHER_LOGS_FILE, "w", encoding="utf-8") as f:
                json.dump([], f, indent=2)
        except Exception:
            pass

    def clear_logs(self):
        self.clear_all_logs()

    def add_log(
        self,
        student_name: str,
        subject_name: str,
        submission_source: str,
        chapter_name: str,
        topic: str,
        conceptual_error: Optional[str],
        socratic_response: str,
        citation: str,
        file_name: Optional[str] = None,
        file_url: Optional[str] = None,
        file_type: Optional[str] = None,
        mcq_details: Optional[Dict[str, Any]] = None,
        status: str = "Guided"
    ) -> Dict[str, Any]:
        log_id = f"log_{len(self.logs) + 1:03d}"
        now_str = datetime.now().strftime("%Y-%m-%d %I:%M %p")

        new_log = {
            "id": log_id,
            "student_name": student_name or "Student",
            "subject_name": subject_name or "Class 10 Science",
            "submission_source": submission_source or "Uploaded Assignment (PDF/Image)",
            "file_name": file_name,
            "file_url": file_url,
            "file_type": file_type or ("pdf" if file_name and file_name.endswith(".pdf") else "image" if file_name else "mcq"),
            "mcq_details": mcq_details,
            "chapter_name": chapter_name,
            "topic": topic,
            "conceptual_error": conceptual_error,
            "socratic_response": socratic_response,
            "citation": citation,
            "timestamp": now_str,
            "status": status
        }
        self.logs.insert(0, new_log)
        self._save_to_disk()
        return new_log

    def get_all_logs(self) -> List[Dict[str, Any]]:
        return self.logs

    def get_analytics(self) -> Dict[str, Any]:
        total_students = len(set(log["student_name"] for log in self.logs))
        total_submissions = len(self.logs)
        errors_count = sum(1 for log in self.logs if log.get("conceptual_error"))
        
        # Misconception frequency by chapter
        chapter_breakdown = {}
        for log in self.logs:
            chap = log.get("chapter_name", "General Physics")
            chapter_breakdown[chap] = chapter_breakdown.get(chap, 0) + 1

        # Student diagnostic metrics
        student_diagnostics = {}
        for log in self.logs:
            s_name = log.get("student_name", "Unknown Student")
            if s_name not in student_diagnostics:
                student_diagnostics[s_name] = {
                    "student_name": s_name,
                    "subject_name": log.get("subject_name", "Class 10 Science"),
                    "total_submissions": 0,
                    "error_count": 0,
                    "weak_topics": [],
                    "recent_logs": []
                }
            diag = student_diagnostics[s_name]
            diag["total_submissions"] += 1
            if log.get("conceptual_error"):
                diag["error_count"] += 1
                if log.get("topic") and log.get("topic") not in diag["weak_topics"]:
                    diag["weak_topics"].append(log["topic"])
            diag["recent_logs"].append(log)

        return {
            "total_students": total_students,
            "total_submissions": total_submissions,
            "errors_identified": errors_count,
            "chapter_breakdown": chapter_breakdown,
            "student_diagnostics": list(student_diagnostics.values())
        }

teacher_store = TeacherStore()
