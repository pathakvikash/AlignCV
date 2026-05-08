import pytest
from fastapi.testclient import TestClient
from pathlib import Path

from main import app


def test_resume_upload_valid_pdf() -> None:
    """Test successful upload of a valid PDF file."""
    client = TestClient(app)

    # Create a mock PDF file content (minimal PDF)
    pdf_content = b"%PDF-1.4\n1 0 obj\n<<\n/Type /Catalog\n/Pages 2 0 R\n>>\nendobj\n2 0 obj\n<<\n/Type /Pages\n/Kids [3 0 R]\n/Count 1\n>>\nendobj\n3 0 obj\n<<\n/Type /Page\n/Parent 2 0 R\n/MediaBox [0 0 612 792]\n/Contents 4 0 R\n>>\nendobj\n4 0 obj\n<<\n/Length 44\n>>\nstream\nBT\n/F1 12 Tf\n100 700 Td\n(Hello World) Tj\nET\nendstream\nendobj\nxref\n0 5\n0000000000 65535 f \n0000000009 00000 n \n0000000058 00000 n \n0000000115 00000 n \n0000000200 00000 n \ntrailer\n<<\n/Size 5\n/Root 1 0 R\n>>\nstartxref\n284\n%%EOF"

    response = client.post(
        "/api/resume/upload",
        files={"file": ("test_resume.pdf", pdf_content, "application/pdf")}
    )

    assert response.status_code == 200
    data = response.json()
    assert "id" in data
    assert data["filename"] == "test_resume.pdf"
    assert data["status"] == "uploaded"
    assert data["message"] == "Resume uploaded successfully"
    assert isinstance(data["size"], int)
    assert data["size"] > 0

    # Verify file was saved
    storage_path = Path("./storage/resumes") / f"{data['id']}.pdf"
    assert storage_path.exists()


def test_resume_upload_invalid_file_type() -> None:
    """Test upload rejection of non-PDF files."""
    client = TestClient(app)

    response = client.post(
        "/api/resume/upload",
        files={"file": ("test.txt", b"not a pdf", "text/plain")}
    )

    assert response.status_code == 400
    data = response.json()
    assert data["detail"]["error"] == "invalid_file_type"
    assert "Only PDF files are allowed" in data["detail"]["message"]


def test_resume_upload_file_too_large() -> None:
    """Test upload rejection of files exceeding size limit."""
    client = TestClient(app)

    # Create a file larger than 10MB
    large_content = b"x" * (11 * 1024 * 1024)  # 11MB

    response = client.post(
        "/api/resume/upload",
        files={"file": ("large.pdf", large_content, "application/pdf")}
    )

    assert response.status_code == 400
    data = response.json()
    assert data["detail"]["error"] == "file_too_large"
    assert "must be less than 10MB" in data["detail"]["message"]


def test_resume_upload_no_file() -> None:
    """Test upload with no file provided."""
    client = TestClient(app)

    response = client.post("/api/resume/upload")

    assert response.status_code == 422  # Validation error


def test_resume_upload_empty_filename() -> None:
    """Test upload with empty filename."""
    client = TestClient(app)

    pdf_content = b"%PDF-1.4\n%%EOF"

    response = client.post(
        "/api/resume/upload",
        files={"file": ("", pdf_content, "application/pdf")}
    )

    assert response.status_code == 400
    data = response.json()
    assert data["detail"]["error"] == "invalid_file_type"