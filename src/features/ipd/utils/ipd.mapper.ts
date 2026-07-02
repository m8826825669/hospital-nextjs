// src/features/ipd/utils/ipd.mapper.ts

import type {
  CreateIpdAdmissionPayload,
  IpdAdmission,
  IpdDischargePayload,
  IpdTransferPayload,
  UpdateIpdAdmissionPayload,
} from "../types/ipd.types";
import type {
  IpdAdmissionFormValues,
  IpdDischargeFormValues,
  IpdTransferFormValues,
} from "../schemas/ipd.schema";

function emptyToUndefined(value?: string | null) {
  return value && value.trim() !== "" ? value : undefined;
}

export function ipdAdmissionToFormValues(
  admission: IpdAdmission
): Partial<IpdAdmissionFormValues> {
  return {
    patient_id: admission.patient_id,
    doctor_id: admission.doctor_id,
    department_id: admission.department_id ?? "",
    ward_id: admission.ward_id ?? "",
    bed_id: admission.bed_id ?? "",
    admission_date: admission.admission_date,
    admission_time: admission.admission_time ?? "",
    diagnosis: admission.diagnosis ?? "",
    reason_for_admission: admission.reason_for_admission ?? "",
    notes: admission.notes ?? "",
  };
}

export function ipdFormToCreatePayload(
  values: IpdAdmissionFormValues
): CreateIpdAdmissionPayload {
  return {
    patient_id: values.patient_id,
    doctor_id: values.doctor_id,
    department_id: emptyToUndefined(values.department_id),
    ward_id: emptyToUndefined(values.ward_id),
    bed_id: emptyToUndefined(values.bed_id),
    admission_date: values.admission_date,
    admission_time: emptyToUndefined(values.admission_time),
    diagnosis: emptyToUndefined(values.diagnosis),
    reason_for_admission: emptyToUndefined(values.reason_for_admission),
    notes: emptyToUndefined(values.notes),
  };
}

export function ipdFormToUpdatePayload(
  values: IpdAdmissionFormValues
): UpdateIpdAdmissionPayload {
  return {
    ...ipdFormToCreatePayload(values),
  };
}

export function ipdTransferFormToPayload(
  values: IpdTransferFormValues
): IpdTransferPayload {
  return {
    ward_id: emptyToUndefined(values.ward_id),
    bed_id: values.bed_id,
    transfer_reason: emptyToUndefined(values.transfer_reason),
  };
}

export function ipdDischargeFormToPayload(
  values: IpdDischargeFormValues
): IpdDischargePayload {
  return {
    discharge_date: values.discharge_date,
    discharge_time: emptyToUndefined(values.discharge_time),
    discharge_summary: emptyToUndefined(values.discharge_summary),
  };
}