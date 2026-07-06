import type { ReactNode } from "react";
import { Database, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";

interface DataEmptyStateProps {
  icon?: ReactNode;
  title?: string;
  description?: string;
  actionLabel?: string;
  secondaryActionLabel?: string;
  onAction?: () => void;
  onSecondaryAction?: () => void;
}

export function DataEmptyState({
  icon,
  title = "No records found",
  description = "Create a new record or adjust your filters to continue.",
  actionLabel,
  secondaryActionLabel,
  onAction,
  onSecondaryAction,
}: DataEmptyStateProps) {
  return (
    <div className="flex min-h-[260px] flex-col items-center justify-center rounded-2xl border border-dashed bg-muted/20 p-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-background shadow-sm ring-1 ring-border">
        {icon ?? <Database className="h-6 w-6 text-muted-foreground" />}
      </div>

      <h3 className="mt-5 text-base font-semibold text-foreground">{title}</h3>
      <p className="mt-2 max-w-md text-sm text-muted-foreground">{description}</p>

      {(actionLabel || secondaryActionLabel) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          {actionLabel && onAction && (
            <Button type="button" className="gap-2" onClick={onAction}>
              <Plus className="h-4 w-4" />
              {actionLabel}
            </Button>
          )}

          {secondaryActionLabel && onSecondaryAction && (
            <Button type="button" variant="outline" onClick={onSecondaryAction}>
              {secondaryActionLabel}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
