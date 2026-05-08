import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getResumeUploadEndpoint } from "@/services/api";
import type { ResumeUploadResponse, ResumeUploadError } from "@/types/resume";

interface ResumeUploadProps {
  onUploadSuccess?: (response: ResumeUploadResponse) => void;
}

export function ResumeUpload({ onUploadSuccess }: ResumeUploadProps) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });
  const [uploadedFile, setUploadedFile] = useState<ResumeUploadResponse | null>(null);

  const handleFileUpload = useCallback(async (file: File) => {
    setIsUploading(true);
    setUploadStatus({ type: null, message: "" });

    try {
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(getResumeUploadEndpoint(), {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData: ResumeUploadError = await response.json();
        throw new Error(errorData.message);
      }

      const data: ResumeUploadResponse = await response.json();
      setUploadStatus({ type: "success", message: data.message });
      setUploadedFile(data);
      onUploadSuccess?.(data);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Upload failed";
      setUploadStatus({ type: "error", message });
    } finally {
      setIsUploading(false);
    }
  }, [onUploadSuccess]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileUpload(files[0]);
    }
  }, [handleFileUpload]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <Card title="Upload Resume" description="Drop your master resume PDF to begin tailoring.">
      <div className="space-y-4">
        <div
          className="border-2 border-dashed border-border-muted rounded-lg p-8 text-center transition-colors hover:border-border"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <div className="space-y-2">
            <div className="text-4xl">📄</div>
            <p className="text-sm text-text-muted">
              Drag and drop your resume PDF here, or click to browse
            </p>
            <Input
              type="file"
              accept=".pdf"
              onChange={handleFileSelect}
              disabled={isUploading}
              className="hidden"
              id="resume-upload"
            />
            <Button
              variant="outline"
              size="sm"
              disabled={isUploading}
              onClick={() => document.getElementById('resume-upload')?.click()}
            >
              {isUploading ? "Uploading..." : "Choose File"}
            </Button>
          </div>
        </div>

        {uploadStatus.type && (
          <div className="flex items-center gap-2">
            <Badge variant={uploadStatus.type === "success" ? "success" : "destructive"}>
              {uploadStatus.type === "success" ? "✓" : "✗"}
            </Badge>
            <span className="text-sm text-text-secondary">{uploadStatus.message}</span>
          </div>
        )}

        {uploadedFile && (
          <div className="rounded border border-border bg-surface-elevated p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-text-primary">{uploadedFile.filename}</p>
                <p className="text-xs text-text-muted">{formatFileSize(uploadedFile.size)}</p>
              </div>
              <Badge variant="success">Uploaded</Badge>
            </div>
          </div>
        )}

        <Input placeholder="Or paste resume text here..." />
      </div>
    </Card>
  );
}