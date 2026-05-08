from fastapi import APIRouter, Body, HTTPException

from app.jd_analyzer.jd_analyzer import analyze_job_description
from app.schemas.jd import JobDescriptionResponse, JobDescriptionSubmissionRequest
from app.schemas.resume import ResumeUploadError
from app.storage.jd_storage import create_job_description, get_job_description

router = APIRouter()


@router.post("", response_model=JobDescriptionResponse, tags=["jd"])
def submit_job_description(request: JobDescriptionSubmissionRequest = Body(...)) -> JobDescriptionResponse:
    if not request.text.strip():
        raise HTTPException(
            status_code=400,
            detail=ResumeUploadError(
                error="empty_job_description",
                message="Job description text cannot be empty."
            ).model_dump(),
        )

    analysis = analyze_job_description(request.text)
    return create_job_description(request.text, analysis)


@router.get("/{job_id}", response_model=JobDescriptionResponse, tags=["jd"])
def get_job_description_by_id(job_id: str) -> JobDescriptionResponse:
    record = get_job_description(job_id)
    if record is None:
        raise HTTPException(
            status_code=404,
            detail=ResumeUploadError(
                error="job_description_not_found",
                message="Job description not found."
            ).model_dump(),
        )
    return record
