// src/features/ipd/constants/ipd.constants.ts

import type { IpdAdmissionStatus } from "../types/ipd.types";

export const ipdAdmissionStatusOptions: {
  label: string;
  value: IpdAdmissionStatus;
}[] = [
  { label: "Admitted", value: "admitted" },
  { label: "Transferred", value: "transferred" },
  { label: "Discharged", value: "discharged" },
  { label: "Cancelled", value: "cancelled" },
];