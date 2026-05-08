import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { MatchResult } from "@/types/match";

interface MatchAnalysisProps {
  matchResult: MatchResult | null;
  isMatching: boolean;
  error: string | null;
}

function renderProgress(label: string, value: number) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-sm text-text-secondary">
        <span>{label}</span>
        <span className="font-semibold text-text-primary">{value.toFixed(0)}%</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-border-muted">
        <div
          className="h-full rounded-full bg-accent"
          style={{ width: `${value}%` }}
        />
      </div>
    </div>
  );
}

export function MatchAnalysis({ matchResult, isMatching, error }: MatchAnalysisProps) {
  if (isMatching) {
    return (
      <Card title="Match Analysis" description="Computing semantic alignment...">
        <div className="rounded border border-border bg-surface p-4 text-sm text-text-secondary">
          Matching resume content against the selected job description.
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card title="Match Analysis" description="Match calculation failed.">
        <div className="rounded border border-destructive/10 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      </Card>
    );
  }

  if (!matchResult) {
    return (
      <Card title="Match Analysis" description="Results will appear after resume upload and JD save.">
        <div className="rounded border border-border bg-surface p-4 text-sm text-text-secondary">
          Save a job description and upload a resume to generate ATS-style matching insights.
        </div>
      </Card>
    );
  }

  return (
    <Card title="Match Analysis" description="ATS-style scoring and alignment insights.">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-lg border border-border bg-surface-elevated p-4">
            <p className="text-sm font-medium text-text-primary">Overall Match</p>
            <p className="mt-2 text-3xl font-semibold text-text-primary">{matchResult.overall_score.toFixed(0)}%</p>
          </div>
          <div className="rounded-lg border border-border bg-surface-elevated p-4">
            {renderProgress("Keyword Coverage", matchResult.keyword_coverage)}
          </div>
          <div className="rounded-lg border border-border bg-surface-elevated p-4">
            {renderProgress("Semantic Alignment", matchResult.semantic_score)}
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-surface-elevated p-4">
            <p className="text-sm font-semibold text-text-primary">Missing Skills</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {matchResult.missing_skills.length > 0 ? (
                matchResult.missing_skills.map((skill, index) => (
                  <Badge key={`${skill}-${index}`} variant="destructive">
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-text-secondary">No missing skills detected.</p>
              )}
            </div>
          </div>
          <div className="rounded-lg border border-border bg-surface-elevated p-4">
            <p className="text-sm font-semibold text-text-primary">Matched Skills</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {matchResult.matched_skills.length > 0 ? (
                matchResult.matched_skills.map((skill, index) => (
                  <Badge key={`${skill}-${index}`} variant="success">
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-text-secondary">No matched skills were identified.</p>
              )}
            </div>
          </div>
        </div>

        <Separator />

        <div className="space-y-4">
          <p className="text-sm font-semibold text-text-primary">Section Relevance</p>
          <div className="space-y-3">
            {matchResult.section_scores.map((section, index) => (
              <div key={`${section.title}-${index}`} className="space-y-2 rounded-lg border border-border bg-surface p-4">
                <div className="flex items-center justify-between text-sm text-text-secondary">
                  <span>{section.title}</span>
                  <span className="font-semibold text-text-primary">{section.similarity.toFixed(0)}%</span>
                </div>
                <div className="h-2 overflow-hidden rounded-full bg-border-muted">
                  <div
                    className="h-full rounded-full bg-accent"
                    style={{ width: `${section.similarity}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
