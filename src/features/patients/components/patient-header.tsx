// src/features/patients/components/patient-header.tsx

import { Mail, MapPin, Phone, UserRound } from "lucide-react";
import type { Patient } from "../types/patient.types";
import { PatientAvatar } from "./patient-avatar";
import { PatientStatusBadge } from "./patient-status-badge";

export function PatientHeader({ patient }: { patient: Patient }) {
  return (
    <div className="rounded-xl border bg-muted/30 p-4">
      <div className="flex items-start gap-4">
        <PatientAvatar patient={patient} />

        <div className="flex-1 space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="font-semibold">{patient.full_name}</h3>
              <p className="text-sm text-muted-foreground">
                UHID: {patient.uhid || "-"} • MRN: {patient.mrn || "-"}
              </p>
            </div>

            <PatientStatusBadge status={patient.status} />
          </div>

          <div className="grid gap-3 text-sm md:grid-cols-2">
            <InfoItem
              icon={<UserRound />}
              label="Gender / Age"
              value={`${patient.gender || "-"} / ${patient.age ?? "-"}`}
            />

            <InfoItem icon={<Phone />} label="Phone" value={patient.phone || "-"} />

            <InfoItem icon={<Mail />} label="Email" value={patient.email || "-"} />

            <InfoItem
              icon={<MapPin />}
              label="Location"
              value={
                [patient.city, patient.state, patient.country]
                  .filter(Boolean)
                  .join(", ") || "-"
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoItem({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-0.5 text-muted-foreground [&_svg]:h-4 [&_svg]:w-4">
        {icon}
      </div>
      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{value}</p>
      </div>
    </div>
  );
}