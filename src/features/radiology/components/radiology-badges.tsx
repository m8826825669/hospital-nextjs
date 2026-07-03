// src/features/radiology/components/radiology-badges.tsx

import { StatusBadge } from "@/shared/components/enterprise";

export function ModalityBadge({ modality }: { modality: string }) {
  return <StatusBadge label={modality.toUpperCase()} variant="info" />;
}

export function PriorityBadge({ priority }: { priority: string }) {
  const variant = priority === "stat" ? "danger" : priority === "urgent" ? "warning" : "info";
  return <StatusBadge label={priority.toUpperCase()} variant={variant} />;
}

export function RadiologyOrderStatusBadge({ status }: { status: string }) {
  const variant =
    status === "approved" || status === "completed"
      ? "success"
      : status === "cancelled"
        ? "danger"
        : status === "urgent" || status === "in_progress" || status === "reporting"
          ? "warning"
          : "info";
  return <StatusBadge label={status.replaceAll("_", " ").toUpperCase()} variant={variant} />;
}

export function RadiologyReportStatusBadge({ status }: { status: string }) {
  const variant = status === "approved" ? "success" : status === "amended" ? "warning" : status === "verified" ? "info" : "warning";
  return <StatusBadge label={status.toUpperCase()} variant={variant} />;
}
