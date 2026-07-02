// src/features/pharmacy/components/medicine-status-badge.tsx

import { StatusBadge } from "@/shared/components/enterprise";
import type { MedicineStatus } from "../types/pharmacy.types";

export function MedicineStatusBadge({ status }: { status: MedicineStatus }) {
  const labelMap: Record<MedicineStatus, string> = {
    active: "Active",
    inactive: "Inactive",
    discontinued: "Discontinued",
  };

  const variantMap: Record<MedicineStatus, "success" | "muted" | "danger"> = {
    active: "success",
    inactive: "muted",
    discontinued: "danger",
  };

  return <StatusBadge label={labelMap[status]} variant={variantMap[status]} />;
}