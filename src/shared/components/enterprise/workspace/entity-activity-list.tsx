// src/shared/components/enterprise/workspace/entity-activity-list.tsx

import { Activity } from "lucide-react";
import { EmptyState } from "../empty-state";

interface EntityActivityItem {
  id: string;
  title: string;
  description?: string | null;
  created_at: string;
  created_by_name?: string | null;
}

interface EntityActivityListProps {
  items?: EntityActivityItem[];
  isLoading?: boolean;
  emptyTitle?: string;
  emptyDescription?: string;
}

export function EntityActivityList({
  items,
  isLoading,
  emptyTitle = "No activity",
  emptyDescription = "Activity will appear here once records are created.",
}: EntityActivityListProps) {
  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading activity...</p>;
  }

  if (!items?.length) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <div key={item.id} className="flex gap-3 rounded-lg border p-3">
          <div className="mt-1 rounded-full bg-muted p-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
          </div>

          <div>
            <p className="font-medium">{item.title}</p>

            {item.description && (
              <p className="text-sm text-muted-foreground">
                {item.description}
              </p>
            )}

            <p className="mt-1 text-xs text-muted-foreground">
              {item.created_at}
              {item.created_by_name ? ` • ${item.created_by_name}` : ""}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}