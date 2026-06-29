// src/features/patients/components/patient-overview-tab.tsx

import { CalendarDays, Droplets, ShieldCheck, Stethoscope } from "lucide-react";
import { StatCard, SectionCard } from "@/shared/components/enterprise";
import type { Patient } from "../types/patient.types";
import { PatientInfoGrid } from "./patient-info-grid";

export function PatientOverviewTab({ patient }: { patient: Patient }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <StatCard
          title="Blood Group"
          value={patient.blood_group || "-"}
          description="Recorded blood group"
          icon={<Droplets className="h-5 w-5" />}
        />

        <StatCard
          title="Primary Doctor"
          value={patient.primary_doctor_name || "-"}
          description="Assigned consultant"
          icon={<Stethoscope className="h-5 w-5" />}
        />

        <StatCard
          title="Insurance"
          value={patient.insurance_provider_name || "-"}
          description="Active insurance provider"
          icon={<ShieldCheck className="h-5 w-5" />}
        />

        <StatCard
          title="Registered"
          value={patient.created_at ? patient.created_at.slice(0, 10) : "-"}
          description="Registration date"
          icon={<CalendarDays className="h-5 w-5" />}
        />
      </div>

      <SectionCard title="Clinical Summary">
        <PatientInfoGrid
          items={[
            { label: "UHID", value: patient.uhid },
            { label: "MRN", value: patient.mrn },
            { label: "Department", value: patient.department_name },
            { label: "Remarks", value: patient.remarks },
          ]}
        />
      </SectionCard>
    </div>
  );
}