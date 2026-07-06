// src/features/admin/constants/admin.constants.ts

import type { BedStatus } from "../types/admin.types";

export const bedStatusOptions: { label: string; value: BedStatus }[] = [
  { label: "Available", value: "AVAILABLE" },
  { label: "Occupied", value: "OCCUPIED" },
  { label: "Cleaning", value: "CLEANING" },
  { label: "Maintenance", value: "MAINTENANCE" },
  { label: "Reserved", value: "RESERVED" },
];

export const bedTypeOptions = [
  { label: "General", value: "GENERAL" },
  { label: "Semi Private", value: "SEMI_PRIVATE" },
  { label: "Private", value: "PRIVATE" },
  { label: "ICU", value: "ICU" },
  { label: "NICU", value: "NICU" },
  { label: "PICU", value: "PICU" },
  { label: "Emergency", value: "EMERGENCY" },
  { label: "Isolation", value: "ISOLATION" },
];
