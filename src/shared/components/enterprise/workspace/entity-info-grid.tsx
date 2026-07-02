// src/shared/components/enterprise/workspace/entity-info-grid.tsx

interface EntityInfoGridProps {
  items: {
    label: string;
    value?: string | number | null;
  }[];
}

export function EntityInfoGrid({ items }: EntityInfoGridProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map((item) => (
        <div key={item.label} className="rounded-lg border bg-card p-3">
          <p className="text-xs text-muted-foreground">{item.label}</p>
          <p className="mt-1 text-sm font-medium">{item.value || "-"}</p>
        </div>
      ))}
    </div>
  );
}