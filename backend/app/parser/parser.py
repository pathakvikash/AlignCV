
from __future__ import annotations

import re
from pathlib import Path
from typing import Any

import fitz

from app.schemas.resume import ResumeParseResponse, ResumeSection

SECTION_ALIASES: dict[str, str] = {
    "summary": "Summary",
    "professional summary": "Summary",
    "profile": "Summary",
    "about me": "Summary",
    "experience": "Experience",
    "work experience": "Experience",
    "employment history": "Experience",
    "professional experience": "Experience",
    "education": "Education",
    "academic background": "Education",
    "skills": "Skills",
    "technical skills": "Skills",
    "tools": "Skills",
    "projects": "Projects",
    "certifications": "Certifications",
    "awards": "Awards",
    "languages": "Languages",
    "summary of qualifications": "Summary",
}

SECTION_HEADERS = sorted(SECTION_ALIASES.keys(), key=len, reverse=True)


def extract_text_from_pdf(path: Path) -> str:
    document = fitz.open(path)
    pages = [page.get_text() for page in document]
    document.close()
    text = "\n".join(pages)
    return normalize_text(text)


def normalize_text(text: str) -> str:
    text = text.replace("\xa0", " ")
    text = text.replace("\r", "\n")
    text = re.sub(r"[ \t]+", " ", text)
    text = re.sub(r"\n{2,}", "\n\n", text)
    return text.strip()


def detect_section_header(line: str) -> str | None:
    normalized = re.sub(r"[^a-z0-9 ]", " ", line.lower()).strip()
    for header in SECTION_HEADERS:
        if normalized == header or normalized.startswith(header + " ") or normalized.startswith(header + ":"):
            return SECTION_ALIASES[header]
    return None


def split_into_sections(text: str) -> list[ResumeSection]:
    lines = [line.strip() for line in text.splitlines() if line.strip()]
    sections: list[ResumeSection] = []
    current_title = "Header"
    current_lines: list[str] = []

    for line in lines:
        section_title = detect_section_header(line)
        if section_title and current_lines:
            sections.append(ResumeSection(title=current_title, content="\n".join(current_lines).strip()))
            current_title = section_title
            current_lines = []
            continue

        if section_title and not current_lines:
            current_title = section_title
            continue

        current_lines.append(line)

    if current_lines:
        sections.append(ResumeSection(title=current_title, content="\n".join(current_lines).strip()))

    if not sections:
        sections.append(ResumeSection(title="Resume", content=text))

    return sections


def parse_resume_file(path: Path) -> ResumeParseResponse:
    extracted_text = extract_text_from_pdf(path)
    sections = split_into_sections(extracted_text)
    return ResumeParseResponse(
        id=path.stem,
        filename=path.name,
        extracted_text=extracted_text,
        sections=sections,
    )
