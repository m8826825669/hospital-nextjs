// src/features/ipd/components/ipd-status-badge.tsx

import { StatusBadge } from "@/shared/components/enterprise";
import type { IpdAdmissionStatus } from "../types/ipd.types";

export function IpdStatusBadge({
  status,
}: {
  status: IpdAdmissionStatus;
}) {
  const labelMap: Record<IpdAdmissionStatus, string> = {
    admitted: "Admitted",
    transferred: "Transferred",
    discharged: "Discharged",
    cancelled: "Cancelled",
  };

  const variantMap: Record<
    IpdAdmissionStatus,
    "success" | "warning" | "info" | "danger"
  > = {
    admitted: "success",
    transferred: "warning",
    discharged: "info",
    cancelled: "danger",
  };

  return <StatusBadge label={labelMap[status]} variant={variantMap[status]} />;
}