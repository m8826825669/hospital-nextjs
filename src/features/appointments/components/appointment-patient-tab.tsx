// src/features/appointments/components/appointment-patient-tab.tsx

import { SectionCard, EntityInfoGrid } from "@/shared/components/enterprise";
import type { Appointment } from "../types/appointment.types";

export function AppointmentPatientTab({
  appointment,
}: {
  appointment: Appointment;
}) {
  return (
    <SectionCard title="Patient">
      <EntityInfoGrid
        items={[
          { label: "Patient", value: appointment.patient_name },
          { label: "UHID", value: appointment.patient_uhid },
          { label: "Phone", value: appointment.patient_phone },
          { label: "Patient ID", value: appointment.patient_id },
        ]}
      />
    </SectionCard>
  );
}