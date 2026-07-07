// src/shared/components/enterprise/workspace/entity-header.tsx

import { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface EntityHeaderProps {
  avatar?: ReactNode;
  title: string;
  subtitle?: string;
  status?: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
  className?: string;
}

export function EntityHeader({
  avatar,
  title,
  subtitle,
  status,
  meta,
  actions,
  className,
}: EntityHeaderProps) {
  return (
    <section
      className={cn(
        "overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white via-white to-slate-50/80 shadow-sm",
        className,
      )}
    >
      <div className="border-b border-slate-100 bg-white/80 px-5 py-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            {avatar && <div className="shrink-0">{avatar}</div>}

            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="truncate text-base font-semibold tracking-tight text-slate-950">
                  {title}
                </h3>
                {status}
              </div>

              {subtitle && (
                <p className="text-sm leading-6 text-slate-500">{subtitle}</p>
              )}
            </div>
          </div>

          {actions && <div className="shrink-0">{actions}</div>}
        </div>
      </div>

      {meta && (
        <div className="grid gap-3 px-5 py-4 text-sm sm:grid-cols-2 xl:grid-cols-3">
          {meta}
        </div>
      )}
    </section>
  );
}
