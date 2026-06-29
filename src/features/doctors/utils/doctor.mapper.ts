import type { Doctor } from "../types/doctor.types";
import type { DoctorFormValues } from "../schemas/doctor.schema";

export function doctorToFormValues(doctor: Doctor): Partial<DoctorFormValues> {
  return {
    user_id: doctor.user_id,
    registration_number: doctor.registration_number,
    specialization: doctor.specialization,
    qualification: doctor.qualification ?? "",
    consultation_fee: doctor.consultation_fee ?? undefined,
    department_ids: doctor.department_ids ?? [],
    is_active: doctor.is_active,
  };
}

export function doctorFormToCreatePayload(values: DoctorFormValues) {
  return {
    user_id: values.user_id,
    registration_number: values.registration_number,
    specialization: values.specialization,
    qualification: values.qualification || undefined,
    consultation_fee: values.consultation_fee,
    department_ids: values.department_ids,
    is_active: values.is_active,
  };
}

export function doctorFormToUpdatePayload(values: DoctorFormValues) {
  return {
    registration_number: values.registration_number,
    specialization: values.specialization,
    qualification: values.qualification || undefined,
    consultation_fee: values.consultation_fee,
    department_ids: values.department_ids,
    is_active: values.is_active,
  };
}