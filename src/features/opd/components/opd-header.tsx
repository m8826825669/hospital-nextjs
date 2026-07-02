// src/features/opd/components/opd-header.tsx

import { CalendarDays, Stethoscope, UserRound, ClipboardPlus } from "lucide-react";
import {
  EntityHeader,
  EntityMetaItem,
} from "@/shared/components/enterprise";
import type { OpdEncounter } from "../types/opd.types";
import { OpdStatusBadge } from "./opd-status-badge";

export function OpdHeader({ encounter }: { encounter: OpdEncounter }) {
  return (
    <EntityHeader
      title={`${encounter.patient_name} — OPD Encounter`}
      subtitle={`Visit: ${encounter.visit_date} • UHID: ${
        encounter.patient_uhid || "-"
      }`}
      status={<OpdStatusBadge status={encounter.status} />}
      meta={
        <>
          <EntityMetaItem
            icon={<UserRound />}
            label="Patient"
            value={encounter.patient_name}
          />

          <EntityMetaItem
            icon={<Stethoscope />}
            label="Doctor"
            value={encounter.doctor_name}
          />

          <EntityMetaItem
            icon={<CalendarDays />}
            label="Visit Date"
            value={encounter.visit_date}
          />

          <EntityMetaItem
            icon={<ClipboardPlus />}
            label="Complaint"
            value={encounter.chief_complaint}
          />
        </>
      }
    />
  );
}