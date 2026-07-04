export type PortalAppointmentStatus = "scheduled" | "checked_in" | "completed" | "cancelled";
export type PortalBillStatus = "draft" | "unpaid" | "partially_paid" | "paid" | "cancelled";
export type PortalReportStatus = "pending" | "ready" | "verified" | "approved";

export interface PatientPortalProfile {
  id: string;
  patient_code?: string | null;
  first_name: string;
  last_name?: string | null;
  full_name?: string | null;
  mobile?: string | null;
  phone?: string | null;
  email?: string | null;
  gender?: string | null;
  date_of_birth?: string | null;
  address?: string | null;
  blood_group?: string | null;
}

export interface PatientPortalDashboard {
  profile?: PatientPortalProfile | null;
  upcoming_appointments: number;
  pending_reports: number;
  unpaid_bills: number;
  active_prescriptions: number;
}

export interface PatientPortalAppointment {
  id: string;
  appointment_number?: string | null;
  appointment_date?: string | null;
  appointment_time?: string | null;
  doctor_name?: string | null;
  department_name?: string | null;
  status?: string | null;
}

export interface PatientPortalReport {
  id: string;
  report_type: string;
  report_number?: string | null;
  title: string;
  status?: string | null;
  reported_at?: string | null;
  department?: string | null;
}

export interface PatientPortalBill {
  id: string;
  invoice_number?: string | null;
  invoice_date?: string | null;
  total_amount: number;
  paid_amount: number;
  balance_amount: number;
  status?: string | null;
}
