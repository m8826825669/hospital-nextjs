// src/features/patients/components/patient-documents-tab.tsx

"use client";

import { FileText } from "lucide-react";
import { EmptyState, SectionCard } from "@/shared/components/enterprise";
import type { Patient } from "../types/patient.types";
import { usePatientDocuments } from "../api/patients.queries";

export function PatientDocumentsTab({ patient }: { patient: Patient }) {
  const documentsQuery = usePatientDocuments(patient.id);

  return (
    <SectionCard title="Documents" description="Uploaded patient documents.">
      {documentsQuery.isLoading ? (
        <p className="text-sm text-muted-foreground">Loading documents...</p>
      ) : documentsQuery.data?.length ? (
        <div className="space-y-2">
          {documentsQuery.data.map((document) => (
            <div
              key={document.id}
              className="flex items-center justify-between rounded-lg border bg-card p-3 text-sm"
            >
              <div className="flex items-center gap-3">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{document.file_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {document.document_type}
                  </p>
                </div>
              </div>

              <a
                href={document.file_url}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-medium underline"
              >
                View
              </a>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
        title="No documents uploaded"
        description="Upload identity proofs, insurance cards, referrals, consent forms, and medical reports from the documents workflow."
        />
      )}
    </SectionCard>
  );
}