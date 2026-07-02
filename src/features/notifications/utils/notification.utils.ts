// src/features/notifications/utils/notification.utils.ts

import type {
  NotificationPriority,
  NotificationStatus,
  NotificationType,
  TaskStatus,
} from "../types/notification.types";

export function formatNotificationLabel(value: string): string {
  return value
    .split("_")
    .map((item) => item[0]?.toUpperCase() + item.slice(1))
    .join(" ");
}

export function getNotificationTypeVariant(type: NotificationType): string {
  const map: Record<NotificationType, string> = {
    info: "info",
    success: "success",
    warning: "warning",
    error: "destructive",
    approval: "warning",
    task: "secondary",
    system: "secondary",
  };

  return map[type];
}

export function getPriorityVariant(priority: NotificationPriority): string {
  const map: Record<NotificationPriority, string> = {
    low: "secondary",
    normal: "info",
    high: "warning",
    urgent: "destructive",
  };

  return map[priority];
}

export function getNotificationStatusVariant(
  status: NotificationStatus,
): string {
  const map: Record<NotificationStatus, string> = {
    unread: "info",
    read: "secondary",
    archived: "secondary",
  };

  return map[status];
}

export function getTaskStatusVariant(status: TaskStatus): string {
  const map: Record<TaskStatus, string> = {
    open: "warning",
    in_progress: "info",
    completed: "success",
    cancelled: "secondary",
  };

  return map[status];
}