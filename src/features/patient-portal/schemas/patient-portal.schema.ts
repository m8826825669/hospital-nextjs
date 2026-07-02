// src/features/patient-portal/schemas/patient-portal.schema.ts

import { z } from "zod";

export const patientPortalProfileFormSchema = z.object({
  full_name: z.string().min(2, "Name is required"),
  email: z.string().optional(),
  phone: z.string().optional(),
  gender: z.string().optional(),
  date_of_birth: z.string().optional(),
  address: z.string().optional(),
  blood_group: z.string().optional(),
});

export type PatientPortalProfileFormInput = z.input<
  typeof patientPortalProfileFormSchema
>;

export type PatientPortalProfileFormValues = z.output<
  typeof patientPortalProfileFormSchema
>;