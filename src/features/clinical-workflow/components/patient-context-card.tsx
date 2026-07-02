// src/features/clinical-workflow/components/patient-context-card.tsx

"use client";

import { UserRound} from "lucide-react";
import {
  EntityInfoGrid,
  SectionCard,
} from "@/shared/components/enterprise";
import type { ClinicalPatientContext } from "../types/clinical-workflow.types";

export function PatientContextCard({
  patient,
}: {
  patient?: ClinicalPatientContext;
}) {
  if (!patient) {
    return (
      <SectionCard title="Patient Context">
        <p className="text-sm text-muted-foreground">
          Search or select a patient to load clinical context.
        </p>
      </SectionCard>
    );
  }

  return (
    <SectionCard title="Patient Context" description="Unified clinical patient summary.">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-full bg-muted p-3">
          <UserRound className="h-5 w-5 text-muted-foreground" />
        </div>

        <div>
          <p className="font-semibold">{patient.patient_name}</p>
          <p className="text-sm text-muted-foreground">
            UHID: {patient.patient_uhid || "-"}
          </p>
        </div>
      </div>

      <EntityInfoGrid
        items={[
          { label: "Gender", value: patient.gender },
          { label: "Age", value: patient.age },
          { label: "Phone", value: patient.phone},
          {
            label: "Active Appointment",
            value: patient.active_appointment_id,
          },
          { label: "Active OPD", value: patient.active_opd_id },
          { label: "Active IPD", value: patient.active_ipd_admission_id },
          { label: "Active ER", value: patient.active_emergency_id },
        ]}
      />
    </SectionCard>
  );
}