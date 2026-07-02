// src/features/lis/types/lis.types.ts

export type LabSampleStatus =
  | "collected"
  | "received"
  | "processing"
  | "result_entered"
  | "verified"
  | "approved"
  | "rejected";

export type LabPriority = "routine" | "urgent" | "stat";

export interface LabTest {
  id: string;
  hospital_id: string;
  code?: string | null;
  name: string;
  category_id?: string | null;
  category_name?: string | null;
  sample_type?: string | null;
  unit?: string | null;
  reference_range?: string | null;
  price?: number | null;
  is_active: boolean;
}

export interface LabSample {
  id: string;
  hospital_id: string;

  sample_number: string;
  patient_id: string;
  patient_name: string;
  patient_uhid?: string | null;

  doctor_id?: string | null;
  doctor_name?: string | null;

  test_id?: string | null;
  test_name?: string | null;
  profile_id?: string | null;
  profile_name?: string | null;

  sample_type?: string | null;
  priority: LabPriority;
  status: LabSampleStatus;

  collected_at?: string | null;
  received_at?: string | null;
  verified_at?: string | null;
  approved_at?: string | null;

  remarks?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface LabResult {
  id: string;
  sample_id: string;
  test_id: string;
  test_name: string;
  result_value?: string | null;
  unit?: string | null;
  reference_range?: string | null;
  remarks?: string | null;
  is_abnormal?: boolean;
}

export interface LabTimelineItem {
  id: string;
  title: string;
  description?: string | null;
  created_at: string;
  created_by_name?: string | null;
}

export interface LisListParams {
  page?: number;
  size?: number;
  search?: string;
  status?: LabSampleStatus;
  priority?: LabPriority;
  patient_id?: string;
  doctor_id?: string;
  sample_date?: string;
}

export interface CreateLabSamplePayload {
  patient_id: string;
  doctor_id?: string;
  test_id?: string;
  profile_id?: string;
  sample_type?: string;
  priority: LabPriority;
  remarks?: string;
}

export interface UpdateLabSamplePayload extends Partial<CreateLabSamplePayload> {
  status?: LabSampleStatus;
}

export interface LabResultEntryPayload {
  sample_id: string;
  results: {
    test_id: string;
    result_value?: string;
    remarks?: string;
    is_abnormal?: boolean;
  }[];
}