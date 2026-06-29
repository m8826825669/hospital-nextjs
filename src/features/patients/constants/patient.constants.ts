// src/features/patients/constants/patient.constants.ts

import type { PatientGender, PatientStatus } from "../types/patient.types";

export const patientGenderOptions: {
  label: string;
  value: PatientGender;
}[] = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
  { label: "Other", value: "other" },
  { label: "Unknown", value: "unknown" },
];

export const patientStatusOptions: {
  label: string;
  value: PatientStatus;
}[] = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Deceased", value: "deceased" },
  { label: "Blocked", value: "blocked" },
];

export const bloodGroupOptions = [
  { label: "A+", value: "A+" },
  { label: "A-", value: "A-" },
  { label: "B+", value: "B+" },
  { label: "B-", value: "B-" },
  { label: "AB+", value: "AB+" },
  { label: "AB-", value: "AB-" },
  { label: "O+", value: "O+" },
  { label: "O-", value: "O-" },
  { label: "Unknown", value: "unknown" },
];

export const maritalStatusOptions = [
  { label: "Single", value: "single" },
  { label: "Married", value: "married" },
  { label: "Divorced", value: "divorced" },
  { label: "Widowed", value: "widowed" },
  { label: "Separated", value: "separated" },
];

export const patientDocumentTypeOptions = [
  { label: "Identity Proof", value: "identity_proof" },
  { label: "Insurance Card", value: "insurance_card" },
  { label: "Referral Letter", value: "referral_letter" },
  { label: "Consent Form", value: "consent_form" },
  { label: "Medical Report", value: "medical_report" },
  { label: "Lab Report", value: "lab_report" },
  { label: "Prescription", value: "prescription" },
  { label: "Other", value: "other" },
];