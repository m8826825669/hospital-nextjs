// src/features/appointments/constants/appointment.constants.ts

import type {
  AppointmentStatus,
  AppointmentType,
} from "../types/appointment.types";

export const appointmentStatusOptions: {
  label: string;
  value: AppointmentStatus;
}[] = [
  { label: "Scheduled", value: "scheduled" },
  { label: "Checked In", value: "checked_in" },
  { label: "In Consultation", value: "in_consultation" },
  { label: "Completed", value: "completed" },
  { label: "Cancelled", value: "cancelled" },
  { label: "No Show", value: "no_show" },
];

export const appointmentTypeOptions: {
  label: string;
  value: AppointmentType;
}[] = [
  { label: "OPD", value: "opd" },
  { label: "Follow-up", value: "follow_up" },
  { label: "Emergency", value: "emergency" },
  { label: "Teleconsultation", value: "teleconsultation" },
];