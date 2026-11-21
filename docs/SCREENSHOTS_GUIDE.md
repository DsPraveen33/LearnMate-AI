# Internship Submission Screenshot Checklist & Visual Evidence Guide

> **Project:** LearnMate AI — Agentic AI for Personalized Course Pathways  
> **Internship:** AICTE–IBM SkillsBuild 2026  
> **Target Audience:** Student Intern, Academic Evaluators, IBM Technical Mentors  

---

## 📸 Overview

To achieve top marks during the final internship review and viva, you must capture clean, high-resolution screenshots demonstrating the operational features of LearnMate AI.

This guide outlines the **10 essential screenshots** required for your submission report and presentation deck, including exact URLs, elements to display, and professional captions.

---

## 📋 Recommended Screenshot Master Checklist

| # | File Name | Screen / Component | Primary Feature Highlighted |
| :-: | :--- | :--- | :--- |
| **01** | `01_executive_dashboard.png` | Executive Dashboard | Student Profile, Stat Cards, Activity Chart, Streak |
| **02** | `02_adaptive_learning_pathway.png` | Learning Pathway View | Sequenced Milestones, Progress Gauge, Stage Details |
| **03** | `03_ai_roadmap_generator.png` | Roadmap Generator Modal | IBM Granite 3.0 Generation Form & Unsaved Draft |
| **04** | `04_ai_mentor_chat.png` | AI Study Mentor Interface | Contextual Chat, Code Snippet, Roadmap Awareness |
| **05** | `05_diagnostic_skill_assessment.png` | Diagnostic Assessment Page | Active Quiz, Live Timer, Question Form |
| **06** | `06_assessment_results_gap_analysis.png` | Assessment Result View | Score Breakdown, Identified Strengths & Gaps |
| **07** | `07_course_explorer_catalog.png` | Course Explorer Page | Filterable Course Cards, Badges, Level Indicators |
| **08** | `08_progress_tracker_analytics.png` | Progress & Activity Tracker | Study Hours Velocity, Task Status, Completion Toggles |
| **09** | `09_swagger_api_documentation.png` | FastAPI Swagger UI (`/docs`) | Interactive REST API Endpoints & Pydantic Schemas |
| **10** | `10_terminal_test_verification.png` | VS Code / Shell Terminal | Pytest 45/45 Passed & Frontend Build Success Log |

---

## 🔍 Detailed Capture Instructions & Captions

---

### Screenshot 1: Executive Dashboard
- **File Name:** `01_executive_dashboard.png`
- **Navigation:** Click **Dashboard** tab (`http://localhost:5173`)
- **Key Elements to Show:**
  - Welcome Banner with personalized student greeting (*"Alex Morgan"*) and target career track (*"Agentic AI Systems Architect"*).
  - 4 Stat Cards: Active Pathways, Study Time Logged (48.5 hrs), Skills Mastered (16), Current Streak (14 Days).
  - Weekly Activity bar chart displaying learning velocity.
  - Skills Mastery radar/bar section and Up Next recommended modules.
- **Suggested Report Caption:**  
  > *"Figure 1: LearnMate AI Executive Dashboard providing high-level telemetry, active streak tracking, and personalized course pathway progress for apprentice Alex Morgan."*

---

### Screenshot 2: Adaptive Learning Pathway
- **File Name:** `02_adaptive_learning_pathway.png`
- **Navigation:** Click **Learning Path** tab
- **Key Elements to Show:**
  - Pathway Header: *"Agentic AI Systems Architect Pathway"*, circular completion gauge (68%).
  - Multi-stage milestone cards with status badges:
    - *Stage 1: Foundations of Agentic Systems & Structured Outputs* (Completed - 100%)
    - *Stage 2: Memory Systems, RAG & Vector Knowledge Retrieval* (Completed - 100%)
    - *Stage 3: Autonomous Multi-Agent Orchestration with LangGraph* (In Progress - 65%)
    - *Stage 4: Enterprise Alignment, IBM Granite & Production Deployment* (Locked)
  - Expand Stage 3 to show interactive modules (*video, lab, quiz, project*) and time estimates.
- **Suggested Report Caption:**  
  > *"Figure 2: Milestone-driven adaptive learning pathway dynamically structured to bridge identified diagnostic gaps with estimated completion timelines."*

---

### Screenshot 3: AI Roadmap Generator (IBM Granite 3.0)
- **File Name:** `03_ai_roadmap_generator.png`
- **Navigation:** Under **Learning Path**, scroll to **Generate a learning roadmap**
- **Key Elements to Show:**
  - Target Learning Goal input (e.g., *"Learn Python for backend microservices and AI agent APIs"*).
  - Reported Skills input (e.g., *"Variables, loops, Git"*).
  - The generated **Granite Draft** preview box displaying newly synthesized milestones, module titles, and duration before saving.
  - The *Save Roadmap* action button demonstrating human-in-the-loop review.
- **Suggested Report Caption:**  
  > *"Figure 3: Generative AI curriculum synthesis using IBM watsonx.ai Granite 3.0, enforcing strict Pydantic JSON contracts before database commitment."*

---

### Screenshot 4: AI Study Mentor (Context-Aware Tutoring)
- **File Name:** `04_ai_mentor_chat.png`
- **Navigation:** Click **AI Mentor** tab
- **Key Elements to Show:**
  - AI Mentor Header with green *"Active Coach"* indicator.
  - Conversational exchange where the student asks a technical question (e.g., *"Explain how conditional edges work in LangGraph with a quick code snippet"*).
  - Formatted response showing Markdown explanation, bullet points, and syntax-highlighted Python code block.
  - Suggested quick-prompt pill buttons at the bottom.
- **Suggested Report Caption:**  
  > *"Figure 4: Context-aware AI Study Mentor powered by IBM Granite 3.0, providing individualized code explanations bounded by the student's active roadmap."*

---

### Screenshot 5: Diagnostic Skill Assessment (Active Quiz)
- **File Name:** `05_diagnostic_skill_assessment.png`
- **Navigation:** Click **Skill Assessment** tab -> Click **Start Assessment**
- **Key Elements to Show:**
  - Quiz title: *"Adaptive AI Skill Diagnostic"*.
  - Live countdown timer (e.g., `04:45`).
  - Progress bar showing current question (e.g., *"Question 2 of 5"*).
  - Multiple-choice radio options with clear selection highlight.
- **Suggested Report Caption:**  
  > *"Figure 5: Timed diagnostic competency assessment testing core agentic and machine learning concepts."*

---

### Screenshot 6: Assessment Results & Knowledge Gap Analysis
- **File Name:** `06_assessment_results_gap_analysis.png`
- **Navigation:** Complete the 5 questions -> Click **Submit Assessment**
- **Key Elements to Show:**
  - Final score percentage banner (e.g., `80%` or `100% - Mastery Tier`).
  - Breakdown of **Demonstrated Strengths** (e.g., *Deterministic Tool Schemas, State Machines*).
  - Breakdown of **Targeted Improvement Gaps** (e.g., *Supervisor Multi-Agent Routing*).
  - Direct call-to-action button: *"Generate Adaptive Pathway"* linking diagnostic results into the roadmap generator.
- **Suggested Report Caption:**  
  > *"Figure 6: Automated competency scoring and diagnostic gap analysis used to seed personalized curriculum synthesis."*

---

### Screenshot 7: Course Explorer & Catalog
- **File Name:** `07_course_explorer_catalog.png`
- **Navigation:** Click **Courses** tab
- **Key Elements to Show:**
  - Category filter pills (*All, Agentic AI, Machine Learning, System Design*).
  - Search input box.
  - Course cards showing course code (*AI-301, ML-402, GRANITE-101*), star ratings (4.95), instructor names, and enrollment status badges (*"Enrolled"* vs *"Enroll Now"*).
- **Suggested Report Caption:**  
  > *"Figure 7: Interactive course catalog showcasing structured curriculum modules and single-click student enrollment."*

---

### Screenshot 8: Progress & Telemetry Analytics
- **File Name:** `08_progress_tracker_analytics.png`
- **Navigation:** Click **Progress** tab
- **Key Elements to Show:**
  - Weekly learning hours breakdown.
  - Active study task checklist with interactive completion checkboxes.
  - Gamification achievements: Level 4, 3,450 XP, and unlocked badge medals (*Prompt Engineer, Graph Architect*).
- **Suggested Report Caption:**  
  > *"Figure 8: Student progress telemetry, gamified milestone tracking, and task completion metrics."*

---

### Screenshot 9: Interactive Swagger API Documentation
- **File Name:** `09_swagger_api_documentation.png`
- **Navigation:** Open browser at `http://127.0.0.1:8000/docs`
- **Key Elements to Show:**
  - FastAPI Swagger UI header with title: *"LearnMate AI - Agentic AI Personalized Course Pathways"*.
  - Grouped router tags: `Root`, `Students`, `Skills`, `Courses`, `Assessments`, `Learning Roadmaps`, `Student Progress`, `AI Mentor`.
  - Expand `/api/roadmaps/generate` and `/api/mentor/chat` to display the Pydantic request models.
- **Suggested Report Caption:**  
  > *"Figure 9: Auto-generated OpenAPI / Swagger documentation validating REST endpoints and schema definitions."*

---

### Screenshot 10: Test Suite Execution & Production Build Log
- **File Name:** `10_terminal_test_verification.png`
- **Navigation:** Split terminal window in VS Code / PowerShell
- **Key Elements to Show:**
  - Top half: Pytest output showing `45 passed, 1 warning in 1.22s`.
  - Bottom half: Frontend Vite production build showing `✓ 2149 modules transformed... built in 868ms`.
- **Suggested Report Caption:**  
  > *"Figure 10: Terminal verification showing 100% backend unit/integration test pass rate (45/45) and zero-error production build."*

---

## 💡 Best Practices for Screenshot Capture

1. **Browser Resolution:** Maximize your browser window or set display resolution to 1920x1080 (1080p Full HD) for crisp text rendering.
2. **Theme Consistency:** Use default light mode so evaluator printouts remain clear and contrast-rich.
3. **No Window Clutter:** Crop out personal taskbars, bookmarks, or desktop icons.
4. **Format:** Save images as PNG (`.png`) for lossless readability of charts and code snippets.
