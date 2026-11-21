import pytest


def test_create_update_and_delete_roadmap(client):
    student_res = client.post(
        "/api/students", json={"name": "Devin AI", "email": "devin@path.io"}
    )
    student_id = student_res.json()["id"]

    roadmap_payload = {
        "student_id": student_id,
        "title": "Agentic AI Architect Pathway",
        "target_role": "AI Architect",
        "stages_json": '[{"stage": 1, "name": "Foundations", "completed": true}]',
        "completion_percentage": 25.0,
    }
    res = client.post("/api/roadmaps", json=roadmap_payload)
    assert res.status_code == 201
    roadmap_id = res.json()["id"]

    # Update completion
    update_res = client.put(
        f"/api/roadmaps/{roadmap_id}", json={"completion_percentage": 50.0}
    )
    assert update_res.status_code == 200
    assert update_res.json()["completion_percentage"] == 50.0

    # Get by student
    list_res = client.get(f"/api/roadmaps?student_id={student_id}")
    assert list_res.status_code == 200
    assert len(list_res.json()) == 1

    # Delete
    del_res = client.delete(f"/api/roadmaps/{roadmap_id}")
    assert del_res.status_code == 204
