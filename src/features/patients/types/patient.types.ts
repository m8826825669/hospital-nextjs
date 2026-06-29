// src/features/patients/types/patient.types.ts

export type PatientGender = "male" | "female" | "other" | "unknown";

export type PatientStatus = "active" | "inactive" | "deceased" | "blocked";

export interface Patient {
  id: string;
  hospital_id: string;

  uhid?: string | null;
  mrn?: string | null;

  title?: string | null;
  first_name: string;
  middle_name?: string | null;
  last_name?: string | null;
  full_name: string;

  gender: PatientGender;
  date_of_birth?: string | null;
  age?: number | null;
  blood_group?: string | null;
  marital_status?: string | null;

  email?: string | null;
  phone?: string | null;
  alternate_phone?: string | null;

  emergency_contact_name?: string | null;
  emergency_contact_phone?: string | null;
  emergency_contact_relationship?: string | null;

  address_line1?: string | null;
  address_line2?: string | null;
  city?: string | null;
  state?: string | null;
  country?: string | null;
  postal_code?: string | null;

  nationality?: string | null;
  religion?: string | null;
  occupation?: string | null;

  national_id?: string | null;
  passport_number?: string | null;

  primary_doctor_id?: string | null;
  primary_doctor_name?: string | null;
  department_id?: string | null;
  department_name?: string | null;

  insurance_provider_id?: string | null;
  insurance_provider_name?: string | null;
  insurance_policy_number?: string | null;

  photo_url?: string | null;
  remarks?: string | null;

  status: PatientStatus;
  is_active: boolean;

  created_at?: string;
  updated_at?: string;
}

export interface PatientListParams {
  page?: number;
  size?: number;
  search?: string;
  gender?: PatientGender;
  status?: PatientStatus;
  blood_group?: string;
  city?: string;
  primary_doctor_id?: string;
  department_id?: string;
  insurance_provider_id?: string;
  is_active?: boolean;
}

export interface CreatePatientPayload {
  uhid?: string;
  mrn?: string;

  title?: string;
  first_name: string;
  middle_name?: string;
  last_name?: string;

  gender: PatientGender;
  date_of_birth?: string;
  age?: number;
  blood_group?: string;
  marital_status?: string;

  email?: string;
  phone?: string;
  alternate_phone?: string;

  emergency_contact_name?: string;
  emergency_contact_phone?: string;
  emergency_contact_relationship?: string;

  address_line1?: string;
  address_line2?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;

  nationality?: string;
  religion?: string;
  occupation?: string;

  national_id?: string;
  passport_number?: string;

  primary_doctor_id?: string;
  department_id?: string;

  insurance_provider_id?: string;
  insurance_policy_number?: string;

  remarks?: string;
  is_active?: boolean;
}

export interface UpdatePatientPayload
  extends Partial<CreatePatientPayload> {
  status?: PatientStatus;
}

export interface PatientTimelineItem {
  id: string;
  patient_id: string;
  type:
    | "registration"
    | "appointment"
    | "opd"
    | "ipd"
    | "lab"
    | "pharmacy"
    | "billing"
    | "insurance"
    | "document"
    | "audit";
  title: string;
  description?: string | null;
  created_at: string;
  created_by_name?: string | null;
}

export interface PatientDocument {
  id: string;
  patient_id: string;
  document_type: string;
  file_name: string;
  file_url: string;
  mime_type?: string | null;
  size_bytes?: number | null;
  uploaded_at: string;
  uploaded_by_name?: string | null;
}