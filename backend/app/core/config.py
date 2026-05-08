from __future__ import annotations

import os
from pathlib import Path
from typing import Any

import yaml
from dotenv import load_dotenv
from pydantic_settings import BaseSettings, SettingsConfigDict

BASE_DIR = Path(__file__).resolve().parents[1]
ROOT_DIR = BASE_DIR.parent
CONFIG_PATH = BASE_DIR / "config.yml"
ENV_PATH = ROOT_DIR / ".env"


def load_yaml_settings() -> dict[str, Any]:
    if CONFIG_PATH.exists():
        with CONFIG_PATH.open("r", encoding="utf-8") as handle:
            content = yaml.safe_load(handle) or {}
        if not isinstance(content, dict):
            return {}
        return content
    return {}


def load_environment_overrides() -> dict[str, Any]:
    load_dotenv(ENV_PATH)
    overrides: dict[str, Any] = {}

    environment = os.getenv("ENVIRONMENT")
    if environment is not None:
        overrides["environment"] = environment

    model_provider = os.getenv("MODEL_PROVIDER")
    if model_provider is not None:
        overrides["model_provider"] = model_provider

    local_storage_path = os.getenv("LOCAL_STORAGE_PATH")
    if local_storage_path is not None:
        overrides["local_storage_path"] = Path(local_storage_path)

    log_level = os.getenv("LOG_LEVEL")
    if log_level is not None:
        overrides["log_level"] = log_level

    cors_allowed_origins = os.getenv("CORS_ALLOWED_ORIGINS")
    if cors_allowed_origins is not None:
        overrides["cors_allowed_origins"] = [
            origin.strip()
            for origin in cors_allowed_origins.split(",")
            if origin.strip()
        ]

    return overrides


class Settings(BaseSettings):
    environment: str = "development"
    model_provider: str = "local"
    local_storage_path: Path = Path("storage")
    log_level: str = "INFO"
    cors_allowed_origins: list[str] = ["*"]

    model_config = SettingsConfigDict(
        env_file=ENV_PATH,
        env_file_encoding="utf-8",
        extra="ignore",
    )

    @classmethod
    def load(cls) -> "Settings":
        yaml_values = load_yaml_settings()
        overrides = load_environment_overrides()
        return cls(**{**yaml_values, **overrides})


settings = Settings.load()
