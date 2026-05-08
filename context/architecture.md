# Architecture

## Architecture Style

The application follows a modular monolith architecture with a hybrid deterministic + AI workflow. The system is intentionally designed as a single deployable backend application with clearly separated modules and strict ownership boundaries. AI capabilities are layered on top of deterministic parsing, validation, and semantic matching logic rather than replacing them.

The architecture prioritizes:

- explainability
- ATS-safe resume generation
- modularity
- maintainability
- local-first execution
- controlled AI rewriting
- semantic resume understanding

---

# High-Level System Flow

```text
Resume Upload
    ↓
Resume Parser
    ↓
Structured Resume JSON
    ↓
JD Analysis Engine
    ↓
Semantic Matching Engine
    ↓
AI Rewrite Engine
    ↓
Validation Layer
    ↓
Explainability Engine
    ↓
Tailored Resume Output
```

---

# Technology Stack

| Layer              | Technology                   | Role                                    |
| ------------------ | ---------------------------- | --------------------------------------- |
| Frontend           | React                        | Main web application UI                 |
| UI Styling         | Tailwind CSS                 | Utility-first styling system            |
| UI Components      | shadcn/ui                    | Reusable modern UI components           |
| Frontend State     | React Query / Context API    | API state and local state management    |
| Backend Framework  | FastAPI                      | API server and orchestration layer      |
| Language           | Python                       | Backend implementation and AI ecosystem |
| Data Validation    | Pydantic                     | Structured schemas and validation       |
| PDF Parsing        | PyMuPDF                      | Primary PDF text extraction             |
| PDF Parsing Backup | pdfplumber                   | Secondary extraction fallback           |
| NLP Processing     | spaCy                        | Rule-based extraction and NLP utilities |
| Semantic Matching  | sentence-transformers        | Embedding generation                    |
| Embedding Models   | BGE-small / all-MiniLM-L6-v2 | Semantic similarity embeddings          |
| Cloud LLM Provider | OpenAI / Claude              | High-quality rewriting and reasoning    |
| Local LLM Provider | Ollama                       | Offline/local AI execution              |
| Database           | SQLite                       | Local structured persistence            |
| Config System      | YAML                         | Runtime configuration                   |
| Logging            | Python logging               | Structured observability                |
| Containerization   | Docker                       | Local and portable deployment           |

---

# Backend Module Boundaries

The backend is organized as a modular monolith. Each module owns a clearly defined responsibility and communicates through explicit schemas and service contracts.

---

# Folder Ownership

```text
backend/
│
├── api/
├── core/
├── schemas/
├── parser/
├── jd_analyzer/
├── embeddings/
├── matching/
├── rewriting/
├── validation/
├── explainability/
├── providers/
├── prompts/
├── storage/
├── logging/
└── tests/
```

---

## Module Responsibilities

| Folder          | Responsibility                                         |
| --------------- | ------------------------------------------------------ |
| api/            | FastAPI routes, request handling, response formatting  |
| core/           | Shared configuration, constants, environment setup     |
| schemas/        | Pydantic schemas and shared data contracts             |
| parser/         | Resume parsing and normalization into structured JSON  |
| jd_analyzer/    | Job description analysis and structured extraction     |
| embeddings/     | Embedding generation and semantic similarity utilities |
| matching/       | Resume-to-JD scoring and alignment logic               |
| rewriting/      | Controlled AI rewriting orchestration                  |
| validation/     | Hallucination prevention and ATS validation            |
| explainability/ | Rewrite explanations and change tracking               |
| providers/      | Model provider abstraction for OpenAI/Ollama/etc       |
| prompts/        | Prompt templates and prompt management                 |
| storage/        | SQLite access and persistence layer                    |
| logging/        | Structured logging and observability                   |
| tests/          | Unit, integration, and evaluation tests                |

---

# Storage Model

The system uses a hybrid storage strategy optimized for local-first execution.

---

# Database Storage (SQLite)

Structured and queryable application data is stored in SQLite.

## Stored in Database

| Entity                     | Purpose                                    |
| -------------------------- | ------------------------------------------ |
| Parsed resume JSON         | Canonical structured resume representation |
| Job descriptions           | Raw JD text and parsed analysis            |
| Tailored resumes           | Generated tailored outputs                 |
| Rewrite logs               | Original vs rewritten content              |
| Match metrics              | Keyword and semantic analysis results      |
| Prompt logs                | AI observability and debugging             |
| Resume comparison metadata | Version tracking                           |
| Export history             | Generated output tracking                  |

---

# File Storage

Raw uploaded files are stored on the local filesystem.

## Stored as Files

| File Type                  | Purpose                        |
| -------------------------- | ------------------------------ |
| Original PDFs              | Source resumes                 |
| Generated exports          | Markdown/text exports          |
| Logs                       | Application logs               |
| Temporary processing files | Intermediate parsing artifacts |

---

# Cache Strategy

The MVP intentionally avoids distributed cache infrastructure.

## Cache Usage

| Cache Type           | Strategy                        |
| -------------------- | ------------------------------- |
| Embeddings           | Generated in-memory per request |
| Semantic comparisons | Temporary request-level cache   |
| Prompt templates     | Loaded at startup               |
| Model clients        | Singleton provider instances    |

No Redis or external cache is used in the initial architecture.

---

# Authentication & Access Model

## MVP Authentication Model

The MVP is intentionally single-user and local-first.

### Characteristics

- No user authentication
- No multi-tenant support
- No account system
- No RBAC
- Local machine ownership model

The application assumes the local machine owner controls all uploaded resumes and generated outputs.

---

# Future Authentication Expansion

Future versions may support:

- JWT authentication
- OAuth login
- Multi-user ownership
- Workspace isolation
- Cloud sync

These features are intentionally excluded from the MVP architecture.

---

# AI System Architecture

The AI layer is designed as a constrained orchestration system rather than a single prompt pipeline.

---

# AI Workflow Design

```text
Deterministic Parsing
        ↓
Structured Resume Schema
        ↓
JD Extraction
        ↓
Semantic Matching
        ↓
Controlled AI Rewrite
        ↓
Validation Layer
        ↓
Explainable Output
```

---

# AI Model Provider Architecture

The system supports pluggable providers through a shared abstraction layer.

## Supported Providers

| Provider | Purpose                       |
| -------- | ----------------------------- |
| OpenAI   | Cloud rewriting and reasoning |
| Claude   | Alternative cloud reasoning   |
| Ollama   | Local offline execution       |

---

# Provider Abstraction Goals

- swap providers without business logic changes
- support local/cloud execution
- configurable runtime model selection
- centralized retry/error handling

---

# Prompt Architecture

Prompts are modular and separated by responsibility.

```text
prompts/
│
├── jd_analysis/
├── rewrite/
├── validation/
├── explanation/
└── cover_letter/
```

Prompts may exist as:

- external template files
- versioned prompt definitions
- small inline utility prompts

The system avoids giant multi-purpose prompts.

---

# Background Task Model

The MVP uses synchronous request processing.

## Current Strategy

- API request triggers full pipeline
- no async queues
- no Celery
- no distributed workers

This keeps the initial architecture simple and portable.

---

# Future Background Processing

Future versions may introduce:

- Celery
- Redis queues
- async rewrite pipelines
- batch resume optimization

These are intentionally excluded from MVP scope.

---

# System Invariants

These are non-negotiable architectural rules that the codebase must never violate.

---

## Invariant 1 — Structured Resume JSON Is The Single Source Of Truth

All modules must operate on normalized structured resume schemas.

Raw PDFs or raw text must never be directly modified by AI systems.

---

## Invariant 2 — AI Must Never Invent Experience

The rewrite engine must never:

- fabricate companies
- fabricate skills
- fabricate achievements
- fabricate years of experience
- fabricate metrics

All generated content must be traceable to existing resume information.

---

## Invariant 3 — Every AI Rewrite Must Be Explainable

Every rewritten bullet or summary must include:

- original text
- rewritten text
- rewrite reasoning
- matched JD keywords

Black-box rewriting is forbidden.

---

## Invariant 4 — Validation Layer Is Mandatory

All AI-generated outputs must pass through:

- hallucination validation
- ATS formatting validation
- readability validation
- consistency validation

No AI output bypasses validation.

---

## Invariant 5 — Deterministic Systems Come Before AI Systems

The system must prefer:

- parsing
- rules
- schemas
- embeddings
- deterministic extraction

before using LLM reasoning.

LLMs are enhancement layers, not the primary truth engine.

---

## Invariant 6 — Modules Communicate Only Through Explicit Contracts

Modules may only communicate using:

- schemas
- DTOs
- service interfaces

Direct cross-module state mutation is forbidden.

---

## Invariant 7 — Prompt Logic Must Stay Isolated

Prompt templates and provider logic must remain separated from:

- API routes
- storage logic
- business orchestration

Prompt sprawl inside application code is forbidden.

---

## Invariant 8 — ATS Safety Has Higher Priority Than Creativity

Resume output must remain:

- machine-readable
- recruiter-readable
- concise
- structurally safe

The system must avoid stylistic choices that reduce ATS compatibility.

---

# Scalability Direction

The architecture is intentionally designed to evolve incrementally.

Future scalability options include:

- PostgreSQL migration
- vector database integration
- async processing
- multi-user accounts
- cloud deployment
- AI evaluation pipelines
- recruiter analytics
- agent-based workflows

The MVP architecture should support these expansions without major rewrites.
