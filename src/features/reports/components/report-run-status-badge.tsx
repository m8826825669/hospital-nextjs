// src/features/reports/components/report-run-status-badge.tsx

import { StatusBadge } from "@/shared/components/enterprise";
import type { ReportRun } from "../types/reports.types";

export function ReportRunStatusBadge({
  status,
}: {
  status: ReportRun["status"];
}) {
  const variantMap: Record<
    ReportRun["status"],
    "info" | "warning" | "success" | "danger"
  > = {
    queued: "info",
    running: "warning",
    completed: "success",
    failed: "danger",
  };

  return <StatusBadge label={status.toUpperCase()} variant={variantMap[status]} />;
}