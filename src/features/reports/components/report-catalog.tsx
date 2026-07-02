// src/features/reports/components/report-catalog.tsx

"use client";

import { FileBarChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { EmptyState } from "@/shared/components/enterprise";
import type { ReportDefinition } from "../types/reports.types";
import { ReportCategoryBadge } from "./report-category-badge";

interface ReportCatalogProps {
  reports: ReportDefinition[];
  isLoading?: boolean;
  onRun: (report: ReportDefinition) => void;
}

export function ReportCatalog({ reports, isLoading, onRun }: ReportCatalogProps) {
  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading reports...</p>;
  }

  if (!reports.length) {
    return (
      <EmptyState
        title="No reports found"
        description="Try changing filters or check report configuration."
      />
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      {reports.map((report) => (
        <div key={report.id} className="rounded-xl border bg-card p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-3">
              <div className="mt-1 rounded-full bg-muted p-2">
                <FileBarChart className="h-4 w-4 text-muted-foreground" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{report.name}</p>
                  <ReportCategoryBadge category={report.category} />
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  {report.description || "No description provided."}
                </p>

                <p className="mt-2 text-xs text-muted-foreground">
                  {report.module || "General"} • {report.code}
                </p>
              </div>
            </div>

            <Button size="sm" onClick={() => onRun(report)}>
              Run
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
}