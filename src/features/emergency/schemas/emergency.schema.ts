import { z } from "zod";
const emptyToNull = (value: unknown) => (value === "" ? null : value);
export const emergencyVisitFormSchema = z.object({
  patient_id: z.string().min(1, "Patient is required"),
  arrival_time: z.string().min(1, "Arrival time is required"),
  chief_complaint: z.string().min(1, "Chief complaint is required"),
  arrival_mode: z.preprocess(emptyToNull, z.string().nullable().optional()),
  priority: z.string().default("routine"),
  assigned_doctor_id: z.preprocess(emptyToNull, z.string().nullable().optional()),
  notes: z.preprocess(emptyToNull, z.string().nullable().optional()),
});
export const emergencyTriageFormSchema = z.object({
  visit_id: z.string().min(1, "Visit is required"),
  triage_time: z.string().min(1, "Triage time is required"),
  acuity_level: z.string().min(1, "Acuity is required"),
  pain_score: z.coerce.number().int().min(0).max(10).nullable().optional(),
  temperature: z.preprocess(emptyToNull, z.string().nullable().optional()),
  pulse: z.coerce.number().int().nullable().optional(),
  respiratory_rate: z.coerce.number().int().nullable().optional(),
  systolic_bp: z.coerce.number().int().nullable().optional(),
  diastolic_bp: z.coerce.number().int().nullable().optional(),
  spo2: z.coerce.number().int().nullable().optional(),
  triage_notes: z.preprocess(emptyToNull, z.string().nullable().optional()),
});
export const emergencyNoteFormSchema = z.object({
  visit_id: z.string().min(1, "Visit is required"),
  note_time: z.string().min(1, "Note time is required"),
  note_type: z.string().default("clinical"),
  subjective: z.preprocess(emptyToNull, z.string().nullable().optional()),
  objective: z.preprocess(emptyToNull, z.string().nullable().optional()),
  assessment: z.preprocess(emptyToNull, z.string().nullable().optional()),
  plan: z.preprocess(emptyToNull, z.string().nullable().optional()),
});
export const emergencyOrderFormSchema = z.object({
  visit_id: z.string().min(1, "Visit is required"),
  order_type: z.string().min(1, "Type is required"),
  order_name: z.string().min(1, "Order name is required"),
  priority: z.string().default("routine"),
  ordered_at: z.string().min(1, "Order time is required"),
  instructions: z.preprocess(emptyToNull, z.string().nullable().optional()),
});
export type EmergencyVisitFormInput = z.input<typeof emergencyVisitFormSchema>;
export type EmergencyVisitFormValues = z.output<typeof emergencyVisitFormSchema>;
export type EmergencyTriageFormInput = z.input<typeof emergencyTriageFormSchema>;
export type EmergencyTriageFormValues = z.output<typeof emergencyTriageFormSchema>;
export type EmergencyNoteFormInput = z.input<typeof emergencyNoteFormSchema>;
export type EmergencyNoteFormValues = z.output<typeof emergencyNoteFormSchema>;
export type EmergencyOrderFormInput = z.input<typeof emergencyOrderFormSchema>;
export type EmergencyOrderFormValues = z.output<typeof emergencyOrderFormSchema>;
