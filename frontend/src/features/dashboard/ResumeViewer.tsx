import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import type { ResumeParseResponse } from "@/types/resume";

interface ResumeViewerProps {
  parseResult: ResumeParseResponse | null;
  isLoading: boolean;
  error: string | null;
}

export function ResumeViewer({ parseResult, isLoading, error }: ResumeViewerProps) {
  return (
    <Card title="Resume Viewer" description="Review the parsed resume structure and extracted content.">
      <div className="space-y-4">
        {isLoading && (
          <div className="rounded border border-border bg-surface p-4 text-sm text-text-secondary">
            Parsing your resume, please wait...
          </div>
        )}

        {error && (
          <div className="rounded border border-destructive/10 bg-destructive/5 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        {!isLoading && !parseResult && !error && (
          <div className="rounded border border-border bg-surface p-4 text-sm text-text-secondary">
            Upload a resume and the parser will extract the main sections for review.
          </div>
        )}

        {parseResult && (
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2">
              <Badge variant="success">Parsed</Badge>
              <span className="text-sm text-text-secondary">{parseResult.filename}</span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg border border-border bg-surface-elevated p-4">
                <h4 className="text-sm font-medium text-text-primary">Extracted Text</h4>
                <p className="mt-2 whitespace-pre-wrap text-sm text-text-secondary max-h-48 overflow-y-auto">
                  {parseResult.extracted_text}
                </p>
              </div>

              <div className="rounded-lg border border-border bg-surface-elevated p-4">
                <h4 className="text-sm font-medium text-text-primary">Section Count</h4>
                <div className="mt-3 flex flex-wrap gap-2">
                  {parseResult.sections.map((section, index) => (
                    <Badge key={`${section.title}-${index}`} variant="info">
                      {section.title}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              {parseResult.sections.map((section, index) => (
                <div key={`${section.title}-${index}`} className="rounded-lg border border-border bg-surface p-4">
                  <h4 className="text-sm font-semibold text-text-primary">{section.title}</h4>
                  <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-text-secondary">
                    {section.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
