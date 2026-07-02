// src/features/insurance/constants/insurance.constants.ts

import type {
  InsuranceClaimPriority,
  InsuranceClaimStatus,
} from "../types/insurance.types";

export const insuranceClaimStatusOptions: {
  label: string;
  value: InsuranceClaimStatus;
}[] = [
  { label: "Draft", value: "draft" },
  { label: "Submitted", value: "submitted" },
  { label: "Under Review", value: "under_review" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
  { label: "Settled", value: "settled" },
  { label: "Cancelled", value: "cancelled" },
];

export const insuranceClaimPriorityOptions: {
  label: string;
  value: InsuranceClaimPriority;
}[] = [
  { label: "Low", value: "low" },
  { label: "Normal", value: "normal" },
  { label: "High", value: "high" },
  { label: "Urgent", value: "urgent" },
];