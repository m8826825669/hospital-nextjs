// src/features/patients/components/patient-timeline-tab.tsx

"use client";

import { Activity } from "lucide-react";
import { EmptyState, SectionCard } from "@/shared/components/enterprise";
import type { Patient } from "../types/patient.types";
import { usePatientTimeline } from "../api/patients.queries";

export function PatientTimelineTab({ patient }: { patient: Patient }) {
  const timelineQuery = usePatientTimeline(patient.id);

  return (
    <SectionCard
      title="Timeline"
      description="Chronological history of patient activity."
    >
      {timelineQuery.isLoading ? (
        <p className="text-sm text-muted-foreground">Loading timeline...</p>
      ) : timelineQuery.data?.length ? (
        <div className="space-y-3">
          {timelineQuery.data.map((item) => (
            <div key={item.id} className="flex gap-3 rounded-lg border p-3">
              <div className="mt-1 rounded-full bg-muted p-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
              </div>

              <div>
                <p className="font-medium">{item.title}</p>
                {item.description && (
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                )}
                <p className="mt-1 text-xs text-muted-foreground">
                  {item.created_at}
                  {item.created_by_name ? ` • ${item.created_by_name}` : ""}
                </p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
        title="No timeline activity"
        description="Registrations, appointments, admissions, prescriptions, lab results, invoices, payments, and insurance events will appear here."
        />
      )}
    </SectionCard>
  );
}