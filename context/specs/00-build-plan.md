# Build Units

The project should be implemented incrementally as a modular monolith. Each unit below produces one visible and testable result while respecting module boundaries and just-in-time dependency introduction.

The build order intentionally prioritizes:

- deterministic systems before AI systems
- backend foundations before UI complexity
- visible workflow progress early
- explainability and validation from the beginning

This phased modular approach aligns with modern modular monolith best practices emphasizing bounded modules, incremental growth, and explicit contracts. :contentReference[oaicite:0]{index=0}

---

# Unit 1 — Repository & Project Foundation

## What It Builds

Creates the initial project structure and development foundation.

Includes:

- frontend/backend setup
- context folder
- Docker setup
- config system
- linting/formatting
- environment management
- logging foundation
- base FastAPI app
- base React app
- Tailwind + shadcn setup

Visible Result:

- app boots successfully
- frontend and backend communicate
- clean development environment exists

## Dependencies

None.

---

# Unit 2 — Design System & Core Layout

## What It Builds

Creates the reusable UI foundation.

Includes:

- semantic color tokens
- typography system
- spacing system
- app shell
- navbar/header
- upload layout
- split-panel layout
- reusable UI primitives

Visible Result:

- professional dashboard UI exists
- dark/light themes work
- reusable design system established

## Dependencies

- Unit 1

---

# Unit 3 — Resume Upload & File Handling

## What It Builds

Implements resume upload and local file storage.

Includes:

- PDF upload API
- frontend upload flow
- file validation
- local filesystem storage
- upload status handling

Visible Result:

- user can upload resume PDFs successfully

## Dependencies

- Unit 1
- Unit 2

---

# Unit 4 — Resume Parser Engine

## What It Builds

Implements deterministic resume parsing and normalization.

Includes:

- PyMuPDF extraction
- fallback parsing
- section detection
- structured ResumeSchema
- JSON normalization
- parser tests

Visible Result:

- uploaded resume converts into structured JSON

## Dependencies

- Unit 3

---

# Unit 5 — Resume Viewer UI

## What It Builds

Displays parsed resume content in structured UI form.

Includes:

- parsed resume visualization
- section rendering
- JSON-to-UI mapping
- parser error states

Visible Result:

- user can inspect parsed resume data visually

## Dependencies

- Unit 4

---

# Unit 6 — JD Input & Storage

## What It Builds

Creates JD submission workflow.

Includes:

- JD text input UI
- JD storage
- validation
- submission API
- persistence layer

Visible Result:

- user can paste and save job descriptions

## Dependencies

- Unit 5

---

# Unit 7 — JD Analysis Engine

## What It Builds

Extracts structured information from job descriptions.

Includes:

- skill extraction
- tooling extraction
- role detection
- responsibility extraction
- keyword prioritization
- structured JD schema

Visible Result:

- JD analysis panel displays extracted requirements

## Dependencies

- Unit 6

---

# Unit 8 — Embedding & Semantic Infrastructure

## What It Builds

Introduces semantic similarity capabilities.

Includes:

- sentence-transformers setup
- embedding generation
- semantic similarity utilities
- embedding service abstraction

Visible Result:

- semantic similarity scores can be generated

## Dependencies

- Unit 7

---

# Unit 9 — Resume-to-JD Matching Engine

## What It Builds

Implements hybrid matching logic.

Includes:

- keyword matching
- semantic matching
- weighted scoring
- missing skill detection
- section relevance scoring

Visible Result:

- ATS-style scoring dashboard works

## Dependencies

- Unit 8

---

# Unit 10 — Match Analysis UI

## What It Builds

Displays analysis and matching insights visually.

Includes:

- ATS score cards
- missing skills panel
- keyword coverage UI
- semantic alignment visualization
- recruiter-style feedback

Visible Result:

- user sees detailed resume analysis dashboard

## Dependencies

- Unit 9

---

# Unit 11 — AI Provider Abstraction Layer

## What It Builds

Introduces pluggable LLM architecture.

Includes:

- provider interfaces
- OpenAI provider
- Ollama provider
- provider factory
- config-driven switching

Visible Result:

- backend can switch AI providers dynamically

## Dependencies

- Unit 9

---

# Unit 12 — Prompt Management System

## What It Builds

Creates modular prompt infrastructure.

Includes:

- prompt folders
- prompt loaders
- template rendering
- prompt version organization
- prompt logging

Visible Result:

- prompts become reusable and centrally managed

## Dependencies

- Unit 11

---

# Unit 13 — Rewrite Engine (Summary + Bullets)

## What It Builds

Implements controlled AI rewriting.

Includes:

- summary rewriting
- bullet optimization
- keyword-aware rewriting
- constraint-based prompts
- rewrite orchestration

Visible Result:

- system generates tailored resume suggestions

## Dependencies

- Unit 12

---

# Unit 14 — Validation Layer

## What It Builds

Adds safety and ATS validation.

Includes:

- hallucination detection
- ATS formatting checks
- keyword stuffing checks
- readability validation
- consistency validation

Visible Result:

- invalid rewrites are blocked or flagged

## Dependencies

- Unit 13

---

# Unit 15 — Explainability Engine

## What It Builds

Creates rewrite reasoning system.

Includes:

- rewrite explanations
- keyword traceability
- original vs rewritten mapping
- change metadata

Visible Result:

- user sees why each rewrite occurred

## Dependencies

- Unit 14

---

# Unit 16 — Resume Diff Viewer UI

## What It Builds

Creates side-by-side rewrite comparison experience.

Includes:

- original vs tailored comparison
- inline change highlighting
- explanation display
- semantic change visualization

Visible Result:

- user can visually inspect all modifications

## Dependencies

- Unit 15

---

# Unit 17 — Tailored Resume Export

## What It Builds

Implements export pipeline.

Includes:

- markdown export
- plain text export
- export formatting
- downloadable outputs

Visible Result:

- user can export tailored resume

## Dependencies

- Unit 16

---

# Unit 18 — Rewrite Logging & Observability

## What It Builds

Adds AI execution observability.

Includes:

- prompt logging
- latency tracking
- provider logging
- rewrite history
- structured observability

Visible Result:

- AI execution history becomes traceable

## Dependencies

- Unit 17

---

# Unit 19 — Resume Versioning & Comparison

## What It Builds

Adds historical tracking.

Includes:

- tailored version history
- comparison metadata
- keyword coverage diff
- version timeline

Visible Result:

- user can compare old vs new resume versions

## Dependencies

- Unit 18

---

# Unit 20 — Applied Jobs Tracker

## What It Builds

Adds lightweight application tracking.

Includes:

- applied jobs storage
- linked tailored resume tracking
- status tracking
- timestamps

Visible Result:

- user can track applications and resume versions

## Dependencies

- Unit 19

---

# Unit 21 — Cover Letter Generation

## What It Builds

Adds optional AI-generated cover letters.

Includes:

- cover letter prompts
- role-aware generation
- ATS-safe structure
- export support

Visible Result:

- system generates role-specific cover letters

## Dependencies

- Unit 15

---

# Unit 22 — Testing & Evaluation Framework

## What It Builds

Introduces formal evaluation infrastructure.

Includes:

- parser benchmark tests
- rewrite quality tests
- semantic scoring tests
- hallucination tests
- golden datasets

Visible Result:

- measurable quality evaluation pipeline exists

## Dependencies

- Units 4–21

---

# Unit 23 — Dockerization & Local Deployment

## What It Builds

Creates production-ready local deployment setup.

Includes:

- Dockerfiles
- docker-compose
- environment configs
- local deployment workflow

Visible Result:

- project runs fully via Docker

## Dependencies

- Units 1–22

---

# Unit 24 — Final UX Polish & Production Hardening

## What It Builds

Final stabilization and portfolio-quality polish.

Includes:

- loading states
- error handling
- empty states
- performance improvements
- accessibility improvements
- responsive UI polish
- final cleanup

Visible Result:

- polished portfolio-grade application

## Dependencies

- Units 1–23

---

# Recommended Development Philosophy

The system should evolve in this order:

```text
Foundation
→ Parsing
→ Analysis
→ Semantic Matching
→ AI Rewriting
→ Validation
→ Explainability
→ Export
→ Observability
→ Polish
```
