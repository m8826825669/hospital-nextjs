// src/features/appointments/types/appointment.types.ts

export type AppointmentStatus =
  | "scheduled"
  | "checked_in"
  | "in_consultation"
  | "completed"
  | "cancelled"
  | "no_show";

export type AppointmentType =
  | "opd"
  | "follow_up"
  | "emergency"
  | "teleconsultation";

export interface Appointment {
  id: string;
  hospital_id: string;

  patient_id: string;
  patient_name: string;
  patient_uhid?: string | null;
  patient_phone?: string | null;

  doctor_id: string;
  doctor_name: string;

  department_id?: string | null;
  department_name?: string | null;

  appointment_date: string;
  start_time: string;
  end_time?: string | null;

  appointment_type: AppointmentType;
  status: AppointmentStatus;

  reason?: string | null;
  notes?: string | null;

  token_number?: string | null;
  consultation_fee?: number | null;

  created_at?: string;
  updated_at?: string;
}

export interface AppointmentListParams {
  page?: number;
  size?: number;
  search?: string;
  date?: string;
  doctor_id?: string;
  department_id?: string;
  patient_id?: string;
  status?: AppointmentStatus;
  appointment_type?: AppointmentType;
}

export interface CreateAppointmentPayload {
  patient_id: string;
  doctor_id: string;
  department_id?: string;
  appointment_date: string;
  start_time: string;
  end_time?: string;
  appointment_type: AppointmentType;
  reason?: string;
  notes?: string;
}

export interface UpdateAppointmentPayload
  extends Partial<CreateAppointmentPayload> {
  status?: AppointmentStatus;
}