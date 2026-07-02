// src/features/appointments/components/appointment-timeline-tab.tsx

import { SectionCard, EntityActivityList } from "@/shared/components/enterprise";

export function AppointmentTimelineTab() {
  return (
    <SectionCard
      title="Timeline"
      description="Appointment activity and lifecycle events."
    >
      <EntityActivityList
        items={[]}
        emptyTitle="No appointment activity"
        emptyDescription="Check-in, consultation, billing, and status changes will appear here."
      />
    </SectionCard>
  );
}