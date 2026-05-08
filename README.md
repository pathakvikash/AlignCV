# AlignCV

Foundational monorepo for the AlignCV application. This repository contains a FastAPI backend, a Vite + React frontend, and shared developer tooling for local-first development.

## Local Development

### Backend

```bash
make backend-dev
```

### Frontend

```bash
make frontend-dev
```

### Docker

```bash
make docker-up
make docker-down
```

### Tooling

```bash
make lint
make format
```

## Structure

- `backend/` — Python API service and foundation modules
- `frontend/` — React UI shell and theme baseline
- `docker/` — Docker development guidance
- `scripts/` — developer setup helpers
- `context/` — architecture, design, and workflow documentation
