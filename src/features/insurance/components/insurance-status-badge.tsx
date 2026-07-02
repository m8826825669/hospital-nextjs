// src/features/insurance/components/insurance-status-badge.tsx

import { StatusBadge } from "@/shared/components/enterprise";
import type { InsuranceClaimStatus } from "../types/insurance.types";

export function InsuranceStatusBadge({
  status,
}: {
  status: InsuranceClaimStatus;
}) {
  const labelMap: Record<InsuranceClaimStatus, string> = {
    draft: "Draft",
    submitted: "Submitted",
    under_review: "Under Review",
    approved: "Approved",
    rejected: "Rejected",
    settled: "Settled",
    cancelled: "Cancelled",
  };

  const variantMap: Record<
    InsuranceClaimStatus,
    "info" | "warning" | "success" | "danger" | "muted"
  > = {
    draft: "muted",
    submitted: "info",
    under_review: "warning",
    approved: "success",
    rejected: "danger",
    settled: "success",
    cancelled: "danger",
  };

  return <StatusBadge label={labelMap[status]} variant={variantMap[status]} />;
}