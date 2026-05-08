from __future__ import annotations

import sqlite3
from pathlib import Path
from typing import Iterator

from app.core.config import settings


def get_database_path() -> Path:
    database_dir = Path(settings.local_storage_path)
    database_dir.mkdir(parents=True, exist_ok=True)
    return database_dir / "aligncv.db"


def get_connection() -> sqlite3.Connection:
    connection = sqlite3.connect(get_database_path(), check_same_thread=False)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database() -> None:
    with get_connection() as connection:
        connection.execute(
            """
            CREATE TABLE IF NOT EXISTS job_descriptions (
                id TEXT PRIMARY KEY,
                raw_text TEXT NOT NULL,
                created_at TEXT NOT NULL,
                analysis_json TEXT NOT NULL
            )
            """
        )
        connection.commit()


def iter_rows(query: str, params: tuple = ()) -> Iterator[sqlite3.Row]:
    with get_connection() as connection:
        cursor = connection.execute(query, params)
        for row in cursor:
            yield row
