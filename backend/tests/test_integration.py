import pytest
import json


def test_full_student_learning_lifecycle_integration(client):
    """
    End-to-End Integration Test:
    1. Register student
    2. Explore course catalog
    3. Generate personalized roadmap
    4. Log & complete learning tasks
    5. Take diagnostic skill assessment
    6. Verify updated progress and analytics
    """
    # 1. Register student
    student_payload = {
        "name": "Maria Garcia",
        "email": "maria.garcia@berkeley.edu",
        "title": "Machine Learning Engineer",
        "track": "Autonomous Agent Architect",
        "career_goal": "Lead AI Systems Engineer",
        "daily_goal_minutes": 60,
    }
    student_res = client.post("/api/students", json=student_payload)
    assert student_res.status_code == 201
    student = student_res.json()
    student_id = student["id"]
    assert student["email"] == "maria.garcia@berkeley.edu"

    # 2. Add course to catalog & query
    course_payload = {
        "code": "AGENT-401",
        "title": "Production Agent Workflows with LangGraph",
        "description": "Design human-in-the-loop stateful graphs.",
        "category": "Agentic AI",
        "level": "Intermediate",
        "duration_hours": 8.0,
        "rating": 4.95,
        "instructor_name": "Dr. Elena Rostova",
    }
    course_res = client.post("/api/courses", json=course_payload)
    assert course_res.status_code == 201
    course_id = course_res.json()["id"]

    courses_list = client.get("/api/courses?category=Agentic%20AI").json()
    assert any(c["id"] == course_id for c in courses_list)

    # 3. Create personalized learning roadmap for student
    stages = [
        {
            "id": "stage-1",
            "stageNumber": 1,
            "title": "Foundations of Agentic Systems",
            "status": "in_progress",
            "completionPercentage": 50,
            "modules": [
                {"id": "m-1", "title": "StateGraphs Intro", "completed": True},
                {"id": "m-2", "title": "Checkpoints & Storage", "completed": False},
            ],
        }
    ]
    roadmap_payload = {
        "student_id": student_id,
        "title": "Personalized Autonomous Agent Track",
        "target_role": "Lead AI Systems Engineer",
        "stages_json": json.dumps(stages),
        "completion_percentage": 50.0,
    }
    roadmap_res = client.post("/api/roadmaps", json=roadmap_payload)
    assert roadmap_res.status_code == 201
    roadmap_id = roadmap_res.json()["id"]

    # 4. Log student progress on a module
    progress_payload = {
        "student_id": student_id,
        "course_id": course_id,
        "task_id": "lab-state-graph",
        "task_title": "Build StateGraph checkpointer with SQLite",
        "status": "in_progress",
        "progress_percentage": 50.0,
        "time_spent_minutes": 45,
    }
    progress_res = client.post("/api/progress", json=progress_payload)
    assert progress_res.status_code == 201
    progress_id = progress_res.json()["id"]

    # Complete the task
    update_progress_res = client.put(
        f"/api/progress/{progress_id}",
        json={
            "status": "completed",
            "progress_percentage": 100.0,
            "time_spent_minutes": 60,
        },
    )
    assert update_progress_res.status_code == 200
    assert update_progress_res.json()["status"] == "completed"

    # 5. Submit diagnostic assessment result
    assessment_payload = {
        "student_id": student_id,
        "skill_track": "Agentic Reasoning",
        "score": 90.0,
        "total_questions": 5,
        "correct_answers": 4,
        "strengths_json": json.dumps(["State machines", "Tool calling"]),
        "improvements_json": json.dumps(["Distributed checkpoint sync"]),
    }
    assessment_res = client.post("/api/assessments", json=assessment_payload)
    assert assessment_res.status_code == 201

    # 6. Verify full records for the student
    all_progress = client.get(f"/api/progress?student_id={student_id}").json()
    assert len(all_progress) == 1
    assert all_progress[0]["task_title"] == "Build StateGraph checkpointer with SQLite"

    all_assessments = client.get(f"/api/assessments?student_id={student_id}").json()
    assert len(all_assessments) == 1
    assert all_assessments[0]["score"] == 90.0

    all_roadmaps = client.get(f"/api/roadmaps?student_id={student_id}").json()
    assert len(all_roadmaps) == 1
    assert all_roadmaps[0]["target_role"] == "Lead AI Systems Engineer"

    # 7. Update student XP and streak
    client.put(
        f"/api/students/{student_id}",
        json={"current_streak": 1, "xp_points": 350, "total_hours": 1.0},
    )
    updated_student = client.get(f"/api/students/{student_id}").json()
    assert updated_student["current_streak"] == 1
    assert updated_student["xp_points"] == 350
