// src/features/ot/utils/ot.mapper.ts

import type {
  CompleteSurgeryPayload,
  CreateSurgeryPayload,
  Surgery,
  UpdateSurgeryPayload,
} from "../types/ot.types";
import type {
  CompleteSurgeryFormValues,
  SurgeryFormValues,
} from "../schemas/ot.schema";

function emptyToUndefined(value?: string | null) {
  return value && value.trim() !== "" ? value : undefined;
}

export function surgeryToFormValues(
  surgery: Surgery
): Partial<SurgeryFormValues> {
  return {
    patient_id: surgery.patient_id,
    surgeon_id: surgery.surgeon_id,
    assistant_surgeon_id: surgery.assistant_surgeon_id ?? "",
    theatre_id: surgery.theatre_id,
    scheduled_date: surgery.scheduled_date,
    scheduled_start_time: surgery.scheduled_start_time,
    scheduled_end_time: surgery.scheduled_end_time ?? "",
    procedure_name: surgery.procedure_name,
    diagnosis: surgery.diagnosis ?? "",
    anesthesia_type: surgery.anesthesia_type ?? "",
    notes: surgery.notes ?? "",
  };
}

export function surgeryFormToCreatePayload(
  values: SurgeryFormValues
): CreateSurgeryPayload {
  return {
    patient_id: values.patient_id,
    surgeon_id: values.surgeon_id,
    assistant_surgeon_id: emptyToUndefined(values.assistant_surgeon_id),
    theatre_id: values.theatre_id,
    scheduled_date: values.scheduled_date,
    scheduled_start_time: values.scheduled_start_time,
    scheduled_end_time: emptyToUndefined(values.scheduled_end_time),
    procedure_name: values.procedure_name,
    diagnosis: emptyToUndefined(values.diagnosis),
    anesthesia_type: emptyToUndefined(values.anesthesia_type),
    notes: emptyToUndefined(values.notes),
  };
}

export function surgeryFormToUpdatePayload(
  values: SurgeryFormValues
): UpdateSurgeryPayload {
  return {
    ...surgeryFormToCreatePayload(values),
  };
}

export function completeSurgeryFormToPayload(
  values: CompleteSurgeryFormValues
): CompleteSurgeryPayload {
  return {
    actual_end_time: emptyToUndefined(values.actual_end_time),
    notes: emptyToUndefined(values.notes),
  };
}