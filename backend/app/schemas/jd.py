from __future__ import annotations

from datetime import datetime
from pydantic import BaseModel, Field
from typing import List, Optional


class JobDescriptionSubmissionRequest(BaseModel):
    text: str


class JobDescriptionAnalysis(BaseModel):
    role: Optional[str] = None
    seniority: Optional[str] = None
    skills: List[str] = Field(default_factory=list)
    tools: List[str] = Field(default_factory=list)
    responsibilities: List[str] = Field(default_factory=list)
    keywords: List[str] = Field(default_factory=list)


class JobDescriptionResponse(BaseModel):
    id: str
    created_at: datetime
    status: str
    message: str
    analysis: JobDescriptionAnalysis
