"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DocumentForm } from "@/features/documents/components/document-form";
import { DocumentKpiCards } from "@/features/documents/components/document-kpi-cards";
import { DocumentList } from "@/features/documents/components/document-list";
import { documentModuleOptions } from "@/features/documents/constants/document.constants";
import { documentService } from "@/features/documents/api/document.service";
import type { DocumentCreateInput, DocumentDashboard, DocumentListResponse } from "@/features/documents/types/document.types";

const emptyDashboard: DocumentDashboard = {
  total_documents: 0,
  patient_documents: 0,
  finance_documents: 0,
  hr_documents: 0,
  recent_uploads: 0,
};

const emptyList: DocumentListResponse = {
  items: [],
  total: 0,
  page: 1,
  page_size: 20,
  pages: 0,
};

export default function DocumentsPage() {
  const [search, setSearch] = useState("");
  const [module, setModule] = useState("all");
  const queryClient = useQueryClient();

  const listParams = useMemo(() => ({ page: 1, page_size: 20, search: search || undefined, module }), [search, module]);

  const dashboardQuery = useQuery({ queryKey: ["documents", "dashboard"], queryFn: documentService.dashboard });
  const documentsQuery = useQuery({ queryKey: ["documents", "list", listParams], queryFn: () => documentService.list(listParams) });

  const createDocument = useMutation({
    mutationFn: (values: DocumentCreateInput) => documentService.create(values),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["documents"] });
    },
  });

  const dashboard = dashboardQuery.data ?? emptyDashboard;
  const documents = documentsQuery.data ?? emptyList;

  return (
    <main className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Document Management</h1>
        <p className="text-sm text-muted-foreground">Central repository for patient, HR, finance, inventory, clinical and administrative documents.</p>
      </div>

      <DocumentKpiCards data={dashboard} />

      <section className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="space-y-4">
          <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-sm md:flex-row md:items-center">
            <input
              className="min-w-0 flex-1 rounded-md border bg-background px-3 py-2 text-sm"
              placeholder="Search documents..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <select className="rounded-md border bg-background px-3 py-2 text-sm" value={module} onChange={(event) => setModule(event.target.value)}>
              {documentModuleOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </div>
          <DocumentList items={documents.items} />
        </div>

        <DocumentForm onSubmit={(values) => { createDocument.mutate(values); }} isSubmitting={createDocument.isPending} />
      </section>
    </main>
  );
}
