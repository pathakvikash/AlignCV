from __future__ import annotations

import re
from typing import Iterable

from app.schemas.jd import JobDescriptionAnalysis

ROLE_PATTERNS = [
    "software engineer",
    "backend engineer",
    "frontend engineer",
    "full stack engineer",
    "data engineer",
    "data scientist",
    "devops engineer",
    "site reliability engineer",
    "engineering manager",
    "product manager",
    "project manager",
    "QA engineer",
    "quality engineer",
    "security engineer",
    "architect",
]

SENIORITY_PATTERNS = [
    "senior",
    "lead",
    "principal",
    "staff",
    "junior",
    "associate",
    "director",
    "manager",
]

SKILL_PATTERNS = [
    "python",
    "typescript",
    "react",
    "node.js",
    "node",
    "java",
    "go",
    "rust",
    "sql",
    "postgresql",
    "mysql",
    "docker",
    "kubernetes",
    "aws",
    "azure",
    "gcp",
    "graphql",
    "rest",
    "api",
    "microservices",
    "ci/cd",
    "terraform",
    "ansible",
    "spark",
    "pandas",
    "numpy",
    "jira",
    "git",
]

TOOL_PATTERNS = [
    "aws",
    "azure",
    "gcp",
    "docker",
    "kubernetes",
    "terraform",
    "jenkins",
    "circleci",
    "github actions",
    "gitlab",
    "jira",
    "confluence",
    "datadog",
    "new relic",
    "splunk",
    "prometheus",
    "grafana",
]

RESPONSIBILITY_HEADERS = [
    "responsibilities",
    "what you will do",
    "what you will be doing",
    "what you will work on",
]

KEYWORD_CANDIDATES = [
    "scalable",
    "performance",
    "security",
    "automation",
    "cloud",
    "distributed",
    "infrastructure",
    "modernization",
    "collaboration",
    "communication",
    "leadership",
    "agile",
    "devops",
    "continuous delivery",
    "machine learning",
]


def normalize_text(text: str) -> str:
    return re.sub(r"[\r\t]+", "\n", text).strip()


def find_matches(text: str, patterns: Iterable[str]) -> list[str]:
    normalized = text.lower()
    found: list[str] = []
    for pattern in patterns:
        if pattern in normalized:
            found.append(pattern)
    return sorted(set(found), key=str.lower)


def extract_role(text: str) -> str | None:
    normalized = text.lower()
    seniority = extract_seniority(text)
    for role in ROLE_PATTERNS:
        if role in normalized:
            role_label = role.title()
            if seniority and seniority.lower() not in role_label.lower():
                return f"{seniority.title()} {role_label}"
            return role_label
    return None


def extract_seniority(text: str) -> str | None:
    normalized = text.lower()
    for seniority in SENIORITY_PATTERNS:
        if re.search(rf"\b{re.escape(seniority)}\b", normalized):
            return seniority.title()
    return None


def extract_bullet_items(text: str) -> list[str]:
    lines = [line.strip() for line in normalize_text(text).splitlines() if line.strip()]
    bullets: list[str] = []
    for line in lines:
        if re.match(r"^[-*+]\s+", line) or re.match(r"^\d+\.\s+", line):
            bullets.append(re.sub(r"^([-*+]|\d+\.)\s+", "", line).strip())
    return bullets


def extract_responsibilities(text: str) -> list[str]:
    normalized = normalize_text(text).lower()
    lines = [line.strip() for line in normalized.splitlines() if line.strip()]
    responsibilities: list[str] = []
    capture = False

    for line in lines:
        header = re.sub(r"[^a-z0-9 ]", " ", line)
        if any(key in header for key in RESPONSIBILITY_HEADERS):
            capture = True
            continue

        if capture:
            if re.match(r"^[-*+\d]", line):
                responsibilities.append(re.sub(r"^([-*+]|\d+\.)\s+", "", line).strip())
                continue
            if line and not re.match(r"^[a-z ]+$", line):
                responsibilities.append(line)
            if not line:
                break

    if not responsibilities:
        responsibilities = extract_bullet_items(text)
    return responsibilities[:8]


def extract_keywords(text: str) -> list[str]:
    candidates = find_matches(text, KEYWORD_CANDIDATES)
    return candidates[:10]


def analyze_job_description(text: str) -> JobDescriptionAnalysis:
    normalized = normalize_text(text)
    skills = find_matches(normalized, SKILL_PATTERNS)
    tools = find_matches(normalized, TOOL_PATTERNS)
    responsibilities = extract_responsibilities(normalized)
    keywords = extract_keywords(normalized)

    return JobDescriptionAnalysis(
        role=extract_role(normalized),
        seniority=extract_seniority(normalized),
        skills=skills,
        tools=tools,
        responsibilities=responsibilities,
        keywords=keywords,
    )
