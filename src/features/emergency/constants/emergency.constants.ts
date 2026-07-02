// src/features/emergency/constants/emergency.constants.ts

export const erSeverityOptions = [
  { label: "Critical", value: "critical" },
  { label: "Emergent", value: "emergent" },
  { label: "Urgent", value: "urgent" },
  { label: "Semi Urgent", value: "semi_urgent" },
  { label: "Non Urgent", value: "non_urgent" },
];

export const erStatusOptions = [
  { label: "Arrived", value: "arrived" },
  { label: "Triaged", value: "triaged" },
  { label: "In Treatment", value: "in_treatment" },
  { label: "Under Observation", value: "under_observation" },
  { label: "Admitted", value: "admitted" },
  { label: "Discharged", value: "discharged" },
  { label: "Transferred", value: "transferred" },
  { label: "Left Without Being Seen", value: "left_without_being_seen" },
];

export const erDispositionOptions = [
  { label: "Discharge", value: "discharge" },
  { label: "Admit to IPD", value: "admit_ipd" },
  { label: "Transfer", value: "transfer" },
  { label: "Death", value: "death" },
  { label: "Left Against Medical Advice", value: "left_against_medical_advice" },
];

export const emergencyOrderTypeOptions = [
  { label: "Lab", value: "lab" },
  { label: "Radiology", value: "radiology" },
  { label: "Medication", value: "medication" },
  { label: "Procedure", value: "procedure" },
  { label: "Observation", value: "observation" },
];

export const emergencyOrderPriorityOptions = [
  { label: "Routine", value: "routine" },
  { label: "Urgent", value: "urgent" },
  { label: "STAT", value: "stat" },
];