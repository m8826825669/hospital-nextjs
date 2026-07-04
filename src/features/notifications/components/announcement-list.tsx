import { SectionCard, StatusBadge } from "@/shared/components/enterprise";
import type { Announcement } from "../types/notification.types";

export function AnnouncementList({ announcements }: { announcements: Announcement[] }) {
  return (
    <SectionCard title="Announcements" description="Hospital broadcasts and administrative announcements.">
      <div className="divide-y">
        {announcements.length === 0 ? <div className="p-6 text-sm text-muted-foreground">No announcements.</div> : null}
        {announcements.map((announcement) => (
          <div key={announcement.id} className="p-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="font-medium">{announcement.title}</p>
              <StatusBadge label={announcement.active ? "ACTIVE" : "INACTIVE"} variant={announcement.active ? "success" : "warning"} />
            </div>
            <p className="text-sm text-muted-foreground">{announcement.description}</p>
            <p className="mt-2 text-xs uppercase text-muted-foreground">Audience: {announcement.audience}</p>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}
