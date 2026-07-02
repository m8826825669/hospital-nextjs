// src/features/appointments/components/appointment-doctor-tab.tsx

import { SectionCard, EntityInfoGrid } from "@/shared/components/enterprise";
import type { Appointment } from "../types/appointment.types";

export function AppointmentDoctorTab({
  appointment,
}: {
  appointment: Appointment;
}) {
  return (
    <SectionCard title="Doctor & Department">
      <EntityInfoGrid
        items={[
          { label: "Doctor", value: appointment.doctor_name },
          { label: "Doctor ID", value: appointment.doctor_id },
          { label: "Department", value: appointment.department_name },
          { label: "Department ID", value: appointment.department_id },
        ]}
      />
    </SectionCard>
  );
}