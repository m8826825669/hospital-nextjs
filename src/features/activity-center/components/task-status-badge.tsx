// src/features/activity-center/components/task-status-badge.tsx

import { StatusBadge } from "@/shared/components/enterprise";
import type { TaskStatus } from "../types/activity-center.types";

export function TaskStatusBadge({ status }: { status: TaskStatus }) {
  const labelMap: Record<TaskStatus, string> = {
    open: "Open",
    in_progress: "In Progress",
    completed: "Completed",
    cancelled: "Cancelled",
  };

  const variantMap: Record<
    TaskStatus,
    "info" | "warning" | "success" | "danger"
  > = {
    open: "info",
    in_progress: "warning",
    completed: "success",
    cancelled: "danger",
  };

  return <StatusBadge label={labelMap[status]} variant={variantMap[status]} />;
}