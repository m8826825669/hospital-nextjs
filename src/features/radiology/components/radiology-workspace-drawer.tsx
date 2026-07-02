// src/features/radiology/components/radiology-workspace-drawer.tsx

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
import { CalendarDays, ImageIcon, Stethoscope, UserRound } from "lucide-react";
import type { RadiologyOrder } from "../types/radiology.types";
import { RadiologyModalityBadge, RadiologyStatusBadge } from "./radiology-badges";
import {
  useRadiologyAttachments,
  useRadiologyTimeline,
} from "../api/radiology.queries";

interface RadiologyWorkspaceDrawerProps {
  open: boolean;
  order: RadiologyOrder | null;
  onOpenChange: (open: boolean) => void;
}

export function RadiologyWorkspaceDrawer({
  open,
  order,
  onOpenChange,
}: RadiologyWorkspaceDrawerProps) {
  return (
    <EntityWorkspaceDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={order ? "Radiology Workspace" : "Radiology"}
      description="Study details, imaging workflow, report, PACS placeholders, and timeline."
    >
      {!order ? null : <RadiologyWorkspaceContent order={order} />}
    </EntityWorkspaceDrawer>
  );
}

function RadiologyWorkspaceContent({ order }: { order: RadiologyOrder }) {
  const attachmentsQuery = useRadiologyAttachments(order.id);
  const timelineQuery = useRadiologyTimeline(order.id);

  return (
    <>
      <EntityHeader
        title={`${order.study_name} — ${order.patient_name}`}
        subtitle={`Order: ${order.order_number} • UHID: ${order.patient_uhid || "-"}`}
        status={<RadiologyStatusBadge status={order.status} />}
        meta={
          <>
            <EntityMetaItem icon={<UserRound />} label="Patient" value={order.patient_name} />
            <EntityMetaItem icon={<Stethoscope />} label="Doctor" value={order.doctor_name} />
            <EntityMetaItem icon={<ImageIcon />} label="Modality" value={order.modality.toUpperCase()} />
            <EntityMetaItem icon={<CalendarDays />} label="Order Date" value={order.order_date} />
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
              <SectionCard title="Study Summary">
                <div className="mb-4 flex gap-2">
                  <RadiologyModalityBadge modality={order.modality} />
                  <RadiologyStatusBadge status={order.status} />
                </div>

                <EntityInfoGrid
                  items={[
                    { label: "Order Number", value: order.order_number },
                    { label: "Patient", value: order.patient_name },
                    { label: "Doctor", value: order.doctor_name },
                    { label: "Study", value: order.study_name },
                    { label: "Body Part", value: order.body_part },
                    { label: "Priority", value: order.priority.toUpperCase() },
                    { label: "Scheduled Date", value: order.scheduled_date },
                    { label: "Scheduled Time", value: order.scheduled_time },
                    { label: "Clinical Notes", value: order.clinical_notes },
                  ]}
                />
              </SectionCard>
            ),
          },
          {
            value: "report",
            label: "Report",
            content: (
              <SectionCard title="Radiology Report">
                <EntityInfoGrid
                  items={[
                    { label: "Radiologist", value: order.radiologist_name },
                    { label: "Report", value: order.report_text },
                    { label: "Impression", value: order.impression },
                  ]}
                />
              </SectionCard>
            ),
          },
          {
            value: "pacs",
            label: "PACS / Images",
            content: (
              <SectionCard title="DICOM / PACS Attachments">
                <EntityActivityList
                  isLoading={attachmentsQuery.isLoading}
                  items={attachmentsQuery.data?.map((item) => ({
                    id: item.id,
                    title: item.file_name,
                    description: item.file_type || item.file_url,
                    created_at: item.uploaded_at,
                  }))}
                  emptyTitle="No imaging files"
                  emptyDescription="DICOM/PACS image links or uploaded study files will appear here."
                />
              </SectionCard>
            ),
          },
          {
            value: "timeline",
            label: "Timeline",
            content: (
              <SectionCard title="Radiology Timeline">
                <EntityActivityList
                  isLoading={timelineQuery.isLoading}
                  items={timelineQuery.data}
                  emptyTitle="No radiology activity"
                  emptyDescription="Order, scheduling, reporting, verification, and approval activity will appear here."
                />
              </SectionCard>
            ),
          },
        ]}
      />
    </>
  );
}