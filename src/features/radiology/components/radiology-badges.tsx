// src/features/radiology/components/radiology-badges.tsx

import { StatusBadge } from "@/shared/components/enterprise";
import type {
  RadiologyModality,
  RadiologyOrderStatus,
} from "../types/radiology.types";

export function RadiologyStatusBadge({
  status,
}: {
  status: RadiologyOrderStatus;
}) {
  const variantMap: Record<
    RadiologyOrderStatus,
    "info" | "warning" | "success" | "danger" | "muted"
  > = {
    ordered: "info",
    scheduled: "info",
    in_progress: "warning",
    reported: "warning",
    verified: "success",
    approved: "success",
    cancelled: "danger",
  };

  return <StatusBadge label={status.toUpperCase()} variant={variantMap[status]} />;
}

export function RadiologyModalityBadge({
  modality,
}: {
  modality: RadiologyModality;
}) {
  return <StatusBadge label={modality.toUpperCase()} variant="info" />;
}