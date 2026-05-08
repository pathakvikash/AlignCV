export interface SectionMatch {
  title: string;
  similarity: number;
}

export interface MatchResult {
  overall_score: number;
  keyword_score: number;
  semantic_score: number;
  keyword_coverage: number;
  missing_skills: string[];
  matched_skills: string[];
  section_scores: SectionMatch[];
  jd_role?: string;
  jd_seniority?: string;
}
