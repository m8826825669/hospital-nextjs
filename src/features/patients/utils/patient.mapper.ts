// src/features/patients/utils/patient.mapper.ts

import type {
  CreatePatientPayload,
  Patient,
  UpdatePatientPayload,
} from "../types/patient.types";
import type { PatientFormValues } from "../schemas/patient.schema";

function emptyToUndefined(value?: string | null) {
  return value && value.trim() !== "" ? value : undefined;
}

export function patientToFormValues(
  patient: Patient
): Partial<PatientFormValues> {
  return {
    uhid: patient.uhid ?? "",
    mrn: patient.mrn ?? "",

    title: patient.title ?? "",
    first_name: patient.first_name,
    middle_name: patient.middle_name ?? "",
    last_name: patient.last_name ?? "",

    gender: patient.gender,
    date_of_birth: patient.date_of_birth ?? "",
    age: patient.age ?? undefined,
    blood_group: patient.blood_group ?? "",
    marital_status: patient.marital_status ?? "",

    email: patient.email ?? "",
    phone: patient.phone ?? "",
    alternate_phone: patient.alternate_phone ?? "",

    emergency_contact_name: patient.emergency_contact_name ?? "",
    emergency_contact_phone: patient.emergency_contact_phone ?? "",
    emergency_contact_relationship:
      patient.emergency_contact_relationship ?? "",

    address_line1: patient.address_line1 ?? "",
    address_line2: patient.address_line2 ?? "",
    city: patient.city ?? "",
    state: patient.state ?? "",
    country: patient.country ?? "",
    postal_code: patient.postal_code ?? "",

    nationality: patient.nationality ?? "",
    religion: patient.religion ?? "",
    occupation: patient.occupation ?? "",

    national_id: patient.national_id ?? "",
    passport_number: patient.passport_number ?? "",

    primary_doctor_id: patient.primary_doctor_id ?? "",
    department_id: patient.department_id ?? "",

    insurance_provider_id: patient.insurance_provider_id ?? "",
    insurance_policy_number: patient.insurance_policy_number ?? "",

    remarks: patient.remarks ?? "",
    is_active: patient.is_active,
  };
}

export function patientFormToCreatePayload(
  values: PatientFormValues
): CreatePatientPayload {
  return {
    uhid: emptyToUndefined(values.uhid),
    mrn: emptyToUndefined(values.mrn),

    title: emptyToUndefined(values.title),
    first_name: values.first_name,
    middle_name: emptyToUndefined(values.middle_name),
    last_name: emptyToUndefined(values.last_name),

    gender: values.gender,
    date_of_birth: emptyToUndefined(values.date_of_birth),
    age: values.age,
    blood_group: emptyToUndefined(values.blood_group),
    marital_status: emptyToUndefined(values.marital_status),

    email: emptyToUndefined(values.email),
    phone: emptyToUndefined(values.phone),
    alternate_phone: emptyToUndefined(values.alternate_phone),

    emergency_contact_name: emptyToUndefined(values.emergency_contact_name),
    emergency_contact_phone: emptyToUndefined(values.emergency_contact_phone),
    emergency_contact_relationship: emptyToUndefined(
      values.emergency_contact_relationship
    ),

    address_line1: emptyToUndefined(values.address_line1),
    address_line2: emptyToUndefined(values.address_line2),
    city: emptyToUndefined(values.city),
    state: emptyToUndefined(values.state),
    country: emptyToUndefined(values.country),
    postal_code: emptyToUndefined(values.postal_code),

    nationality: emptyToUndefined(values.nationality),
    religion: emptyToUndefined(values.religion),
    occupation: emptyToUndefined(values.occupation),

    national_id: emptyToUndefined(values.national_id),
    passport_number: emptyToUndefined(values.passport_number),

    primary_doctor_id: emptyToUndefined(values.primary_doctor_id),
    department_id: emptyToUndefined(values.department_id),

    insurance_provider_id: emptyToUndefined(values.insurance_provider_id),
    insurance_policy_number: emptyToUndefined(values.insurance_policy_number),

    remarks: emptyToUndefined(values.remarks),
    is_active: values.is_active,
  };
}

export function patientFormToUpdatePayload(
  values: PatientFormValues
): UpdatePatientPayload {
  return {
    ...patientFormToCreatePayload(values),
  };
}