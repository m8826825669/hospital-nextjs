// src/features/opd/types/opd.types.ts

export type OpdEncounterStatus =
  | "open"
  | "in_progress"
  | "completed"
  | "cancelled";

export interface OpdEncounter {
  id: string;
  hospital_id: string;

  patient_id: string;
  patient_name: string;
  patient_uhid?: string | null;

  doctor_id: string;
  doctor_name: string;

  appointment_id?: string | null;
  appointment_date?: string | null;

  visit_date: string;
  visit_time?: string | null;

  chief_complaint?: string | null;
  history_of_present_illness?: string | null;

  diagnosis?: string | null;
  provisional_diagnosis?: string | null;
  final_diagnosis?: string | null;

  notes?: string | null;
  follow_up_date?: string | null;

  status: OpdEncounterStatus;

  created_at?: string;
  updated_at?: string;
}

export interface OpdListParams {
  page?: number;
  size?: number;
  search?: string;
  visit_date?: string;
  patient_id?: string;
  doctor_id?: string;
  appointment_id?: string;
  status?: OpdEncounterStatus;
}

export interface CreateOpdEncounterPayload {
  patient_id: string;
  doctor_id: string;
  appointment_id?: string;

  visit_date: string;
  visit_time?: string;

  chief_complaint?: string;
  history_of_present_illness?: string;

  diagnosis?: string;
  provisional_diagnosis?: string;
  final_diagnosis?: string;

  notes?: string;
  follow_up_date?: string;
}

export interface UpdateOpdEncounterPayload
  extends Partial<CreateOpdEncounterPayload> {
  status?: OpdEncounterStatus;
}

export interface OpdPrescriptionItem {
  id: string;
  opd_encounter_id: string;
  medicine_name: string;
  dosage?: string | null;
  frequency?: string | null;
  duration?: string | null;
  instructions?: string | null;
}

export interface OpdLabOrder {
  id: string;
  opd_encounter_id: string;
  test_name: string;
  priority?: "routine" | "urgent" | "stat";
  notes?: string | null;
  status?: string | null;
}

export interface OpdTimelineItem {
  id: string;
  title: string;
  description?: string | null;
  created_at: string;
  created_by_name?: string | null;
}