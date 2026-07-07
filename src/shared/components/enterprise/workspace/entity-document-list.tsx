// src/shared/components/enterprise/workspace/entity-document-list.tsx

import { ExternalLink, FileText } from "lucide-react";
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
    return (
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="h-16 animate-pulse rounded-xl border border-slate-200 bg-white" />
        ))}
      </div>
    );
  }

  if (!documents?.length) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="space-y-2">
      {documents.map((document) => (
        <div
          key={document.id}
          className="flex items-center justify-between gap-4 rounded-xl border border-slate-200/80 bg-white p-3.5 text-sm shadow-sm transition-colors hover:border-slate-300"
        >
          <div className="flex min-w-0 items-center gap-3">
            <div className="rounded-xl bg-slate-50 p-2 text-slate-500 ring-1 ring-slate-200/70">
              <FileText className="h-4 w-4" />
            </div>

            <div className="min-w-0">
              <p className="truncate font-semibold text-slate-950">{document.file_name}</p>
              <p className="truncate text-xs text-slate-500">
                {document.document_type}
                {document.uploaded_at ? ` • ${document.uploaded_at}` : ""}
                {document.uploaded_by_name ? ` • ${document.uploaded_by_name}` : ""}
              </p>
            </div>
          </div>

          <a
            href={document.file_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex shrink-0 items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-sm transition-colors hover:bg-slate-50"
          >
            View
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      ))}
    </div>
  );
}
