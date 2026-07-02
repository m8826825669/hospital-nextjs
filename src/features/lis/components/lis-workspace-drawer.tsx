// src/features/lis/components/lis-workspace-drawer.tsx

"use client";

import {
  EntityActivityList,
  EntityHeader,
  EntityInfoGrid,
  EntityMetaItem,
  EntityWorkspaceDrawer,
  EntityWorkspaceTabs,
  SectionCard,
  StatusBadge,
} from "@/shared/components/enterprise";
import { FlaskConical, Microscope, UserRound } from "lucide-react";
import type { LabSample } from "../types/lis.types";
import { LabPriorityBadge } from "./lab-priority-badge";
import { LabSampleStatusBadge } from "./lab-sample-status-badge";
import { useLabResults, useLabTimeline } from "../api/lis.queries";

interface LisWorkspaceDrawerProps {
  open: boolean;
  sample: LabSample | null;
  onOpenChange: (open: boolean) => void;
}

export function LisWorkspaceDrawer({
  open,
  sample,
  onOpenChange,
}: LisWorkspaceDrawerProps) {
  return (
    <EntityWorkspaceDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={sample ? "LIS Sample Workspace" : "LIS Sample"}
      description="Sample workflow, result entry, verification, approval, and report status."
    >
      {!sample ? null : <LisWorkspaceContent sample={sample} />}
    </EntityWorkspaceDrawer>
  );
}

function LisWorkspaceContent({ sample }: { sample: LabSample }) {
  const resultsQuery = useLabResults(sample.id);
  const timelineQuery = useLabTimeline(sample.id);

  return (
    <>
      <EntityHeader
        title={`${sample.sample_number} — ${sample.patient_name}`}
        subtitle={`UHID: ${sample.patient_uhid || "-"} • ${
          sample.test_name || sample.profile_name || "-"
        }`}
        status={<LabSampleStatusBadge status={sample.status} />}
        meta={
          <>
            <EntityMetaItem
              icon={<UserRound />}
              label="Patient"
              value={sample.patient_name}
            />
            <EntityMetaItem
              icon={<FlaskConical />}
              label="Sample Type"
              value={sample.sample_type}
            />
            <EntityMetaItem
              icon={<Microscope />}
              label="Test/Profile"
              value={sample.test_name || sample.profile_name}
            />
            <EntityMetaItem
              label="Priority"
              value={sample.priority.toUpperCase()}
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
              <SectionCard title="Sample Summary">
                <div className="mb-4 flex gap-2">
                  <LabPriorityBadge priority={sample.priority} />
                  <LabSampleStatusBadge status={sample.status} />
                </div>

                <EntityInfoGrid
                  items={[
                    { label: "Sample Number", value: sample.sample_number },
                    { label: "Patient", value: sample.patient_name },
                    { label: "UHID", value: sample.patient_uhid },
                    { label: "Doctor", value: sample.doctor_name },
                    { label: "Test", value: sample.test_name },
                    { label: "Profile", value: sample.profile_name },
                    { label: "Collected At", value: sample.collected_at },
                    { label: "Received At", value: sample.received_at },
                    { label: "Verified At", value: sample.verified_at },
                    { label: "Approved At", value: sample.approved_at },
                    { label: "Remarks", value: sample.remarks },
                  ]}
                />
              </SectionCard>
            ),
          },
          {
            value: "results",
            label: "Results",
            content: (
              <SectionCard title="Results">
                {resultsQuery.isLoading ? (
                  <p className="text-sm text-muted-foreground">
                    Loading results...
                  </p>
                ) : resultsQuery.data?.length ? (
                  <div className="space-y-2">
                    {resultsQuery.data.map((result) => (
                      <div
                        key={result.id}
                        className="flex items-center justify-between rounded-lg border bg-card p-3 text-sm"
                      >
                        <div>
                          <p className="font-medium">{result.test_name}</p>
                          <p className="text-xs text-muted-foreground">
                            Ref: {result.reference_range || "-"} • Unit:{" "}
                            {result.unit || "-"}
                          </p>
                        </div>

                        <div className="text-right">
                          <p className="font-semibold">
                            {result.result_value || "-"}
                          </p>
                          {result.is_abnormal && (
                            <StatusBadge label="Abnormal" variant="danger" />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EntityActivityList
                    items={[]}
                    emptyTitle="No results entered"
                    emptyDescription="Lab result values will appear here."
                  />
                )}
              </SectionCard>
            ),
          },
          {
            value: "timeline",
            label: "Timeline",
            content: (
              <SectionCard title="Sample Timeline">
                <EntityActivityList
                  isLoading={timelineQuery.isLoading}
                  items={timelineQuery.data}
                  emptyTitle="No LIS activity"
                  emptyDescription="Collection, processing, result entry, verification, and approval events will appear here."
                />
              </SectionCard>
            ),
          },
        ]}
      />
    </>
  );
}