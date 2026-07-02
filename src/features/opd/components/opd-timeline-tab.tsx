// src/features/opd/components/opd-timeline-tab.tsx

"use client";

import { SectionCard, EntityActivityList } from "@/shared/components/enterprise";
import type { OpdEncounter } from "../types/opd.types";
import { useOpdTimeline } from "../api/opd.queries";

export function OpdTimelineTab({ encounter }: { encounter: OpdEncounter }) {
  const timelineQuery = useOpdTimeline(encounter.id);

  return (
    <SectionCard title="Timeline" description="OPD encounter activity.">
      <EntityActivityList
        items={timelineQuery.data}
        isLoading={timelineQuery.isLoading}
        emptyTitle="No OPD activity"
        emptyDescription="Clinical notes, prescriptions, lab orders, and status changes will appear here."
      />
    </SectionCard>
  );
}