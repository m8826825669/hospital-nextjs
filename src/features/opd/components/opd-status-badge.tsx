// src/features/opd/components/opd-status-badge.tsx

import { StatusBadge } from "@/shared/components/enterprise";
import type { OpdEncounterStatus } from "../types/opd.types";

export function OpdStatusBadge({
  status,
}: {
  status: OpdEncounterStatus;
}) {
  const labelMap: Record<OpdEncounterStatus, string> = {
    open: "Open",
    in_progress: "In Progress",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  const variantMap: Record<
    OpdEncounterStatus,
    "info" | "warning" | "success" | "danger"
  > = {
    open: "info",
    in_progress: "warning",
    completed: "success",
    cancelled: "danger",
  };

  return <StatusBadge label={labelMap[status]} variant={variantMap[status]} />;
}