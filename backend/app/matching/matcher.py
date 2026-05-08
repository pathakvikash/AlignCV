from __future__ import annotations

from typing import Iterable

from app.embeddings.service import cosine_similarity, embed_texts
from app.jd_analyzer.jd_analyzer import normalize_text
from app.schemas.jd import JobDescriptionAnalysis
from app.schemas.match import MatchResult, SectionMatch
from app.schemas.resume import ResumeParseResponse


def find_matches(text: str, patterns: Iterable[str]) -> list[str]:
    normalized = normalize_text(text).lower()
    matches: list[str] = []
    for pattern in patterns:
        if pattern.lower() in normalized:
            matches.append(pattern)
    return sorted(set(matches), key=str.lower)


def get_missing_skills(resume_text: str, skills: Iterable[str]) -> list[str]:
    normalized = normalize_text(resume_text).lower()
    return [skill for skill in skills if skill.lower() not in normalized]


def compute_section_scores(jd_text: str, sections: list[tuple[str, str]]) -> list[SectionMatch]:
    texts = [jd_text] + [content for _, content in sections if content]
    if len(texts) < 2:
        return []

    embeddings = embed_texts(texts)
    jd_embedding = embeddings[0]
    section_embeddings = embeddings[1:]
    section_matches: list[SectionMatch] = []

    for (title, _), embedding in zip(sections, section_embeddings):
        similarity = cosine_similarity(jd_embedding, embedding)
        section_matches.append(
            SectionMatch(title=title, similarity=round(similarity * 100.0, 2))
        )
    return section_matches


def compute_match_result(
    resume: ResumeParseResponse,
    jd_text: str,
    jd_analysis: JobDescriptionAnalysis,
) -> MatchResult:
    resume_text = resume.extracted_text
    keyword_sources = jd_analysis.skills + jd_analysis.tools + jd_analysis.keywords
    matched_keywords = find_matches(resume_text, keyword_sources)
    total_keywords = len(set(keyword_sources))
    keyword_score = (len(matched_keywords) / total_keywords) if total_keywords else 0.0

    missing_skills = get_missing_skills(resume_text, jd_analysis.skills)
    matched_skills = [skill for skill in jd_analysis.skills if skill.lower() in normalize_text(resume_text).lower()]

    sections = [(section.title, section.content) for section in resume.sections if section.content]
    section_scores = compute_section_scores(jd_text, sections)
    semantic_score = 0.0
    if section_scores:
        semantic_score = sum(score.similarity for score in section_scores) / len(section_scores) / 100.0

    overall_score = round(((keyword_score * 0.45) + (semantic_score * 0.55)) * 100.0, 2)

    return MatchResult(
        overall_score=overall_score,
        keyword_score=round(keyword_score * 100.0, 2),
        semantic_score=round(semantic_score * 100.0, 2),
        keyword_coverage=round(keyword_score * 100.0, 2),
        missing_skills=missing_skills,
        matched_skills=matched_skills,
        section_scores=section_scores,
        jd_role=jd_analysis.role,
        jd_seniority=jd_analysis.seniority,
    )
