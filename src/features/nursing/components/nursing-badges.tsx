// src/features/nursing/components/nursing-badges.tsx

import { StatusBadge } from "@/shared/components/enterprise";
import type {
  MedicationAdminStatus,
  NursingTaskPriority,
  NursingTaskStatus,
} from "../types/nursing.types";

export function NursingTaskStatusBadge({
  status,
}: {
  status: NursingTaskStatus;
}) {
  const variantMap: Record<
    NursingTaskStatus,
    "info" | "warning" | "success" | "danger"
  > = {
    pending: "info",
    in_progress: "warning",
    completed: "success",
    cancelled: "danger",
  };

  return <StatusBadge label={status.toUpperCase()} variant={variantMap[status]} />;
}

export function NursingTaskPriorityBadge({
  priority,
}: {
  priority: NursingTaskPriority;
}) {
  const variantMap: Record<
    NursingTaskPriority,
    "muted" | "info" | "warning" | "danger"
  > = {
    low: "muted",
    normal: "info",
    high: "warning",
    urgent: "danger",
  };

  return <StatusBadge label={priority.toUpperCase()} variant={variantMap[priority]} />;
}

export function MedicationAdminStatusBadge({
  status,
}: {
  status: MedicationAdminStatus;
}) {
  const variantMap: Record<
    MedicationAdminStatus,
    "info" | "success" | "warning" | "danger"
  > = {
    scheduled: "info",
    administered: "success",
    skipped: "warning",
    held: "danger",
  };

  return <StatusBadge label={status.toUpperCase()} variant={variantMap[status]} />;
}