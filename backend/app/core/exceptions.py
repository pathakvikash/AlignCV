class AppError(Exception):
    """Base exception for the backend application."""

    def __init__(self, message: str) -> None:
        super().__init__(message)
        self.message = message
