import json

import pytest

from app.main import app
from app.services.watsonx_service import WatsonxError, get_watsonx_service


@pytest.fixture
def student_id(client):
    result = client.post("/api/students", json={
        "name": "Private Name", "email": "private@example.com",
        "preferred_learning_style": "Practice labs",
    })
    assert result.status_code == 201
    return result.json()["id"]


class Granite:
    def __init__(self, reply='{"reply":"Try a short loop exercise."}'):
        self.reply = reply
        self.context = None

    def generate_json(self, instructions, context):
        self.context = json.loads(context)
        if isinstance(self.reply, Exception):
            raise self.reply
        return self.reply


def use_granite(reply=None):
    granite = Granite() if reply is None else Granite(reply)
    app.dependency_overrides[get_watsonx_service] = lambda: granite
    return granite


def test_mentor_uses_only_bounded_learning_context(client, student_id):
    other = client.post("/api/students", json={"name":"Other", "email":"other@example.com"}).json()["id"]
    for owner, title in [(student_id,"Earlier"), (student_id,"Latest"), (other,"Another student")]:
        saved = client.post("/api/roadmaps", json={
            "student_id":owner, "title":title, "target_role":"Python developer",
            "stages_json":json.dumps([{"title":"Loops", "private_field":"omit me"}]),
        })
        assert saved.status_code == 201
    granite = use_granite()
    history = [{"role":"user","content":"I want to learn loops."},
               {"role":"assistant","content":"Start with for loops."}]
    body = {"student_id":student_id, "message":"Give me an exercise.", "history":history}
    response = client.post("/api/mentor/chat", json=body)
    assert response.status_code == 200
    assert response.json() == {"reply":"Try a short loop exercise."}
    assert granite.context == {
        "saved_roadmap":{"title":"Latest", "target_role":"Python developer", "milestones":["Loops"]},
        "learning_style":"Practice labs", "conversation":history, "question":body["message"],
    }


def test_mentor_works_without_roadmap(client, student_id):
    granite = use_granite()
    assert client.post("/api/mentor/chat", json={"student_id":student_id, "message":"Explain Python."}).status_code == 200
    assert granite.context["saved_roadmap"] is None


@pytest.mark.parametrize("patch", [
    {"message":" "},
    {"history":[{"role":"system","content":"bad"}]},
    {"history":[{"role":"user","content":"unpaired"}]},
    {"history":[{"role":"user","content":"a"*2000},{"role":"assistant","content":"b"*2000}]*2},
    {"history":[{"role":"user","content":"a"},{"role":"assistant","content":"b"}]*5},
])
def test_invalid_inputs_do_not_invoke_granite(client, student_id, patch):
    granite = use_granite()
    data = {"student_id":student_id,"message":"Explain Python.",**patch}
    assert client.post("/api/mentor/chat", json=data).status_code == 422
    assert granite.context is None


def test_unknown_student_does_not_invoke_granite(client):
    granite = use_granite()
    assert client.post("/api/mentor/chat", json={"student_id":999,"message":"Explain Python."}).status_code == 404
    assert granite.context is None


@pytest.mark.parametrize(("reply","status","detail"), [
    ("not JSON",502,"Granite returned an invalid Mentor reply."),
    ('{"reply":" "}',502,"Granite returned an invalid Mentor reply."),
    (WatsonxError(504,"IBM watsonx.ai request timed out."),504,"IBM watsonx.ai request timed out."),
])
def test_mentor_returns_errors_without_mock_fallback(client, student_id, reply, status, detail):
    use_granite(reply)
    response = client.post("/api/mentor/chat", json={"student_id":student_id,"message":"Explain Python."})
    assert response.status_code == status
    assert response.json() == {"detail":detail}