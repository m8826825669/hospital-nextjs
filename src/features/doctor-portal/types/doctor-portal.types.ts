export interface DoctorPortalStats {
  today_appointments: number;
  waiting_patients: number;
  completed_consultations: number;
  pending_results: number;
  pending_followups: number;
}

export interface DoctorPortalAppointment {
  id: string;
  patient_id?: string | null;
  patient_name: string;
  patient_code?: string | null;
  appointment_time?: string | null;
  appointment_date?: string | null;
  visit_type?: string | null;
  status: string;
  reason?: string | null;
}

export interface DoctorPortalPatientSummary {
  id: string;
  patient_code?: string | null;
  first_name?: string | null;
  last_name?: string | null;
  gender?: string | null;
  age?: number | null;
  mobile?: string | null;
  last_visit?: string | null;
  active_problem?: string | null;
}

export interface DoctorPortalResult {
  id: string;
  patient_name: string;
  order_type: string;
  order_name: string;
  status: string;
  result_date?: string | null;
  summary?: string | null;
}

export interface DoctorPortalFollowUp {
  id: string;
  patient_name: string;
  follow_up_date: string;
  reason?: string | null;
  status: string;
}

export interface DoctorPortalDashboard {
  stats: DoctorPortalStats;
  appointments: DoctorPortalAppointment[];
  recent_patients: DoctorPortalPatientSummary[];
  pending_results: DoctorPortalResult[];
  followups: DoctorPortalFollowUp[];
}
