// src/features/nursing/constants/nursing.constants.ts

export const nursingTaskPriorityOptions = [
  { label: "Low", value: "low" },
  { label: "Normal", value: "normal" },
  { label: "High", value: "high" },
  { label: "Urgent", value: "urgent" },
];

export const nursingTaskStatusOptions = [
  { label: "Pending", value: "pending" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export const medicationAdminStatusOptions = [
  { label: "Scheduled", value: "scheduled" },
  { label: "Administered", value: "administered" },
  { label: "Skipped", value: "skipped" },
  { label: "Held", value: "held" },
];