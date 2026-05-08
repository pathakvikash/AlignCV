# Code Standards

## General

- Keep modules small, focused, and single-purpose.
- Prefer explicitness over clever abstractions.
- Fix root causes instead of layering workarounds.
- Do not mix unrelated concerns in one component, route, or service.
- Keep deterministic systems separate from AI orchestration logic.
- Respect module ownership boundaries at all times.
- Use typed contracts between modules instead of direct internal access.
- Prefer composition over inheritance.
- Avoid hidden side effects and implicit mutations.
- Keep business logic framework-agnostic where possible.
- Make every important transformation observable and traceable.
- Write code assuming future extraction into independent modules is possible.
- Prioritize readability and maintainability over compactness.
- Avoid premature optimization and speculative abstractions.
- Every major system must be testable independently.
- All AI-generated outputs must remain explainable.
- Never bypass validation layers for convenience.
- Keep APIs and schemas backward-compatible unless intentionally versioned.

---

# Python Standards

## Core Rules

- Python 3.12+ is required.
- Use type hints throughout the entire backend codebase.
- Avoid dynamically shaped dictionaries when schemas exist.
- Prefer dataclasses or Pydantic models over raw dictionaries.
- Use explicit return types for public functions.
- Keep functions under approximately 50 lines where reasonable.
- Split large orchestration logic into pipeline stages.
- Avoid deeply nested conditionals.
- Prefer pure functions for transformation logic.
- Do not place business logic inside FastAPI routes.
- Never access the database directly from routes.
- Avoid global mutable state.
- Use dependency injection for providers and services.
- Use structured logging instead of print statements.
- Handle exceptions explicitly and predictably.
- Never silently swallow exceptions.
- Configuration must come from centralized config management.
- Never hardcode secrets, model names, or environment-specific paths.

---

# Type Safety & Validation

- Pydantic schemas are mandatory for external boundaries.
- Validate all external input before processing.
- Treat AI-generated content as untrusted input until validated.
- Never trust parsed PDF content without normalization.
- Validate request payloads before business logic execution.
- Use enums for constrained values whenever possible.
- Avoid `Any` unless absolutely necessary.
- Schema changes must remain backward-compatible whenever possible.

---

# FastAPI Standards

## API Design

- Keep routes thin and orchestration-focused only.
- Each route must have a single responsibility.
- Routes must delegate logic to services/modules.
- Return predictable response structures.
- Use explicit response schemas.
- Group endpoints by feature domain.
- Keep request validation near system boundaries.
- Avoid business logic inside dependency definitions.
- Avoid hidden side effects during request handling.

---

## Route Organization

```text
api/
├── resume/
├── jd/
├── matching/
├── tailoring/
├── validation/
└── exports/
```

Each route group owns one feature area only.

---

# AI Workflow Standards

## AI Integration Rules

- Deterministic systems must run before LLM systems.
- AI must never invent resume content.
- All rewrite outputs must remain traceable to source resume data.
- Every rewrite must include explainability metadata.
- AI prompts must remain modular and isolated.
- Do not create giant multi-purpose prompts.
- AI providers must be replaceable through provider abstractions.
- AI provider logic must remain isolated from business orchestration.
- Validation is mandatory for all AI-generated outputs.

---

## Prompt Standards

- Store prompts in dedicated prompt modules or files.
- Use small focused prompts instead of giant prompts.
- Keep prompts versionable.
- Do not hardcode prompts inside unrelated services.
- Prompt templates must remain readable and maintainable.
- Keep system prompts and user prompts separated.
- Log prompt execution metadata for observability.

---

# Semantic Matching Standards

- Use embeddings as enhancement signals, not sole truth systems.
- Combine semantic similarity with deterministic keyword analysis.
- Avoid pure keyword stuffing optimization.
- Semantic scoring must remain explainable.
- Keep matching calculations reproducible and testable.
- Cache embeddings only when measurable benefit exists.

---

# Styling Standards

## UI System Rules

- Use semantic design tokens only.
- Do not hardcode hex values inside components.
- Follow token definitions from `ui-context.md`.
- Use Tailwind utility classes consistently.
- Avoid arbitrary spacing values.
- Follow the defined border radius scale.
- Use consistent layout spacing based on the spacing system.
- Avoid excessive shadows and gradients.
- Preserve accessibility contrast requirements.
- Prefer reusable UI composition patterns.

---

## Component Rules

- Components must have one responsibility.
- Keep presentational and business logic separated.
- Avoid oversized components.
- Shared UI components belong in shared UI directories.
- Domain-specific UI belongs inside feature modules.
- Prefer controlled components over hidden internal state.
- Keep loading, error, and empty states explicit.

---

# React Standards

## Frontend Rules

- Use functional React components only.
- Prefer hooks over class components.
- Keep component state localized when possible.
- Avoid unnecessary global state.
- Use React Query for server state management.
- Use Context only for shared UI/application state.
- Keep data fetching outside presentational components.
- Avoid prop drilling across large component trees.
- Keep component trees shallow and modular.

---

# API Route Standards

- Validate input before business logic execution.
- Return structured error responses.
- Use consistent HTTP status codes.
- Avoid leaking internal exceptions to clients.
- Log meaningful request failures.
- Keep response structures stable.
- Avoid returning raw database entities directly.
- Separate DTOs from storage models.

---

# Database Standards

## Storage Rules

- SQLite is the source of structured persistence for MVP.
- Metadata belongs in the database.
- Raw uploaded files belong in filesystem storage.
- Large generated exports should remain file-based.
- Avoid storing massive raw blobs inside SQLite.
- Keep schema migrations explicit and reversible.
- Use timestamps consistently across entities.
- Avoid tightly coupling storage models to API responses.

---

## Database Access Rules

- Use repository/service patterns for persistence access.
- Do not embed raw SQL throughout business logic.
- Keep transaction boundaries explicit.
- Prevent cross-module storage leakage.
- Each module owns its persistence logic.

---

# File Organization

| Folder          | Responsibility                              |
| --------------- | ------------------------------------------- |
| api/            | FastAPI routes and request handling         |
| core/           | Shared config, constants, utilities         |
| schemas/        | Shared Pydantic contracts                   |
| parser/         | Resume parsing and normalization            |
| jd_analyzer/    | JD extraction and analysis                  |
| embeddings/     | Embedding generation and semantic utilities |
| matching/       | Resume-to-JD scoring logic                  |
| rewriting/      | AI rewrite orchestration                    |
| validation/     | ATS and hallucination validation            |
| explainability/ | Rewrite explanations and diff tracking      |
| providers/      | AI provider abstraction layer               |
| prompts/        | Prompt templates and prompt management      |
| storage/        | Database and persistence layer              |
| logging/        | Observability and structured logs           |
| tests/          | Unit, integration, and evaluation tests     |

---

# Testing Standards

## General Testing Rules

- Every major module must have tests.
- Critical business logic must have unit tests.
- AI workflows must include validation tests.
- Parser systems must include extraction accuracy tests.
- Matching systems must include semantic scoring tests.
- Validation systems must include hallucination prevention tests.
- Keep tests deterministic where possible.
- Avoid flaky tests dependent on external APIs.
- Mock external AI providers during testing.
- Maintain golden datasets for evaluation workflows.

---

# Logging & Observability Standards

- Use structured logs.
- Log important AI execution metadata.
- Track prompt latency and provider usage.
- Log validation failures clearly.
- Avoid logging sensitive resume content unnecessarily.
- Include correlation IDs for major workflows.
- Keep logs machine-readable.

---

# Documentation Standards

- Update documentation when architecture changes.
- Keep `context/` files synchronized with implementation.
- Update API documentation after route changes.
- Document schema changes explicitly.
- Record architectural decisions in progress tracking.
- Avoid stale documentation.

---

# Performance Standards

- Optimize only after correctness.
- Avoid premature async complexity.
- Prefer simple synchronous workflows in MVP.
- Measure before introducing caching layers.
- Keep memory usage predictable during PDF parsing.
- Avoid unnecessary embedding regeneration.

---

# Security & Privacy Standards

- Treat resume data as sensitive.
- Never expose local filesystem paths to clients.
- Avoid logging full resume contents.
- Sanitize uploaded filenames.
- Validate uploaded file types.
- Restrict dangerous file execution paths.
- Keep local-first privacy guarantees intact.

---

# Architectural Rules

## Mandatory Invariants

- Structured Resume JSON is the single source of truth.
- AI must never invent resume experience or skills.
- Validation layer cannot be bypassed.
- Prompts must remain isolated from business logic.
- Modules communicate only through contracts.
- Deterministic systems come before AI systems.
- ATS safety is more important than stylistic creativity.

---

# Final Engineering Principle

Prefer:

- clarity
- modularity
- explainability
- deterministic behavior
- maintainability

over:

- cleverness
- abstraction-heavy designs
- premature scalability
- AI overreliance
- hidden complexity

The codebase should remain understandable by a single engineer without requiring tribal knowledge.
