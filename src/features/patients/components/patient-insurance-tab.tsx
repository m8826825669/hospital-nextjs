// src/features/patients/components/patient-insurance-tab.tsx

import { SectionCard, StatusBadge } from "@/shared/components/enterprise";
import type { Patient } from "../types/patient.types";
import { PatientInfoGrid } from "./patient-info-grid";

export function PatientInsuranceTab({ patient }: { patient: Patient }) {
  const hasInsurance = Boolean(patient.insurance_provider_name);

  return (
    <SectionCard title="Insurance Details">
      <div className="mb-4">
        <StatusBadge
          label={hasInsurance ? "Insurance Available" : "Self Pay"}
          variant={hasInsurance ? "success" : "muted"}
        />
      </div>

      <PatientInfoGrid
        items={[
          { label: "Provider", value: patient.insurance_provider_name },
          { label: "Provider ID", value: patient.insurance_provider_id },
          { label: "Policy Number", value: patient.insurance_policy_number },
        ]}
      />
    </SectionCard>
  );
}
