// src/shared/components/enterprise/workspace/entity-document-list.tsx

import { FileText } from "lucide-react";
import { EmptyState } from "../empty-state";

interface EntityDocumentItem {
  id: string;
  document_type: string;
  file_name: string;
  file_url: string;
  uploaded_at?: string;
  uploaded_by_name?: string | null;
}

interface EntityDocumentListProps {
  documents?: EntityDocumentItem[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function EntityDocumentList({
  documents,
  isLoading,
  emptyTitle = "No documents uploaded",
  emptyDescription = "Documents will appear here after upload.",
}: EntityDocumentListProps) {
  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading documents...</p>;
  }

  if (!documents?.length) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="space-y-2">
      {documents.map((document) => (
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
  );
}