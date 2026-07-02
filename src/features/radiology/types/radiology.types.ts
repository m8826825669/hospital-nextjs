// src/features/radiology/types/radiology.types.ts

export type RadiologyModality = "xray" | "ct" | "mri" | "ultrasound" | "doppler" | "fluoroscopy";
export type RadiologyOrderStatus =
  | "ordered"
  | "scheduled"
  | "in_progress"
  | "reported"
  | "verified"
  | "approved"
  | "cancelled";

export interface RadiologyOrder {
  id: string;
  hospital_id: string;
  order_number: string;

  patient_id: string;
  patient_name: string;
  patient_uhid?: string | null;

  doctor_id?: string | null;
  doctor_name?: string | null;

  modality: RadiologyModality;
  study_name: string;
  body_part?: string | null;

  order_date: string;
  scheduled_date?: string | null;
  scheduled_time?: string | null;

  status: RadiologyOrderStatus;
  priority: "routine" | "urgent" | "stat";

  clinical_notes?: string | null;
  report_text?: string | null;
  impression?: string | null;

  radiologist_id?: string | null;
  radiologist_name?: string | null;

  created_at?: string;
  updated_at?: string;
}

export interface RadiologyAttachment {
  id: string;
  order_id: string;
  file_name: string;
  file_url: string;
  file_type?: string | null;
  uploaded_at: string;
}

export interface RadiologyTimelineItem {
  id: string;
  title: string;
  description?: string | null;
  created_at: string;
  created_by_name?: string | null;
}

export interface RadiologyListParams {
  page?: number;
  size?: number;
  search?: string;
  status?: RadiologyOrderStatus;
  modality?: RadiologyModality;
  patient_id?: string;
  doctor_id?: string;
  order_date?: string;
}