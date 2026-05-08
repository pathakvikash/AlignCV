# Project Overview

## Overview

This project is an AI-powered Resume Tailoring Automation System designed to help tech professionals optimize their resumes for specific job descriptions while remaining truthful, ATS-friendly, and recruiter-readable. The system analyzes a master resume and a job description, extracts important skills and requirements, semantically matches resume content against the job needs, rewrites selected sections for stronger alignment, and generates a tailored resume with explanations for every change. The application uses a modular monolith architecture with a hybrid deterministic + AI workflow, combining structured parsing, embeddings-based semantic matching, controlled LLM rewriting, and strict validation rules to prevent hallucinations and keyword stuffing. The system supports both local and cloud AI models and is designed as both a practical personal productivity tool and a strong AI engineering portfolio project.

---

# Goals

1. Automatically tailor resumes for specific tech job descriptions.
2. Improve ATS compatibility without keyword stuffing.
3. Preserve truthfulness and prevent hallucinated experience.
4. Generate explainable resume improvements instead of black-box edits.
5. Use semantic matching instead of exact keyword matching only.
6. Save time for repeated job applications.
7. Support both local and cloud AI model providers.
8. Maintain recruiter readability and concise writing quality.
9. Build a modular, maintainable, portfolio-grade AI system.
10. Create a reusable AI workflow architecture for future expansion.

---

# Core User Flow

1. User uploads a master resume in PDF or plain text format.
2. System parses the resume and converts it into structured JSON.
3. User pastes a job description into the application.
4. JD Analysis Engine extracts:
   - required skills
   - optional skills
   - responsibilities
   - tools/frameworks
   - seniority indicators
   - semantic keywords
5. Semantic Matching Engine compares the resume against the JD using:
   - keyword matching
   - embeddings similarity
   - contextual skill mapping
6. System identifies:
   - matching strengths
   - missing skills
   - weak bullet points
   - low-impact phrasing
7. Rewrite Engine generates optimized resume suggestions for:
   - summary
   - bullet points
   - keyword insertion
   - project emphasis
8. Validation Layer checks:
   - no hallucinated experience
   - ATS-safe formatting
   - readability quality
   - keyword stuffing
   - consistency
9. Explainability Engine generates reasoning for every modification.
10. User reviews original vs tailored changes in a diff-style interface.
11. User exports the tailored resume as Markdown or plain text.
12. System stores tailoring history and comparison metadata locally.

---

# Features

## Resume Parsing

- PDF resume parsing
- Plain text resume parsing
- Section detection
- Structured JSON normalization
- Skill extraction
- Experience extraction
- Project extraction

---

## JD Analysis

- Technical skill extraction
- Responsibility extraction
- Tool/framework detection
- Seniority detection
- Soft skill extraction
- Priority keyword identification

---

## Semantic Matching

- Keyword matching
- Embedding-based semantic similarity
- Skill relationship mapping
- Resume-to-JD alignment scoring
- Missing skill detection
- Section relevance analysis

---

## AI Resume Tailoring

- Summary rewriting
- Bullet point enhancement
- Controlled keyword insertion
- Project prioritization
- ATS-focused rewriting
- Impact-focused phrasing
- Optional cover letter generation

---

## Validation & Safety

- Hallucination prevention
- ATS-safe structure validation
- Readability checks
- Keyword stuffing prevention
- Rewrite consistency checks
- Constraint-based rewriting

---

## Explainability

- Original vs rewritten comparison
- Explanation for every rewrite
- Matched JD keyword references
- Missing skill explanations
- Readability improvement reasoning

---

## Versioning & Tracking

- Tailored resume history
- Resume comparison
- Rewrite logs
- Job application tracking
- Keyword coverage comparison

---

## AI Infrastructure

- Pluggable model provider architecture
- Local model support via Ollama
- Cloud model support
- Configurable AI providers
- Prompt versioning
- Structured logging and observability

---

# In Scope

## MVP Scope

- Resume upload and parsing
- Structured resume JSON generation
- JD text input
- JD analysis engine
- Semantic matching engine
- Keyword extraction
- Controlled AI rewriting
- Explainable suggestions
- ATS-safe validation
- Markdown export
- Local SQLite storage
- Local/cloud model switching
- Rewrite logging
- Resume comparison basics
- Minimal React frontend
- FastAPI backend
- Docker support

---

# Out of Scope

## Not Included in Initial Versions

- Multi-user authentication
- SaaS billing system
- Real-time collaboration
- Multi-tenant architecture
- Microservices architecture
- Distributed job queues
- Enterprise analytics
- Browser extension
- LinkedIn scraping
- Automatic job applications
- DOCX/PDF styled export engine
- Vector database infrastructure
- Recruiter simulation agents
- Autonomous AI agents
- Fine-tuned custom LLM training
- Real-time cloud synchronization

---

# Success Criteria

The project is considered successful when:

1. Resume parser correctly extracts structured data from at least 90% of common tech resumes.
2. System generates tailored resumes without hallucinating fake experience or skills.
3. Tailored resumes show measurable improvement in:
   - keyword alignment
   - semantic similarity
   - readability
   - impact wording
4. Every AI-generated rewrite includes explainable reasoning.
5. Validation layer successfully blocks unsupported claims and keyword stuffing.
6. Tailored resumes remain ATS-friendly and recruiter-readable.
7. System supports both local and cloud AI providers through a shared abstraction layer.
8. Application architecture remains modular and maintainable.
9. Users can review original vs rewritten content before export.
10. The project demonstrates strong AI engineering concepts suitable for portfolio and interview discussions.
