// src/features/opd/utils/opd.mapper.ts

import type {
  CreateOpdEncounterPayload,
  OpdEncounter,
  UpdateOpdEncounterPayload,
} from "../types/opd.types";
import type { OpdEncounterFormValues } from "../schemas/opd.schema";

function emptyToUndefined(value?: string | null) {
  return value && value.trim() !== "" ? value : undefined;
}

export function opdEncounterToFormValues(
  encounter: OpdEncounter
): Partial<OpdEncounterFormValues> {
  return {
    patient_id: encounter.patient_id,
    doctor_id: encounter.doctor_id,
    appointment_id: encounter.appointment_id ?? "",

    visit_date: encounter.visit_date,
    visit_time: encounter.visit_time ?? "",

    chief_complaint: encounter.chief_complaint ?? "",
    history_of_present_illness:
      encounter.history_of_present_illness ?? "",

    diagnosis: encounter.diagnosis ?? "",
    provisional_diagnosis: encounter.provisional_diagnosis ?? "",
    final_diagnosis: encounter.final_diagnosis ?? "",

    notes: encounter.notes ?? "",
    follow_up_date: encounter.follow_up_date ?? "",
  };
}

export function opdFormToCreatePayload(
  values: OpdEncounterFormValues
): CreateOpdEncounterPayload {
  return {
    patient_id: values.patient_id,
    doctor_id: values.doctor_id,
    appointment_id: emptyToUndefined(values.appointment_id),

    visit_date: values.visit_date,
    visit_time: emptyToUndefined(values.visit_time),

    chief_complaint: emptyToUndefined(values.chief_complaint),
    history_of_present_illness: emptyToUndefined(
      values.history_of_present_illness
    ),

    diagnosis: emptyToUndefined(values.diagnosis),
    provisional_diagnosis: emptyToUndefined(values.provisional_diagnosis),
    final_diagnosis: emptyToUndefined(values.final_diagnosis),

    notes: emptyToUndefined(values.notes),
    follow_up_date: emptyToUndefined(values.follow_up_date),
  };
}

export function opdFormToUpdatePayload(
  values: OpdEncounterFormValues
): UpdateOpdEncounterPayload {
  return {
    ...opdFormToCreatePayload(values),
  };
}