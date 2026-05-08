from __future__ import annotations

import math
from typing import Sequence

from app.core.config import settings
from app.embeddings.providers import EmbeddingProvider, SentenceTransformerProvider


_embedding_provider: EmbeddingProvider | None = None


def get_embedding_provider() -> EmbeddingProvider:
    global _embedding_provider
    if _embedding_provider is None:
        _embedding_provider = SentenceTransformerProvider(settings.embedding_model_name)
    return _embedding_provider


def embed_texts(texts: Sequence[str]) -> list[list[float]]:
    return get_embedding_provider().embed(texts)


def cosine_similarity(vector_a: Sequence[float], vector_b: Sequence[float]) -> float:
    if not vector_a or not vector_b or len(vector_a) != len(vector_b):
        return 0.0

    dot_product = sum(a * b for a, b in zip(vector_a, vector_b))
    magnitude_a = math.sqrt(sum(a * a for a in vector_a))
    magnitude_b = math.sqrt(sum(b * b for b in vector_b))

    if magnitude_a == 0 or magnitude_b == 0:
        return 0.0

    return dot_product / (magnitude_a * magnitude_b)
