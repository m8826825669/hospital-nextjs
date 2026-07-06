"use client";

import type { ReactNode } from "react";

import { Button } from "@/components/ui/button";

interface FilterPanelProps {
  title?: string;
  description?: string;
  children: ReactNode;
  onReset?: () => void;
  onApply?: () => void;
}

export function FilterPanel({
  title = "Advanced filters",
  description = "Narrow records using operational criteria.",
  children,
  onReset,
  onApply,
}: FilterPanelProps) {
  return (
    <div className="rounded-2xl border bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-3 border-b pb-4 md:flex-row md:items-start md:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">{title}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>

        <div className="flex items-center gap-2">
          {onReset && (
            <Button type="button" variant="ghost" size="sm" onClick={onReset}>
              Reset
            </Button>
          )}
          {onApply && (
            <Button type="button" size="sm" onClick={onApply}>
              Apply filters
            </Button>
          )}
        </div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2 xl:grid-cols-4">{children}</div>
    </div>
  );
}
