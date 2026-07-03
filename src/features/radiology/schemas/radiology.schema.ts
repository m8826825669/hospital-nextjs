// src/features/radiology/schemas/radiology.schema.ts

import { z } from "zod";

const emptyStringToNull = (value: unknown) => (value === "" ? null : value);

export const radiologyTestFormSchema = z.object({
  code: z.string().min(1, "Code is required"),
  name: z.string().min(1, "Name is required"),
  modality: z.string().min(1, "Modality is required"),
  body_part: z.preprocess(emptyStringToNull, z.string().nullable().optional()),
  department_id: z.preprocess(emptyStringToNull, z.string().uuid().nullable().optional()),
  estimated_duration_minutes: z.preprocess(emptyStringToNull, z.coerce.number().min(0).nullable().optional()),
  contrast_required: z.boolean().default(false),
  description: z.preprocess(emptyStringToNull, z.string().nullable().optional()),
  preparation: z.preprocess(emptyStringToNull, z.string().nullable().optional()),
  price: z.coerce.number().min(0),
  is_active: z.boolean().default(true),
});

export type RadiologyTestFormInput = z.input<typeof radiologyTestFormSchema>;
export type RadiologyTestFormValues = z.output<typeof radiologyTestFormSchema>;

export const radiologyOrderFormSchema = z.object({
  patient_id: z.string().uuid("Patient is required"),
  doctor_id: z.preprocess(emptyStringToNull, z.string().uuid().nullable().optional()),
  test_id: z.string().uuid("Test is required"),
  order_date: z.string().min(1, "Order date is required"),
  scheduled_date: z.preprocess(emptyStringToNull, z.string().nullable().optional()),
  priority: z.string().min(1, "Priority is required"),
  clinical_notes: z.preprocess(emptyStringToNull, z.string().nullable().optional()),
  clinical_indication: z.preprocess(emptyStringToNull, z.string().nullable().optional()),
  diagnosis: z.preprocess(emptyStringToNull, z.string().nullable().optional()),
  instructions: z.preprocess(emptyStringToNull, z.string().nullable().optional()),
  technologist_id: z.preprocess(emptyStringToNull, z.string().uuid().nullable().optional()),
  room: z.preprocess(emptyStringToNull, z.string().nullable().optional()),
});

export type RadiologyOrderFormInput = z.input<typeof radiologyOrderFormSchema>;
export type RadiologyOrderFormValues = z.output<typeof radiologyOrderFormSchema>;

export const radiologyReportFormSchema = z.object({
  order_id: z.string().uuid("Order is required"),
  radiologist_id: z.preprocess(emptyStringToNull, z.string().uuid().nullable().optional()),
  clinical_history: z.preprocess(emptyStringToNull, z.string().nullable().optional()),
  technique: z.preprocess(emptyStringToNull, z.string().nullable().optional()),
  findings: z.string().min(1, "Findings are required"),
  impression: z.preprocess(emptyStringToNull, z.string().nullable().optional()),
  recommendation: z.preprocess(emptyStringToNull, z.string().nullable().optional()),
  critical_finding: z.boolean().default(false),
  attachments_note: z.preprocess(emptyStringToNull, z.string().nullable().optional()),
  status: z.string().min(1, "Status is required"),
});

export type RadiologyReportFormInput = z.input<typeof radiologyReportFormSchema>;
export type RadiologyReportFormValues = z.output<typeof radiologyReportFormSchema>;
