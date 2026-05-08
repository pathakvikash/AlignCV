import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  title: string;
  description: string;
  children?: ReactNode;
}

export function Card({ title, description, children }: CardProps) {
  return (
    <div className={cn("rounded-3xl border border-border bg-surface p-6 shadow-sm shadow-slate-700/5 dark:border-slate-800 dark:bg-slate-900")}>
      <h3 className="text-xl font-semibold text-primary dark:text-white">{title}</h3>
      <p className="mt-2 text-sm text-secondary">{description}</p>
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}
