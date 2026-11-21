from functools import lru_cache
from pathlib import Path
from threading import Lock
from time import monotonic

import httpx
from dotenv import dotenv_values

_DALLAS_URL = "https://us-south.ml.cloud.ibm.com"
_IAM_URL = "https://iam.cloud.ibm.com/identity/token"


class WatsonxError(Exception):
    def __init__(self, http_status: int, message: str):
        super().__init__(message)
        self.http_status = http_status


class WatsonxService:
    def __init__(self, api_key, project_id, url, model_id, *, transport=None):
        self._api_key = api_key
        self._project_id = project_id
        self._url = url
        self._model_id = model_id
        self._transport = transport
        self._token = ""
        self._refresh_at = 0.0
        self._lock = Lock()

    def _access_token(self, client, rejected_token=None):
        with self._lock:
            if monotonic() < self._refresh_at and self._token != rejected_token:
                return self._token

            response = client.post(
                _IAM_URL,
                data={
                    "grant_type": "urn:ibm:params:oauth:grant-type:apikey",
                    "apikey": self._api_key,
                },
                timeout=10.0,
            )
            if not response.is_success:
                raise WatsonxError(502, f"IBM IAM rejected authentication (HTTP {response.status_code}).")
            data = response.json()
            token = data["access_token"]
            expires_in = data["expires_in"]
            if not isinstance(token, str) or not token.strip() or type(expires_in) is not int or expires_in <= 0:
                raise ValueError("Invalid IAM response")
            self._token = token
            self._refresh_at = monotonic() + max(0, expires_in - 60)
            return token

    def generate_json(self, instructions: str, context: str) -> str:
        if not self._api_key or not self._project_id or self._url != _DALLAS_URL:
            raise WatsonxError(503, "Configure the IBM API key, project, and Dallas endpoint in backend/.env.")

        payload = {
            "project_id": self._project_id,
            "model_id": self._model_id,
            "messages": [
                {"role": "system", "content": instructions},
                {"role": "user", "content": context},
            ],
            "response_format": {"type": "json_object"},
            "temperature": 0,
            "max_completion_tokens": 2500,
        }
        try:
            with httpx.Client(timeout=httpx.Timeout(45.0, connect=10.0), transport=self._transport) as client:
                url = f"{self._url}/ml/v1/text/chat"
                token = self._access_token(client)
                for attempt in range(2):
                    response = client.post(
                        url,
                        params={"version": "2025-10-25"},
                        headers={"Authorization": f"Bearer {token}"},
                        json=payload,
                    )
                    if response.status_code != 401 or attempt:
                        break
                    token = self._access_token(client, rejected_token=token)

                if not response.is_success:
                    raise WatsonxError(502, f"IBM watsonx.ai rejected inference (HTTP {response.status_code}).")

                choice = response.json()["choices"][0]
                content = choice["message"]["content"]
                if choice.get("finish_reason") not in (None, "stop") or not isinstance(content, str) or not content.strip():
                    raise ValueError("Incomplete Granite response")
                return content
        except httpx.TimeoutException:
            raise WatsonxError(504, "IBM watsonx.ai request timed out.") from None
        except httpx.RequestError:
            raise WatsonxError(502, "Could not reach IBM watsonx.ai.") from None
        except (ValueError, KeyError, IndexError, TypeError, AttributeError):
            raise WatsonxError(502, "IBM watsonx.ai returned an invalid response.") from None


@lru_cache(maxsize=1)
def get_watsonx_service() -> WatsonxService:
    config = dotenv_values(Path(__file__).resolve().parents[2] / ".env", interpolate=False)
    model = (config.get("WATSONX_MODEL_ID") or "granite-4-h-small").strip()
    if model == "granite-4-h-small":
        model = "ibm/granite-4-h-small"
    return WatsonxService(
        (config.get("WATSONX_API_KEY") or "").strip(),
        (config.get("WATSONX_PROJECT_ID") or "18877ee5-cf51-4a43-88f4-6c4625c674ab").strip(),
        (config.get("WATSONX_URL") or _DALLAS_URL).strip().rstrip("/"),
        model,
    )
