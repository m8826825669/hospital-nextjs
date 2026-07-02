// src/features/nursing/types/nursing.types.ts

export type NursingTaskStatus = "pending" | "in_progress" | "completed" | "cancelled";
export type NursingTaskPriority = "low" | "normal" | "high" | "urgent";
export type MedicationAdminStatus = "scheduled" | "administered" | "skipped" | "held";

export interface NursingPatient {
  id: string;
  admission_id: string;
  patient_id: string;
  patient_name: string;
  patient_uhid?: string | null;
  ward_name?: string | null;
  bed_number?: string | null;
  doctor_name?: string | null;
  diagnosis?: string | null;
  admission_date?: string | null;
  status: string;
}

export interface VitalRecord {
  id: string;
  admission_id: string;
  recorded_at: string;
  temperature?: number | null;
  pulse?: number | null;
  respiratory_rate?: number | null;
  blood_pressure?: string | null;
  spo2?: number | null;
  pain_score?: number | null;
  notes?: string | null;
}

export interface MedicationAdministration {
  id: string;
  admission_id: string;
  medicine_name: string;
  dose?: string | null;
  route?: string | null;
  scheduled_at: string;
  administered_at?: string | null;
  status: MedicationAdminStatus;
  remarks?: string | null;
}

export interface NursingNote {
  id: string;
  admission_id: string;
  note_date: string;
  note_type?: string | null;
  notes: string;
  nurse_name?: string | null;
}

export interface NursingTask {
  id: string;
  admission_id: string;
  title: string;
  description?: string | null;
  due_at?: string | null;
  priority: NursingTaskPriority;
  status: NursingTaskStatus;
  assigned_to_name?: string | null;
}

export interface NursingListParams {
  page?: number;
  size?: number;
  search?: string;
  ward_id?: string;
  status?: string;
  admission_id?: string;
}