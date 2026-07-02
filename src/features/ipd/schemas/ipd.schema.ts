// src/features/ipd/schemas/ipd.schema.ts

import { z } from "zod";

export const ipdAdmissionFormSchema = z.object({
  patient_id: z.string().min(1, "Patient is required"),
  doctor_id: z.string().min(1, "Doctor is required"),
  department_id: z.string().optional(),
  ward_id: z.string().optional(),
  bed_id: z.string().optional(),

  admission_date: z.string().min(1, "Admission date is required"),
  admission_time: z.string().optional(),

  diagnosis: z.string().optional(),
  reason_for_admission: z.string().optional(),
  notes: z.string().optional(),
});

export const ipdTransferFormSchema = z.object({
  ward_id: z.string().optional(),
  bed_id: z.string().min(1, "Bed is required"),
  transfer_reason: z.string().optional(),
});

export const ipdDischargeFormSchema = z.object({
  discharge_date: z.string().min(1, "Discharge date is required"),
  discharge_time: z.string().optional(),
  discharge_summary: z.string().optional(),
});

export type IpdAdmissionFormInput = z.input<typeof ipdAdmissionFormSchema>;
export type IpdAdmissionFormValues = z.output<typeof ipdAdmissionFormSchema>;

export type IpdTransferFormInput = z.input<typeof ipdTransferFormSchema>;
export type IpdTransferFormValues = z.output<typeof ipdTransferFormSchema>;

export type IpdDischargeFormInput = z.input<typeof ipdDischargeFormSchema>;
export type IpdDischargeFormValues = z.output<typeof ipdDischargeFormSchema>;