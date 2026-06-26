import type { PatientResponse } from "../types/patient.types";

export function getPatientFullName(patient: PatientResponse) {
  return `${patient.first_name || ""} ${patient.middle_name || ""} ${
    patient.last_name || ""
  }`.trim();
}

export function getPatientInitials(patient: PatientResponse) {
  const fullName = getPatientFullName(patient);

  return fullName
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function calculateAge(dob?: string) {
  if (!dob) return "-";

  const birthDate = new Date(dob);
  if (Number.isNaN(birthDate.getTime())) return "-";

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();

  const monthDiff = today.getMonth() - birthDate.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < birthDate.getDate())
  ) {
    age--;
  }

  return `${age} yrs`;
}