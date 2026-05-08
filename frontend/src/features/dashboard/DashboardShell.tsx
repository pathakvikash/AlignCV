import { useCallback, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ResumeUpload } from "./ResumeUpload";
import { ResumeViewer } from "./ResumeViewer";
import { JobDescriptionInput } from "./JobDescriptionInput";
import { JobDescriptionAnalysis } from "./JobDescriptionAnalysis";
import { getJobDescriptionSubmitEndpoint, getResumeParseEndpoint } from "@/services/api";
import type { ResumeUploadResponse, ResumeParseResponse } from "@/types/resume";
import type { JobDescriptionAnalysis as JobDescriptionAnalysisType, JobDescriptionSubmissionRequest, JobDescriptionResponse } from "@/types/jd";

export function DashboardShell() {
  const [parsedResume, setParsedResume] = useState<ResumeParseResponse | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [jobAnalysis, setJobAnalysis] = useState<JobDescriptionAnalysisType | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobSaveStatus, setJobSaveStatus] = useState<string | null>(null);
  const [jobSaveType, setJobSaveType] = useState<"success" | "error" | null>(null);
  const [isSavingJob, setIsSavingJob] = useState(false);

  const handleUploadSuccess = useCallback(async (resume: ResumeUploadResponse) => {
    setParsedResume(null);
    setParseError(null);
    setIsParsing(true);

    try {
      const response = await fetch(getResumeParseEndpoint(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: resume.id }),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        const message =
          errorBody?.detail?.message || errorBody?.message || "Failed to parse resume";
        throw new Error(message);
      }

      const data: ResumeParseResponse = await response.json();
      setParsedResume(data);
    } catch (error) {
      setParseError(error instanceof Error ? error.message : "Failed to parse resume");
    } finally {
      setIsParsing(false);
    }
  }, []);

  const handleSaveJobDescription = useCallback(async (payload: JobDescriptionSubmissionRequest) => {
    setJobAnalysis(null);
    setJobSaveStatus(null);
    setJobSaveType(null);
    setIsSavingJob(true);

    try {
      const response = await fetch(getJobDescriptionSubmitEndpoint(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorBody = await response.json();
        const message = errorBody?.detail?.message || errorBody?.message || "Failed to save job description";
        throw new Error(message);
      }

      const data: JobDescriptionResponse = await response.json();
      setJobAnalysis(data.analysis);
      setJobId(data.id);
      setJobSaveStatus(data.message);
      setJobSaveType("success");
    } catch (error) {
      setJobSaveStatus(error instanceof Error ? error.message : "Failed to save job description");
      setJobSaveType("error");
    } finally {
      setIsSavingJob(false);
    }
  }, []);

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
        <ResumeUpload onUploadSuccess={handleUploadSuccess} />

        <Card title="Job Description" description="Paste the job description you want to tailor for.">
          <JobDescriptionInput
            onSubmit={handleSaveJobDescription}
            isSubmitting={isSavingJob}
            statusMessage={jobSaveStatus}
            statusType={jobSaveType}
          />
        </Card>
      </div>

      {/* Analysis and Results Section */}
      <div className="grid gap-6 lg:grid-cols-3">
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

        <div className="lg:col-span-2 space-y-6">
          <ResumeViewer parseResult={parsedResume} isLoading={isParsing} error={parseError} />

          <JobDescriptionAnalysis analysis={jobAnalysis} jobId={jobId} />

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
