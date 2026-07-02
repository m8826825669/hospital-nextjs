// src/features/ot/constants/ot.constants.ts

import type { SurgeryStatus } from "../types/ot.types";

export const surgeryStatusOptions: {
  label: string;
  value: SurgeryStatus;
}[] = [
  { label: "Scheduled", value: "scheduled" },
  { label: "Pre-Op", value: "pre_op" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export const anesthesiaTypeOptions = [
  { label: "General", value: "general" },
  { label: "Local", value: "local" },
  { label: "Regional", value: "regional" },
  { label: "Spinal", value: "spinal" },
  { label: "Epidural", value: "epidural" },
];