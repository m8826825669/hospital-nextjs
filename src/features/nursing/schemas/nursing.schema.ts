// src/features/nursing/schemas/nursing.schema.ts

import { z } from "zod";

export const vitalFormSchema = z.object({
  admission_id: z.string().min(1, "Admission is required"),
  recorded_at: z.string().min(1, "Recorded time is required"),
  temperature: z.coerce.number().optional(),
  pulse: z.coerce.number().optional(),
  respiratory_rate: z.coerce.number().optional(),
  blood_pressure: z.string().optional(),
  spo2: z.coerce.number().optional(),
  pain_score: z.coerce.number().optional(),
  notes: z.string().optional(),
});

export const nursingNoteFormSchema = z.object({
  admission_id: z.string().min(1, "Admission is required"),
  note_date: z.string().min(1, "Date is required"),
  note_type: z.string().optional(),
  notes: z.string().min(2, "Note is required"),
});

export const nursingTaskFormSchema = z.object({
  admission_id: z.string().min(1, "Admission is required"),
  title: z.string().min(2, "Task title is required"),
  description: z.string().optional(),
  due_at: z.string().optional(),
  priority: z.enum(["low", "normal", "high", "urgent"]),
});

export type VitalFormInput = z.input<typeof vitalFormSchema>;
export type VitalFormValues = z.output<typeof vitalFormSchema>;

export type NursingNoteFormInput = z.input<typeof nursingNoteFormSchema>;
export type NursingNoteFormValues = z.output<typeof nursingNoteFormSchema>;

export type NursingTaskFormInput = z.input<typeof nursingTaskFormSchema>;
export type NursingTaskFormValues = z.output<typeof nursingTaskFormSchema>;