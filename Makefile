.PHONY: bootstrap frontend-dev backend-dev docker-up docker-down lint format

bootstrap:
	cd backend && python -m pip install -r requirements/dev.txt
	cd frontend && npm install

frontend-dev:
	cd frontend && npm run dev -- --host 0.0.0.0

backend-dev:
	cd backend && uvicorn main:app --reload --host 0.0.0.0 --port $${BACKEND_PORT:-8000}

docker-up:
	docker compose up --build

docker-down:
	docker compose down

lint:
	cd backend && ruff check .
	cd frontend && npm run lint

format:
	cd backend && black .
	cd frontend && npx prettier --write .
