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

export interface ResumeSection {
  title: string;
  content: string;
}

export interface ResumeParseResponse {
  id: string;
  filename: string;
  extracted_text: string;
  sections: ResumeSection[];
}
