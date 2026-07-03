// src/features/radiology/types/radiology.types.ts

export type RadiologyModality = "xray" | "ct" | "mri" | "ultrasound" | "mammography" | "fluoroscopy" | "other";
export type RadiologyOrderStatus =
  | "ordered"
  | "scheduled"
  | "patient_arrived"
  | "in_progress"
  | "images_uploaded"
  | "reporting"
  | "reported"
  | "verified"
  | "approved"
  | "completed"
  | "cancelled";
export type RadiologyPriority = "routine" | "urgent" | "stat";
export type RadiologyReportStatus = "draft" | "reported" | "verified" | "approved" | "amended";

export interface RadiologyListParams {
  page?: number;
  size?: number;
  page_size?: number;
  search?: string;
  modality?: RadiologyModality | "all";
  status?: RadiologyOrderStatus | RadiologyReportStatus | "all";
  priority?: RadiologyPriority | "all";
}

export interface RadiologyTest {
  id: string;
  hospital_id: string;
  code: string;
  name: string;
  modality: RadiologyModality | string;
  body_part?: string | null;
  description?: string | null;
  preparation?: string | null;
  contrast_required: boolean;
  estimated_duration_minutes?: number | null;
  department_id?: string | null;
  price: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface RadiologyOrder {
  id: string;
  hospital_id: string;
  order_number: string;
  patient_id: string;
  doctor_id?: string | null;
  test_id: string;
  order_date: string;
  scheduled_date?: string | null;
  priority: RadiologyPriority | string;
  status: RadiologyOrderStatus | string;
  clinical_notes?: string | null;
  clinical_indication?: string | null;
  diagnosis?: string | null;
  instructions?: string | null;
  technologist_id?: string | null;
  room?: string | null;
  created_by: string;
  patient_name?: string | null;
  doctor_name?: string | null;
  test_name?: string | null;
  modality?: string | null;
  created_at: string;
  updated_at: string;
}

export interface RadiologyReport {
  id: string;
  hospital_id: string;
  order_id: string;
  radiologist_id?: string | null;
  clinical_history?: string | null;
  technique?: string | null;
  findings: string;
  impression?: string | null;
  recommendation?: string | null;
  critical_finding: boolean;
  attachments_note?: string | null;
  status: RadiologyReportStatus | string;
  verified_by?: string | null;
  verified_at?: string | null;
  approved_by?: string | null;
  approved_at?: string | null;
  order_number?: string | null;
  patient_name?: string | null;
  test_name?: string | null;
  created_at: string;
  updated_at: string;
}

export interface RadiologyDashboard {
  total_tests: number;
  today_orders: number;
  pending_orders: number;
  scheduled_orders: number;
  arrived_orders: number;
  in_progress_orders: number;
  reporting_orders: number;
  completed_orders: number;
  critical_reports: number;
  draft_reports: number;
  verified_reports: number;
  approved_reports: number;
}

export interface LookupOption {
  id: string;
  label: string;
}
