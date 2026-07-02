// src/features/activity-center/components/audit-activity-list.tsx

"use client";

import { Activity } from "lucide-react";
import { EmptyState } from "@/shared/components/enterprise";
import type { AuditActivityItem } from "../types/activity-center.types";

interface AuditActivityListProps {
  items: AuditActivityItem[];
  isLoading?: boolean;
}

export function AuditActivityList({ items, isLoading }: AuditActivityListProps) {
  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading audit activity...</p>;
  }

  if (!items.length) {
    return (
      <EmptyState
        title="No audit activity"
        description="System audit activity will appear here."
      />
    );
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="flex gap-3 rounded-xl border bg-card p-4">
          <div className="mt-1 rounded-full bg-muted p-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
          </div>

          <div>
            <p className="font-medium">{item.action}</p>

            {item.description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {item.description}
              </p>
            )}

            <p className="mt-2 text-xs text-muted-foreground">
              {item.actor_name || "System"} • {item.module || "-"} •{" "}
              {item.created_at}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}