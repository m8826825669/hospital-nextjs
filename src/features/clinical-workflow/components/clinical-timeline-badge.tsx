// src/features/clinical-workflow/components/clinical-timeline-badge.tsx

import { StatusBadge } from "@/shared/components/enterprise";
import type { ClinicalTimelineType } from "../types/clinical-workflow.types";

export function ClinicalTimelineBadge({
  type,
}: {
  type: ClinicalTimelineType;
}) {
  const variantMap: Record<
    ClinicalTimelineType,
    "info" | "warning" | "success" | "danger" | "muted"
  > = {
    appointment: "info",
    opd: "info",
    emergency: "danger",
    ipd: "warning",
    nursing: "warning",
    lab: "success",
    radiology: "success",
    pharmacy: "info",
    billing: "warning",
    insurance: "muted",
  };

  return <StatusBadge label={type.toUpperCase()} variant={variantMap[type]} />;
}