// src/features/patients/components/patient-visits-tab.tsx

import { EmptyState, SectionCard } from "@/shared/components/enterprise";
import type { Patient } from "../types/patient.types";

export function PatientVisitsTab({ patient }: { patient: Patient }) {
  return (
    <SectionCard
      title="Visits"
      description={`Clinical visits and encounters for ${patient.full_name}.`}
    >
      <EmptyState
        title="No visits loaded"
        description="Appointments, OPD, IPD, and OT encounters will appear here."
      />
    </SectionCard>
  );
}