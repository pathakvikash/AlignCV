export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api";

export function getHealthEndpoint() {
  return `${API_BASE_URL}/health`;
}

export function getResumeUploadEndpoint() {
  return `${API_BASE_URL}/resume/upload`;
}

export function getResumeParseEndpoint() {
  return `${API_BASE_URL}/resume/parse`;
}

export function getJobDescriptionSubmitEndpoint() {
  return `${API_BASE_URL}/jd`;
}

export function getJobDescriptionEndpoint(jobId: string) {
  return `${API_BASE_URL}/jd/${jobId}`;
}

export function getMatchEndpoint() {
  return `${API_BASE_URL}/match`;
}
