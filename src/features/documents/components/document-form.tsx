"use client";

import { useState } from "react";
import { documentModuleOptions, documentTypeOptions } from "../constants/document.constants";
import type { DocumentCreateInput } from "../types/document.types";

interface DocumentFormProps {
  onSubmit: (values: DocumentCreateInput) => void | Promise<void>;
  isSubmitting?: boolean;
}

export function DocumentForm({ onSubmit, isSubmitting }: DocumentFormProps) {
  const [values, setValues] = useState<DocumentCreateInput>({
    module: "patients",
    title: "",
    document_type: "general",
    file_name: "",
    mime_type: "application/pdf",
    file_size: 0,
    storage_path: "",
    visibility: "internal",
    description: "",
  });

  const update = (key: keyof DocumentCreateInput, value: string | number) => setValues((current) => ({ ...current, [key]: value }));

  return (
    <form className="space-y-4 rounded-xl border bg-card p-5 shadow-sm" onSubmit={(event) => { event.preventDefault(); void onSubmit(values); }}>
      <div className="grid gap-4 md:grid-cols-2">
        <label className="space-y-1 text-sm">
          <span className="font-medium">Module</span>
          <select className="w-full rounded-md border bg-background px-3 py-2" value={values.module} onChange={(event) => update("module", event.target.value)}>
            {documentModuleOptions.filter((option) => option.value !== "all").map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
        <label className="space-y-1 text-sm">
          <span className="font-medium">Document Type</span>
          <select className="w-full rounded-md border bg-background px-3 py-2" value={values.document_type} onChange={(event) => update("document_type", event.target.value)}>
            {documentTypeOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
      </div>
      <label className="space-y-1 text-sm block">
        <span className="font-medium">Title</span>
        <input className="w-full rounded-md border bg-background px-3 py-2" value={values.title} onChange={(event) => update("title", event.target.value)} />
      </label>
      <div className="grid gap-4 md:grid-cols-3">
        <label className="space-y-1 text-sm">
          <span className="font-medium">File Name</span>
          <input className="w-full rounded-md border bg-background px-3 py-2" value={values.file_name} onChange={(event) => update("file_name", event.target.value)} />
        </label>
        <label className="space-y-1 text-sm">
          <span className="font-medium">MIME Type</span>
          <input className="w-full rounded-md border bg-background px-3 py-2" value={values.mime_type} onChange={(event) => update("mime_type", event.target.value)} />
        </label>
        <label className="space-y-1 text-sm">
          <span className="font-medium">File Size</span>
          <input type="number" className="w-full rounded-md border bg-background px-3 py-2" value={values.file_size} onChange={(event) => update("file_size", Number(event.target.value))} />
        </label>
      </div>
      <label className="space-y-1 text-sm block">
        <span className="font-medium">Storage Path</span>
        <input className="w-full rounded-md border bg-background px-3 py-2" value={values.storage_path} onChange={(event) => update("storage_path", event.target.value)} />
      </label>
      <button className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground disabled:opacity-60" disabled={isSubmitting} type="submit">
        {isSubmitting ? "Saving..." : "Save Document"}
      </button>
    </form>
  );
}
