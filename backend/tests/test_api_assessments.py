import pytest


def test_create_and_get_assessment(client):
    # First create student
    student_res = client.post(
        "/api/students",
        json={"name": "Alice Bob", "email": "alice@ai.edu"},
    )
    student_id = student_res.json()["id"]

    # Submit assessment
    payload = {
        "student_id": student_id,
        "skill_track": "Agentic Reasoning",
        "score": 85.0,
        "total_questions": 5,
        "correct_answers": 4,
        "strengths_json": '["ReAct loop understanding", "StateGraph flow"]',
        "improvements_json": '["Checkpointer recovery"]',
    }
    create_res = client.post("/api/assessments", json=payload)
    assert create_res.status_code == 201
    assessment_id = create_res.json()["id"]

    # Get by student ID
    list_res = client.get(f"/api/assessments?student_id={student_id}")
    assert list_res.status_code == 200
    results = list_res.json()
    assert len(results) == 1
    assert results[0]["score"] == 85.0

    # Get single
    get_res = client.get(f"/api/assessments/{assessment_id}")
    assert get_res.status_code == 200
    assert get_res.json()["skill_track"] == "Agentic Reasoning"


def test_assessment_nonexistent_student_fails(client):
    payload = {
        "student_id": 99999,
        "skill_track": "Python",
        "score": 90.0,
    }
    res = client.post("/api/assessments", json=payload)
    assert res.status_code == 404
    assert "not found" in res.json()["detail"]
