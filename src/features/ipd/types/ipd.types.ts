// src/features/ipd/types/ipd.types.ts

export type IpdAdmissionStatus =
  | "admitted"
  | "transferred"
  | "discharged"
  | "cancelled";

export type BedStatus = "available" | "occupied" | "maintenance" | "reserved";

export interface IpdAdmission {
  id: string;
  hospital_id: string;

  admission_number: string;

  patient_id: string;
  patient_name: string;
  patient_uhid?: string | null;
  patient_phone?: string | null;

  doctor_id: string;
  doctor_name: string;

  department_id?: string | null;
  department_name?: string | null;

  admission_date: string;
  admission_time?: string | null;

  ward_id?: string | null;
  ward_name?: string | null;

  bed_id?: string | null;
  bed_number?: string | null;

  diagnosis?: string | null;
  reason_for_admission?: string | null;
  notes?: string | null;

  discharge_date?: string | null;
  discharge_time?: string | null;
  discharge_summary?: string | null;

  status: IpdAdmissionStatus;

  created_at?: string;
  updated_at?: string;
}

export interface IpdListParams {
  page?: number;
  size?: number;
  search?: string;
  status?: IpdAdmissionStatus;
  patient_id?: string;
  doctor_id?: string;
  department_id?: string;
  ward_id?: string;
  admission_date?: string;
}

export interface CreateIpdAdmissionPayload {
  patient_id: string;
  doctor_id: string;
  department_id?: string;
  ward_id?: string;
  bed_id?: string;

  admission_date: string;
  admission_time?: string;

  diagnosis?: string;
  reason_for_admission?: string;
  notes?: string;
}

export interface UpdateIpdAdmissionPayload
  extends Partial<CreateIpdAdmissionPayload> {
  status?: IpdAdmissionStatus;
  discharge_date?: string;
  discharge_time?: string;
  discharge_summary?: string;
}

export interface IpdTransferPayload {
  ward_id?: string;
  bed_id: string;
  transfer_reason?: string;
}

export interface IpdDischargePayload {
  discharge_date: string;
  discharge_time?: string;
  discharge_summary?: string;
}

export interface IpdStatusHistory {
  id: string;
  admission_id: string;
  status: IpdAdmissionStatus;
  notes?: string | null;
  created_at: string;
  created_by_name?: string | null;
}

export interface IpdBedAllocation {
  id: string;
  admission_id: string;
  ward_id?: string | null;
  ward_name?: string | null;
  bed_id: string;
  bed_number: string;
  allocated_at: string;
  released_at?: string | null;
  is_current: boolean;
}