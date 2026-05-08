from __future__ import annotations

from pydantic import BaseModel
from typing import List, Optional


class SectionMatch(BaseModel):
    title: str
    similarity: float


class MatchResult(BaseModel):
    overall_score: float
    keyword_score: float
    semantic_score: float
    keyword_coverage: float
    missing_skills: List[str]
    matched_skills: List[str]
    section_scores: List[SectionMatch]
    jd_role: Optional[str] = None
    jd_seniority: Optional[str] = None
