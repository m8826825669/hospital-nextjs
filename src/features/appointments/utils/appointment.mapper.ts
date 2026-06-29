// src/features/appointments/utils/appointment.mapper.ts

import type {
  Appointment,
  CreateAppointmentPayload,
  UpdateAppointmentPayload,
} from "../types/appointment.types";
import type { AppointmentFormValues } from "../schemas/appointment.schema";

function emptyToUndefined(value?: string | null) {
  return value && value.trim() !== "" ? value : undefined;
}

export function appointmentToFormValues(
  appointment: Appointment
): Partial<AppointmentFormValues> {
  return {
    patient_id: appointment.patient_id,
    doctor_id: appointment.doctor_id,
    department_id: appointment.department_id ?? "",
    appointment_date: appointment.appointment_date,
    start_time: appointment.start_time,
    end_time: appointment.end_time ?? "",
    appointment_type: appointment.appointment_type,
    reason: appointment.reason ?? "",
    notes: appointment.notes ?? "",
  };
}

export function appointmentFormToCreatePayload(
  values: AppointmentFormValues
): CreateAppointmentPayload {
  return {
    patient_id: values.patient_id,
    doctor_id: values.doctor_id,
    department_id: emptyToUndefined(values.department_id),
    appointment_date: values.appointment_date,
    start_time: values.start_time,
    end_time: emptyToUndefined(values.end_time),
    appointment_type: values.appointment_type,
    reason: emptyToUndefined(values.reason),
    notes: emptyToUndefined(values.notes),
  };
}

export function appointmentFormToUpdatePayload(
  values: AppointmentFormValues
): UpdateAppointmentPayload {
  return {
    ...appointmentFormToCreatePayload(values),
  };
}