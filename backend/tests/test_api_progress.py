import pytest


def test_create_and_update_progress(client):
    # Setup student and course
    student_res = client.post(
        "/api/students", json={"name": "Chris Wu", "email": "chris.wu@mit.edu"}
    )
    student_id = student_res.json()["id"]

    course_res = client.post(
        "/api/courses",
        json={
            "code": "ML-501",
            "title": "Machine Learning Foundations",
            "description": "Core concepts",
            "category": "Machine Learning",
        },
    )
    course_id = course_res.json()["id"]

    # Log task progress
    progress_payload = {
        "student_id": student_id,
        "course_id": course_id,
        "task_id": "lab-1",
        "task_title": "Build LangGraph Checkpointer",
        "status": "in_progress",
        "progress_percentage": 50.0,
        "time_spent_minutes": 45,
    }
    create_res = client.post("/api/progress", json=progress_payload)
    assert create_res.status_code == 201
    progress_id = create_res.json()["id"]

    # Query progress
    list_res = client.get(f"/api/progress?student_id={student_id}&course_id={course_id}")
    assert list_res.status_code == 200
    records = list_res.json()
    assert len(records) == 1
    assert records[0]["task_title"] == "Build LangGraph Checkpointer"

    # Update progress to completed
    update_res = client.put(
        f"/api/progress/{progress_id}",
        json={"status": "completed", "progress_percentage": 100.0, "time_spent_minutes": 60},
    )
    assert update_res.status_code == 200
    assert update_res.json()["status"] == "completed"
    assert update_res.json()["progress_percentage"] == 100.0

    # Delete
    del_res = client.delete(f"/api/progress/{progress_id}")
    assert del_res.status_code == 204
