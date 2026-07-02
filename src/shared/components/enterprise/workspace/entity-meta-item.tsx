// src/shared/components/enterprise/workspace/entity-meta-item.tsx

import { ReactNode } from "react";

interface EntityMetaItemProps {
  icon?: ReactNode;
  label: string;
  value?: string | number | null;
}

export function EntityMetaItem({ icon, label, value }: EntityMetaItemProps) {
  return (
    <div className="flex items-start gap-3">
      {icon && (
        <div className="mt-0.5 text-muted-foreground [&_svg]:h-4 [&_svg]:w-4">
          {icon}
        </div>
      )}

      <div>
        <p className="text-xs text-muted-foreground">{label}</p>
        <p className="font-medium">{value || "-"}</p>
      </div>
    </div>
  );
}