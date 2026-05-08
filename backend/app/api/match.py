from pathlib import Path

from fastapi import APIRouter, Body, HTTPException
from pydantic import BaseModel

from app.core.config import settings
from app.core.logging import logger
from app.matching.matcher import compute_match_result
from app.schemas.match import MatchResult
from app.schemas.resume import ResumeUploadError
from app.storage.jd_storage import get_job_description_record
from app.parser.parser import parse_resume_file

router = APIRouter()


class MatchRequest(BaseModel):
    resume_id: str
    job_id: str


@router.post("", response_model=MatchResult, tags=["match"])
def match_resume_to_job(request: MatchRequest = Body(...)) -> MatchResult:
    resume_path = Path(settings.local_storage_path) / "resumes" / f"{request.resume_id}.pdf"
    if not resume_path.exists():
        logger.warning("resume_not_found_for_match", resume_id=request.resume_id)
        raise HTTPException(
            status_code=404,
            detail=ResumeUploadError(
                error="resume_not_found",
                message="Resume not found for matching."
            ).model_dump(),
        )

    job_record = get_job_description_record(request.job_id)
    if job_record is None:
        logger.warning("job_description_not_found_for_match", job_id=request.job_id)
        raise HTTPException(
            status_code=404,
            detail=ResumeUploadError(
                error="job_description_not_found",
                message="Job description not found for matching."
            ).model_dump(),
        )

    raw_jd_text, jd_analysis = job_record

    try:
        parsed_resume = parse_resume_file(resume_path)
        match_result = compute_match_result(parsed_resume, raw_jd_text, jd_analysis)
        logger.info("match_computed", resume_id=request.resume_id, job_id=request.job_id)
        return match_result
    except Exception as exc:
        logger.error("match_compute_failed", error=str(exc), resume_id=request.resume_id, job_id=request.job_id)
        raise HTTPException(
            status_code=500,
            detail=ResumeUploadError(
                error="match_failed",
                message="Failed to compute resume match."
            ).model_dump(),
        )
