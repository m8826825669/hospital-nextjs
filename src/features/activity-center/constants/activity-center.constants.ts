// src/features/activity-center/constants/activity-center.constants.ts

import type {
  NotificationPriority,
  NotificationType,
  TaskStatus,
} from "../types/activity-center.types";

export const notificationTypeOptions: {
  label: string;
  value: NotificationType;
}[] = [
  { label: "Info", value: "info" },
  { label: "Success", value: "success" },
  { label: "Warning", value: "warning" },
  { label: "Error", value: "error" },
  { label: "Task", value: "task" },
];

export const notificationPriorityOptions: {
  label: string;
  value: NotificationPriority;
}[] = [
  { label: "Low", value: "low" },
  { label: "Normal", value: "normal" },
  { label: "High", value: "high" },
  { label: "Urgent", value: "urgent" },
];

export const taskStatusOptions: {
  label: string;
  value: TaskStatus;
}[] = [
  { label: "Open", value: "open" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export const moduleOptions = [
  { label: "Patients", value: "patients" },
  { label: "Appointments", value: "appointments" },
  { label: "OPD", value: "opd" },
  { label: "Pharmacy", value: "pharmacy" },
  { label: "Billing", value: "billing" },
  { label: "IPD", value: "ipd" },
  { label: "OT", value: "ot" },
  { label: "LIS", value: "lis" },
  { label: "Insurance", value: "insurance" },
];