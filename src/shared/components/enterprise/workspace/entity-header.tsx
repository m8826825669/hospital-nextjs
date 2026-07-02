// src/shared/components/enterprise/workspace/entity-header.tsx

import { ReactNode } from "react";

interface EntityHeaderProps {
  avatar?: ReactNode;
  title: string;
  subtitle?: string;
  status?: ReactNode;
  meta?: ReactNode;
}

export function EntityHeader({
  avatar,
  title,
  subtitle,
  status,
  meta,
}: EntityHeaderProps) {
  return (
    <div className="rounded-xl border bg-muted/30 p-4">
      <div className="flex items-start gap-4">
        {avatar}

        <div className="flex-1 space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h3 className="font-semibold">{title}</h3>
              {subtitle && (
                <p className="text-sm text-muted-foreground">{subtitle}</p>
              )}
            </div>

            {status}
          </div>

          {meta && <div className="grid gap-3 text-sm md:grid-cols-2">{meta}</div>}
        </div>
      </div>
    </div>
  );
}