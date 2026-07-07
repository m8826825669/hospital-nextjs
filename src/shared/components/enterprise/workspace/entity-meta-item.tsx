// src/shared/components/enterprise/workspace/entity-meta-item.tsx

import { ReactNode } from "react";
import { cn } from "@/shared/lib/utils";

interface EntityMetaItemProps {
  icon?: ReactNode;
  label: string;
  value?: string | number | null;
  className?: string;
}

export function EntityMetaItem({ icon, label, value, className }: EntityMetaItemProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-xl border border-slate-200/70 bg-white px-3 py-2.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]",
        className,
      )}
    >
      {icon && (
        <div className="mt-0.5 rounded-lg bg-slate-50 p-1.5 text-slate-500 ring-1 ring-slate-200/70 [&_svg]:h-4 [&_svg]:w-4">
          {icon}
        </div>
      )}

      <div className="min-w-0">
        <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
          {label}
        </p>
        <p className="mt-0.5 truncate text-sm font-semibold text-slate-900">
          {value || "-"}
        </p>
      </div>
    </div>
  );
}
