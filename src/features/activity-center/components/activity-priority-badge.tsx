// src/features/activity-center/components/activity-priority-badge.tsx

import { StatusBadge } from "@/shared/components/enterprise";
import type { NotificationPriority } from "../types/activity-center.types";

export function ActivityPriorityBadge({
  priority,
}: {
  priority: NotificationPriority;
}) {
  const variantMap: Record<
    NotificationPriority,
    "muted" | "info" | "warning" | "danger"
  > = {
    low: "muted",
    normal: "info",
    high: "warning",
    urgent: "danger",
  };

  return (
    <StatusBadge label={priority.toUpperCase()} variant={variantMap[priority]} />
  );
}