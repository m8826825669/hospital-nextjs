// src/features/lis/constants/lis.constants.ts

import type { LabPriority, LabSampleStatus } from "../types/lis.types";

export const labSampleStatusOptions: {
  label: string;
  value: LabSampleStatus;
}[] = [
  { label: "Collected", value: "collected" },
  { label: "Received", value: "received" },
  { label: "Processing", value: "processing" },
  { label: "Result Entered", value: "result_entered" },
  { label: "Verified", value: "verified" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

export const labPriorityOptions: {
  label: string;
  value: LabPriority;
}[] = [
  { label: "Routine", value: "routine" },
  { label: "Urgent", value: "urgent" },
  { label: "STAT", value: "stat" },
];