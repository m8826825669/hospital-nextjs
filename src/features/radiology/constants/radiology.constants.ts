// src/features/radiology/constants/radiology.constants.ts

export const radiologyModalityOptions = [
  { label: "X-Ray", value: "xray" },
  { label: "CT", value: "ct" },
  { label: "MRI", value: "mri" },
  { label: "Ultrasound", value: "ultrasound" },
  { label: "Doppler", value: "doppler" },
  { label: "Fluoroscopy", value: "fluoroscopy" },
];

export const radiologyStatusOptions = [
  { label: "Ordered", value: "ordered" },
  { label: "Scheduled", value: "scheduled" },
  { label: "In Progress", value: "in_progress" },
  { label: "Reported", value: "reported" },
  { label: "Verified", value: "verified" },
  { label: "Approved", value: "approved" },
  { label: "Cancelled", value: "cancelled" },
];

export const radiologyPriorityOptions = [
  { label: "Routine", value: "routine" },
  { label: "Urgent", value: "urgent" },
  { label: "STAT", value: "stat" },
];