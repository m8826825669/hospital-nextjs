// src/features/insurance/utils/insurance.mapper.ts

import type {
  CreateInsuranceClaimPayload,
  InsuranceClaim,
  ReviewInsuranceClaimPayload,
  SettleInsuranceClaimPayload,
  UpdateInsuranceClaimPayload,
} from "../types/insurance.types";
import type {
  InsuranceClaimFormValues,
  InsuranceReviewFormValues,
  InsuranceSettlementFormValues,
} from "../schemas/insurance.schema";

function emptyToUndefined(value?: string | null) {
  return value && value.trim() !== "" ? value : undefined;
}

export function insuranceClaimToFormValues(
  claim: InsuranceClaim
): Partial<InsuranceClaimFormValues> {
  return {
    patient_id: claim.patient_id,
    provider_id: claim.provider_id,
    policy_id: claim.policy_id ?? "",
    invoice_id: claim.invoice_id ?? "",
    claim_date: claim.claim_date,
    claim_amount: claim.claim_amount,
    diagnosis: claim.diagnosis ?? "",
    treatment_summary: claim.treatment_summary ?? "",
    remarks: claim.remarks ?? "",
    priority: claim.priority,
  };
}

export function insuranceClaimFormToCreatePayload(
  values: InsuranceClaimFormValues
): CreateInsuranceClaimPayload {
  return {
    patient_id: values.patient_id,
    provider_id: values.provider_id,
    policy_id: emptyToUndefined(values.policy_id),
    invoice_id: emptyToUndefined(values.invoice_id),
    claim_date: values.claim_date,
    claim_amount: values.claim_amount,
    diagnosis: emptyToUndefined(values.diagnosis),
    treatment_summary: emptyToUndefined(values.treatment_summary),
    remarks: emptyToUndefined(values.remarks),
    priority: values.priority,
  };
}

export function insuranceClaimFormToUpdatePayload(
  values: InsuranceClaimFormValues
): UpdateInsuranceClaimPayload {
  return {
    ...insuranceClaimFormToCreatePayload(values),
  };
}

export function insuranceReviewFormToPayload(
  values: InsuranceReviewFormValues
): ReviewInsuranceClaimPayload {
  return {
    status: values.status,
    approved_amount: values.approved_amount,
    remarks: emptyToUndefined(values.remarks),
  };
}

export function insuranceSettlementFormToPayload(
  values: InsuranceSettlementFormValues
): SettleInsuranceClaimPayload {
  return {
    settlement_date: values.settlement_date,
    settled_amount: values.settled_amount,
    settlement_reference: emptyToUndefined(values.settlement_reference),
    remarks: emptyToUndefined(values.remarks),
  };
}