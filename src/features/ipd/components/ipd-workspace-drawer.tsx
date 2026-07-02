// src/features/ipd/components/ipd-workspace-drawer.tsx

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
import { BedDouble, CalendarDays, Stethoscope, UserRound } from "lucide-react";
import type { IpdAdmission } from "../types/ipd.types";
import { IpdStatusBadge } from "./ipd-status-badge";
import {
  useIpdBedAllocations,
  useIpdStatusHistory,
} from "../api/ipd.queries";

interface IpdWorkspaceDrawerProps {
  open: boolean;
  admission: IpdAdmission | null;
  onOpenChange: (open: boolean) => void;
}

export function IpdWorkspaceDrawer({
  open,
  admission,
  onOpenChange,
}: IpdWorkspaceDrawerProps) {
  return (
    <EntityWorkspaceDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={admission ? "IPD Admission Workspace" : "IPD Admission"}
      description="Admission details, bed allocation, transfer, discharge, and status history."
    >
      {!admission ? null : <IpdWorkspaceContent admission={admission} />}
    </EntityWorkspaceDrawer>
  );
}

function IpdWorkspaceContent({ admission }: { admission: IpdAdmission }) {
  const allocationsQuery = useIpdBedAllocations(admission.id);
  const historyQuery = useIpdStatusHistory(admission.id);

  return (
    <>
      <EntityHeader
        title={`${admission.patient_name} — IPD Admission`}
        subtitle={`Admission: ${admission.admission_number} • UHID: ${
          admission.patient_uhid || "-"
        }`}
        status={<IpdStatusBadge status={admission.status} />}
        meta={
          <>
            <EntityMetaItem
              icon={<UserRound />}
              label="Patient"
              value={admission.patient_name}
            />
            <EntityMetaItem
              icon={<Stethoscope />}
              label="Doctor"
              value={admission.doctor_name}
            />
            <EntityMetaItem
              icon={<CalendarDays />}
              label="Admission Date"
              value={admission.admission_date}
            />
            <EntityMetaItem
              icon={<BedDouble />}
              label="Bed"
              value={
                [admission.ward_name, admission.bed_number]
                  .filter(Boolean)
                  .join(" / ") || "-"
              }
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
              <SectionCard title="Admission Summary">
                <EntityInfoGrid
                  items={[
                    { label: "Admission Number", value: admission.admission_number },
                    { label: "Patient", value: admission.patient_name },
                    { label: "UHID", value: admission.patient_uhid },
                    { label: "Doctor", value: admission.doctor_name },
                    { label: "Department", value: admission.department_name },
                    { label: "Ward", value: admission.ward_name },
                    { label: "Bed", value: admission.bed_number },
                    { label: "Admission Date", value: admission.admission_date },
                    { label: "Admission Time", value: admission.admission_time },
                    { label: "Diagnosis", value: admission.diagnosis },
                    {
                      label: "Reason",
                      value: admission.reason_for_admission,
                    },
                    { label: "Notes", value: admission.notes },
                  ]}
                />
              </SectionCard>
            ),
          },
          {
            value: "bed",
            label: "Bed",
            content: (
              <SectionCard title="Bed Allocation History">
                <EntityActivityList
                  isLoading={allocationsQuery.isLoading}
                  items={allocationsQuery.data?.map((item) => ({
                    id: item.id,
                    title: `${item.ward_name || "Ward"} / ${item.bed_number}`,
                    description: item.is_current
                      ? "Current allocation"
                      : `Released: ${item.released_at || "-"}`,
                    created_at: item.allocated_at,
                  }))}
                  emptyTitle="No bed allocation history"
                  emptyDescription="Bed allocation and transfer history will appear here."
                />
              </SectionCard>
            ),
          },
          {
            value: "discharge",
            label: "Discharge",
            content: (
              <SectionCard title="Discharge Details">
                <EntityInfoGrid
                  items={[
                    { label: "Discharge Date", value: admission.discharge_date },
                    { label: "Discharge Time", value: admission.discharge_time },
                    {
                      label: "Discharge Summary",
                      value: admission.discharge_summary,
                    },
                  ]}
                />
              </SectionCard>
            ),
          },
          {
            value: "timeline",
            label: "Timeline",
            content: (
              <SectionCard title="Status History">
                <EntityActivityList
                  isLoading={historyQuery.isLoading}
                  items={historyQuery.data?.map((item) => ({
                    id: item.id,
                    title: item.status,
                    description: item.notes,
                    created_at: item.created_at,
                    created_by_name: item.created_by_name,
                  }))}
                  emptyTitle="No status history"
                  emptyDescription="Admission, transfer, discharge, and cancellation activity will appear here."
                />
              </SectionCard>
            ),
          },
        ]}
      />
    </>
  );
}