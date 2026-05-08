import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export function DashboardShell() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="rounded-lg border border-border bg-surface p-6 shadow-sm">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-accent font-medium">Workspace</p>
            <h2 className="mt-2 text-3xl font-bold text-text-primary">Your tailoring dashboard</h2>
            <p className="mt-2 max-w-2xl text-base text-text-secondary">
              Upload your resume and paste a job description to get AI-powered tailoring suggestions.
            </p>
          </div>
        </div>
      </section>

      {/* Upload and JD Input Section */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Resume Upload */}
        <Card title="Upload Resume" description="Drop your master resume PDF to begin tailoring.">
          <div className="space-y-4">
            <div className="border-2 border-dashed border-border-muted rounded-lg p-8 text-center">
              <div className="space-y-2">
                <div className="text-4xl">📄</div>
                <p className="text-sm text-text-muted">
                  Drag and drop your resume PDF here, or click to browse
                </p>
                <Button variant="outline" size="sm">
                  Choose File
                </Button>
              </div>
            </div>
            <Input placeholder="Or paste resume text here..." />
          </div>
        </Card>

        {/* JD Input */}
        <Card title="Job Description" description="Paste the job description you want to tailor for.">
          <Textarea
            placeholder="Paste the full job description here..."
            className="min-h-[200px]"
          />
        </Card>
      </div>

      {/* Analysis and Results Section */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* ATS Analysis Sidebar */}
        <div className="space-y-6">
          <Card title="ATS Analysis" description="Resume optimization insights">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Keyword Match</span>
                <Badge variant="success">85%</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">ATS Safety</span>
                <Badge variant="success">Safe</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Readability</span>
                <Badge variant="warning">Good</Badge>
              </div>
            </div>
          </Card>

          <Card title="Missing Skills" description="Skills to highlight">
            <div className="space-y-2">
              <Badge variant="warning">React</Badge>
              <Badge variant="warning">TypeScript</Badge>
              <Badge variant="info">AWS</Badge>
            </div>
          </Card>
        </div>

        {/* Resume Diff Viewer */}
        <div className="lg:col-span-2">
          <Card title="Resume Comparison" description="Original vs tailored version">
            <div className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-text-primary">Original</h4>
                  <div className="rounded border border-border bg-surface-elevated p-4">
                    <p className="text-sm text-text-secondary">
                      Experienced software engineer with 5+ years...
                    </p>
                  </div>
                </div>
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-text-primary">Tailored</h4>
                  <div className="rounded border border-border bg-surface-elevated p-4">
                    <p className="text-sm text-text-secondary">
                      Senior software engineer with 5+ years of React and TypeScript experience...
                    </p>
                  </div>
                </div>
              </div>
              <Separator />
              <div className="flex justify-end">
                <Button>Export Tailored Resume</Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
