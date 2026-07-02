// src/features/ot/types/ot.types.ts

export type SurgeryStatus =
  | "scheduled"
  | "pre_op"
  | "in_progress"
  | "completed"
  | "cancelled";

export type TheatreStatus = "active" | "inactive" | "maintenance";

export interface OtTheatre {
  id: string;
  hospital_id: string;
  name: string;
  code?: string | null;
  floor?: string | null;
  location?: string | null;
  status: TheatreStatus;
  is_active: boolean;
}

export interface Surgery {
  id: string;
  hospital_id: string;

  surgery_number: string;

  patient_id: string;
  patient_name: string;
  patient_uhid?: string | null;

  surgeon_id: string;
  surgeon_name: string;

  assistant_surgeon_id?: string | null;
  assistant_surgeon_name?: string | null;

  theatre_id: string;
  theatre_name: string;

  scheduled_date: string;
  scheduled_start_time: string;
  scheduled_end_time?: string | null;

  actual_start_time?: string | null;
  actual_end_time?: string | null;

  procedure_name: string;
  diagnosis?: string | null;
  anesthesia_type?: string | null;
  notes?: string | null;

  status: SurgeryStatus;

  created_at?: string;
  updated_at?: string;
}

export interface SurgeryListParams {
  page?: number;
  size?: number;
  search?: string;
  status?: SurgeryStatus;
  patient_id?: string;
  surgeon_id?: string;
  theatre_id?: string;
  scheduled_date?: string;
}

export interface CreateSurgeryPayload {
  patient_id: string;
  surgeon_id: string;
  assistant_surgeon_id?: string;
  theatre_id: string;
  scheduled_date: string;
  scheduled_start_time: string;
  scheduled_end_time?: string;
  procedure_name: string;
  diagnosis?: string;
  anesthesia_type?: string;
  notes?: string;
}

export interface UpdateSurgeryPayload extends Partial<CreateSurgeryPayload> {
  status?: SurgeryStatus;
}

export interface CompleteSurgeryPayload {
  actual_end_time?: string;
  notes?: string;
}

export interface SurgeryTimelineItem {
  id: string;
  surgery_id: string;
  status: SurgeryStatus;
  title: string;
  description?: string | null;
  created_at: string;
  created_by_name?: string | null;
}