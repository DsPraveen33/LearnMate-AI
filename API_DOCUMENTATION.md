# REST API Documentation & Endpoint Specification

> **Project:** LearnMate AI — Agentic AI for Personalized Course Pathways  
> **API Version:** 1.0.0  
> **Base URL:** `http://127.0.0.1:8000`  
> **Documentation Formats:** Swagger UI (`/docs`), ReDoc (`/redoc`)  

---

## 📋 Overview & Status Codes

All API endpoints accept and return JSON using standard HTTP status codes:

| HTTP Status | Meaning | Typical Usage in LearnMate AI |
| :--- | :--- | :--- |
| `200 OK` | Success | Successful GET, PUT, or conversational inference |
| `201 Created` | Resource Created | Successful POST entity creation (Student, Course, Roadmap, etc.) |
| `204 No Content` | Deleted | Successful DELETE operation with no response body |
| `400 Bad Request` | Business Logic Error | Duplicate email, duplicate course code, or validation conflict |
| `404 Not Found` | Entity Missing | Requested student, course, or roadmap ID does not exist |
| `422 Unprocessable` | Schema Mismatch | Pydantic validation failed on input types or boundaries |
| `502 Bad Gateway` | Upstream AI Error | IBM IAM rejected authentication, watsonx error, or invalid JSON |
| `503 Unavailable` | Config Missing | IBM watsonx credentials unconfigured in `backend/.env` |
| `504 Timeout` | Gateway Timeout | IBM watsonx inference exceeded HTTP timeout threshold |

---

## 1. System Health & Diagnostics

### `GET /`
- **Summary:** Root Welcome Endpoint
- **Description:** Verifies that the FastAPI server is online.
- **Response `200 OK`:**
  ```json
  {
    "message": "Welcome to LearnMate AI",
    "status": "Backend running successfully",
    "version": "1.0.0"
  }
  ```

---

### `GET /health`
- **Summary:** Health Probe Endpoint
- **Description:** Returns service and database connectivity status. Used by frontend `api.checkHealth()`.
- **Response `200 OK`:**
  ```json
  {
    "status": "healthy",
    "database": "connected"
  }
  ```

---

## 2. Students API (`/api/students`)

### `POST /api/students`
- **Summary:** Register a new student profile.
- **Request Body:**
  ```json
  {
    "name": "Alex Morgan",
    "email": "alex.morgan@stanford.edu",
    "title": "AI Systems Apprentice",
    "track": "Agentic AI Systems Architect",
    "career_goal": "Principal AI Agent Architect",
    "preferred_learning_style": "Hands-on Labs",
    "daily_goal_minutes": 45,
    "current_streak": 0,
    "total_hours": 0.0,
    "level": 1,
    "xp_points": 0
  }
  ```
- **Response `201 Created`:**
  ```json
  {
    "id": 1,
    "name": "Alex Morgan",
    "email": "alex.morgan@stanford.edu",
    "title": "AI Systems Apprentice",
    "track": "Agentic AI Systems Architect",
    "career_goal": "Principal AI Agent Architect",
    "preferred_learning_style": "Hands-on Labs",
    "daily_goal_minutes": 45,
    "current_streak": 0,
    "total_hours": 0.0,
    "level": 1,
    "xp_points": 0,
    "created_at": "2026-11-21T10:00:00Z",
    "updated_at": "2026-11-21T10:00:00Z"
  }
  ```
- **Error `400 Bad Request`:**
  ```json
  { "detail": "Student with email 'alex.morgan@stanford.edu' is already registered." }
  ```

---

### `GET /api/students`
- **Summary:** List registered students (paginated).
- **Query Parameters:**
  - `skip` (*integer*, optional, default: 0): Records to skip.
  - `limit` (*integer*, optional, default: 100): Maximum records to return.
- **Response `200 OK`:** Array of `StudentResponse` objects.

---

### `GET /api/students/{student_id}`
- **Summary:** Get student profile by ID.
- **Path Parameters:**
  - `student_id` (*integer*, required): Unique student identifier.
- **Response `200 OK`:** `StudentResponse` object.
- **Error `404 Not Found`:** If student ID does not exist.

---

### `PUT /api/students/{student_id}`
- **Summary:** Update student profile attributes.
- **Request Body (All fields optional):**
  ```json
  {
    "title": "Staff AI Engineer",
    "daily_goal_minutes": 60,
    "current_streak": 15,
    "xp_points": 3600
  }
  ```
- **Response `200 OK`:** Updated `StudentResponse` object.

---

### `DELETE /api/students/{student_id}`
- **Summary:** Delete student account.
- **Description:** Cascades deletion across all roadmaps, assessments, and progress entries belonging to the student.
- **Response `204 No Content`:** Empty body.

---

## 3. Skills API (`/api/skills`)

### `POST /api/skills`
- **Summary:** Create a new skill definition.
- **Request Body:**
  ```json
  {
    "name": "Multi-Agent Orchestration (LangGraph / Autogen)",
    "category": "Agentic AI",
    "description": "StateGraph cyclical graphs and supervisor routing."
  }
  ```
- **Response `201 Created`:** `SkillResponse` object.

---

### `GET /api/skills`
- **Summary:** List skills catalog.
- **Query Parameters:**
  - `category` (*string*, optional): Filter by domain (e.g., `Agentic AI`).
  - `skip` (*integer*, default: 0)
  - `limit` (*integer*, default: 100)
- **Response `200 OK`:** Array of `SkillResponse` objects.

---

### `GET /api/skills/{skill_id}`
- **Summary:** Get skill details by ID.

---

### `PUT /api/skills/{skill_id}`
- **Summary:** Update skill name, category, or description.

---

### `DELETE /api/skills/{skill_id}`
- **Summary:** Delete skill definition.
- **Response `204 No Content`:** Empty body.

---

## 4. Courses API (`/api/courses`)

### `POST /api/courses`
- **Summary:** Create a new course entry.
- **Request Body:**
  ```json
  {
    "code": "AI-301",
    "title": "Agentic Reasoning with LangGraph",
    "description": "Master cyclical agent graphs and tool execution.",
    "category": "Agentic AI",
    "level": "Intermediate",
    "duration_hours": 8.5,
    "rating": 4.95,
    "instructor_name": "Dr. Elena Rostova",
    "syllabus_json": "[{\"week\": 1, \"title\": \"ReAct Loops\"}]",
    "is_published": true
  }
  ```
- **Response `201 Created`:** `CourseResponse` object.
- **Error `400 Bad Request`:** Duplicate course code.

---

### `GET /api/courses`
- **Summary:** List courses with optional filters.
- **Query Parameters:**
  - `category` (*string*, optional): e.g., `Agentic AI`, `Machine Learning`.
  - `level` (*string*, optional): `Beginner`, `Intermediate`, `Advanced`.
  - `skip` (*integer*, default: 0)
  - `limit` (*integer*, default: 100)
- **Response `200 OK`:** Array of `CourseResponse` objects.

---

### `GET /api/courses/{course_id}`
- **Summary:** Get course details by ID.

---

### `PUT /api/courses/{course_id}`
- **Summary:** Update course title, rating, instructor, or publication status.

---

### `DELETE /api/courses/{course_id}`
- **Summary:** Delete course.
- **Response `204 No Content`:** Empty body.

---

## 5. Diagnostic Assessments API (`/api/assessments`)

### `POST /api/assessments`
- **Summary:** Submit diagnostic skill test results.
- **Request Body:**
  ```json
  {
    "student_id": 1,
    "skill_track": "Agentic Reasoning",
    "score": 85.0,
    "total_questions": 5,
    "correct_answers": 4,
    "strengths_json": "[\"Tool Calling Schemas\", \"State Graphs\"]",
    "improvements_json": "[\"Multi-Agent Supervisor Routing\"]",
    "answers_json": "{\"q1\": 1, \"q2\": 0, \"q3\": 2, \"q4\": 3, \"q5\": 1}"
  }
  ```
- **Response `201 Created`:** `AssessmentResultResponse` object.

---

### `GET /api/assessments`
- **Summary:** List assessment results.
- **Query Parameters:**
  - `student_id` (*integer*, optional): Filter assessments for a specific student.
  - `skip` (*integer*, default: 0)
  - `limit` (*integer*, default: 100)
- **Response `200 OK`:** Array of `AssessmentResultResponse` objects.

---

### `GET /api/assessments/{assessment_id}`
- **Summary:** Get single assessment report.

---

## 6. Learning Roadmaps API (`/api/roadmaps`)

### `POST /api/roadmaps/generate` *(AI Agentic Core)*
- **Summary:** Generate an unsaved roadmap draft using IBM watsonx.ai Granite.
- **Description:** Pulls the student's background and recent diagnostic assessment gaps, prompts IBM Granite with a strict JSON grammar constraint, validates output with Pydantic v2, and returns a reviewable draft.
- **Request Body:**
  ```json
  {
    "student_id": 1,
    "learning_goal": "Learn Python for backend microservices and AI agent APIs",
    "skills": ["Basic Python", "Variables", "Functions"]
  }
  ```
- **Response `200 OK` (`RoadmapDraft`):**
  ```json
  {
    "milestones": [
      {
        "sequence": 1,
        "title": "Python Core & Object-Oriented Principles",
        "description": "Solidify data structures, classes, and async runtime fundamentals.",
        "skills": ["Object Oriented Python", "Type Annotations", "Asyncio"],
        "estimated_weeks": 3,
        "modules": [
          {
            "title": "Type Hints & Pydantic Validation",
            "description": "Constructing schemas and data models.",
            "duration_minutes": 60,
            "type": "lab"
          }
        ]
      }
    ],
    "save_payload": {
      "student_id": 1,
      "title": "Python for Backend Development Roadmap",
      "target_role": "Backend Developer with AI Integration",
      "description": "Comprehensive curriculum crafted to bridge backend engineering and AI.",
      "status": "active",
      "stages_json": "[{...}]",
      "completion_percentage": 0.0
    }
  }
  ```
- **Error Codes:**
  - `404 Not Found`: Student ID does not exist.
  - `502 Bad Gateway`: Granite returned malformed JSON or invalid milestone sequences.
  - `503 Service Unavailable`: IBM credentials not configured.
  - `504 Gateway Timeout`: Upstream watsonx inference timed out.

---

### `POST /api/roadmaps`
- **Summary:** Save a finalized learning pathway to the database.
- **Request Body:**
  ```json
  {
    "student_id": 1,
    "title": "Agentic AI Systems Architect Pathway",
    "target_role": "Principal AI Agent Architect",
    "description": "An AI-adapted mastery curriculum crafted for Alex Morgan.",
    "status": "active",
    "stages_json": "[{...}]",
    "completion_percentage": 0.0
  }
  ```
- **Response `201 Created`:** `LearningRoadmapResponse` object with assigned `id`.

---

### `GET /api/roadmaps`
- **Summary:** List roadmaps (optionally filtered by `student_id`).

---

### `GET /api/roadmaps/{roadmap_id}`
- **Summary:** Retrieve full roadmap details including `stages_json`.

---

### `PUT /api/roadmaps/{roadmap_id}`
- **Summary:** Update roadmap status (`active`, `completed`, `archived`) or `completion_percentage`.

---

### `DELETE /api/roadmaps/{roadmap_id}`
- **Summary:** Delete roadmap by ID.
- **Response `204 No Content`:** Empty body.

---

## 7. Student Progress API (`/api/progress`)

### `POST /api/progress`
- **Summary:** Log student progress against a learning task or course module.
- **Request Body:**
  ```json
  {
    "student_id": 1,
    "course_id": 1,
    "task_id": "task-langgraph-checkpointer",
    "task_title": "Build StateGraph Checkpoint with SQLite",
    "status": "in_progress",
    "progress_percentage": 50.0,
    "time_spent_minutes": 45
  }
  ```
- **Response `201 Created`:** `StudentProgressResponse` object.

---

### `GET /api/progress`
- **Summary:** Query progress records.
- **Query Parameters:** `student_id`, `course_id`, `skip`, `limit`.

---

### `PUT /api/progress/{progress_id}`
- **Summary:** Update task status (`in_progress`, `completed`), percentage, or time logged.

---

### `DELETE /api/progress/{progress_id}`
- **Summary:** Remove a progress record.
- **Response `204 No Content`:** Empty body.

---

## 8. AI Mentor Chat API (`/api/mentor`)

### `POST /api/mentor/chat` *(Contextual AI Tutor)*
- **Summary:** Multi-turn study tutoring powered by IBM Granite.
- **Description:** Injects the student's active roadmap milestones and learning style preferences into the inference prompt context while rejecting out-of-scope instructions.
- **Request Body:**
  ```json
  {
    "student_id": 1,
    "message": "Explain how conditional edges work in LangGraph with a quick code snippet.",
    "history": [
      {
        "role": "user",
        "content": "What is the difference between linear chains and StateGraphs?"
      },
      {
        "role": "assistant",
        "content": "Linear chains execute sequentially in a DAG, whereas StateGraphs allow cyclical loops and memory persistence."
      }
    ]
  }
  ```
- **Response `200 OK`:**
  ```json
  {
    "reply": "In LangGraph, conditional edges allow a graph to dynamically determine the next node based on state values...\n\n```python\nworkflow.add_conditional_edges(\n    'classifier',\n    route_decision,\n    {'tools': 'tool_executor', 'finish': END}\n)\n```"
  }
  ```
- **Validation Rules:**
  - `message`: Truncated whitespace, min 1 char, max 2,000 chars.
  - `history`: Alternating `user`/`assistant` turns only; max 8 turns; total length ≤ 6,000 characters.
  - `student_id`: Must exist in `students` table.
- **Error Codes:**
  - `404 Not Found`: Student does not exist.
  - `422 Unprocessable Entity`: Input history violates turn sequence or length constraints.
  - `502 Bad Gateway`: Granite response could not be validated into `{"reply": "..."}`.
  - `504 Gateway Timeout`: Upstream IBM Cloud inference timeout.
