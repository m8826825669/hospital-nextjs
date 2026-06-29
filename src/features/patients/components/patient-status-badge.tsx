// src/features/patients/components/patient-status-badge.tsx

import { StatusBadge } from "@/shared/components/enterprise";
import type { PatientStatus } from "../types/patient.types";

interface PatientStatusBadgeProps {
  status: PatientStatus;
}

export function PatientStatusBadge({ status }: PatientStatusBadgeProps) {
  const labelMap: Record<PatientStatus, string> = {
    active: "Active",
    inactive: "Inactive",
    deceased: "Deceased",
    blocked: "Blocked",
  };

  const variantMap: Record<
    PatientStatus,
    "success" | "muted" | "danger" | "warning"
  > = {
    active: "success",
    inactive: "muted",
    deceased: "danger",
    blocked: "warning",
  };

  return <StatusBadge label={labelMap[status]} variant={variantMap[status]} />;
}