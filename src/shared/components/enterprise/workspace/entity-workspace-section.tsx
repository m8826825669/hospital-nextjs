// src/shared/components/enterprise/workspace/entity-workspace-section.tsx

import { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface EntityWorkspaceSectionProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function EntityWorkspaceSection({
  title,
  description,
  actions,
  children,
  className,
}: EntityWorkspaceSectionProps) {
  return (
    <section className={cn("rounded-2xl border border-slate-200/80 bg-white shadow-sm", className)}>
      <div className="flex flex-col gap-3 border-b border-slate-100 px-5 py-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h4 className="text-sm font-semibold tracking-tight text-slate-950">{title}</h4>
          {description && <p className="mt-1 text-sm text-slate-500">{description}</p>}
        </div>
        {actions && <div className="shrink-0">{actions}</div>}
      </div>
      <div className="p-5">{children}</div>
    </section>
  );
}
