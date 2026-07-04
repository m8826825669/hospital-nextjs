import { z } from "zod";

const emptyToNull = (value: unknown) => value === "" ? null : value;

export const dentalVisitFormSchema = z.object({
  patient_id: z.string().min(1, "Patient is required"),
  doctor_id: z.preprocess(emptyToNull, z.string().nullable().optional()),
  chief_complaint: z.string().min(1, "Chief complaint is required"),
  oral_examination: z.preprocess(emptyToNull, z.string().nullable().optional()),
  diagnosis: z.preprocess(emptyToNull, z.string().nullable().optional()),
  treatment_plan: z.preprocess(emptyToNull, z.string().nullable().optional()),
  status: z.string().min(1),
  notes: z.preprocess(emptyToNull, z.string().nullable().optional()),
});

export type DentalVisitFormInput = z.input<typeof dentalVisitFormSchema>;
export type DentalVisitFormValues = z.output<typeof dentalVisitFormSchema>;

export const dentalChartFormSchema = z.object({
  patient_id: z.string().min(1, "Patient is required"),
  visit_id: z.preprocess(emptyToNull, z.string().nullable().optional()),
  tooth_number: z.coerce.number().min(1).max(48),
  surface: z.preprocess(emptyToNull, z.string().nullable().optional()),
  condition: z.string().min(1, "Condition is required"),
  notes: z.preprocess(emptyToNull, z.string().nullable().optional()),
});

export type DentalChartFormInput = z.input<typeof dentalChartFormSchema>;
export type DentalChartFormValues = z.output<typeof dentalChartFormSchema>;

export const dentalProcedureFormSchema = z.object({
  patient_id: z.string().min(1, "Patient is required"),
  visit_id: z.preprocess(emptyToNull, z.string().nullable().optional()),
  tooth_number: z.preprocess(emptyToNull, z.coerce.number().nullable().optional()),
  procedure_name: z.string().min(1, "Procedure is required"),
  procedure_type: z.string().min(1, "Type is required"),
  scheduled_at: z.preprocess(emptyToNull, z.string().nullable().optional()),
  performed_at: z.preprocess(emptyToNull, z.string().nullable().optional()),
  dentist_id: z.preprocess(emptyToNull, z.string().nullable().optional()),
  status: z.string().min(1),
  cost: z.coerce.number().min(0),
  notes: z.preprocess(emptyToNull, z.string().nullable().optional()),
});

export type DentalProcedureFormInput = z.input<typeof dentalProcedureFormSchema>;
export type DentalProcedureFormValues = z.output<typeof dentalProcedureFormSchema>;
