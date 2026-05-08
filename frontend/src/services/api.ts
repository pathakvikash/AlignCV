export const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || "http://localhost:8000/api";

export function getHealthEndpoint() {
  return `${API_BASE_URL}/health`;
}
