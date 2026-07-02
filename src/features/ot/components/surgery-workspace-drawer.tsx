// src/features/ot/components/surgery-workspace-drawer.tsx

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
import { CalendarDays, Scissors, Stethoscope, UserRound } from "lucide-react";
import type { Surgery } from "../types/ot.types";
import { SurgeryStatusBadge } from "./surgery-status-badge";
import { useSurgeryTimeline } from "../api/ot.queries";

interface SurgeryWorkspaceDrawerProps {
  open: boolean;
  surgery: Surgery | null;
  onOpenChange: (open: boolean) => void;
}

export function SurgeryWorkspaceDrawer({
  open,
  surgery,
  onOpenChange,
}: SurgeryWorkspaceDrawerProps) {
  return (
    <EntityWorkspaceDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={surgery ? "Surgery Workspace" : "Surgery"}
      description="Surgery details, theatre, team, timing, notes, and status history."
    >
      {!surgery ? null : <SurgeryWorkspaceContent surgery={surgery} />}
    </EntityWorkspaceDrawer>
  );
}

function SurgeryWorkspaceContent({ surgery }: { surgery: Surgery }) {
  const timelineQuery = useSurgeryTimeline(surgery.id);

  return (
    <>
      <EntityHeader
        title={`${surgery.procedure_name} — ${surgery.patient_name}`}
        subtitle={`Surgery: ${surgery.surgery_number} • UHID: ${
          surgery.patient_uhid || "-"
        }`}
        status={<SurgeryStatusBadge status={surgery.status} />}
        meta={
          <>
            <EntityMetaItem
              icon={<UserRound />}
              label="Patient"
              value={surgery.patient_name}
            />
            <EntityMetaItem
              icon={<Stethoscope />}
              label="Surgeon"
              value={surgery.surgeon_name}
            />
            <EntityMetaItem
              icon={<Scissors />}
              label="Theatre"
              value={surgery.theatre_name}
            />
            <EntityMetaItem
              icon={<CalendarDays />}
              label="Date"
              value={surgery.scheduled_date}
            />
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
              <SectionCard title="Surgery Summary">
                <EntityInfoGrid
                  items={[
                    { label: "Surgery Number", value: surgery.surgery_number },
                    { label: "Patient", value: surgery.patient_name },
                    { label: "Procedure", value: surgery.procedure_name },
                    { label: "Diagnosis", value: surgery.diagnosis },
                    { label: "Anesthesia", value: surgery.anesthesia_type },
                    { label: "Theatre", value: surgery.theatre_name },
                    { label: "Status", value: surgery.status },
                    { label: "Notes", value: surgery.notes },
                  ]}
                />
              </SectionCard>
            ),
          },
          {
            value: "team",
            label: "Team",
            content: (
              <SectionCard title="Surgical Team">
                <EntityInfoGrid
                  items={[
                    { label: "Surgeon", value: surgery.surgeon_name },
                    {
                      label: "Assistant Surgeon",
                      value: surgery.assistant_surgeon_name,
                    },
                    { label: "Surgeon ID", value: surgery.surgeon_id },
                    {
                      label: "Assistant Surgeon ID",
                      value: surgery.assistant_surgeon_id,
                    },
                  ]}
                />
              </SectionCard>
            ),
          },
          {
            value: "timing",
            label: "Timing",
            content: (
              <SectionCard title="Timing">
                <EntityInfoGrid
                  items={[
                    { label: "Scheduled Date", value: surgery.scheduled_date },
                    {
                      label: "Scheduled Start",
                      value: surgery.scheduled_start_time,
                    },
                    { label: "Scheduled End", value: surgery.scheduled_end_time },
                    { label: "Actual Start", value: surgery.actual_start_time },
                    { label: "Actual End", value: surgery.actual_end_time },
                  ]}
                />
              </SectionCard>
            ),
          },
          {
            value: "timeline",
            label: "Timeline",
            content: (
              <SectionCard title="Surgery Timeline">
                <EntityActivityList
                  isLoading={timelineQuery.isLoading}
                  items={timelineQuery.data}
                  emptyTitle="No surgery activity"
                  emptyDescription="Scheduling, start, completion, and cancellation events will appear here."
                />
              </SectionCard>
            ),
          },
        ]}
      />
    </>
  );
}