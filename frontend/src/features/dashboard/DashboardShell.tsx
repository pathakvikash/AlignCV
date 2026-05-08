import { Card } from "@/components/ui/card";

const sections = [
  {
    title: "Upload Resume",
    description: "Drop your master resume to begin building a tailored version for your target role.",
  },
  {
    title: "Paste JD",
    description: "Paste the job description to analyze requirements and match your experience.",
  },
  {
    title: "ATS Analysis",
    description: "View placeholder cards for ATS safety, keyword coverage, and alignment signals.",
  },
  {
    title: "Resume Diff Viewer",
    description: "Compare original and tailored resume suggestions in a future diff experience.",
  },
];

export function DashboardShell() {
  return (
    <div className="space-y-8">
      <section className="rounded-3xl border border-border bg-surface p-6 shadow-sm shadow-slate-700/5 dark:border-slate-800 dark:bg-slate-900">
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-accent">Workspace</p>
            <h2 className="mt-2 text-3xl font-semibold text-primary dark:text-white">Your tailoring dashboard</h2>
            <p className="mt-2 max-w-2xl text-sm text-secondary">
              This shell is the foundational UI for resume tailoring, analysis, and secure AI-assisted rewriting.
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-2">
        {sections.map((item) => (
          <Card key={item.title} title={item.title} description={item.description} />
        ))}
      </div>
    </div>
  );
}
