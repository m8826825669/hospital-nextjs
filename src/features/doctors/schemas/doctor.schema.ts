// src/features/doctors/schemas/doctor.schema.ts

import { z } from "zod";

export const doctorFormSchema = z.object({
  user_id: z.string().min(1, "User is required"),
  registration_number: z.string().min(1, "Registration number is required"),
  specialization: z.string().min(2, "Specialization is required"),
  qualification: z.string().optional(),
  consultation_fee: z.coerce
    .number()
    .min(0, "Consultation fee cannot be negative")
    .optional(),
  department_ids: z.array(z.string()).default([]),
  is_active: z.boolean().default(true),
});

export type DoctorFormInput = z.input<typeof doctorFormSchema>;
export type DoctorFormValues = z.output<typeof doctorFormSchema>;