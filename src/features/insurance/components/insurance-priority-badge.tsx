// src/features/insurance/components/insurance-priority-badge.tsx

import { StatusBadge } from "@/shared/components/enterprise";
import type { InsuranceClaimPriority } from "../types/insurance.types";

export function InsurancePriorityBadge({
  priority,
}: {
  priority: InsuranceClaimPriority;
}) {
  const variantMap: Record<
    InsuranceClaimPriority,
    "info" | "warning" | "danger" | "muted"
  > = {
    low: "muted",
    normal: "info",
    high: "warning",
    urgent: "danger",
  };

  return (
    <StatusBadge label={priority.toUpperCase()} variant={variantMap[priority]} />
  );
}