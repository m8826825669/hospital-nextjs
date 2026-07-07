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
    return (
      <div className="space-y-3">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="flex gap-3 rounded-xl border border-slate-200 bg-white p-4">
            <div className="h-9 w-9 animate-pulse rounded-full bg-slate-100" />
            <div className="flex-1 space-y-2">
              <div className="h-4 w-1/3 animate-pulse rounded bg-slate-100" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-slate-100" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (!items?.length) {
    return <EmptyState title={emptyTitle} description={emptyDescription} />;
  }

  return (
    <div className="relative space-y-3 before:absolute before:left-[18px] before:top-4 before:h-[calc(100%-2rem)] before:w-px before:bg-slate-200">
      {items.map((item) => (
        <div key={item.id} className="relative flex gap-3 rounded-xl border border-slate-200/80 bg-white p-4 shadow-sm">
          <div className="z-10 mt-0.5 rounded-full bg-slate-950 p-2 text-white shadow-sm">
            <Activity className="h-4 w-4" />
          </div>

          <div className="min-w-0 flex-1">
            <p className="text-sm font-semibold text-slate-950">{item.title}</p>

            {item.description && (
              <p className="mt-1 text-sm leading-6 text-slate-500">
                {item.description}
              </p>
            )}

            <p className="mt-2 text-xs font-medium text-slate-400">
              {item.created_at}
              {item.created_by_name ? ` • ${item.created_by_name}` : ""}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
