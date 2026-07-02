import { Mail, MapPin, Phone, UserRound } from "lucide-react";
import type { Patient } from "../types/patient.types";
import { PatientAvatar } from "./patient-avatar";
import { PatientStatusBadge } from "./patient-status-badge";
import { EntityHeader, EntityMetaItem } from "@/shared/components/enterprise";

export function PatientHeader({ patient }: { patient: Patient }) {
  return (
    <EntityHeader
      avatar={<PatientAvatar patient={patient} />}
      title={patient.full_name}
      subtitle={`UHID: ${patient.uhid || "-"} • MRN: ${patient.mrn || "-"}`}
      status={<PatientStatusBadge status={patient.status} />}
      meta={
        <>
          <EntityMetaItem
            icon={<UserRound />}
            label="Gender / Age"
            value={`${patient.gender || "-"} / ${patient.age ?? "-"}`}
          />

          <EntityMetaItem
            icon={<Phone />}
            label="Phone"
            value={patient.phone || "-"}
          />

          <EntityMetaItem
            icon={<Mail />}
            label="Email"
            value={patient.email || "-"}
          />

          <EntityMetaItem
            icon={<MapPin />}
            label="Location"
            value={
              [patient.city, patient.state, patient.country]
                .filter(Boolean)
                .join(", ") || "-"
            }
          />
        </>
      }
    />
  );
}