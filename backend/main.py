from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.health import router as health_router
from app.api.resume import router as resume_router
from app.core.config import settings
from app.core.logging import configure_logging, logger

configure_logging()

logger.info("application_starting", environment=settings.environment)

app = FastAPI(
    title="AlignCV",
    version="0.1.0",
    openapi_url="/api/openapi.json",
    docs_url="/api/docs",
    redoc_url="/api/redoc",
)
app.include_router(health_router, prefix="/api")
app.include_router(resume_router, prefix="/api/resume")
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def on_startup() -> None:
    logger.info("startup_complete", status="ok")
