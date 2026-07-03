// src/features/hr/schemas/hr.schema.ts

import { z } from "zod";

const emptyStringToNull = (value: unknown) => (value === "" ? null : value);

export const employeeFormSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  last_name: z.string().min(1, "Last name is required"),
  email: z.string().email("Enter a valid email").optional().or(z.literal("")),
  phone: z.string().optional(),
  department_id: z.string().optional(),
  designation: z.string().optional(),
  employment_type: z.enum(["full_time", "part_time", "contract", "trainee"]),
  joining_date: z.string().optional(),
  status: z.enum(["active", "inactive", "on_leave", "terminated"]),
  address: z.string().optional(),
  is_active: z.boolean().default(true),
});

export const attendanceFormSchema = z.object({
  employee_id: z.string().min(1, "Employee is required"),
  attendance_date: z.string().min(1, "Date is required"),
  check_in: z.preprocess(emptyStringToNull, z.string().nullable().optional()),
  check_out: z.preprocess(emptyStringToNull, z.string().nullable().optional()),
  status: z.enum(["present", "absent", "late", "half_day"]),
  remarks: z.preprocess(emptyStringToNull, z.string().nullable().optional()),
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
