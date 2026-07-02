// src/app/activity-center/page.tsx

"use client";

import { useMemo, useState } from "react";
import {
  Bell,
  CheckSquare,
  History,
  Inbox,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ErrorState,
  PageHeader,
  SectionCard,
} from "@/shared/components/enterprise";
import { AppShell } from "@/shared/components/layout/app-shell";

import { ActivityCenterFilters } from "@/features/activity-center/components/activity-center-filter";
import { AuditActivityList } from "@/features/activity-center/components/audit-activity-list";
import { NotificationsList } from "@/features/activity-center/components/notifications-list";
import { TasksList } from "@/features/activity-center/components/tasks-list";

import {
  useAuditActivity,
  useMarkAllNotificationsRead,
  useMarkNotificationRead,
  useNotifications,
  useTasks,
  useUnreadNotificationsCount,
  useUpdateTaskStatus,
} from "@/features/activity-center/api/activity-center.queries";

import type {
  NotificationPriority,
  TaskStatus,
} from "@/features/activity-center/types/activity-center.types";

export default function ActivityCenterPage() {
  const [notificationSearch, setNotificationSearch] = useState("");
  const [taskSearch, setTaskSearch] = useState("");
  const [auditSearch, setAuditSearch] = useState("");

  const [module, setModule] = useState("");
  const [priority, setPriority] = useState("");
  const [taskStatus, setTaskStatus] = useState("");
  const [date, setDate] = useState("");

  const notificationParams = useMemo(
    () => ({
      page: 1,
      size: 50,
      search: notificationSearch || undefined,
      module: module || undefined,
      priority: priority ? (priority as NotificationPriority) : undefined,
      date: date || undefined,
    }),
    [notificationSearch, module, priority, date]
  );

  const taskParams = useMemo(
    () => ({
      page: 1,
      size: 50,
      search: taskSearch || undefined,
      module: module || undefined,
      priority: priority ? (priority as NotificationPriority) : undefined,
      status: taskStatus ? (taskStatus as TaskStatus) : undefined,
      date: date || undefined,
    }),
    [taskSearch, module, priority, taskStatus, date]
  );

  const auditParams = useMemo(
    () => ({
      page: 1,
      size: 50,
      search: auditSearch || undefined,
      module: module || undefined,
      date: date || undefined,
    }),
    [auditSearch, module, date]
  );

  const notificationsQuery = useNotifications(notificationParams);
  const tasksQuery = useTasks(taskParams);
  const auditQuery = useAuditActivity(auditParams);
  const unreadQuery = useUnreadNotificationsCount();

  const markRead = useMarkNotificationRead();
  const markAllRead = useMarkAllNotificationsRead();
  const updateTaskStatus = useUpdateTaskStatus();

  function resetFilters() {
    setModule("");
    setPriority("");
    setTaskStatus("");
    setDate("");
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Activity Center"
          description="Notifications, inbox, assigned tasks, and audit activity across the HMS."
          actions={
            <Button
              variant="outline"
              onClick={() => markAllRead.mutate()}
              disabled={markAllRead.isPending}
            >
              <Inbox className="mr-2 h-4 w-4" />
              Mark all read
            </Button>
          }
        />

        <div className="grid gap-4 md:grid-cols-3">
          <SectionCard title="Unread Notifications">
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-muted-foreground" />
              <p className="text-2xl font-semibold">
                {unreadQuery.data?.count ?? 0}
              </p>
            </div>
          </SectionCard>

          <SectionCard title="Open Tasks">
            <div className="flex items-center gap-3">
              <CheckSquare className="h-5 w-5 text-muted-foreground" />
              <p className="text-2xl font-semibold">
                {tasksQuery.data?.items?.filter((task) => task.status !== "completed")
                  .length ?? 0}
              </p>
            </div>
          </SectionCard>

          <SectionCard title="Audit Events">
            <div className="flex items-center gap-3">
              <History className="h-5 w-5 text-muted-foreground" />
              <p className="text-2xl font-semibold">
                {auditQuery.data?.total ?? auditQuery.data?.items?.length ?? 0}
              </p>
            </div>
          </SectionCard>
        </div>

        <ActivityCenterFilters
          module={module}
          priority={priority}
          status={taskStatus}
          date={date}
          onModuleChange={setModule}
          onPriorityChange={setPriority}
          onStatusChange={setTaskStatus}
          onDateChange={setDate}
          onReset={resetFilters}
        />

        <Tabs defaultValue="notifications">
          <TabsList>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="tasks">Tasks</TabsTrigger>
            <TabsTrigger value="audit">Audit Activity</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="mt-4 space-y-4">
            <input
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              placeholder="Search notifications..."
              value={notificationSearch}
              onChange={(event) => setNotificationSearch(event.target.value)}
            />

            {notificationsQuery.isError ? (
              <ErrorState
                title="Could not load notifications"
                description="Please check your connection or try again."
                onRetry={() => notificationsQuery.refetch()}
              />
            ) : (
              <NotificationsList
                notifications={notificationsQuery.data?.items ?? []}
                isLoading={notificationsQuery.isLoading}
                onMarkRead={(id) => markRead.mutate(id)}
              />
            )}
          </TabsContent>

          <TabsContent value="tasks" className="mt-4 space-y-4">
            <input
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              placeholder="Search tasks..."
              value={taskSearch}
              onChange={(event) => setTaskSearch(event.target.value)}
            />

            {tasksQuery.isError ? (
              <ErrorState
                title="Could not load tasks"
                description="Please check your connection or try again."
                onRetry={() => tasksQuery.refetch()}
              />
            ) : (
              <TasksList
                tasks={tasksQuery.data?.items ?? []}
                isLoading={tasksQuery.isLoading}
                onComplete={(id) =>
                  updateTaskStatus.mutate({
                    id,
                    status: "completed",
                  })
                }
              />
            )}
          </TabsContent>

          <TabsContent value="audit" className="mt-4 space-y-4">
            <input
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              placeholder="Search audit activity..."
              value={auditSearch}
              onChange={(event) => setAuditSearch(event.target.value)}
            />

            {auditQuery.isError ? (
              <ErrorState
                title="Could not load audit activity"
                description="Please check your connection or try again."
                onRetry={() => auditQuery.refetch()}
              />
            ) : (
              <AuditActivityList
                items={auditQuery.data?.items ?? []}
                isLoading={auditQuery.isLoading}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}