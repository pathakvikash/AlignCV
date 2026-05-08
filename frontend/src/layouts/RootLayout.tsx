import { Outlet } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-primary transition-colors duration-200 dark:bg-slate-950 dark:text-white">
      <header className="border-b border-border bg-surface/95 backdrop-blur-md dark:bg-slate-900/95">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-sm uppercase tracking-[0.24em] text-secondary">AlignCV</p>
            <h1 className="mt-2 text-2xl font-semibold text-primary dark:text-white">AI Resume Tailoring Studio</h1>
          </div>
          <ThemeToggle />
        </div>
      </header>
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6">
        <Outlet />
      </main>
    </div>
  );
}
