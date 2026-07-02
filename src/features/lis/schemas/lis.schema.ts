// src/features/lis/schemas/lis.schema.ts

import { z } from "zod";

export const labSampleFormSchema = z.object({
  patient_id: z.string().min(1, "Patient is required"),
  doctor_id: z.string().optional(),
  test_id: z.string().optional(),
  profile_id: z.string().optional(),
  sample_type: z.string().optional(),
  priority: z.enum(["routine", "urgent", "stat"]),
  remarks: z.string().optional(),
});

export const labResultEntrySchema = z.object({
  sample_id: z.string().min(1, "Sample is required"),
  test_id: z.string().min(1, "Test is required"),
  result_value: z.string().optional(),
  remarks: z.string().optional(),
  is_abnormal: z.boolean().default(false),
});

export type LabSampleFormInput = z.input<typeof labSampleFormSchema>;
export type LabSampleFormValues = z.output<typeof labSampleFormSchema>;

export type LabResultEntryInput = z.input<typeof labResultEntrySchema>;
export type LabResultEntryValues = z.output<typeof labResultEntrySchema>;