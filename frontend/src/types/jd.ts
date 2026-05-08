export interface JobDescriptionSubmissionRequest {
  text: string;
}

export interface JobDescriptionAnalysis {
  role?: string;
  seniority?: string;
  skills: string[];
  tools: string[];
  responsibilities: string[];
  keywords: string[];
}

export interface JobDescriptionResponse {
  id: string;
  created_at: string;
  status: string;
  message: string;
  analysis: JobDescriptionAnalysis;
}
