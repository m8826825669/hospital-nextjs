// src/features/activity-center/components/notifications-list.tsx

"use client";

import Link from "next/link";
import { Bell, CheckCircle2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { EmptyState } from "@/shared/components/enterprise";
import type { NotificationItem } from "../types/activity-center.types";
import { ActivityPriorityBadge } from "./activity-priority-badge";

interface NotificationsListProps {
  notifications: NotificationItem[];
  isLoading?: boolean;
  onMarkRead: (id: string) => void;
}

export function NotificationsList({
  notifications,
  isLoading,
  onMarkRead,
}: NotificationsListProps) {
  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading notifications...</p>;
  }

  if (!notifications.length) {
    return (
      <EmptyState
        title="No notifications"
        description="System alerts and workflow notifications will appear here."
      />
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((item) => {
        const content = (
          <div
            className={`rounded-xl border bg-card p-4 ${
              !item.is_read ? "border-primary/40 bg-primary/5" : ""
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex gap-3">
                <div className="mt-1 rounded-full bg-muted p-2">
                  <Bell className="h-4 w-4 text-muted-foreground" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{item.title}</p>
                    <ActivityPriorityBadge priority={item.priority} />
                  </div>

                  {item.message && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.message}
                    </p>
                  )}

                  <p className="mt-2 text-xs text-muted-foreground">
                    {item.module || "System"} • {item.created_at}
                  </p>
                </div>
              </div>

              {!item.is_read && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onMarkRead(item.id)}
                >
                  <CheckCircle2 className="mr-2 h-4 w-4" />
                  Read
                </Button>
              )}
            </div>
          </div>
        );

        return item.action_url ? (
          <Link key={item.id} href={item.action_url}>
            {content}
          </Link>
        ) : (
          <div key={item.id}>{content}</div>
        );
      })}
    </div>
  );
}