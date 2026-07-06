// src/features/admin/types/admin.types.ts

export type MasterStatus = "active" | "inactive";
export type BedStatus = "AVAILABLE" | "OCCUPIED" | "CLEANING" | "MAINTENANCE" | "RESERVED";

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
  ward_type?: string | null;
  floor?: string | null;
  is_active: boolean;
  active?: boolean;
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
  active?: boolean;
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

export interface AdminDoctor {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  registration_number: string;
  specialization: string;
  qualification?: string | null;
  consultation_fee?: number | null;
  active: boolean;
}

export interface AdminUser {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  active: boolean;
  roles?: string[];
}

export interface AdminRole {
  id: string;
  name: string;
  description?: string | null;
  permissions?: string[];
}

export interface AdminPermission {
  id: string;
  name: string;
  description?: string | null;
}

export interface DoctorFormPayload {
  user_id: string;
  registration_number: string;
  specialization: string;
  qualification?: string | null;
  consultation_fee?: number | null;
  active?: boolean;
}

export interface UserFormPayload {
  first_name: string;
  last_name: string;
  email: string;
  password?: string;
  active?: boolean;
  role_ids?: string[];
}

export interface RoleFormPayload {
  name: string;
  description?: string | null;
  permission_ids?: string[];
}

export interface PermissionFormPayload {
  name: string;
  description?: string | null;
}