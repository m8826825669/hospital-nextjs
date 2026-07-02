"use client";

import { SectionCard, EntityDocumentList } from "@/shared/components/enterprise";
import type { Patient } from "../types/patient.types";
import { usePatientDocuments } from "../api/patients.queries";

export function PatientDocumentsTab({ patient }: { patient: Patient }) {
  const documentsQuery = usePatientDocuments(patient.id);

  return (
    <SectionCard title="Documents" description="Uploaded patient documents.">
      <EntityDocumentList
        documents={documentsQuery.data}
        isLoading={documentsQuery.isLoading}
        emptyTitle="No documents uploaded"
        emptyDescription="Upload identity proofs, insurance cards, referrals, consent forms, and medical reports from the documents workflow."
      />
    </SectionCard>
  );
}