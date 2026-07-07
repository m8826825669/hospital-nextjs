// src/shared/components/enterprise/workspace/entity-info-grid.tsx

import { cn } from "@/shared/lib/utils";

interface EntityInfoGridProps {
  items: {
    label: string;
    value?: string | number | null;
  }[];
  columns?: 1 | 2 | 3 | 4;
  className?: string;
}

const columnClassMap = {
  1: "grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-2 xl:grid-cols-3",
  4: "md:grid-cols-2 xl:grid-cols-4",
};

export function EntityInfoGrid({ items, columns = 2, className }: EntityInfoGridProps) {
  return (
    <div className={cn("grid gap-3", columnClassMap[columns], className)}>
      {items.map((item) => (
        <div
          key={item.label}
          className="rounded-xl border border-slate-200/70 bg-white p-3.5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] transition-colors hover:border-slate-300"
        >
          <p className="text-[11px] font-medium uppercase tracking-wide text-slate-500">
            {item.label}
          </p>
          <p className="mt-1.5 break-words text-sm font-semibold text-slate-950">
            {item.value || "-"}
          </p>
        </div>
      ))}
    </div>
  );
}
