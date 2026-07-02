// src/features/dashboard/components/recent-activity-card.tsx

import { EntityActivityList, SectionCard } from "@/shared/components/enterprise";
import type { DashboardActivity } from "../types/dashboard.types";

export function RecentActivityCard({
  activities,
  isLoading,
}: {
  activities?: DashboardActivity[];
  isLoading?: boolean;
}) {
  return (
    <SectionCard title="Recent Activity" description="Latest HMS operational activity.">
      <EntityActivityList
        isLoading={isLoading}
        items={activities?.map((activity) => ({
          id: activity.id,
          title: activity.title,
          description: activity.description || activity.module,
          created_at: activity.created_at,
        }))}
        emptyTitle="No activity"
        emptyDescription="Recent activity will appear here."
      />
    </SectionCard>
  );
}