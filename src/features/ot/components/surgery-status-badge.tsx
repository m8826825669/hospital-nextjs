// src/features/ot/components/surgery-status-badge.tsx

import { StatusBadge } from "@/shared/components/enterprise";
import type { SurgeryStatus } from "../types/ot.types";

export function SurgeryStatusBadge({ status }: { status: SurgeryStatus }) {
  const labelMap: Record<SurgeryStatus, string> = {
    scheduled: "Scheduled",
    pre_op: "Pre-Op",
    in_progress: "In Progress",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  const variantMap: Record<
    SurgeryStatus,
    "info" | "warning" | "success" | "danger"
  > = {
    scheduled: "info",
    pre_op: "warning",
    in_progress: "warning",
    completed: "success",
    cancelled: "danger",
  };

  return <StatusBadge label={labelMap[status]} variant={variantMap[status]} />;
}