// src/features/admin/types/admin.types.ts

export type MasterStatus = "active" | "inactive";
export type BedStatus = "available" | "occupied" | "maintenance" | "reserved";

export interface Department {
  id: string;
  hospital_id: string;
  name: string;
  code?: string | null;
  description?: string | null;
  is_active: boolean;
  created_at?: string;
}

export interface Ward {
  id: string;
  hospital_id: string;
  name: string;
  code?: string | null;
  floor?: string | null;
  is_active: boolean;
}

export interface Bed {
  id: string;
  hospital_id: string;
  ward_id: string;
  ward_name?: string | null;
  bed_number: string;
  bed_type?: string | null;
  status: BedStatus;
  is_active: boolean;
}

export interface NumberSeries {
  id: string;
  hospital_id: string;
  module: string;
  prefix: string;
  next_number: number;
  padding: number;
  is_active: boolean;
}

export interface HospitalSetting {
  id: string;
  hospital_id: string;
  hospital_name: string;
  timezone?: string | null;
  currency?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
}

export interface AdminListParams {
  page?: number;
  size?: number;
  search?: string;
  is_active?: boolean;
}