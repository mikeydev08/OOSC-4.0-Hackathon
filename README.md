# 🌟 SOCRATIC//STEM: AI for Equitable Education Access
> **Problem Statement 2: AI for Equitable Education Access**  
> *Theme: Education, Language Access, and Personalized Learning (Classes 10th, 11th & 12th STEM)*

[![Firebase Hosting](https://img.shields.io/badge/Live%20Demo-Firebase%20Hosting-00f0ff?style=for-the-badge&logo=firebase)](https://voting-assistant-c1265.web.app)
[![Built with Gemini](https://img.shields.io/badge/AI-Google%20Gemini%203.6%20Flash-8a2be2?style=for-the-badge&logo=google)](https://aistudio.google.com)
[![LangGraph](https://img.shields.io/badge/Orchestration-LangGraph%20CRAG-ff007f?style=for-the-badge)](https://langchain.com)

---

## 🌐 Live Production Demo
👉 **[https://voting-assistant-c1265.web.app](https://voting-assistant-c1265.web.app)**

---

## 🏆 Phase 1 Judging Criteria Matrix

| Criterion | Implementation Highlights |
| :--- | :--- |
| **1. Innovation & Originality** | • **Strict Non-Solver Socratic AI**: Never provides spoilers; asks guided inquiry questions.<br>• **Visual Misconception Coordinate Locator**: Identifies exact flawed derivation steps on uploaded handwritten notes.<br>• **Counterfactual Paradox Generator**: Synthesizes custom counter-examples illustrating physical law violations.<br>• **Integrated Aid Matcher**: Bridges academic learning with real financial access. |
| **2. Technical Implementation** | • **LangGraph Multi-Agent State Machine**: `vision_parser` $\to$ `pinecone_retriever` $\to$ `hallucination_grader` $\to$ `socratic_generator`.<br>• **Pinecone Vector Database**: Corrective RAG over NCERT Senior Secondary STEM textbooks.<br>• **Ultra-Fast LLM Inference**: Primary `gemini-3.6-flash` (<800ms) with multi-model fallback chain.<br>• **KaTeX Mathematical Typesetting**: Flawless formula rendering in Physics, Chemistry, and Calculus. |
| **3. Problem-Solving Approach** | • Replaces answer-spoonfeeding with authentic conceptual learning.<br>• Diagnoses root misconceptions and gives teachers 1-click remedial worksheet superpowers. |
| **4. Real-World Impact** | • Covers **Classes 10th, 11th & 12th** across **Physics, Chemistry, Mathematics, and Biology**.<br>• Discovers up to **₹1,25,000/year** in aid across 16 verified Indian Government & CSR scholarships.<br>• Multilingual support across 6 Indian languages (Hindi, Tamil, Telugu, Marathi, Bengali, English). |
| **5. User Experience & Design** | • High-tech cyberpunk/glassmorphic interface with custom cursor, 3D card tilts, and telemetry pills.<br>• Real-time animated AI reasoning timeline HUD with live stopwatch and audio narration viva. |
| **6. Scalability** | • 100% Stateless & Serverless architecture; instant global CDN distribution via Firebase Hosting.<br>• Sub-second response times with zero operational costs on free tiers. |
| **7. Quality of Demonstration** | • Live interactive landing showcase page, 9 complex competitive exam presets (JEE/NEET level), and complete architectural documentation. |

---

## 🚀 Key Modules & Capabilities

1. **🧑‍🎓 Student Workspace (Socratic Corrective RAG)**
   * **Real-time Auto Subject & Class Detection**: Type or upload any problem in Physics, Chemistry, Maths, or Biology—Grade & Subject sync automatically.
   * **Socratic Non-Solver Guidance**: Pinpoints the student's flawed derivation step and offers crisp, textbook-grounded NCERT hints with LaTeX math formatting without spoiling the answer.
   * **Handwritten Assignment OCR & Spatial Error Locator**: Visual bounding box highlighting the exact location of mathematical or conceptual errors.
   * **Text-to-Speech Audio Viva**: Listen to Socratic hints via browser audio synthesis.

2. **👩‍🏫 Teacher Radar (Diagnostics & 1-Click Remedial Engine)**
   * **Misconception Analytics & Error Clusters**: Real-time error categorization across classes and chapters.
   * **1-Click Remedial Worksheet Generator**: Sub-second synthesis (Gemini 3.6 Flash) with a live reasoning timeline HUD, producing 3-part Socratic worksheets with counterfactual examples and mastery challenges.
   * **Student Telemetry Logs**: Instant review and filtering of all student submissions and MCQ quizzes.

3. **🎓 Scholarship & Financial Aid Matcher (Equitable Access)**
   * **16 National & Philanthropic Schemes**: Full coverage for Class 10, 11, and 12 students across all castes (NTSE, SBI Asha, HDFC Parivartan, Tata Capital Pankh, INSPIRE-SHE, NMMS, PM-YASASVI, AICTE Pragati, L'Oréal Women in Science, etc.).
   * **Instant Qualification Calculator**: Computes match percentages, document readiness checklists, and direct portal application links.
   * **Multilingual AI Prep Guide**: Step-by-step guidance in English, Hindi, Tamil, Telugu, Marathi, and Bengali.

---

## 🛠️ Tech Stack & Architecture

* **Frontend**: React 18 + TypeScript + Vite + KaTeX + Lucide Icons + CSS3 Glassmorphism
* **Backend**: Python FastAPI + LangGraph StateGraph + LangChain Core + PyPDF
* **AI & Inference**: Google Gemini 3.6 Flash / 3.5 Flash (<800ms response time)
* **Vector DB**: Pinecone Serverless Index (`ncert-class-10` on AWS `us-east-1`)
* **Deployment Ready**: Firebase Hosting (`firebase.json`) + Render / Cloud Run (`render.yaml`) (100% Free)

---

## ⚡ Quick Start for Judges / Local Setup

### 1. Configure Environment Variables
Copy `.env.example` to `backend/.env`:
```bash
GEMINI_API_KEY=your_gemini_api_key_here
PINECONE_API_KEY=your_pinecone_api_key_here
```

### 2. Launch Local Environment
```bash
# Terminal 1 (Backend API)
python -m backend.main

# Terminal 2 (Frontend UI)
cd frontend
npm run dev
```

### 3. Access Application
Open **[http://localhost:3000](http://localhost:3000)** in your browser.
