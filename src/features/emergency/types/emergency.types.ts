// src/features/emergency/types/emergency.types.ts

export type ErSeverity = "critical" | "emergent" | "urgent" | "semi_urgent" | "non_urgent";

export type ErEncounterStatus =
  | "arrived"
  | "triaged"
  | "in_treatment"
  | "under_observation"
  | "admitted"
  | "discharged"
  | "transferred"
  | "left_without_being_seen";

export type ErDisposition =
  | "discharge"
  | "admit_ipd"
  | "transfer"
  | "death"
  | "left_against_medical_advice";

export interface EmergencyEncounter {
  id: string;
  hospital_id: string;
  encounter_number: string;

  patient_id: string;
  patient_name: string;
  patient_uhid?: string | null;

  arrival_time: string;
  chief_complaint: string;

  severity: ErSeverity;
  status: ErEncounterStatus;

  triage_notes?: string | null;
  vitals_summary?: string | null;

  doctor_id?: string | null;
  doctor_name?: string | null;

  bed_number?: string | null;
  disposition?: ErDisposition | null;

  created_at?: string;
  updated_at?: string;
}

export interface EmergencyOrder {
  id: string;
  encounter_id: string;
  order_type: "lab" | "radiology" | "medication" | "procedure" | "observation";
  order_name: string;
  priority: "routine" | "urgent" | "stat";
  status: "ordered" | "in_progress" | "completed" | "cancelled";
  ordered_at: string;
}

export interface EmergencyTimelineItem {
  id: string;
  title: string;
  description?: string | null;
  created_at: string;
  created_by_name?: string | null;
}

export interface EmergencyListParams {
  page?: number;
  size?: number;
  search?: string;
  severity?: ErSeverity;
  status?: ErEncounterStatus;
  doctor_id?: string;
  arrival_date?: string;
}