// src/features/admin/schemas/admin.schema.ts

import { z } from "zod";

export const departmentFormSchema = z.object({
  name: z.string().min(2, "Department name is required"),
  code: z.string().optional(),
  description: z.string().optional(),
  is_active: z.boolean().default(true),
});

export const wardFormSchema = z.object({
  name: z.string().min(2, "Ward name is required"),
  ward_type: z.string().min(2, "Ward type is required"),
  floor: z.string().optional(),
  active: z.boolean().default(true),
});

export const bedFormSchema = z.object({
  ward_id: z.string().uuid("Select a valid ward"),
  bed_number: z.string().min(1, "Bed number is required"),
  bed_type: z.string().min(1, "Bed type is required"),
  status: z.enum([
    "AVAILABLE",
    "OCCUPIED",
    "CLEANING",
    "MAINTENANCE",
    "RESERVED",
  ]),
  active: z.boolean().default(true),
});

export const hospitalSettingFormSchema = z.object({
  hospital_name: z.string().min(2, "Hospital name is required"),
  timezone: z.string().optional(),
  currency: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
});

export type DepartmentFormInput = z.input<typeof departmentFormSchema>;
export type DepartmentFormValues = z.output<typeof departmentFormSchema>;

export type WardFormInput = z.input<typeof wardFormSchema>;
export type WardFormValues = z.output<typeof wardFormSchema>;

export type BedFormInput = z.input<typeof bedFormSchema>;
export type BedFormValues = z.output<typeof bedFormSchema>;

export type HospitalSettingFormInput = z.input<typeof hospitalSettingFormSchema>;
export type HospitalSettingFormValues = z.output<typeof hospitalSettingFormSchema>;
