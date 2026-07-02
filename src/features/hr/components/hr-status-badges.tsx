// src/features/hr/components/hr-status-badges.tsx

import { StatusBadge } from "@/shared/components/enterprise";
import type {
  AttendanceStatus,
  EmployeeStatus,
  LeaveStatus,
} from "../types/hr.types";

export function EmployeeStatusBadge({ status }: { status: EmployeeStatus }) {
  const variantMap: Record<EmployeeStatus, "success" | "muted" | "danger"> = {
    active: "success",
    inactive: "muted",
    terminated: "danger",
  };

  return <StatusBadge label={status.toUpperCase()} variant={variantMap[status]} />;
}

export function AttendanceStatusBadge({
  status,
}: {
  status: AttendanceStatus;
}) {
  const variantMap: Record<
    AttendanceStatus,
    "success" | "danger" | "warning" | "info"
  > = {
    present: "success",
    absent: "danger",
    late: "warning",
    half_day: "info",
  };

  return <StatusBadge label={status.toUpperCase()} variant={variantMap[status]} />;
}

export function LeaveStatusBadge({ status }: { status: LeaveStatus }) {
  const variantMap: Record<
    LeaveStatus,
    "info" | "success" | "danger" | "muted"
  > = {
    pending: "info",
    approved: "success",
    rejected: "danger",
    cancelled: "muted",
  };

  return <StatusBadge label={status.toUpperCase()} variant={variantMap[status]} />;
}