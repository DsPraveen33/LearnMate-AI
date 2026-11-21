import pytest


def test_create_student_success(client):
    payload = {
        "name": "Alex Morgan",
        "email": "alex.morgan@stanford.edu",
        "title": "AI Systems Apprentice",
        "track": "Agentic AI Systems Architect",
        "career_goal": "Principal AI Architect",
        "daily_goal_minutes": 45,
    }
    response = client.post("/api/students", json=payload)
    assert response.status_code == 201
    data = response.json()
    assert data["id"] is not None
    assert data["name"] == "Alex Morgan"
    assert data["email"] == "alex.morgan@stanford.edu"
    assert data["level"] == 1


def test_create_duplicate_student_fails(client):
    payload = {
        "name": "Alex Morgan",
        "email": "alex.morgan@stanford.edu",
    }
    res1 = client.post("/api/students", json=payload)
    assert res1.status_code == 201

    res2 = client.post("/api/students", json=payload)
    assert res2.status_code == 400
    assert "already registered" in res2.json()["detail"]


def test_get_student_by_id(client):
    payload = {"name": "Jordan Lee", "email": "jordan.lee@ai.org"}
    create_res = client.post("/api/students", json=payload)
    student_id = create_res.json()["id"]

    get_res = client.get(f"/api/students/{student_id}")
    assert get_res.status_code == 200
    assert get_res.json()["email"] == "jordan.lee@ai.org"


def test_get_nonexistent_student_returns_404(client):
    response = client.get("/api/students/99999")
    assert response.status_code == 404
    assert "not found" in response.json()["detail"]


def test_update_student(client):
    payload = {"name": "Sam Taylor", "email": "sam.taylor@univ.edu"}
    create_res = client.post("/api/students", json=payload)
    student_id = create_res.json()["id"]

    update_payload = {"career_goal": "Senior AI Systems Engineer", "xp_points": 250}
    update_res = client.put(f"/api/students/{student_id}", json=update_payload)
    assert update_res.status_code == 200
    data = update_res.json()
    assert data["career_goal"] == "Senior AI Systems Engineer"
    assert data["xp_points"] == 250


def test_delete_student(client):
    payload = {"name": "Taylor Swift", "email": "taylor@swift.org"}
    create_res = client.post("/api/students", json=payload)
    student_id = create_res.json()["id"]

    del_res = client.delete(f"/api/students/{student_id}")
    assert del_res.status_code == 204

    get_res = client.get(f"/api/students/{student_id}")
    assert get_res.status_code == 404
