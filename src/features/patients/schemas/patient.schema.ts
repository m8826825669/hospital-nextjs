// src/features/patients/schemas/patient.schema.ts

import { z } from "zod";

export const patientFormSchema = z.object({
  uhid: z.string().optional(),
  mrn: z.string().optional(),

  title: z.string().optional(),
  first_name: z.string().min(2, "First name is required"),
  middle_name: z.string().optional(),
  last_name: z.string().optional(),

  gender: z.enum(["male", "female", "other", "unknown"]),
  date_of_birth: z.string().optional(),
  age: z.coerce.number().min(0).max(130).optional(),
  blood_group: z.string().optional(),
  marital_status: z.string().optional(),

  email: z.string().email("Valid email is required").optional().or(z.literal("")),
  phone: z.string().optional(),
  alternate_phone: z.string().optional(),

  emergency_contact_name: z.string().optional(),
  emergency_contact_phone: z.string().optional(),
  emergency_contact_relationship: z.string().optional(),

  address_line1: z.string().optional(),
  address_line2: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  country: z.string().optional(),
  postal_code: z.string().optional(),

  nationality: z.string().optional(),
  religion: z.string().optional(),
  occupation: z.string().optional(),

  national_id: z.string().optional(),
  passport_number: z.string().optional(),

  primary_doctor_id: z.string().optional(),
  department_id: z.string().optional(),

  insurance_provider_id: z.string().optional(),
  insurance_policy_number: z.string().optional(),

  remarks: z.string().optional(),
  is_active: z.boolean().default(true),
});

export type PatientFormInput = z.input<typeof patientFormSchema>;
export type PatientFormValues = z.output<typeof patientFormSchema>;