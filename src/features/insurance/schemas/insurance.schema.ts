// src/features/insurance/schemas/insurance.schema.ts

import { z } from "zod";

export const insuranceClaimFormSchema = z.object({
  patient_id: z.string().min(1, "Patient is required"),
  provider_id: z.string().min(1, "Provider is required"),
  policy_id: z.string().optional(),
  invoice_id: z.string().optional(),
  claim_date: z.string().min(1, "Claim date is required"),
  claim_amount: z.coerce.number().min(1, "Claim amount is required"),
  diagnosis: z.string().optional(),
  treatment_summary: z.string().optional(),
  remarks: z.string().optional(),
  priority: z.enum(["low", "normal", "high", "urgent"]),
});

export const insuranceReviewFormSchema = z.object({
  status: z.enum(["approved", "rejected", "under_review"]),
  approved_amount: z.coerce.number().min(0).optional(),
  remarks: z.string().optional(),
});

export const insuranceSettlementFormSchema = z.object({
  settlement_date: z.string().min(1, "Settlement date is required"),
  settled_amount: z.coerce.number().min(1, "Settlement amount is required"),
  settlement_reference: z.string().optional(),
  remarks: z.string().optional(),
});

export type InsuranceClaimFormInput = z.input<
  typeof insuranceClaimFormSchema
>;
export type InsuranceClaimFormValues = z.output<
  typeof insuranceClaimFormSchema
>;

export type InsuranceReviewFormInput = z.input<
  typeof insuranceReviewFormSchema
>;
export type InsuranceReviewFormValues = z.output<
  typeof insuranceReviewFormSchema
>;

export type InsuranceSettlementFormInput = z.input<
  typeof insuranceSettlementFormSchema
>;
export type InsuranceSettlementFormValues = z.output<
  typeof insuranceSettlementFormSchema
>;