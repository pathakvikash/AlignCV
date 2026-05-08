from __future__ import annotations

import json
from datetime import datetime, timezone
from uuid import uuid4

from app.schemas.jd import JobDescriptionAnalysis, JobDescriptionResponse
from app.storage.database import get_connection


def create_job_description(raw_text: str, analysis: JobDescriptionAnalysis) -> JobDescriptionResponse:
    job_id = str(uuid4())
    created_at = datetime.now(timezone.utc).isoformat()
    analysis_json = json.dumps(analysis.model_dump())

    with get_connection() as connection:
        connection.execute(
            "INSERT INTO job_descriptions (id, raw_text, created_at, analysis_json) VALUES (?, ?, ?, ?)",
            (job_id, raw_text, created_at, analysis_json),
        )
        connection.commit()

    return JobDescriptionResponse(
        id=job_id,
        created_at=datetime.fromisoformat(created_at),
        status="saved",
        message="Job description saved successfully.",
        analysis=analysis,
    )


def get_job_description_record(job_id: str) -> tuple[str, JobDescriptionAnalysis] | None:
    with get_connection() as connection:
        row = connection.execute(
            "SELECT raw_text, analysis_json FROM job_descriptions WHERE id = ?",
            (job_id,),
        ).fetchone()
        if row is None:
            return None

        analysis = JobDescriptionAnalysis(**json.loads(row["analysis_json"]))
        return row["raw_text"], analysis


def get_job_description(job_id: str) -> JobDescriptionResponse | None:
    record = get_job_description_record(job_id)
    if record is None:
        return None

    _, analysis = record
    with get_connection() as connection:
        row = connection.execute(
            "SELECT id, created_at FROM job_descriptions WHERE id = ?",
            (job_id,),
        ).fetchone()
        if row is None:
            return None

    return JobDescriptionResponse(
        id=row["id"],
        created_at=datetime.fromisoformat(row["created_at"]),
        status="saved",
        message="Job description loaded successfully.",
        analysis=analysis,
    )
