import pytest


def test_create_and_list_skills(client):
    payload = {
        "name": "Vector Databases & Hybrid Search",
        "category": "Data & Search",
        "description": "Dense and sparse reciprocal rank fusion in PostgreSQL.",
    }
    res = client.post("/api/skills", json=payload)
    assert res.status_code == 201
    assert res.json()["name"] == "Vector Databases & Hybrid Search"

    list_res = client.get("/api/skills?category=Data%20%26%20Search")
    assert list_res.status_code == 200
    skills = list_res.json()
    assert len(skills) >= 1
    assert skills[0]["category"] == "Data & Search"


def test_duplicate_skill_fails(client):
    payload = {"name": "Async Python", "category": "Backend"}
    res1 = client.post("/api/skills", json=payload)
    assert res1.status_code == 201

    res2 = client.post("/api/skills", json=payload)
    assert res2.status_code == 400
    assert "already exists" in res2.json()["detail"]


def test_update_and_delete_skill(client):
    payload = {"name": "Pydantic Schemas", "category": "Prompt Engineering"}
    res = client.post("/api/skills", json=payload)
    skill_id = res.json()["id"]

    update_res = client.put(
        f"/api/skills/{skill_id}", json={"description": "Updated description"}
    )
    assert update_res.status_code == 200
    assert update_res.json()["description"] == "Updated description"

    del_res = client.delete(f"/api/skills/{skill_id}")
    assert del_res.status_code == 204
