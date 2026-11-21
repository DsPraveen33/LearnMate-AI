import json
from sqlalchemy.orm import Session
from sqlalchemy import select
from app.models.db_models import Student, Skill, Course, LearningRoadmap, StudentProgress


def seed_database(db: Session) -> None:
    """Seeds the SQLite database with initial records if empty."""
    # 1. Seed Student if not exists
    student = db.scalars(select(Student)).first()
    if not student:
        student = Student(
            name="Alex Morgan",
            email="alex.morgan@stanford.edu",
            title="AI Systems Apprentice & Software Engineer",
            track="Agentic AI Systems Architect",
            career_goal="Principal AI Agent Architect & Staff Engineer",
            preferred_learning_style="Hands-on Labs & Architecture Code",
            daily_goal_minutes=45,
            current_streak=14,
            total_hours=48.5,
            level=4,
            xp_points=3450,
        )
        db.add(student)
        db.commit()
        db.refresh(student)

    # 2. Seed Skills if not exists
    if db.scalars(select(Skill)).first() is None:
        initial_skills = [
            Skill(
                name="Multi-Agent Orchestration (LangGraph / Autogen)",
                category="Agentic AI",
                description="StateGraph cyclical graphs, human-in-the-loop pauses, and supervisor routing.",
            ),
            Skill(
                name="LLM Function Calling & Structured Tool Schemas",
                category="Prompt Engineering",
                description="Pydantic v2 deterministic output schemas and error self-correction.",
            ),
            Skill(
                name="Hybrid Vector Search & RAG Optimization",
                category="Data & Search",
                description="Combining dense embeddings with sparse BM25 and reciprocal rank fusion.",
            ),
            Skill(
                name="Async Python & Streaming FastAPI Endpoints",
                category="Backend Architecture",
                description="Server-sent events token streaming and asynchronous worker queues.",
            ),
            Skill(
                name="Agent Evaluation, Tracing & Guardrails",
                category="Reliability",
                description="OpenInference tracing, latency benchmarks, and safety filters.",
            ),
        ]
        db.add_all(initial_skills)
        db.commit()

    # 3. Seed Courses if not exists
    if db.scalars(select(Course)).first() is None:
        initial_courses = [
            Course(
                code="AI-301",
                title="Agentic Reasoning with LangGraph & Multi-Agent Loops",
                description="Master cyclical agent graphs, human-in-the-loop workflows, dynamic routing, and memory persistence in production.",
                category="Agentic AI",
                level="Intermediate",
                duration_hours=8.5,
                rating=4.95,
                instructor_name="Dr. Elena Rostova (Principal AI Scientist)",
                syllabus_json=json.dumps([
                    {"week": 1, "title": "ReAct Loop vs State Machine Graphs", "topics": ["Linear Chains limitation", "StateGraph Primitives", "Nodes and Edges"]},
                    {"week": 2, "title": "State Persistence & Checkpointers", "topics": ["Postgres Checkpointer", "Resuming Conversations", "Thread ID Isolation"]},
                    {"week": 3, "title": "Human-in-the-Loop Approval Patterns", "topics": ["Interrupt Functions", "State Modification", "Safe Tool Execution"]},
                    {"week": 4, "title": "Multi-Agent Hierarchical Teams", "topics": ["Supervisor Agent", "Worker Hand-offs", "Consensus Mechanisms"]},
                ]),
                is_published=True,
            ),
            Course(
                code="ML-402",
                title="Enterprise RAG Architectures: Hybrid Search & Reranking",
                description="Learn modern retrieval augmented generation using sparse and dense embeddings, reciprocal rank fusion, and late chunking.",
                category="Machine Learning",
                level="Advanced",
                duration_hours=6.0,
                rating=4.88,
                instructor_name="Marcus Chen (Staff ML Infrastructure Engineer)",
                syllabus_json=json.dumps([
                    {"week": 1, "title": "Chunking Strategies & Context Loss", "topics": ["Semantic Chunking", "Sliding Window", "Parent-Child Documents"]},
                    {"week": 2, "title": "Sparse BM25 + Dense Hybrid Fusion", "topics": ["Reciprocal Rank Fusion", "Cross-Encoder Reranking", "ColBERT"]},
                    {"week": 3, "title": "Evaluation with RAGAS Metrics", "topics": ["Faithfulness", "Answer Relevance", "Context Recall"]},
                ]),
                is_published=True,
            ),
            Course(
                code="GRANITE-101",
                title="IBM Granite 3.0: Enterprise Foundations & Alignment",
                description="Deep dive into IBM open-source Granite models, Instruct tuning, function calling accuracy, and enterprise deployment.",
                category="Agentic AI",
                level="Intermediate",
                duration_hours=5.5,
                rating=4.92,
                instructor_name="Sarah Jenkins (IBM Research Fellow)",
                syllabus_json=json.dumps([
                    {"week": 1, "title": "Granite 3.0 8B & 2B Architecture", "topics": ["MoE vs Dense", "Safety Guardrails", "Benchmark Comparison"]},
                    {"week": 2, "title": "Tool Calling & JSON Strict Mode", "topics": ["Function Definition Format", "Grammar Enforced Decoding", "Error Recovery"]},
                    {"week": 3, "title": "Deployment via vLLM and FastAPI", "topics": ["Quantization (AWQ/GPTQ)", "Docker Containerization", "Latency SLA"]},
                ]),
                is_published=True,
            ),
            Course(
                code="SYS-501",
                title="High-Concurrency FastAPI & Asynchronous AI Microservices",
                description="Design non-blocking streaming APIs with SSE, WebSockets, background task workers, and Celery for intensive model workflows.",
                category="System Design",
                level="Advanced",
                duration_hours=7.0,
                rating=4.97,
                instructor_name="David Thorne (Cloud Architect)",
                syllabus_json=json.dumps([
                    {"week": 1, "title": "Async Event Loops in High-Throughput I/O", "topics": ["uvloop tuning", "Async context managers", "Threadpools"]},
                    {"week": 2, "title": "Server-Sent Events for Token Streaming", "topics": ["StreamingResponse", "Backpressure Handling", "Reconnection"]},
                ]),
                is_published=True,
            ),
            Course(
                code="AI-502",
                title="Autonomous Multi-Agent Systems & Swarm Intelligence",
                description="Orchestrate teams of specialized agents with shared memory, dynamic delegation, peer review, and self-correcting loops.",
                category="Agentic AI",
                level="Advanced",
                duration_hours=10.0,
                rating=4.96,
                instructor_name="Prof. Amara Okafor (Director of AI Systems Institute)",
                syllabus_json=json.dumps([
                    {"week": 1, "title": "Agent Roster & Role Specialization", "topics": ["Coordinator vs Worker", "Prompt Ensembling", "Context Splitting"]},
                    {"week": 2, "title": "Shared Blackboards & Message Passing", "topics": ["Event Buses", "Broadcast vs Direct", "Conflict Resolution"]},
                    {"week": 3, "title": "Self-Correction & Automated Code Review", "topics": ["Test-driven Agent Loops", "Sandboxed Verification"]},
                ]),
                is_published=True,
            ),
        ]
        db.add_all(initial_courses)
        db.commit()

    # 4. Seed Roadmap if not exists
    if db.scalars(select(LearningRoadmap)).first() is None and student:
        roadmap_stages = [
            {
                "id": "stage-1",
                "stageNumber": 1,
                "title": "Foundations of Agentic Systems & Structured Outputs",
                "subtitle": "Master deterministic tool schemas, Pydantic function calling, and token economics.",
                "status": "completed",
                "completionPercentage": 100,
                "estimatedWeeks": 2,
                "modules": [
                    {"id": "m-1-1", "title": "LLM Mechanics & Context Window Boundaries", "duration": "45 mins", "type": "video", "completed": True, "description": "Core LLM attention architecture, tokenizers, and prompt window constraints."},
                    {"id": "m-1-2", "title": "Deterministic JSON Extraction with Pydantic v2", "duration": "1 hr 15 mins", "type": "lab", "completed": True, "description": "Building rigorous schemas and type-validated outputs from generative models."},
                    {"id": "m-1-3", "title": "OpenAI & Anthropic Function Calling Protocols", "duration": "1 hr", "type": "lab", "completed": True, "description": "Writing executable tools with docstrings and automatic argument parsing."},
                    {"id": "m-1-4", "title": "Stage 1 Comprehensive Skills Check", "duration": "30 mins", "type": "quiz", "completed": True, "description": "Evaluate schema design and prompt engineering under strict validation."},
                ],
            },
            {
                "id": "stage-2",
                "stageNumber": 2,
                "title": "Memory Systems, RAG & Vector Knowledge Retrieval",
                "subtitle": "Build persistent agent memory, short/long-term stores, and hybrid knowledge search.",
                "status": "completed",
                "completionPercentage": 100,
                "estimatedWeeks": 3,
                "modules": [
                    {"id": "m-2-1", "title": "Short-term Session Memory vs Long-term Vector Memory", "duration": "1 hr", "type": "video", "completed": True, "description": "Session conversation buffers, semantic summary truncation, and memory architectures."},
                    {"id": "m-2-2", "title": "Hybrid Dense + Sparse Vector Search in pgvector", "duration": "2 hrs", "type": "lab", "completed": True, "description": "Implementing BM25 and vector distance fusion directly in PostgreSQL."},
                    {"id": "m-2-3", "title": "Chunking Strategies & Contextual Compression", "duration": "1 hr 30 mins", "type": "lab", "completed": True, "description": "Preventing retrieval hallucination with document reranking."},
                    {"id": "m-2-4", "title": "Memory Integration Project: Personalized Student Brain", "duration": "2 hrs 30 mins", "type": "project", "completed": True, "description": "Hands-on project connecting external user facts to ongoing agent sessions."},
                ],
            },
            {
                "id": "stage-3",
                "stageNumber": 3,
                "title": "Autonomous Multi-Agent Orchestration with LangGraph",
                "subtitle": "Implement cyclical state machines, human approval pauses, and agent coordination.",
                "status": "in_progress",
                "completionPercentage": 65,
                "estimatedWeeks": 4,
                "modules": [
                    {"id": "m-3-1", "title": "StateGraph Architecture: Nodes, Edges & Reducers", "duration": "1 hr 15 mins", "type": "lab", "completed": True, "description": "Building cyclical computation graphs that outgrow linear DAGs."},
                    {"id": "m-3-2", "title": "Human-in-the-Loop Interventions & Checkpoints", "duration": "1 hr 45 mins", "type": "lab", "completed": True, "description": "Adding interrupt points for sensitive agent actions (money, file edits)."},
                    {"id": "m-3-3", "title": "Hierarchical Multi-Agent Teams & Supervisor Routing", "duration": "2 hrs", "type": "lab", "completed": False, "inProgress": True, "description": "Building specialized worker agents governed by a centralized planner."},
                    {"id": "m-3-4", "title": "Tool Calling Resilience & Automatic Self-Correction", "duration": "1 hr 30 mins", "type": "lab", "completed": False, "description": "Catching syntax and runtime exceptions to let the agent auto-repair parameters."},
                    {"id": "m-3-5", "title": "Stage 3 Practical Assessment: Build a Research Team", "duration": "45 mins", "type": "quiz", "completed": False, "description": "Build and verify an automated researcher and reviewer dual-agent system."},
                ],
            },
            {
                "id": "stage-4",
                "stageNumber": 4,
                "title": "Enterprise Alignment, IBM Granite & Production Deployment",
                "subtitle": "Fine-tuning open models, safety guardrails, low-latency serving, and capstone deployment.",
                "status": "locked",
                "completionPercentage": 0,
                "estimatedWeeks": 3,
                "modules": [
                    {"id": "m-4-1", "title": "IBM Granite 3.0 Architecture & Open Weights Deployment", "duration": "1 hr 30 mins", "type": "video", "completed": False, "locked": True, "description": "Exploring IBM Granite parameter efficiencies, safety tuning, and local hosting."},
                    {"id": "m-4-2", "title": "Deterministic Guardrails with NeMo & Llama-Guard", "duration": "1 hr 45 mins", "type": "lab", "completed": False, "locked": True, "description": "Enforcing input and output constraints on live LLM traffic."},
                    {"id": "m-4-3", "title": "Production Observability & Tracing with OpenInference", "duration": "1 hr 15 mins", "type": "lab", "completed": False, "locked": True, "description": "Tracing latency, token costs, and reasoning step tree inspections."},
                    {"id": "m-4-4", "title": "Capstone: End-to-End Autonomous Educational Assistant", "duration": "4 hrs", "type": "project", "completed": False, "locked": True, "description": "The final capstone integrating FastAPI, Granite LLM, and real-time React dashboard."},
                ],
            },
        ]
        roadmap = LearningRoadmap(
            student_id=student.id,
            title="Agentic AI Systems Architect Pathway",
            target_role="Principal AI Agent Architect",
            description="An AI-adapted mastery curriculum crafted for Alex Morgan based on diagnostic skill gaps.",
            status="active",
            stages_json=json.dumps(roadmap_stages),
            completion_percentage=68.0,
        )
        db.add(roadmap)
        db.commit()

    # 5. Seed Tasks / Progress if not exists
    if db.scalars(select(StudentProgress)).first() is None and student:
        tasks = [
            StudentProgress(
                student_id=student.id,
                task_id="task-1",
                task_title="Complete LangGraph StateGraph Checkpoint Lab",
                status="in_progress",
                progress_percentage=60.0,
                time_spent_minutes=40,
            ),
            StudentProgress(
                student_id=student.id,
                task_id="task-2",
                task_title="Read IBM Granite 3.0 Architecture Whitepaper",
                status="in_progress",
                progress_percentage=20.0,
                time_spent_minutes=25,
            ),
            StudentProgress(
                student_id=student.id,
                task_id="task-3",
                task_title="Multi-Agent Tool Calling Benchmark Quiz",
                status="completed",
                progress_percentage=100.0,
                time_spent_minutes=20,
            ),
            StudentProgress(
                student_id=student.id,
                task_id="task-4",
                task_title="Design Hybrid RAG Schema in PostgreSQL & pgvector",
                status="in_progress",
                progress_percentage=15.0,
                time_spent_minutes=60,
            ),
        ]
        db.add_all(tasks)
        db.commit()
