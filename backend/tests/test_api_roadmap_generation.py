import json

import pytest

from app.main import app
from app.services.watsonx_service import get_watsonx_service


@pytest.fixture
def draft():
    return {
        "title": "Learn Python",
        "target_role": "Python Developer",
        "description": "Practise core Python skills.",
        "milestones": [{
            "sequence": 1,
            "title": "Python Basics",
            "description": "Learn control flow.",
            "skills": ["Loops"],
            "estimated_weeks": 2,
            "modules": [{
                "title": "Loop exercises",
                "description": "Write and test a loop.",
                "duration_minutes": 45,
                "type": "lab",
            }],
        }],
    }


@pytest.fixture
def student_id(client):
    response = client.post("/api/students", json={
        "name": "Sample Student",
        "email": "roadmap@example.com",
        "career_goal": "Backend development",
        "preferred_learning_style": "Hands-on Labs",
    })
    assert response.status_code == 201
    return response.json()["id"]


def mock_granite(output):
    class MockGranite:
        context = None

        def generate_json(self, instructions, context):
            assert "JSON object" in instructions
            self.context = json.loads(context)
            return output

    service = MockGranite()
    app.dependency_overrides[get_watsonx_service] = lambda: service
    return service


def test_generate_returns_reviewable_draft_and_preserves_explicit_save(client, student_id, draft):
    assessment = client.post("/api/assessments", json={
        "student_id": student_id,
        "skill_track": "Python",
        "score": 80,
    })
    assert assessment.status_code == 201
    mock = mock_granite(json.dumps(draft))
    response = client.post("/api/roadmaps/generate", json={
        "student_id": student_id,
        "learning_goal": "Learn Python",
        "skills": ["Variables"],
    })

    assert response.status_code == 200
    body = response.json()
    assert body["milestones"] == draft["milestones"]
    assert mock.context["reported_skills"] == ["Variables"]
    assert mock.context["career_goal"] == "Backend development"
    assert mock.context["preferred_learning_style"] == "Hands-on Labs"
    assert mock.context["recent_assessments"][0]["score_out_of_100"] == 80
    assert "roadmap@example.com" not in json.dumps(mock.context)
    assert client.get(f"/api/roadmaps?student_id={student_id}").json() == []
    save_payload = body["save_payload"]
    assert json.loads(save_payload["stages_json"])[0]["modules"][0]["duration"] == "45 min"
    assert client.post("/api/roadmaps", json=save_payload).status_code == 201
    assert len(client.get(f"/api/roadmaps?student_id={student_id}").json()) == 1


@pytest.mark.parametrize("problem", ["invalid_json", "sequence", "duration", "description", "skills"])
def test_invalid_model_output_is_not_saved(client, student_id, draft, problem):
    milestone = draft["milestones"][0]
    if problem == "sequence":
        milestone["sequence"] = 2
    if problem == "duration":
        milestone["modules"][0]["duration_minutes"] = 0
    if problem == "description":
        milestone["description"] = " "
    if problem == "skills":
        milestone["skills"] = []
    mock_granite("not JSON" if problem == "invalid_json" else json.dumps(draft))

    response = client.post("/api/roadmaps/generate", json={
        "student_id": student_id,
        "learning_goal": "Learn Python",
    })
    assert response.status_code == 502
    assert response.json() == {"detail": "Granite returned an invalid roadmap draft."}
    assert client.get(f"/api/roadmaps?student_id={student_id}").json() == []


def test_request_validation_and_missing_student_skip_inference(client):
    mock = mock_granite("{}")
    assert client.post("/api/roadmaps/generate", json={
        "student_id": 1, "learning_goal": " ",
    }).status_code == 422
    assert client.post("/api/roadmaps/generate", json={
        "student_id": 999, "learning_goal": "Learn Python",
    }).status_code == 404
    assert mock.context is None
