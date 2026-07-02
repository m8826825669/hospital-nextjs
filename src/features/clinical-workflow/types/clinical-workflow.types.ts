// src/features/clinical-workflow/types/clinical-workflow.types.ts

export type ClinicalTimelineType =
  | "appointment"
  | "opd"
  | "ipd"
  | "nursing"
  | "emergency"
  | "lab"
  | "radiology"
  | "pharmacy"
  | "billing"
  | "insurance";

export interface ClinicalPatientContext {
  patient_id: string;
  patient_name: string;
  patient_uhid?: string | null;
  gender?: string | null;
  age?: number | null;
  phone?: string | null;
  active_appointment_id?: string | null;
  active_opd_id?: string | null;
  active_ipd_admission_id?: string | null;
  active_emergency_id?: string | null;
}

export interface ClinicalTimelineItem {
  id: string;
  type: ClinicalTimelineType;
  title: string;
  description?: string | null;
  module: string;
  status?: string | null;
  occurred_at: string;
  actor_name?: string | null;
  reference_id?: string | null;
  reference_url?: string | null;
}

export interface ClinicalWorkflowAction {
  id: string;
  label: string;
  description: string;
  href: string;
  module: ClinicalTimelineType;
}

export interface ClinicalWorkflowParams {
  patient_id?: string;
  admission_id?: string;
  encounter_id?: string;
  search?: string;
}