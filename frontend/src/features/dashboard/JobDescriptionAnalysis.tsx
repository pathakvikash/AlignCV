import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { JobDescriptionAnalysis } from "@/types/jd";

interface JobDescriptionAnalysisProps {
  analysis: JobDescriptionAnalysis | null;
  jobId: string | null;
}

function renderList(title: string, values: string[]) {
  if (!values.length) {
    return (
      <div className="text-sm text-text-secondary">No {title.toLowerCase()} detected.</div>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
      {values.map((value) => (
        <Badge key={value} variant="info">
          {value}
        </Badge>
      ))}
    </div>
  );
}

export function JobDescriptionAnalysis({ analysis, jobId }: JobDescriptionAnalysisProps) {
  if (!analysis) {
    return (
      <Card title="JD Analysis" description="Saved job descriptions are analyzed and displayed here.">
        <div className="rounded border border-border bg-surface p-4 text-sm text-text-secondary">
          Save a job description to view extracted role, skills, tools, and responsibilities.
        </div>
      </Card>
    );
  }

  return (
    <Card title="JD Analysis" description="Extracted structure from your saved job description.">
      <div className="space-y-4">
        <div className="rounded border border-border bg-surface-elevated p-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-text-primary">Detected role</p>
              <p className="text-sm text-text-secondary">{analysis.role ?? "Not detected"}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-text-primary">Seniority</p>
              <p className="text-sm text-text-secondary">{analysis.seniority ?? "Not detected"}</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <p className="text-sm font-semibold text-text-primary">Skills</p>
            {renderList("Skills", analysis.skills)}
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">Tools</p>
            {renderList("Tools", analysis.tools)}
          </div>
          <div>
            <p className="text-sm font-semibold text-text-primary">Keywords</p>
            {renderList("Keywords", analysis.keywords)}
          </div>
        </div>

        <Separator />

        <div>
          <p className="text-sm font-semibold text-text-primary">Responsibilities</p>
          {analysis.responsibilities.length > 0 ? (
            <ul className="mt-2 list-disc space-y-2 pl-5 text-sm text-text-secondary">
              {analysis.responsibilities.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          ) : (
            <p className="mt-2 text-sm text-text-secondary">No responsibilities were detected.</p>
          )}
        </div>

        {jobId ? (
          <div className="rounded border border-border bg-surface p-4 text-sm text-text-secondary">
            Saved JD ID: <span className="font-medium text-text-primary">{jobId}</span>
          </div>
        ) : null}
      </div>
    </Card>
  );
}
