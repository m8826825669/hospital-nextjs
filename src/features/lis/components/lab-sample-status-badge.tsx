// src/features/lis/components/lab-sample-status-badge.tsx

import { StatusBadge } from "@/shared/components/enterprise";
import type { LabSampleStatus } from "../types/lis.types";

export function LabSampleStatusBadge({
  status,
}: {
  status: LabSampleStatus;
}) {
  const labelMap: Record<LabSampleStatus, string> = {
    collected: "Collected",
    received: "Received",
    processing: "Processing",
    result_entered: "Result Entered",
    verified: "Verified",
    approved: "Approved",
    rejected: "Rejected",
  };

  const variantMap: Record<
    LabSampleStatus,
    "info" | "warning" | "success" | "danger" | "muted"
  > = {
    collected: "info",
    received: "info",
    processing: "warning",
    result_entered: "warning",
    verified: "success",
    approved: "success",
    rejected: "danger",
  };

  return <StatusBadge label={labelMap[status]} variant={variantMap[status]} />;
}