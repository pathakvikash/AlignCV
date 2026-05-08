# Backend

This backend is built with FastAPI and provides the foundational API and configuration system for the AlignCV project.

## Run locally

```bash
cd backend
python -m pip install -r requirements/dev.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Health check

- `GET /api/health`

## Tooling

- `ruff` for linting
- `black` for formatting
- `pytest` for tests
