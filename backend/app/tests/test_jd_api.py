from fastapi.testclient import TestClient

from main import app


def test_submit_job_description_endpoint() -> None:
    client = TestClient(app)
    response = client.post(
        "/api/jd",
        json={
            "text": "Senior backend engineer with experience in Python, AWS, Docker, and Kubernetes. Responsibilities include building scalable services.",
        },
    )

    assert response.status_code == 200
    payload = response.json()
    assert payload["status"] == "saved"
    assert payload["analysis"]["role"] is not None
    assert "skills" in payload["analysis"]
