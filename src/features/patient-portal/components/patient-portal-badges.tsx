// src/features/patient-portal/components/patient-portal-badges.tsx

import { StatusBadge } from "@/shared/components/enterprise";
import type {
  PortalAppointmentStatus,
  PortalBillStatus,
  PortalReportStatus,
} from "../types/patient-portal.types";

export function PortalAppointmentStatusBadge({
  status,
}: {
  status: PortalAppointmentStatus;
}) {
  const variantMap: Record<
    PortalAppointmentStatus,
    "info" | "warning" | "success" | "danger"
  > = {
    scheduled: "info",
    checked_in: "warning",
    completed: "success",
    cancelled: "danger",
  };

  return <StatusBadge label={status.toUpperCase()} variant={variantMap[status]} />;
}

export function PortalBillStatusBadge({ status }: { status: PortalBillStatus }) {
  const variantMap: Record<
    PortalBillStatus,
    "muted" | "warning" | "success" | "danger"
  > = {
    draft: "muted",
    unpaid: "danger",
    partially_paid: "warning",
    paid: "success",
    cancelled: "danger",
  };

  return <StatusBadge label={status.toUpperCase()} variant={variantMap[status]} />;
}

export function PortalReportStatusBadge({
  status,
}: {
  status: PortalReportStatus;
}) {
  const variantMap: Record<
    PortalReportStatus,
    "info" | "warning" | "success"
  > = {
    pending: "warning",
    ready: "info",
    verified: "success",
    approved: "success",
  };

  return <StatusBadge label={status.toUpperCase()} variant={variantMap[status]} />;
}