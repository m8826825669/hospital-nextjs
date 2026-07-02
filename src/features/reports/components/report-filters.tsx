// src/features/reports/components/report-filters.tsx

"use client";

import { Button } from "@/components/ui/button";
import { reportCategoryOptions, reportModuleOptions } from "../constants/reports.constants";

interface ReportFiltersProps {
  category: string;
  module: string;
  onCategoryChange: (value: string) => void;
  onModuleChange: (value: string) => void;
  onReset: () => void;
}

export function ReportFilters({
  category,
  module,
  onCategoryChange,
  onModuleChange,
  onReset,
}: ReportFiltersProps) {
  return (
    <div className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-3">
      <select
        className="h-10 rounded-md border bg-background px-3 text-sm"
        value={category}
        onChange={(event) => onCategoryChange(event.target.value)}
      >
        <option value="">All Categories</option>
        {reportCategoryOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <select
        className="h-10 rounded-md border bg-background px-3 text-sm"
        value={module}
        onChange={(event) => onModuleChange(event.target.value)}
      >
        <option value="">All Modules</option>
        {reportModuleOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      <Button variant="outline" onClick={onReset}>
        Reset
      </Button>
    </div>
  );
}