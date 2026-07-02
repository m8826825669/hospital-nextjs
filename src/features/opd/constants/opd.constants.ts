// src/features/opd/constants/opd.constants.ts

import type { OpdEncounterStatus } from "../types/opd.types";

export const opdStatusOptions: {
  label: string;
  value: OpdEncounterStatus;
}[] = [
  { label: "Open", value: "open" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
];

export const labPriorityOptions = [
  { label: "Routine", value: "routine" },
  { label: "Urgent", value: "urgent" },
  { label: "STAT", value: "stat" },
];