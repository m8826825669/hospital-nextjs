// src/features/admin/components/bed-status-badge.tsx

import { StatusBadge } from "@/shared/components/enterprise";
import type { BedStatus } from "../types/admin.types";

export function BedStatusBadge({ status }: { status: BedStatus }) {
  const variantMap: Record<
    BedStatus,
    "success" | "warning" | "danger" | "info" | "muted"
  > = {
    AVAILABLE: "success",
    OCCUPIED: "danger",
    CLEANING: "warning",
    MAINTENANCE: "warning",
    RESERVED: "info",
  };

  const label = status
    .split("_")
    .map((part) => part.charAt(0) + part.slice(1).toLowerCase())
    .join(" ");

  return <StatusBadge label={label} variant={variantMap[status] ?? "muted"} />;
}
