// src/features/patients/components/patient-demographics-tab.tsx

import { SectionCard } from "@/shared/components/enterprise";
import type { Patient } from "../types/patient.types";
import { PatientInfoGrid } from "./patient-info-grid";

export function PatientDemographicsTab({ patient }: { patient: Patient }) {
  return (
    <SectionCard
      title="Demographics"
      description="Personal, demographic, and identity information."
    >
      <PatientInfoGrid
        items={[
          { label: "Title", value: patient.title },
          { label: "First Name", value: patient.first_name },
          { label: "Middle Name", value: patient.middle_name },
          { label: "Last Name", value: patient.last_name },
          { label: "Gender", value: patient.gender },
          { label: "Date of Birth", value: patient.date_of_birth },
          { label: "Age", value: patient.age },
          { label: "Blood Group", value: patient.blood_group },
          { label: "Marital Status", value: patient.marital_status },
          { label: "Nationality", value: patient.nationality },
          { label: "Religion", value: patient.religion },
          { label: "Occupation", value: patient.occupation },
          { label: "National ID", value: patient.national_id },
          { label: "Passport Number", value: patient.passport_number },
        ]}
      />
    </SectionCard>
  );
}