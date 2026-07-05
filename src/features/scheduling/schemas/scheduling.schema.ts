import { z } from "zod";

const emptyToNull = (value: unknown) => value === "" ? null : value;

export const resourceFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().min(1, "Code is required"),
  resource_type: z.string().min(1, "Type is required"),
  department_id: z.preprocess(emptyToNull, z.string().nullable().optional()),
  location: z.preprocess(emptyToNull, z.string().nullable().optional()),
  capacity: z.coerce.number().nullable().optional(),
  status: z.string().default("available"),
  description: z.preprocess(emptyToNull, z.string().nullable().optional()),
  is_active: z.boolean().default(true),
});
export type ResourceFormInput = z.input<typeof resourceFormSchema>;
export type ResourceFormValues = z.output<typeof resourceFormSchema>;

export const bookingFormSchema = z.object({
  resource_id: z.string().min(1, "Resource is required"),
  patient_id: z.preprocess(emptyToNull, z.string().nullable().optional()),
  doctor_id: z.preprocess(emptyToNull, z.string().nullable().optional()),
  title: z.string().min(1, "Title is required"),
  booking_type: z.string().default("general"),
  start_time: z.string().min(1, "Start time is required"),
  end_time: z.string().min(1, "End time is required"),
  status: z.string().default("scheduled"),
  priority: z.string().default("routine"),
  notes: z.preprocess(emptyToNull, z.string().nullable().optional()),
});
export type BookingFormInput = z.input<typeof bookingFormSchema>;
export type BookingFormValues = z.output<typeof bookingFormSchema>;

export const doctorScheduleFormSchema = z.object({
  doctor_id: z.string().min(1, "Doctor is required"),
  department_id: z.preprocess(emptyToNull, z.string().nullable().optional()),
  schedule_date: z.string().min(1, "Date is required"),
  start_time: z.string().min(1, "Start time is required"),
  end_time: z.string().min(1, "End time is required"),
  slot_minutes: z.coerce.number().min(5),
  location: z.preprocess(emptyToNull, z.string().nullable().optional()),
  status: z.string().default("available"),
  is_active: z.boolean().default(true),
});
export type DoctorScheduleFormInput = z.input<typeof doctorScheduleFormSchema>;
export type DoctorScheduleFormValues = z.output<typeof doctorScheduleFormSchema>;

export const staffRosterFormSchema = z.object({
  employee_id: z.string().min(1, "Employee is required"),
  department_id: z.preprocess(emptyToNull, z.string().nullable().optional()),
  roster_date: z.string().min(1, "Date is required"),
  shift: z.string().min(1, "Shift is required"),
  start_time: z.string().min(1, "Start time is required"),
  end_time: z.string().min(1, "End time is required"),
  location: z.preprocess(emptyToNull, z.string().nullable().optional()),
  status: z.string().default("assigned"),
});
export type StaffRosterFormInput = z.input<typeof staffRosterFormSchema>;
export type StaffRosterFormValues = z.output<typeof staffRosterFormSchema>;
