// src/features/insurance/types/insurance.types.ts

export type InsuranceClaimStatus =
  | "draft"
  | "submitted"
  | "under_review"
  | "approved"
  | "rejected"
  | "settled"
  | "cancelled";

export type InsuranceClaimPriority = "low" | "normal" | "high" | "urgent";

export type InsuranceSettlementStatus =
  | "pending"
  | "partially_settled"
  | "settled"
  | "failed";

export interface InsuranceClaim {
  id: string;
  hospital_id: string;

  claim_number: string;

  patient_id: string;
  patient_name: string;
  patient_uhid?: string | null;

  provider_id: string;
  provider_name: string;

  policy_id?: string | null;
  policy_number?: string | null;

  invoice_id?: string | null;
  invoice_number?: string | null;

  claim_date: string;
  claim_amount: number;
  approved_amount?: number | null;
  settled_amount?: number | null;

  diagnosis?: string | null;
  treatment_summary?: string | null;
  remarks?: string | null;

  status: InsuranceClaimStatus;
  priority: InsuranceClaimPriority;

  created_at?: string;
  updated_at?: string;
}

export interface InsuranceListParams {
  page?: number;
  size?: number;
  search?: string;
  status?: InsuranceClaimStatus;
  priority?: InsuranceClaimPriority;
  provider_id?: string;
  patient_id?: string;
  claim_date?: string;
}

export interface CreateInsuranceClaimPayload {
  patient_id: string;
  provider_id: string;
  policy_id?: string;
  invoice_id?: string;
  claim_date: string;
  claim_amount: number;
  diagnosis?: string;
  treatment_summary?: string;
  remarks?: string;
  priority: InsuranceClaimPriority;
}

export interface UpdateInsuranceClaimPayload
  extends Partial<CreateInsuranceClaimPayload> {
  status?: InsuranceClaimStatus;
  approved_amount?: number;
  settled_amount?: number;
}

export interface ReviewInsuranceClaimPayload {
  status: "approved" | "rejected" | "under_review";
  approved_amount?: number;
  remarks?: string;
}

export interface SettleInsuranceClaimPayload {
  settlement_date: string;
  settled_amount: number;
  settlement_reference?: string;
  remarks?: string;
}

export interface InsuranceSettlement {
  id: string;
  claim_id: string;
  settlement_date: string;
  settled_amount: number;
  settlement_reference?: string | null;
  status: InsuranceSettlementStatus;
  remarks?: string | null;
  created_at?: string;
}

export interface InsuranceTimelineItem {
  id: string;
  title: string;
  description?: string | null;
  created_at: string;
  created_by_name?: string | null;
}