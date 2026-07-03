// src/features/hr/types/hr.types.ts

export type EmployeeStatus = "active" | "inactive" | "on_leave" | "terminated";
export type EmploymentType = "full_time" | "part_time" | "contract" | "trainee";
export type AttendanceStatus = "present" | "absent" | "late" | "half_day";
export type LeaveStatus = "pending" | "approved" | "rejected" | "cancelled";

export interface Employee {
  id: string;
  hospital_id: string;
  employee_code: string;
  first_name: string;
  last_name: string;
  email?: string | null;
  phone?: string | null;
  department_id?: string | null;
  department_name?: string | null;
  designation?: string | null;
  employment_type: EmploymentType;
  joining_date?: string | null;
  status: EmployeeStatus;
  address?: string | null;
  is_active: boolean;
}

export interface AttendanceRecord {
  id: string;
  employee_id: string;
  employee_name?: string | null;
  attendance_date: string;
  check_in?: string | null;
  check_out?: string | null;
  status: AttendanceStatus;
  remarks?: string | null;
}

export interface LeaveRequest {
  id: string;
  employee_id: string;
  employee_name?: string | null;
  leave_type: string;
  start_date: string;
  end_date: string;
  days?: number;
  reason?: string | null;
  status: LeaveStatus;
  created_at?: string;
}

export interface Shift {
  id: string;
  name: string;
  start_time: string;
  end_time: string;
  is_active: boolean;
}

export interface HrListParams {
  page?: number;
  size?: number;
  page_size?: number;
  search?: string;
  department_id?: string;
  status?: EmployeeStatus | LeaveStatus | AttendanceStatus;
  date?: string;
}
