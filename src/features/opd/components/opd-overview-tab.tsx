// src/features/opd/components/opd-overview-tab.tsx

import { SectionCard, EntityInfoGrid } from "@/shared/components/enterprise";
import type { OpdEncounter } from "../types/opd.types";
import { OpdStatusBadge } from "./opd-status-badge";

export function OpdOverviewTab({ encounter }: { encounter: OpdEncounter }) {
  return (
    <div className="space-y-4">
      <SectionCard title="Encounter Summary">
        <div className="mb-4">
          <OpdStatusBadge status={encounter.status} />
        </div>

        <EntityInfoGrid
          items={[
            { label: "Patient", value: encounter.patient_name },
            { label: "UHID", value: encounter.patient_uhid },
            { label: "Doctor", value: encounter.doctor_name },
            { label: "Appointment Date", value: encounter.appointment_date },
            { label: "Visit Date", value: encounter.visit_date },
            { label: "Visit Time", value: encounter.visit_time },
            { label: "Chief Complaint", value: encounter.chief_complaint },
            { label: "Diagnosis", value: encounter.diagnosis },
            { label: "Follow-up Date", value: encounter.follow_up_date },
          ]}
        />
      </SectionCard>
    </div>
  );
}