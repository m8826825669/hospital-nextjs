// src/features/notifications/constants/notification.constants.ts

import type {
  ActivityModule,
  NotificationPriority,
  NotificationStatus,
  NotificationType,
  TaskStatus,
} from "../types/notification.types";

export const NOTIFICATION_PERMISSIONS = {
  VIEW: "notifications.view",
  UPDATE: "notifications.update",
  TASKS_VIEW: "notifications.tasks.view",
  TASKS_UPDATE: "notifications.tasks.update",
  ACTIVITIES_VIEW: "notifications.activities.view",
};

export const NOTIFICATION_TYPES: {
  label: string;
  value: NotificationType;
}[] = [
  { label: "Info", value: "info" },
  { label: "Success", value: "success" },
  { label: "Warning", value: "warning" },
  { label: "Error", value: "error" },
  { label: "Approval", value: "approval" },
  { label: "Task", value: "task" },
  { label: "System", value: "system" },
];

export const NOTIFICATION_PRIORITIES: {
  label: string;
  value: NotificationPriority;
}[] = [
  { label: "Low", value: "low" },
  { label: "Normal", value: "normal" },
  { label: "High", value: "high" },
  { label: "Urgent", value: "urgent" },
];

export const NOTIFICATION_STATUSES: {
  label: string;
  value: NotificationStatus;
}[] = [
  { label: "Unread", value: "unread" },
  { label: "Read", value: "read" },
  { label: "Archived", value: "archived" },
];

export const TASK_STATUSES: {
  label: string;
  value: TaskStatus;
}[] = [
  { label: "Open", value: "open" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export const ACTIVITY_MODULES: {
  label: string;
  value: ActivityModule;
}[] = [
  { label: "Auth", value: "auth" },
  { label: "Patients", value: "patients" },
  { label: "Appointments", value: "appointments" },
  { label: "OPD", value: "opd" },
  { label: "IPD", value: "ipd" },
  { label: "OT", value: "ot" },
  { label: "LIS", value: "lis" },
  { label: "Pharmacy", value: "pharmacy" },
  { label: "Billing", value: "billing" },
  { label: "Insurance", value: "insurance" },
  { label: "System", value: "system" },
];