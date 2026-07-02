// src/features/opd/components/opd-clinical-notes-tab.tsx

import { SectionCard, EntityInfoGrid } from "@/shared/components/enterprise";
import type { OpdEncounter } from "../types/opd.types";

export function OpdClinicalNotesTab({
  encounter,
}: {
  encounter: OpdEncounter;
}) {
  return (
    <div className="space-y-4">
      <SectionCard title="Clinical Notes">
        <EntityInfoGrid
          items={[
            { label: "Chief Complaint", value: encounter.chief_complaint },
            {
              label: "History of Present Illness",
              value: encounter.history_of_present_illness,
            },
            { label: "Diagnosis", value: encounter.diagnosis },
            {
              label: "Provisional Diagnosis",
              value: encounter.provisional_diagnosis,
            },
            { label: "Final Diagnosis", value: encounter.final_diagnosis },
            { label: "Treatment Plan / Notes", value: encounter.notes },
          ]}
        />
      </SectionCard>
    </div>
  );
}