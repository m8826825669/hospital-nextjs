// src/features/reports/schemas/reports.schema.ts

import { z } from "zod";

export const runReportFormSchema = z.object({
  report_id: z.string().min(1, "Report is required"),
  format: z.enum(["pdf", "excel", "csv"]),
  date_from: z.string().optional(),
  date_to: z.string().optional(),
  patient_id: z.string().optional(),
  doctor_id: z.string().optional(),
  department_id: z.string().optional(),
  module: z.string().optional(),
});

export type RunReportFormInput = z.input<typeof runReportFormSchema>;
export type RunReportFormValues = z.output<typeof runReportFormSchema>;