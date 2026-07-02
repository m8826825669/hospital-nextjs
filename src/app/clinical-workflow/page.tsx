// src/app/clinical-workflow/page.tsx

"use client";

import { useMemo, useState } from "react";
import { Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  ErrorState,
  PageHeader,
} from "@/shared/components/enterprise";
import { AppShell } from "@/shared/components/layout/app-shell";

import { ClinicalTimeline } from "@/features/clinical-workflow/components/clinical-timeline";
import { ClinicalWorkflowLauncher } from "@/features/clinical-workflow/components/clinical-workflow-launcher";
import { PatientContextCard } from "@/features/clinical-workflow/components/patient-context-card";

import {
  useClinicalPatientContext,
  useClinicalTimeline,
} from "@/features/clinical-workflow/api/clinical-workflow.queries";

export default function ClinicalWorkflowPage() {
  const [patientIdInput, setPatientIdInput] = useState("");
  const [patientId, setPatientId] = useState("");

  const contextQuery = useClinicalPatientContext(patientId);

  const timelineParams = useMemo(
    () => ({
      patient_id: patientId || undefined,
    }),
    [patientId]
  );

  const timelineQuery = useClinicalTimeline(timelineParams);

  function handleSearch() {
    setPatientId(patientIdInput.trim());
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Clinical Workflow"
          description="Unified patient context, clinical timeline, and cross-module workflow launcher."
        />

        <div className="flex gap-3 rounded-xl border bg-card p-4">
          <input
            className="h-10 flex-1 rounded-md border bg-background px-3 text-sm"
            placeholder="Enter Patient ID to load workflow context..."
            value={patientIdInput}
            onChange={(event) => setPatientIdInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === "Enter") handleSearch();
            }}
          />

          <Button onClick={handleSearch}>
            <Search className="mr-2 h-4 w-4" />
            Load
          </Button>
        </div>

        {contextQuery.isError ? (
          <ErrorState
            title="Could not load patient context"
            description="Please check patient ID or try again."
            onRetry={() => contextQuery.refetch()}
          />
        ) : (
          <PatientContextCard patient={contextQuery.data} />
        )}

        <ClinicalWorkflowLauncher patientId={patientId || undefined} />

        {timelineQuery.isError ? (
          <ErrorState
            title="Could not load clinical timeline"
            description="Please check your connection or try again."
            onRetry={() => timelineQuery.refetch()}
          />
        ) : (
          <ClinicalTimeline
            items={timelineQuery.data}
            isLoading={timelineQuery.isLoading}
          />
        )}
      </div>
    </AppShell>
  );
}