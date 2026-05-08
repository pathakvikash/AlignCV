# AI Workflow Rules

## Purpose

This document defines mandatory operating rules for any AI coding agent working on this project. These are not suggestions. These are enforced implementation rules intended to maintain architectural consistency, prevent uncontrolled complexity, and ensure the system remains modular, explainable, and production-quality.

The AI agent must follow all rules in this file during planning, implementation, refactoring, testing, and documentation updates.

---

# 1. Development Approach

## Rule 1.1 — Follow Spec-Driven Development

Do not invent architecture during implementation.

Before writing code:

1. Read all files in the `context/` directory.
2. Identify the exact feature or unit being implemented.
3. Confirm ownership boundaries.
4. Confirm expected inputs and outputs.
5. Confirm existing schemas and contracts.

Implementation must follow documented architecture and system invariants.

---

## Rule 1.2 — Build Incrementally

Implement one unit at a time.

Do not:

- partially build multiple systems
- scaffold future features unnecessarily
- create speculative abstractions
- build infrastructure for hypothetical future needs

Every implementation step must produce a usable, testable improvement.

---

## Rule 1.3 — Prefer Simple Deterministic Systems First

Prefer:

- explicit schemas
- rules
- typed contracts
- deterministic parsing
- modular services

before introducing:

- AI orchestration
- complex abstractions
- automation layers
- asynchronous infrastructure

LLMs are enhancement layers, not primary truth systems.

---

# 2. Scoping Rules

## Rule 2.1 — Never Expand Scope Implicitly

Only implement the requested unit.

Do not:

- add unrelated features
- refactor unrelated modules
- optimize prematurely
- create new architectural layers without approval

Example:

If asked to build:

```text
resume parser
```

Do not also build:

- embedding pipelines
- async workers
- UI dashboards
- analytics systems

---

## Rule 2.2 — Respect Module Ownership

Each folder owns a specific responsibility.

Do not place logic in incorrect modules.

Examples:

| Module      | Allowed Responsibility              |
| ----------- | ----------------------------------- |
| parser/     | Resume extraction and normalization |
| matching/   | Similarity scoring and alignment    |
| rewriting/  | AI rewrite orchestration            |
| validation/ | ATS and hallucination checks        |
| providers/  | Model provider abstraction          |

Business logic leakage across modules is forbidden.

---

## Rule 2.3 — Avoid Premature Generalization

Do not create:

- plugin systems
- abstract factories
- generic frameworks
- multi-provider orchestration
- distributed infrastructure

unless required by the current implementation phase.

Abstractions must solve an existing problem, not a hypothetical future problem.

---

# 3. Work Splitting Rules

## Rule 3.1 — Split Large Features Into Explicit Subsystems

If a feature exceeds:

- 300–500 lines of logic
- multiple responsibilities
- multiple execution stages

split it into smaller units.

Example:

Do not implement:

```text
TailorResumeService
```

as one giant service.

Instead split into:

- JD extraction
- semantic matching
- rewrite generation
- validation
- explanation generation

---

## Rule 3.2 — Build Pipelines As Stages

Multi-step workflows must be implemented as explicit stages.

Example:

```text
parse → analyze → match → rewrite → validate → explain
```

Do not hide pipeline stages inside giant functions.

---

## Rule 3.3 — Validate Before Continuing

Complete and verify one stage before starting the next stage.

Do not stack unfinished systems.

---

# 4. Requirement Handling Rules

## Rule 4.1 — Do Not Guess Missing Requirements

If requirements are:

- ambiguous
- contradictory
- underspecified

stop implementation and request clarification.

Do not invent behavior silently.

---

## Rule 4.2 — Prefer Explicit Contracts

When uncertain:

- define schemas
- define DTOs
- define expected outputs

before implementing logic.

---

## Rule 4.3 — Preserve Existing Architecture

Do not violate established architectural decisions unless explicitly instructed.

Examples:

- do not introduce microservices
- do not replace SQLite
- do not bypass validation layer
- do not introduce vector DBs in MVP

---

# 5. File Protection Rules

## Rule 5.1 — Do Not Modify Generated UI Components

Do not directly modify:

```text
components/ui/*
```

unless explicitly instructed.

Wrap or compose components instead.

---

## Rule 5.2 — Do Not Modify Shared Contracts Without Review

Changes to:

```text
schemas/
```

must be intentional and documented.

Schema changes affect the entire pipeline.

---

## Rule 5.3 — Do Not Hardcode Prompt Logic Inside Business Logic

Prompt text must not be embedded across random services.

Store prompts in:

```text
prompts/
```

or dedicated prompt modules.

---

## Rule 5.4 — Do Not Bypass Validation Layer

No AI-generated output may skip:

- hallucination validation
- ATS validation
- consistency checks

This rule is mandatory.

---

# 6. Documentation Synchronization Rules

## Rule 6.1 — Keep Context Files Updated

Whenever architecture or behavior changes:

- update relevant files in `context/`
- update module ownership if needed
- update invariants if needed

Documentation drift is forbidden.

---

## Rule 6.2 — Update Progress Tracker After Each Completed Unit

After completing a feature:

1. mark completed tasks
2. add implementation notes
3. list remaining blockers
4. document architectural decisions

---

## Rule 6.3 — Keep API Contracts Documented

Whenever:

- routes change
- schemas change
- pipeline behavior changes

update:

- architecture.md
- API documentation
- schema definitions

---

# 7. AI System Rules

## Rule 7.1 — Structured Resume JSON Is The Source Of Truth

Never allow AI systems to directly modify:

- PDFs
- raw resume text

All transformations must operate on structured schemas.

---

## Rule 7.2 — AI Must Never Invent Information

The system must never:

- fabricate skills
- fabricate experience
- fabricate metrics
- fabricate responsibilities

All generated content must trace back to source resume data.

---

## Rule 7.3 — Every Rewrite Must Be Explainable

Every rewrite must include:

- original text
- rewritten text
- rewrite reason
- matched JD terms

Black-box rewriting is forbidden.

---

## Rule 7.4 — Deterministic Systems Come Before LLMs

Always prefer:

- rules
- embeddings
- extraction
- validation
- typed schemas

before invoking LLM reasoning.

---

# 8. Verification Checklist

Before marking any implementation unit complete, verify all of the following.

---

# Functional Verification

- Feature works end-to-end.
- Inputs and outputs match defined contracts.
- Edge cases are handled.
- Errors are surfaced clearly.

---

# Architectural Verification

- Module boundaries are respected.
- No unrelated modules were modified unnecessarily.
- No business logic leakage exists.
- No invariant violations exist.

---

# AI Verification

- No hallucinated outputs exist.
- Validation layer is active.
- Outputs are explainable.
- Prompts remain modular.

---

# Code Quality Verification

- Types and schemas are consistent.
- Dead code is removed.
- Naming is consistent.
- Logging is meaningful.
- Configuration is externalized where appropriate.

---

# Documentation Verification

- Context files are updated.
- Progress tracker is updated.
- New architectural decisions are documented.
- APIs and schemas remain synchronized.

---

# Final Rule

Never optimize for speed at the cost of architecture integrity.

This project prioritizes:

- correctness
- explainability
- modularity
- maintainability
- trustworthiness

over rapid feature expansion.
