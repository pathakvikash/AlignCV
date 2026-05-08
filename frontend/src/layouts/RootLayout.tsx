import { Outlet } from "react-router-dom";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export function RootLayout() {
  return (
    <div className="min-h-screen bg-background text-text-primary">
      <header className="border-b border-border bg-surface/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-accent font-medium">AlignCV</p>
            <h1 className="mt-2 text-2xl font-bold text-text-primary">AI Resume Tailoring Studio</h1>
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
