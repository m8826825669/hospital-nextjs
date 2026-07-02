// src/features/radiology/schemas/radiology.schema.ts

import { z } from "zod";

export const radiologyOrderFormSchema = z.object({
  patient_id: z.string().min(1, "Patient is required"),
  doctor_id: z.string().optional(),
  modality: z.enum(["xray", "ct", "mri", "ultrasound", "doppler", "fluoroscopy"]),
  study_name: z.string().min(2, "Study name is required"),
  body_part: z.string().optional(),
  order_date: z.string().min(1, "Order date is required"),
  scheduled_date: z.string().optional(),
  scheduled_time: z.string().optional(),
  priority: z.enum(["routine", "urgent", "stat"]),
  clinical_notes: z.string().optional(),
});

export const radiologyReportFormSchema = z.object({
  report_text: z.string().min(2, "Report is required"),
  impression: z.string().optional(),
  radiologist_id: z.string().optional(),
});

export type RadiologyOrderFormInput = z.input<typeof radiologyOrderFormSchema>;
export type RadiologyOrderFormValues = z.output<typeof radiologyOrderFormSchema>;

export type RadiologyReportFormInput = z.input<typeof radiologyReportFormSchema>;
export type RadiologyReportFormValues = z.output<typeof radiologyReportFormSchema>;