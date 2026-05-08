import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import type { JobDescriptionSubmissionRequest } from "@/types/jd";

interface JobDescriptionInputProps {
  onSubmit: (payload: JobDescriptionSubmissionRequest) => void;
  isSubmitting: boolean;
  statusMessage: string | null;
  statusType: "success" | "error" | null;
}

export function JobDescriptionInput({
  onSubmit,
  isSubmitting,
  statusMessage,
  statusType,
}: JobDescriptionInputProps) {
  const [text, setText] = useState("");

  const isSubmitDisabled = useMemo(
    () => isSubmitting || text.trim().length === 0,
    [isSubmitting, text],
  );

  return (
    <div className="space-y-4">
      <Textarea
        value={text}
        onChange={(event) => setText(event.target.value)}
        placeholder="Paste the full job description here..."
        className="min-h-[260px]"
      />

      {statusMessage ? (
        <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-elevated px-4 py-3 text-sm">
          <Badge variant={statusType === "success" ? "success" : "destructive"}>
            {statusType === "success" ? "Saved" : "Error"}
          </Badge>
          <span className="text-text-secondary">{statusMessage}</span>
        </div>
      ) : null}

      <div className="flex justify-end">
        <Button disabled={isSubmitDisabled} onClick={() => onSubmit({ text })}>
          {isSubmitting ? "Saving..." : "Save Job Description"}
        </Button>
      </div>
    </div>
  );
}
