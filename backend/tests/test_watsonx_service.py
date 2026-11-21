import json
from urllib.parse import parse_qs

import httpx
import pytest

from app.services.watsonx_service import WatsonxError, WatsonxService

PROJECT_ID = "18877ee5-cf51-4a43-88f4-6c4625c674ab"


def make_service(handler, key="test-key"):
    return WatsonxService(
        key,
        PROJECT_ID,
        "https://us-south.ml.cloud.ibm.com",
        "ibm/granite-4-h-small",
        transport=httpx.MockTransport(handler),
    )


def test_iam_exchange_reuses_token_and_refreshes_on_unauthorized():
    calls = []

    def handler(request):
        if request.url.host == "iam.cloud.ibm.com":
            assert request.url.path == "/identity/token"
            assert parse_qs(request.content.decode()) == {
                "grant_type": ["urn:ibm:params:oauth:grant-type:apikey"],
                "apikey": ["test-key"],
            }
            calls.append("iam")
            return httpx.Response(200, json={
                "access_token": f"mock-token-{calls.count('iam')}",
                "expires_in": 3600,
            })

        assert request.url.path == "/ml/v1/text/chat"
        payload = json.loads(request.content)
        assert payload["project_id"] == PROJECT_ID
        assert payload["model_id"] == "ibm/granite-4-h-small"
        assert payload["response_format"] == {"type": "json_object"}
        calls.append(request.headers["Authorization"])
        if len(calls) == 3:
            return httpx.Response(401)
        return httpx.Response(200, json={
            "choices": [{"message": {"content": "{}"}, "finish_reason": "stop"}],
        })

    service = make_service(handler)
    assert service.generate_json("instructions", "context") == "{}"
    assert service.generate_json("instructions", "context") == "{}"
    assert calls == ["iam", "Bearer mock-token-1", "Bearer mock-token-1", "iam", "Bearer mock-token-2"]


@pytest.mark.parametrize(("failure", "status", "message"), [
    ("iam_rejected", 502, "IBM IAM rejected authentication (HTTP 400)."),
    ("iam_malformed", 502, "IBM watsonx.ai returned an invalid response."),
    ("inference_rejected", 502, "IBM watsonx.ai rejected inference (HTTP 403)."),
    ("model_truncated", 502, "IBM watsonx.ai returned an invalid response."),
    ("timeout", 504, "IBM watsonx.ai request timed out."),
])
def test_upstream_errors_report_safe_details(failure, status, message):
    def handler(request):
        if request.url.host == "iam.cloud.ibm.com":
            if failure == "iam_rejected":
                return httpx.Response(400, text="private response body")
            if failure == "iam_malformed":
                return httpx.Response(200, json={"access_token": "mock-token"})
            return httpx.Response(200, json={"access_token": "mock-token", "expires_in": 3600})
        if failure == "timeout":
            raise httpx.ReadTimeout("private response body", request=request)
        if failure == "model_truncated":
            return httpx.Response(200, json={
                "choices": [{"message": {"content": "{}"}, "finish_reason": "length"}],
            })
        return httpx.Response(403, text="private response body")

    with pytest.raises(WatsonxError) as error:
        make_service(handler).generate_json("instructions", "context")
    assert error.value.http_status == status
    assert str(error.value) == message


def test_missing_api_key_blocks_requests():
    def handler(request):
        pytest.fail("Missing credentials must prevent network calls")

    with pytest.raises(WatsonxError) as error:
        make_service(handler, key="").generate_json("instructions", "context")
    assert error.value.http_status == 503
