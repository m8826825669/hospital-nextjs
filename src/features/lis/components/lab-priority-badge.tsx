// src/features/lis/components/lab-priority-badge.tsx

import { StatusBadge } from "@/shared/components/enterprise";
import type { LabPriority } from "../types/lis.types";

export function LabPriorityBadge({ priority }: { priority: LabPriority }) {
  const variantMap: Record<LabPriority, "info" | "warning" | "danger"> = {
    routine: "info",
    urgent: "warning",
    stat: "danger",
  };

  return <StatusBadge label={priority.toUpperCase()} variant={variantMap[priority]} />;
}