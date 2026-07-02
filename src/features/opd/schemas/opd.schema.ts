// src/features/opd/schemas/opd.schema.ts

import { z } from "zod";

export const opdEncounterFormSchema = z.object({
  patient_id: z.string().min(1, "Patient is required"),
  doctor_id: z.string().min(1, "Doctor is required"),
  appointment_id: z.string().optional(),

  visit_date: z.string().min(1, "Visit date is required"),
  visit_time: z.string().optional(),

  chief_complaint: z.string().optional(),
  history_of_present_illness: z.string().optional(),

  diagnosis: z.string().optional(),
  provisional_diagnosis: z.string().optional(),
  final_diagnosis: z.string().optional(),

  notes: z.string().optional(),
  follow_up_date: z.string().optional(),
});

export type OpdEncounterFormInput = z.input<typeof opdEncounterFormSchema>;
export type OpdEncounterFormValues = z.output<typeof opdEncounterFormSchema>;