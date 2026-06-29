// src/features/patients/components/patient-contacts-tab.tsx

import { SectionCard } from "@/shared/components/enterprise";
import type { Patient } from "../types/patient.types";
import { PatientInfoGrid } from "./patient-info-grid";

export function PatientContactsTab({ patient }: { patient: Patient }) {
  return (
    <div className="space-y-4">
      <SectionCard title="Contact Details">
        <PatientInfoGrid
          items={[
            { label: "Phone", value: patient.phone },
            { label: "Alternate Phone", value: patient.alternate_phone },
            { label: "Email", value: patient.email },
          ]}
        />
      </SectionCard>

      <SectionCard title="Emergency Contact">
        <PatientInfoGrid
          items={[
            { label: "Name", value: patient.emergency_contact_name },
            { label: "Phone", value: patient.emergency_contact_phone },
            {
              label: "Relationship",
              value: patient.emergency_contact_relationship,
            },
          ]}
        />
      </SectionCard>

      <SectionCard title="Address">
        <PatientInfoGrid
          items={[
            { label: "Address Line 1", value: patient.address_line1 },
            { label: "Address Line 2", value: patient.address_line2 },
            { label: "City", value: patient.city },
            { label: "State", value: patient.state },
            { label: "Country", value: patient.country },
            { label: "Postal Code", value: patient.postal_code },
          ]}
        />
      </SectionCard>
    </div>
  );
}