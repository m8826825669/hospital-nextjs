// src/features/appointments/components/appointment-status-badge.tsx

import { StatusBadge } from "@/shared/components/enterprise";
import type { AppointmentStatus } from "../types/appointment.types";

export function AppointmentStatusBadge({
  status,
}: {
  status: AppointmentStatus;
}) {
  const labelMap: Record<AppointmentStatus, string> = {
    scheduled: "Scheduled",
    checked_in: "Checked In",
    in_consultation: "In Consultation",
    completed: "Completed",
    cancelled: "Cancelled",
    no_show: "No Show",
  };

  const variantMap: Record<
    AppointmentStatus,
    "success" | "warning" | "info" | "muted" | "danger"
  > = {
    scheduled: "info",
    checked_in: "warning",
    in_consultation: "warning",
    completed: "success",
    cancelled: "danger",
    no_show: "muted",
  };

  return <StatusBadge label={labelMap[status]} variant={variantMap[status]} />;
}