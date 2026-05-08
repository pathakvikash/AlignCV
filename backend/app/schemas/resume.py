from pydantic import BaseModel
from typing import List


class ResumeUploadResponse(BaseModel):
    id: str
    filename: str
    size: int
    status: str
    message: str


class ResumeUploadError(BaseModel):
    error: str
    message: str


class ResumeSection(BaseModel):
    title: str
    content: str


class ResumeParseResponse(BaseModel):
    id: str
    filename: str
    extracted_text: str
    sections: List[ResumeSection]


class ResumeParseRequest(BaseModel):
    id: str
