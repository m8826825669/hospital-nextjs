// src/features/hr/schemas/hr.schema.ts

import { z } from "zod";

export const employeeFormSchema = z.object({
  employee_code: z.string().min(1, "Employee code is required"),
  full_name: z.string().min(2, "Name is required"),
  email: z.string().optional(),
  phone: z.string().optional(),
  department_id: z.string().optional(),
  designation: z.string().optional(),
  joining_date: z.string().optional(),
  status: z.enum(["active", "inactive", "terminated"]),
  is_active: z.boolean().default(true),
});

export const attendanceFormSchema = z.object({
  employee_id: z.string().min(1, "Employee is required"),
  attendance_date: z.string().min(1, "Date is required"),
  check_in: z.string().optional(),
  check_out: z.string().optional(),
  status: z.enum(["present", "absent", "late", "half_day"]),
  remarks: z.string().optional(),
});

export const leaveFormSchema = z.object({
  employee_id: z.string().min(1, "Employee is required"),
  leave_type: z.string().min(1, "Leave type is required"),
  start_date: z.string().min(1, "Start date is required"),
  end_date: z.string().min(1, "End date is required"),
  reason: z.string().optional(),
});

export type EmployeeFormInput = z.input<typeof employeeFormSchema>;
export type EmployeeFormValues = z.output<typeof employeeFormSchema>;

export type AttendanceFormInput = z.input<typeof attendanceFormSchema>;
export type AttendanceFormValues = z.output<typeof attendanceFormSchema>;

export type LeaveFormInput = z.input<typeof leaveFormSchema>;
export type LeaveFormValues = z.output<typeof leaveFormSchema>;