from pydantic import BaseModel


class ResumeUploadResponse(BaseModel):
    id: str
    filename: str
    size: int
    status: str
    message: str


class ResumeUploadError(BaseModel):
    error: str
    message: str
