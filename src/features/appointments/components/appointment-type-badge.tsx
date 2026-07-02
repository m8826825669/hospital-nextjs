// src/features/appointments/components/appointment-type-badge.tsx

import { StatusBadge } from "@/shared/components/enterprise";
import type { AppointmentType } from "../types/appointment.types";

export function AppointmentTypeBadge({ type }: { type: AppointmentType }) {
  const labelMap: Record<AppointmentType, string> = {
    opd: "OPD",
    follow_up: "Follow-up",
    emergency: "Emergency",
    teleconsultation: "Teleconsultation",
  };

  const variantMap: Record<
    AppointmentType,
    "info" | "success" | "warning" | "danger"
  > = {
    opd: "info",
    follow_up: "success",
    emergency: "danger",
    teleconsultation: "warning",
  };

  return <StatusBadge label={labelMap[type]} variant={variantMap[type]} />;
}