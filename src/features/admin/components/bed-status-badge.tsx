// src/features/admin/components/bed-status-badge.tsx

import { StatusBadge } from "@/shared/components/enterprise";
import type { BedStatus } from "../types/admin.types";

export function BedStatusBadge({ status }: { status: BedStatus }) {
  const variantMap: Record<
    BedStatus,
    "success" | "warning" | "danger" | "info"
  > = {
    available: "success",
    occupied: "danger",
    maintenance: "warning",
    reserved: "info",
  };

  return <StatusBadge label={status.toUpperCase()} variant={variantMap[status]} />;
}