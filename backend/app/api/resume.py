import uuid
from pathlib import Path
from typing import Annotated

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.core.config import settings
from app.core.logging import logger
from app.schemas.resume import ResumeUploadError, ResumeUploadResponse

router = APIRouter()


@router.post("/upload", response_model=ResumeUploadResponse)
async def upload_resume(file: Annotated[UploadFile, File()]) -> ResumeUploadResponse:
    """
    Upload a resume PDF file.

    Validates the file type, size, and stores it locally.
    """
    # Validate file type
    if not file.filename or not file.filename.lower().endswith(".pdf"):
        logger.warning("invalid_file_type", filename=file.filename)
        raise HTTPException(
            status_code=400,
            detail=ResumeUploadError(
                error="invalid_file_type",
                message="Only PDF files are allowed"
            ).model_dump()
        )

    # Validate file size (max 10MB)
    max_size = 10 * 1024 * 1024  # 10MB
    file_content = await file.read()
    if len(file_content) > max_size:
        logger.warning("file_too_large", filename=file.filename, size=len(file_content))
        raise HTTPException(
            status_code=400,
            detail=ResumeUploadError(
                error="file_too_large",
                message="File size must be less than 10MB"
            ).model_dump()
        )

    # Generate unique ID and filename
    resume_id = str(uuid.uuid4())
    filename = f"{resume_id}.pdf"

    # Ensure storage directory exists
    storage_dir = Path(settings.local_storage_path) / "resumes"
    storage_dir.mkdir(parents=True, exist_ok=True)

    # Save file
    file_path = storage_dir / filename
    try:
        with open(file_path, "wb") as f:
            f.write(file_content)
        logger.info("resume_uploaded", id=resume_id, filename=file.filename, size=len(file_content))
    except Exception as e:
        logger.error("file_save_failed", error=str(e), id=resume_id)
        raise HTTPException(
            status_code=500,
            detail=ResumeUploadError(
                error="save_failed",
                message="Failed to save file"
            ).model_dump()
        )

    return ResumeUploadResponse(
        id=resume_id,
        filename=file.filename,
        size=len(file_content),
        status="uploaded",
        message="Resume uploaded successfully"
    )
