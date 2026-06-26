import { z } from "zod";

export const patientRegistrationSchema = z.object({
  first_name: z.string().min(1, "First name is required"),
  middle_name: z.string().optional(),
  last_name: z.string().min(1, "Last name is required"),
  dob: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  blood_group: z.string().optional(),

  mobile: z.string().min(10, "Mobile number is required"),
  alternate_mobile: z.string().optional(),
  email: z.string().email("Invalid email").optional().or(z.literal("")),

  aadhaar_number: z.string().optional(),
  pan_number: z.string().optional(),
  passport_number: z.string().optional(),

  address: z.object({
    address_line1: z.string().min(1, "Address line 1 is required"),
    address_line2: z.string().optional(),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    country: z.string().min(1, "Country is required"),
    pincode: z.string().min(1, "Pincode is required"),
  }),

  emergency_contact: z.object({
    name: z.string().min(1, "Emergency contact name is required"),
    relation: z.string().min(1, "Relation is required"),
    phone: z.string().min(10, "Emergency contact phone is required"),
  }),
});

export type PatientRegistrationFormValues = z.infer<
  typeof patientRegistrationSchema
>;