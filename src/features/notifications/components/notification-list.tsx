import { Button } from "@/components/ui/button";
import { SectionCard } from "@/shared/components/enterprise";
import type { NotificationItem } from "../types/notification.types";
import { NotificationPriorityBadge, NotificationStatusBadge } from "./notification-badges";

interface Props {
  items: NotificationItem[];
  onMarkRead?: (id: string) => void;
}

export function NotificationList({ items, onMarkRead }: Props) {
  return (
    <SectionCard title="Notifications" description="Clinical, operational, and system alerts.">
      <div className="divide-y">
        {items.length === 0 ? (
          <div className="p-6 text-sm text-muted-foreground">No notifications found.</div>
        ) : (
          items.map((item) => (
            <div key={item.id} className="flex items-start justify-between gap-4 p-4">
              <div className="space-y-2">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-medium">{item.title}</p>
                  <NotificationPriorityBadge priority={item.priority} />
                  <NotificationStatusBadge status={item.status} />
                </div>
                <p className="text-sm text-muted-foreground">{item.message}</p>
                <p className="text-xs uppercase text-muted-foreground">{item.module}</p>
              </div>
              {item.status === "unread" && (
                <Button size="sm" variant="outline" onClick={() => onMarkRead?.(item.id)}>
                  Mark read
                </Button>
              )}
            </div>
          ))
        )}
      </div>
    </SectionCard>
  );
}
