import type { DocumentItem } from "../types/document.types";

export function DocumentList({ items }: { items: DocumentItem[] }) {
  return (
    <div className="rounded-xl border bg-card shadow-sm">
      <div className="grid grid-cols-5 gap-4 border-b px-4 py-3 text-xs font-medium uppercase text-muted-foreground">
        <span>Title</span><span>Module</span><span>Type</span><span>File</span><span>Status</span>
      </div>
      {items.length === 0 ? (
        <div className="px-4 py-10 text-center text-sm text-muted-foreground">No documents found.</div>
      ) : items.map((item) => (
        <div key={item.id} className="grid grid-cols-5 gap-4 border-b px-4 py-3 text-sm last:border-b-0">
          <span className="font-medium">{item.title}</span>
          <span>{item.module}</span>
          <span>{item.document_type}</span>
          <span className="truncate">{item.file_name}</span>
          <span>{item.status}</span>
        </div>
      ))}
    </div>
  );
}
