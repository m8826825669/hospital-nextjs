import { z } from "zod";

const emptyToNull = (value: unknown) => (value === "" ? null : value);

export const vitalSignFormSchema = z.object({
  patient_id: z.string().min(1, "Patient is required"),
  recorded_at: z.string().min(1, "Recorded time is required"),
  temperature: z.coerce.number().nullable().optional(),
  pulse: z.coerce.number().int().nullable().optional(),
  respiratory_rate: z.coerce.number().int().nullable().optional(),
  systolic_bp: z.coerce.number().int().nullable().optional(),
  diastolic_bp: z.coerce.number().int().nullable().optional(),
  spo2: z.coerce.number().int().nullable().optional(),
  pain_score: z.coerce.number().int().min(0).max(10).nullable().optional(),
  consciousness_level: z.preprocess(emptyToNull, z.string().nullable().optional()),
  notes: z.preprocess(emptyToNull, z.string().nullable().optional()),
});

export const nursingNoteFormSchema = z.object({
  patient_id: z.string().min(1, "Patient is required"),
  note_date: z.string().min(1, "Note time is required"),
  note_type: z.string().min(1),
  shift: z.preprocess(emptyToNull, z.string().nullable().optional()),
  subjective: z.preprocess(emptyToNull, z.string().nullable().optional()),
  objective: z.preprocess(emptyToNull, z.string().nullable().optional()),
  assessment: z.preprocess(emptyToNull, z.string().nullable().optional()),
  plan: z.preprocess(emptyToNull, z.string().nullable().optional()),
});

export const carePlanFormSchema = z.object({
  patient_id: z.string().min(1, "Patient is required"),
  problem: z.string().min(1, "Problem is required"),
  goal: z.preprocess(emptyToNull, z.string().nullable().optional()),
  interventions: z.preprocess(emptyToNull, z.string().nullable().optional()),
  evaluation: z.preprocess(emptyToNull, z.string().nullable().optional()),
  start_date: z.string().min(1),
  target_date: z.preprocess(emptyToNull, z.string().nullable().optional()),
  status: z.string().default("active"),
});

export const nursingTaskFormSchema = z.object({
  patient_id: z.string().min(1, "Patient is required"),
  assigned_to: z.preprocess(emptyToNull, z.string().nullable().optional()),
  title: z.string().min(1, "Task title is required"),
  description: z.preprocess(emptyToNull, z.string().nullable().optional()),
  priority: z.string().default("routine"),
  due_at: z.preprocess(emptyToNull, z.string().nullable().optional()),
  status: z.string().default("pending"),
});

export const medicationAdministrationFormSchema = z.object({
  patient_id: z.string().min(1, "Patient is required"),
  medication_name: z.string().min(1, "Medication is required"),
  dose: z.preprocess(emptyToNull, z.string().nullable().optional()),
  route: z.preprocess(emptyToNull, z.string().nullable().optional()),
  frequency: z.preprocess(emptyToNull, z.string().nullable().optional()),
  scheduled_at: z.string().min(1, "Schedule time is required"),
  status: z.string().default("scheduled"),
  remarks: z.preprocess(emptyToNull, z.string().nullable().optional()),
});

export type VitalSignFormInput = z.input<typeof vitalSignFormSchema>;
export type VitalSignFormValues = z.output<typeof vitalSignFormSchema>;
export type NursingNoteFormInput = z.input<typeof nursingNoteFormSchema>;
export type NursingNoteFormValues = z.output<typeof nursingNoteFormSchema>;
export type CarePlanFormInput = z.input<typeof carePlanFormSchema>;
export type CarePlanFormValues = z.output<typeof carePlanFormSchema>;
export type NursingTaskFormInput = z.input<typeof nursingTaskFormSchema>;
export type NursingTaskFormValues = z.output<typeof nursingTaskFormSchema>;
export type MedicationAdministrationFormInput = z.input<typeof medicationAdministrationFormSchema>;
export type MedicationAdministrationFormValues = z.output<typeof medicationAdministrationFormSchema>;
