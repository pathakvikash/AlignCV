import { useCallback, useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ResumeUpload } from "./ResumeUpload";
import { ResumeViewer } from "./ResumeViewer";
import { JobDescriptionInput } from "./JobDescriptionInput";
import { JobDescriptionAnalysis } from "./JobDescriptionAnalysis";
import { MatchAnalysis } from "./MatchAnalysis";
import { getJobDescriptionSubmitEndpoint, getMatchEndpoint, getResumeParseEndpoint } from "@/services/api";
import type { ResumeUploadResponse, ResumeParseResponse } from "@/types/resume";
import type { JobDescriptionAnalysis as JobDescriptionAnalysisType, JobDescriptionSubmissionRequest, JobDescriptionResponse } from "@/types/jd";
import type { MatchResult } from "@/types/match";

export function DashboardShell() {
  const [parsedResume, setParsedResume] = useState<ResumeParseResponse | null>(null);
  const [isParsing, setIsParsing] = useState(false);
  const [parseError, setParseError] = useState<string | null>(null);
  const [jobAnalysis, setJobAnalysis] = useState<JobDescriptionAnalysisType | null>(null);
  const [jobId, setJobId] = useState<string | null>(null);
  const [jobSaveStatus, setJobSaveStatus] = useState<string | null>(null);
  const [jobSaveType, setJobSaveType] = useState<"success" | "error" | null>(null);
  const [isSavingJob, setIsSavingJob] = useState(false);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [isMatching, setIsMatching] = useState(false);
  const [matchError, setMatchError] = useState<string | null>(null);

  const handleUploadSuccess = useCallback(async (resume: ResumeUploadResponse) => {
    setParsedResume(null);
    setParseError(null);
    setIsParsing(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(getResumeParseEndpoint(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: resume.id }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

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
    setMatchResult(null);
    setMatchError(null);
    setIsSavingJob(true);

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

      const response = await fetch(getJobDescriptionSubmitEndpoint(), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

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

  useEffect(() => {
    if (!parsedResume?.id || !jobId) {
      return;
    }

    const fetchMatch = async () => {
      setIsMatching(true);
      setMatchError(null);

      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 second timeout

        const response = await fetch(getMatchEndpoint(), {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ resume_id: parsedResume.id, job_id: jobId }),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorBody = await response.json();
          const message = errorBody?.detail?.message || errorBody?.message || "Failed to compute match";
          throw new Error(message);
        }

        const data: MatchResult = await response.json();
        setMatchResult(data);
      } catch (error) {
        setMatchError(error instanceof Error ? error.message : "Failed to compute match");
      } finally {
        setIsMatching(false);
      }
    };

    void fetchMatch();
  }, [parsedResume?.id, jobId]);

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
                <Badge variant={matchResult ? "success" : "default"}>
                  {matchResult ? `${matchResult.keyword_score.toFixed(0)}%` : "—"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">ATS Safety</span>
                <Badge variant={matchResult ? (matchResult.overall_score >= 70 ? "success" : "warning") : "default"}>
                  {matchResult ? (matchResult.overall_score >= 70 ? "Safe" : "Review") : "Pending"}
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-text-secondary">Readability</span>
                <Badge variant="warning">Good</Badge>
              </div>
            </div>
          </Card>

          <Card title="Missing Skills" description="Skills to highlight">
            <div className="space-y-2">
              {matchResult?.missing_skills.length ? (
                matchResult.missing_skills.map((skill) => (
                  <Badge key={skill} variant="destructive">
                    {skill}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-text-secondary">
                  Upload a resume and save a JD to identify missing skills.
                </p>
              )}
            </div>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <ResumeViewer parseResult={parsedResume} isLoading={isParsing} error={parseError} />

          <JobDescriptionAnalysis analysis={jobAnalysis} jobId={jobId} />

          <MatchAnalysis matchResult={matchResult} isMatching={isMatching} error={matchError} />

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
