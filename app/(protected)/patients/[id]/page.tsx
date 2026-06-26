"use client";

import { useParams } from "next/navigation";

import { PageContainer } from "@/components/common/page-container";
import { PageHeader } from "@/components/common/page-header";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";
import { usePatient } from "@/features/patients/hooks/use-patients";
import { PatientProfileHeader } from "@/features/patients/components/patient-profile-header";
import { PatientProfileTabs } from "@/features/patients/components/patient-profile-tabs";

export default function PatientDetailPage() {
  const params = useParams<{ id: string }>();
  const patientId = params.id;

  const { data: patient, isLoading, isError } = usePatient(patientId);

  if (isLoading) {
    return (
      <PageContainer>
        <PageHeader
          title="Patient Profile"
          description="Loading patient record..."
        />

        <DataTableSkeleton rows={6} columns={4} />
      </PageContainer>
    );
  }

  if (isError || !patient) {
    return (
      <PageContainer>
        <PageHeader
          title="Patient Not Found"
          description="Unable to load this patient record."
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <PageHeader
        title="Patient Profile"
        description="Complete patient workspace and clinical timeline."
      />

      <PatientProfileHeader patient={patient} />

      <PatientProfileTabs patient={patient} />
    </PageContainer>
  );
}