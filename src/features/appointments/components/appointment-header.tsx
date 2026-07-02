// src/features/appointments/components/appointment-header.tsx

import { CalendarDays, Clock, Stethoscope, UserRound } from "lucide-react";
import {
  EntityHeader,
  EntityMetaItem,
} from "@/shared/components/enterprise";
import type { Appointment } from "../types/appointment.types";
import { AppointmentStatusBadge } from "./appointment-status-badge";

export function AppointmentHeader({
  appointment,
}: {
  appointment: Appointment;
}) {
  return (
    <EntityHeader
      title={`${appointment.patient_name} with ${appointment.doctor_name}`}
      subtitle={`Appointment: ${appointment.appointment_date} • Token: ${
        appointment.token_number || "-"
      }`}
      status={<AppointmentStatusBadge status={appointment.status} />}
      meta={
        <>
          <EntityMetaItem
            icon={<UserRound />}
            label="Patient"
            value={appointment.patient_name}
          />
          <EntityMetaItem
            icon={<Stethoscope />}
            label="Doctor"
            value={appointment.doctor_name}
          />
          <EntityMetaItem
            icon={<CalendarDays />}
            label="Date"
            value={appointment.appointment_date}
          />
          <EntityMetaItem
            icon={<Clock />}
            label="Time"
            value={`${appointment.start_time}${
              appointment.end_time ? ` - ${appointment.end_time}` : ""
            }`}
          />
        </>
      }
    />
  );
}