// src/features/ot/schemas/ot.schema.ts

import { z } from "zod";

export const surgeryFormSchema = z.object({
  patient_id: z.string().min(1, "Patient is required"),
  surgeon_id: z.string().min(1, "Surgeon is required"),
  assistant_surgeon_id: z.string().optional(),
  theatre_id: z.string().min(1, "Theatre is required"),

  scheduled_date: z.string().min(1, "Surgery date is required"),
  scheduled_start_time: z.string().min(1, "Start time is required"),
  scheduled_end_time: z.string().optional(),

  procedure_name: z.string().min(2, "Procedure name is required"),
  diagnosis: z.string().optional(),
  anesthesia_type: z.string().optional(),
  notes: z.string().optional(),
});

export const completeSurgeryFormSchema = z.object({
  actual_end_time: z.string().optional(),
  notes: z.string().optional(),
});

export type SurgeryFormInput = z.input<typeof surgeryFormSchema>;
export type SurgeryFormValues = z.output<typeof surgeryFormSchema>;

export type CompleteSurgeryFormInput = z.input<typeof completeSurgeryFormSchema>;
export type CompleteSurgeryFormValues = z.output<typeof completeSurgeryFormSchema>;