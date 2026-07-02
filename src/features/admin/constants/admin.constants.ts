// src/features/admin/constants/admin.constants.ts

import type { BedStatus } from "../types/admin.types";

export const bedStatusOptions: { label: string; value: BedStatus }[] = [
  { label: "Available", value: "available" },
  { label: "Occupied", value: "occupied" },
  { label: "Maintenance", value: "maintenance" },
  { label: "Reserved", value: "reserved" },
];