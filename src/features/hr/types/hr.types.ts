// src/features/hr/types/hr.types.ts

export type EmployeeStatus = "active" | "inactive" | "terminated";
export type AttendanceStatus = "present" | "absent" | "late" | "half_day";
export type LeaveStatus = "pending" | "approved" | "rejected" | "cancelled";

export interface Employee {
  id: string;
  hospital_id: string;
  employee_code: string;
  full_name: string;
  email?: string | null;
  phone?: string | null;
  department_id?: string | null;
  department_name?: string | null;
  designation?: string | null;
  joining_date?: string | null;
  status: EmployeeStatus;
  is_active: boolean;
}

export interface AttendanceRecord {
  id: string;
  employee_id: string;
  employee_name: string;
  attendance_date: string;
  check_in?: string | null;
  check_out?: string | null;
  status: AttendanceStatus;
  remarks?: string | null;
}

export interface LeaveRequest {
  id: string;
  employee_id: string;
  employee_name: string;
  leave_type: string;
  start_date: string;
  end_date: string;
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
  search?: string;
  department_id?: string;
  status?: EmployeeStatus | LeaveStatus | AttendanceStatus;
  date?: string;
}