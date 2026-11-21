import pytest


def test_create_and_filter_courses(client):
    payload = {
        "code": "GRANITE-101",
        "title": "IBM Granite 3.0: Enterprise Foundations",
        "description": "Aligning and deploying IBM Granite open weights for agent workflows.",
        "category": "Agentic AI",
        "level": "Intermediate",
        "duration_hours": 6.5,
        "rating": 4.92,
        "instructor_name": "Sarah Jenkins",
    }
    create_res = client.post("/api/courses", json=payload)
    assert create_res.status_code == 201
    course_id = create_res.json()["id"]

    # Filter by category & level
    filter_res = client.get("/api/courses?category=Agentic%20AI&level=Intermediate")
    assert filter_res.status_code == 200
    courses = filter_res.json()
    assert any(c["code"] == "GRANITE-101" for c in courses)

    # Get by ID
    get_res = client.get(f"/api/courses/{course_id}")
    assert get_res.status_code == 200
    assert get_res.json()["title"] == "IBM Granite 3.0: Enterprise Foundations"


def test_duplicate_course_code_fails(client):
    payload = {
        "code": "RAG-201",
        "title": "Enterprise RAG",
        "description": "Hybrid search",
        "category": "Machine Learning",
    }
    res1 = client.post("/api/courses", json=payload)
    assert res1.status_code == 201

    res2 = client.post("/api/courses", json=payload)
    assert res2.status_code == 400
    assert "already exists" in res2.json()["detail"]


def test_update_and_delete_course(client):
    payload = {
        "code": "API-101",
        "title": "FastAPI Services",
        "description": "Async endpoints",
        "category": "Backend",
    }
    res = client.post("/api/courses", json=payload)
    course_id = res.json()["id"]

    update_res = client.put(f"/api/courses/{course_id}", json={"duration_hours": 9.0})
    assert update_res.status_code == 200
    assert update_res.json()["duration_hours"] == 9.0

    del_res = client.delete(f"/api/courses/{course_id}")
    assert del_res.status_code == 204
