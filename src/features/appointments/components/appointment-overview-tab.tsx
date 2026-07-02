// src/features/appointments/components/appointment-overview-tab.tsx

import { SectionCard, EntityInfoGrid } from "@/shared/components/enterprise";
import type { Appointment } from "../types/appointment.types";
import { AppointmentStatusBadge } from "./appointment-status-badge";
import { AppointmentTypeBadge } from "./appointment-type-badge";

export function AppointmentOverviewTab({
  appointment,
}: {
  appointment: Appointment;
}) {
  return (
    <div className="space-y-4">
      <SectionCard title="Appointment Summary">
        <div className="mb-4 flex gap-2">
          <AppointmentStatusBadge status={appointment.status} />
          <AppointmentTypeBadge type={appointment.appointment_type} />
        </div>

        <EntityInfoGrid
          items={[
            { label: "Date", value: appointment.appointment_date },
            { label: "Start Time", value: appointment.start_time },
            { label: "End Time", value: appointment.end_time },
            { label: "Department", value: appointment.department_name },
            { label: "Token", value: appointment.token_number },
            { label: "Consultation Fee", value: appointment.consultation_fee },
            { label: "Reason", value: appointment.reason },
            { label: "Notes", value: appointment.notes },
          ]}
        />
      </SectionCard>
    </div>
  );
}