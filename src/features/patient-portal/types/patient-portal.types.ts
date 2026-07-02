// src/features/patient-portal/types/patient-portal.types.ts

export type PortalAppointmentStatus =
  | "scheduled"
  | "checked_in"
  | "completed"
  | "cancelled";

export type PortalBillStatus = "draft" | "unpaid" | "partially_paid" | "paid" | "cancelled";

export type PortalReportStatus = "pending" | "ready" | "verified" | "approved";

export interface PatientPortalProfile {
  id: string;
  patient_id: string;
  full_name: string;
  uhid?: string | null;
  email?: string | null;
  phone?: string | null;
  gender?: string | null;
  date_of_birth?: string | null;
  address?: string | null;
  blood_group?: string | null;
}

export interface PortalAppointment {
  id: string;
  appointment_number: string;
  appointment_date: string;
  appointment_time?: string | null;
  doctor_name?: string | null;
  department_name?: string | null;
  reason?: string | null;
  status: PortalAppointmentStatus;
}

export interface PortalPrescription {
  id: string;
  prescription_number?: string | null;
  encounter_date?: string | null;
  doctor_name?: string | null;
  diagnosis?: string | null;
  medicines?: string | null;
  notes?: string | null;
}

export interface PortalLabReport {
  id: string;
  sample_number: string;
  test_name?: string | null;
  report_date?: string | null;
  status: PortalReportStatus;
  file_url?: string | null;
}

export interface PortalRadiologyReport {
  id: string;
  order_number: string;
  modality: string;
  study_name: string;
  report_date?: string | null;
  status: PortalReportStatus;
  file_url?: string | null;
}

export interface PortalBill {
  id: string;
  invoice_number: string;
  invoice_date: string;
  total_amount: number;
  paid_amount: number;
  balance_amount: number;
  status: PortalBillStatus;
}

export interface PortalInsuranceClaim {
  id: string;
  claim_number: string;
  provider_name?: string | null;
  claim_date: string;
  claim_amount: number;
  approved_amount?: number | null;
  status: string;
}

export interface PatientPortalKpis {
  upcoming_appointments: number;
  pending_reports: number;
  unpaid_bills: number;
  active_claims: number;
}

export interface PatientPortalListParams {
  page?: number;
  size?: number;
  search?: string;
  status?: string;
  date?: string;
}