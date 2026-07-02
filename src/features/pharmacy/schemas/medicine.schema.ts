// src/features/pharmacy/schemas/medicine.schema.ts

import { z } from "zod";

export const medicineFormSchema = z.object({
  name: z.string().min(2, "Medicine name is required"),
  generic_name: z.string().optional(),
  brand_name: z.string().optional(),
  category_id: z.string().optional(),
  dosage_form: z.string().optional(),
  strength: z.string().optional(),
  unit: z.string().optional(),
  manufacturer: z.string().optional(),
  reorder_level: z.coerce.number().min(0).optional(),
  is_active: z.boolean().default(true),
});

export type MedicineFormInput = z.input<typeof medicineFormSchema>;
export type MedicineFormValues = z.output<typeof medicineFormSchema>;