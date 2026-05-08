import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CardProps {
  title: string;
  description: string;
  children?: ReactNode;
}

export function Card({ title, description, children }: CardProps) {
  return (
    <div className={cn("rounded-lg border border-border bg-surface p-6 shadow-sm")}>
      <h3 className="text-xl font-semibold text-text-primary">{title}</h3>
      <p className="mt-2 text-sm text-text-secondary">{description}</p>
      {children ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}
