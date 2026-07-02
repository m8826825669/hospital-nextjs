"use client";

import { SectionCard, EntityActivityList } from "@/shared/components/enterprise";
import type { Patient } from "../types/patient.types";
import { usePatientTimeline } from "../api/patients.queries";

export function PatientTimelineTab({ patient }: { patient: Patient }) {
  const timelineQuery = usePatientTimeline(patient.id);

  return (
    <SectionCard
      title="Timeline"
      description="Chronological history of patient activity."
    >
      <EntityActivityList
        items={timelineQuery.data}
        isLoading={timelineQuery.isLoading}
        emptyTitle="No timeline activity"
        emptyDescription="Registrations, appointments, admissions, prescriptions, lab results, invoices, payments, and insurance events will appear here."
      />
    </SectionCard>
  );
}