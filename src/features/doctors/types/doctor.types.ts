// src/features/doctors/types/doctor.types.ts

export interface Doctor {
  id: string;
  user_id: string;
  hospital_id: string;
  full_name: string;
  email: string;
  registration_number: string;
  specialization: string;
  qualification?: string | null;
  consultation_fee?: number | null;
  department_ids: string[];
  department_names: string[];
  is_active: boolean;
}

export interface DoctorListParams {
  page?: number;
  size?: number;
  search?: string;
  specialization?: string;
  department_id?: string;
  is_active?: boolean;
}

export interface CreateDoctorPayload {
  user_id: string;
  registration_number: string;
  specialization: string;
  qualification?: string;
  consultation_fee?: number;
  department_ids?: string[];
  is_active?: boolean;
}

export interface UpdateDoctorPayload {
  registration_number?: string;
  specialization?: string;
  qualification?: string;
  consultation_fee?: number;
  department_ids?: string[];
  is_active?: boolean;
}

export interface DoctorDepartment {
  id: string;
  name: string;
}

export interface DoctorSchedule {
  id: string;
  doctor_id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
  slot_duration_minutes: number;
  is_active: boolean;
}

export interface DoctorAvailableSlot {
  start_time: string;
  end_time: string;
  available: boolean;
}