# LearnMate AI — Agentic AI for Personalized Course Pathways

> **AICTE–IBM SkillsBuild Internship 2026**  
> **Domain:** Artificial Intelligence & Cloud Computing  
> **Project Category:** Agentic AI & Intelligent Tutoring Systems  
> **Status:** Completed & Feature-Frozen for Final Evaluation  
> **Live Web App (Vercel):** [https://learnmate-ai-frontend-iota.vercel.app](https://learnmate-ai-frontend-iota.vercel.app)  
> **GitHub Repository:** [https://github.com/DsPraveen33/LearnMate-AI](https://github.com/DsPraveen33/LearnMate-AI)  

---

## 🌟 Executive Summary

**LearnMate AI** is an intelligent, agent-driven educational companion and personalized learning pathway generator. Powered by **FastAPI**, **React 19**, **SQLite**, and **IBM watsonx.ai Granite 3.0**, LearnMate AI dynamically assesses student competencies, pinpoints knowledge gaps, generates customized multi-stage learning roadmaps, and provides continuous contextual mentoring.

Unlike traditional static Learning Management Systems (LMS), LearnMate AI implements an **agentic loop** that couples diagnostic assessment telemetry with strict schema-constrained generative AI to curate milestone-driven learning journeys tailored to each student's career aspirations, learning pace, and prior knowledge.

---

## 🏗️ Architecture & Technology Stack

| Layer | Technology | Version | Purpose |
| :--- | :--- | :--- | :--- |
| **Frontend** | React | 19.3.1 | Component-driven responsive user interface |
| | TypeScript | 7.0.2 | End-to-end static type safety and contract enforcement |
| | Vite | 8.3.8 | Next-generation ultra-fast frontend build tooling |
| | TailwindCSS | 4.3.5 | Modern utility-first responsive styling |
| | Lucide React | 1.77.0 | Accessible vector iconography system |
| **Backend** | FastAPI | >=0.115.0 | High-performance asynchronous REST API framework |
| | Uvicorn | >=0.30.0 | High-throughput ASGI production server |
| | Pydantic | >=2.9.0 | Schema validation, serialization, and strict JSON constraints |
| | SQLAlchemy | >=2.0.0 | Enterprise SQL ORM with session management |
| | HTTPX | >=0.27.0 | Resilient HTTP client for asynchronous API requests |
| **Database** | SQLite | 3.x | Lightweight relational storage (`learnmate.db`) |
| **AI Engine** | IBM watsonx.ai | Cloud API | Enterprise foundation model inference (`us-south`) |
| | IBM Granite 3.0 | `ibm/granite-4-h-small` | Deterministic JSON-constrained reasoning & tutoring |
| **Testing** | Pytest | 9.2.0 | Automated unit, regression, and integration testing (45 tests) |

---

## ✨ Key Features

1. **Adaptive AI Skill Diagnostic**
   - Interactive timed assessments evaluating theoretical and hands-on competencies.
   - Real-time scoring, strength identification, and targeted improvement suggestions.
   - Direct persistence to SQLite database linking diagnostic results to the student profile.

2. **Personalized Roadmap Generator (IBM Granite Powered)**
   - Custom prompt engineering with strict JSON-mode schema constraint (`response_format: {"type": "json_object"}`).
   - Translates career goals, reported skills, and diagnostic gaps into sequenced milestones.
   - Human-in-the-loop draft review before permanent database persistence.

3. **Context-Aware AI Study Mentor**
   - Multi-turn conversational tutor bounded by the student's active roadmap and learning style.
   - Enforces strict input validation (max turns, token limit, anti-injection system prompt).
   - Instant conceptual breakdowns, code examples, and study advice.

4. **Interactive Course Catalog & Explorer**
   - Filterable catalog by domain (*Agentic AI, Machine Learning, System Design*) and difficulty (*Beginner, Intermediate, Advanced*).
   - Rich syllabus breakdown, instructor credentials, and single-click course enrollment.

5. **Progress & Telemetry Tracker**
   - Real-time weekly study hour visualization and module completion velocity.
   - Gamified experience points (XP), learning streaks, and mastery tier badges.

---

## 📂 Project Directory Structure

```text
LearnMate AI/
│
├── backend/                        # FastAPI Application & AI Orchestration
│   ├── app/
│   │   ├── database/               # Database engine, session, and seed data
│   │   │   ├── __init__.py
│   │   │   ├── seed.py             # Default data initialization (Alex Morgan profile)
│   │   │   └── session.py          # SQLAlchemy engine & session factory
│   │   ├── models/                 # ORM & Pydantic Data Contracts
│   │   │   ├── __init__.py
│   │   │   ├── db_models.py        # SQLAlchemy relational models
│   │   │   ├── roadmap_draft.py    # Strict Pydantic schemas for Granite AI outputs
│   │   │   └── schemas.py          # Pydantic v2 request/response schemas
│   │   ├── routers/                # API Endpoints & Route Controllers
│   │   │   ├── __init__.py
│   │   │   ├── assessments.py      # Diagnostic quiz submission and querying
│   │   │   ├── courses.py          # Course catalog CRUD
│   │   │   ├── mentor.py           # Context-aware AI Mentor chat router
│   │   │   ├── progress.py         # Task and module progress tracking
│   │   │   ├── roadmaps.py         # Roadmap generation & management
│   │   │   ├── skills.py           # Competency matrix & skill catalog
│   │   │   └── students.py         # Student profile & learning attributes
│   │   ├── services/               # External Services & Business Logic
│   │   │   ├── __init__.py
│   │   │   ├── crud.py             # Database query operations
│   │   │   └── watsonx_service.py  # IBM watsonx.ai IAM auth & Granite client
│   │   └── main.py                 # FastAPI application initialization & CORS
│   ├── tests/                      # Automated Test Suite (45/45 Passed)
│   │   ├── conftest.py             # Pytest fixtures and mock database session
│   │   ├── test_api_assessments.py
│   │   ├── test_api_courses.py
│   │   ├── test_api_mentor.py
│   │   ├── test_api_progress.py
│   │   ├── test_api_roadmaps.py
│   │   ├── test_api_roadmap_generation.py
│   │   ├── test_api_skills.py
│   │   ├── test_api_students.py
│   │   ├── test_database.py
│   │   ├── test_integration.py     # End-to-end student lifecycle test
│   │   └── test_watsonx_service.py # IBM Cloud IAM token exchange & error tests
│   ├── .env.example                # Sample environment variables template
│   └── requirements.txt            # Python backend dependencies
│
├── frontend/                       # React 19 + TypeScript + Vite Web Application
│   ├── public/                     # Static icons, favicons, and assets
│   ├── src/
│   │   ├── assets/                 # Brand illustrations & SVG assets
│   │   ├── components/
│   │   │   ├── common/             # Badges, Modals, Popovers
│   │   │   ├── dashboard/          # StatCards, ActivityChart, TaskList, SkillProgress
│   │   │   ├── layout/             # Top Navbar, Collapsible Sidebar, Layout shell
│   │   │   └── pages/              # Primary tab views (Dashboard, LearningPath, etc.)
│   │   ├── data/                   # Initial mock data and fallback configurations
│   │   ├── services/
│   │   │   └── api.ts              # Typed HTTP fetch client for FastAPI backend
│   │   ├── types/
│   │   │   └── index.ts            # Shared TypeScript domain interfaces
│   │   ├── App.css
│   │   ├── App.tsx                 # Root application controller & state coordinator
│   │   ├── index.css               # TailwindCSS imports & theme variables
│   │   └── main.tsx                # React DOM entry point
│   ├── .env.example                # Sample frontend API base URL configuration
│   ├── package.json                # Frontend package dependencies & scripts
│   ├── tsconfig.json               # TypeScript project configurations
│   └── vite.config.ts              # Vite server & build configurations
│
├── docs/                           # Submission Documentation & Guides
│   ├── SCREENSHOTS_GUIDE.md        # Comprehensive screenshot submission checklist
│   └── WORKFLOW_DIAGRAM.md         # Detailed Mermaid architectural diagrams
│
├── .gitignore                      # Security-hardened Git exclusion rules
├── API_DOCUMENTATION.md            # Complete REST API reference
├── ARCHITECTURE.md                 # System architecture and integration guide
├── TEST_REPORT.md                  # Comprehensive test verification report
└── README.md                       # Master project overview
```

---

## ⚙️ Installation & Configuration

### Prerequisites
- **Python:** 3.10 to 3.14
- **Node.js:** 18.x or 20+ (with `npm`)
- **Git:** Version control (recommended)
- **IBM Cloud Account:** With access to IBM watsonx.ai (Dallas region: `us-south`)

---

### Step 1: Clone or Navigate to Project Directory

```bash
cd "C:\workspace\LearnMate AI"
```

---

### Step 2: Backend Setup & Virtual Environment

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a Python virtual environment:
   ```bash
   python -m venv .venv
   ```

3. Activate the virtual environment:
   - **Windows (PowerShell):**
     ```powershell
     .\.venv\Scripts\Activate.ps1
     ```
   - **Windows (Command Prompt):**
     ```cmd
     .\.venv\Scripts\activate.bat
     ```
   - **macOS / Linux:**
     ```bash
     source .venv/bin/activate
     ```

4. Install the backend dependencies:
   ```bash
   pip install -r requirements.txt
   ```

5. Configure environment variables:
   Copy `.env.example` to `.env` in the `backend/` folder:
   ```bash
   cp .env.example .env
   ```
   Edit `backend/.env` with your IBM watsonx.ai credentials:
   ```env
   WATSONX_API_KEY=your_ibm_cloud_api_key_here
   WATSONX_PROJECT_ID=your_watsonx_project_id_here
   WATSONX_URL=https://us-south.ml.cloud.ibm.com
   WATSONX_MODEL_ID=granite-4-h-small
   ```

---

### Step 3: Frontend Setup

1. Open a new terminal and navigate to the frontend directory:
   ```bash
   cd "C:\workspace\LearnMate AI\frontend"
   ```

2. Install Node dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```
   Ensure `frontend/.env` points to the local FastAPI backend:
   ```env
   VITE_API_URL=http://127.0.0.1:8000
   ```

---

## 🚀 Running the Application

### 1. Start the Backend API Server

From `backend/` (with `.venv` activated):
```bash
uvicorn app.main:app --host 127.0.0.1 --port 8000 --reload
```
- API Base URL: `http://127.0.0.1:8000`
- Swagger Interactive Documentation: `http://127.0.0.1:8000/docs`
- ReDoc Documentation: `http://127.0.0.1:8000/redoc`
- Health Probe: `http://127.0.0.1:8000/health`

### 2. Start the Frontend Development Server

From `frontend/`:
```bash
npm run dev
```
- Web Application: `http://localhost:5173` or `http://127.0.0.1:5173`

---

## 🧪 Testing & Verification

### Run Backend Automated Test Suite
LearnMate AI features a comprehensive suite of **45 automated tests** covering database models, API routers, IBM IAM token caching, Granite JSON validation, and end-to-end integration workflows.

From `backend/` (with `.venv` activated):
```bash
pytest tests/ -v
```
**Expected Outcome:** `45 passed in ~1.2s` with 0 failures.

### Verify Frontend Production Build
Validate TypeScript contracts and bundle minification:
```bash
cd frontend
npm run build
```
**Expected Outcome:** `✓ built in ~800ms` with 0 type errors.

---

## 🔒 Security & Data Privacy

- **Zero Secret Leakage:** `.gitignore` strictly excludes `.env`, `*.key`, `*.pem`, `learnmate.db`, and build artifacts from version control.
- **Prompt Injection Defense:** AI Mentor prompts enforce delimiter protection, context truncation (6,000 character maximum history ceiling), and system role boundary checks.
- **Fail-Safe Fallback:** If IBM watsonx.ai rate limits or timeouts occur, user-facing error dialogs present actionable recovery states without crashing the application.

---

## 👥 Authors & Academic Accreditation

- **Project Lead & Developer:** Student Intern (Alex Morgan Profile Demonstration)
- **Program:** AICTE–IBM SkillsBuild Internship 2026
- **Mentor / Technical Review:** IBM SkillsBuild Technical Lead & Academic Evaluators
- **Submission Date:** November 2026
