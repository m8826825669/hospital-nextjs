// src/features/emergency/components/emergency-workspace-drawer.tsx

"use client";

import {
  EntityActivityList,
  EntityHeader,
  EntityInfoGrid,
  EntityMetaItem,
  EntityWorkspaceDrawer,
  EntityWorkspaceTabs,
  SectionCard,
} from "@/shared/components/enterprise";
import { Ambulance, Bed, Clock, UserRound } from "lucide-react";
import type { EmergencyEncounter } from "../types/emergency.types";
import { ErSeverityBadge, ErStatusBadge } from "./emergency-badges";
import { useEmergencyTimeline } from "../api/emergency.queries";

interface EmergencyWorkspaceDrawerProps {
  open: boolean;
  encounter: EmergencyEncounter | null;
  onOpenChange: (open: boolean) => void;
}

export function EmergencyWorkspaceDrawer({
  open,
  encounter,
  onOpenChange,
}: EmergencyWorkspaceDrawerProps) {
  return (
    <EntityWorkspaceDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={encounter ? "Emergency Workspace" : "Emergency"}
      description="Triage, treatment, observation, orders, disposition, and timeline."
    >
      {!encounter ? null : <EmergencyWorkspaceContent encounter={encounter} />}
    </EntityWorkspaceDrawer>
  );
}

function EmergencyWorkspaceContent({
  encounter,
}: {
  encounter: EmergencyEncounter;
}) {
  const timelineQuery = useEmergencyTimeline(encounter.id);

  return (
    <>
      <EntityHeader
        title={`${encounter.encounter_number} — ${encounter.patient_name}`}
        subtitle={`UHID: ${encounter.patient_uhid || "-"} • ${encounter.chief_complaint}`}
        status={<ErStatusBadge status={encounter.status} />}
        meta={
          <>
            <EntityMetaItem icon={<UserRound />} label="Patient" value={encounter.patient_name} />
            <EntityMetaItem icon={<Ambulance />} label="Severity" value={encounter.severity.toUpperCase()} />
            <EntityMetaItem icon={<Clock />} label="Arrival" value={encounter.arrival_time} />
            <EntityMetaItem icon={<Bed />} label="Bed / Bay" value={encounter.bed_number} />
          </>
        }
      />

      <EntityWorkspaceTabs
        defaultValue="overview"
        tabs={[
          {
            value: "overview",
            label: "Overview",
            content: (
              <SectionCard title="Emergency Encounter Summary">
                <div className="mb-4 flex gap-2">
                  <ErSeverityBadge severity={encounter.severity} />
                  <ErStatusBadge status={encounter.status} />
                </div>

                <EntityInfoGrid
                  items={[
                    { label: "Encounter", value: encounter.encounter_number },
                    { label: "Patient", value: encounter.patient_name },
                    { label: "UHID", value: encounter.patient_uhid },
                    { label: "Chief Complaint", value: encounter.chief_complaint },
                    { label: "Doctor", value: encounter.doctor_name },
                    { label: "Arrival Time", value: encounter.arrival_time },
                    { label: "Vitals", value: encounter.vitals_summary },
                    { label: "Triage Notes", value: encounter.triage_notes },
                    { label: "Disposition", value: encounter.disposition },
                  ]}
                />
              </SectionCard>
            ),
          },
          {
            value: "trauma",
            label: "Trauma Board",
            content: (
              <SectionCard
                title="Trauma / Resuscitation Board"
                description="Placeholder for critical ER workflow, trauma team actions, airway, breathing, circulation, disability, exposure."
              >
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="rounded-lg border p-3">
                    <p className="font-medium">Airway</p>
                    <p className="text-sm text-muted-foreground">Assessment pending</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="font-medium">Breathing</p>
                    <p className="text-sm text-muted-foreground">Assessment pending</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="font-medium">Circulation</p>
                    <p className="text-sm text-muted-foreground">Assessment pending</p>
                  </div>
                  <div className="rounded-lg border p-3">
                    <p className="font-medium">Neurological Status</p>
                    <p className="text-sm text-muted-foreground">Assessment pending</p>
                  </div>
                </div>
              </SectionCard>
            ),
          },
          {
            value: "timeline",
            label: "Timeline",
            content: (
              <SectionCard title="Emergency Timeline">
                <EntityActivityList
                  isLoading={timelineQuery.isLoading}
                  items={timelineQuery.data}
                  emptyTitle="No ER activity"
                  emptyDescription="Arrival, triage, treatment, orders, observation, and disposition activity will appear here."
                />
              </SectionCard>
            ),
          },
        ]}
      />
    </>
  );
}