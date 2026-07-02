// src/features/emergency/schemas/emergency.schema.ts

import { z } from "zod";

export const emergencyEncounterFormSchema = z.object({
  patient_id: z.string().min(1, "Patient is required"),
  arrival_time: z.string().min(1, "Arrival time is required"),
  chief_complaint: z.string().min(2, "Chief complaint is required"),
  severity: z.enum(["critical", "emergent", "urgent", "semi_urgent", "non_urgent"]),
  doctor_id: z.string().optional(),
  bed_number: z.string().optional(),
  triage_notes: z.string().optional(),
  vitals_summary: z.string().optional(),
});

export const emergencyDispositionFormSchema = z.object({
  disposition: z.enum([
    "discharge",
    "admit_ipd",
    "transfer",
    "death",
    "left_against_medical_advice",
  ]),
  notes: z.string().optional(),
});

export const emergencyOrderFormSchema = z.object({
  encounter_id: z.string().min(1, "Encounter is required"),
  order_type: z.enum(["lab", "radiology", "medication", "procedure", "observation"]),
  order_name: z.string().min(2, "Order name is required"),
  priority: z.enum(["routine", "urgent", "stat"]),
});

export type EmergencyEncounterFormInput = z.input<
  typeof emergencyEncounterFormSchema
>;
export type EmergencyEncounterFormValues = z.output<
  typeof emergencyEncounterFormSchema
>;

export type EmergencyDispositionFormInput = z.input<
  typeof emergencyDispositionFormSchema
>;
export type EmergencyDispositionFormValues = z.output<
  typeof emergencyDispositionFormSchema
>;

export type EmergencyOrderFormInput = z.input<typeof emergencyOrderFormSchema>;
export type EmergencyOrderFormValues = z.output<typeof emergencyOrderFormSchema>;