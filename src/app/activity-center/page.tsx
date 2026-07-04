"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/shared/components/enterprise";
import { moduleOptions, notificationPriorityOptions, notificationStatusOptions } from "@/features/notifications/constants/notification.constants";
import {
  useAnnouncements,
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useMessages,
  useNotificationDashboard,
  useNotifications,
  useTasks,
} from "@/features/notifications/api/notification.queries";
import { AnnouncementList } from "@/features/notifications/components/announcement-list";
import { InboxList } from "@/features/notifications/components/inbox-list";
import { NotificationKpiCards } from "@/features/notifications/components/notification-kpi-cards";
import { NotificationList } from "@/features/notifications/components/notification-list";
import { TaskBoard } from "@/features/notifications/components/task-board";

export default function ActivityCenterPage() {
  const [status, setStatus] = useState("all");
  const [priority, setPriority] = useState("all");
  const [module, setModule] = useState("all");

  const params = useMemo(
    () => ({ page: 1, page_size: 50, status, priority, module }),
    [status, priority, module]
  );

  const dashboardQuery = useNotificationDashboard();
  const notificationsQuery = useNotifications(params);
  const tasksQuery = useTasks({ page: 1, page_size: 100 });
  const messagesQuery = useMessages();
  const announcementsQuery = useAnnouncements();
  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Activity Center"
        description="Enterprise notification, communication, task, and announcement center."
        actions={
          <Button variant="outline" onClick={() => markAllRead.mutate()}>
            Mark all read
          </Button>
        }
      />

      <NotificationKpiCards dashboard={dashboardQuery.data} />

      <Tabs defaultValue="notifications" className="space-y-4">
        <TabsList>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="tasks">Tasks</TabsTrigger>
          <TabsTrigger value="inbox">Inbox</TabsTrigger>
          <TabsTrigger value="announcements">Announcements</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-4">
          <div className="grid gap-3 md:grid-cols-3">
            <select className="h-10 rounded-md border bg-background px-3 text-sm" value={status} onChange={(event) => setStatus(event.target.value)}>
              {notificationStatusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
            <select className="h-10 rounded-md border bg-background px-3 text-sm" value={priority} onChange={(event) => setPriority(event.target.value)}>
              {notificationPriorityOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
            <select className="h-10 rounded-md border bg-background px-3 text-sm" value={module} onChange={(event) => setModule(event.target.value)}>
              {moduleOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </div>
          <NotificationList
            items={notificationsQuery.data?.items ?? []}
            onMarkRead={(id) => markRead.mutate(id)}
          />
        </TabsContent>

        <TabsContent value="tasks">
          <TaskBoard tasks={tasksQuery.data?.items ?? []} />
        </TabsContent>

        <TabsContent value="inbox">
          <InboxList messages={messagesQuery.data?.items ?? []} />
        </TabsContent>

        <TabsContent value="announcements">
          <AnnouncementList announcements={announcementsQuery.data?.items ?? []} />
        </TabsContent>

        <TabsContent value="settings">
          <div className="rounded-xl border bg-card p-6 shadow-sm">
            <h3 className="font-semibold">Notification Preferences</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              In-app, email, SMS, WhatsApp, desktop and sound preferences are available through the backend preferences API.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
