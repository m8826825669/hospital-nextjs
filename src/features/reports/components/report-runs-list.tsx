// src/features/reports/components/report-runs-list.tsx

"use client";

import { Download, FileText } from "lucide-react";
import { EmptyState } from "@/shared/components/enterprise";
import { Button } from "@/components/ui/button";
import type { ReportRun } from "../types/reports.types";
import { ReportRunStatusBadge } from "./report-run-status-badge";

interface ReportRunsListProps {
  runs: ReportRun[];
  isLoading?: boolean;
}

export function ReportRunsList({ runs, isLoading }: ReportRunsListProps) {
  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading report history...</p>;
  }

  if (!runs.length) {
    return (
      <EmptyState
        title="No report runs"
        description="Generated reports will appear here."
      />
    );
  }

  return (
    <div className="space-y-3">
      {runs.map((run) => (
        <div key={run.id} className="rounded-xl border bg-card p-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex gap-3">
              <div className="mt-1 rounded-full bg-muted p-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{run.report_name}</p>
                  <ReportRunStatusBadge status={run.status} />
                </div>

                <p className="mt-1 text-sm text-muted-foreground">
                  Format: {run.format.toUpperCase()}
                </p>

                <p className="mt-2 text-xs text-muted-foreground">
                  {run.created_by_name || "System"} • {run.created_at}
                </p>
              </div>
            </div>

            {run.file_url && (
              <Button asChild variant="outline" size="sm">
                <a href={run.file_url} target="_blank" rel="noreferrer">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </a>
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}