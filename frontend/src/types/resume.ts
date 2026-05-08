export interface ResumeUploadResponse {
  id: string;
  filename: string;
  size: number;
  status: string;
  message: string;
}

export interface ResumeUploadError {
  error: string;
  message: string;
}