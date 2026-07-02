// src/features/notifications/types/notification.types.ts

export type NotificationType =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "approval"
  | "task"
  | "system";

export type NotificationPriority = "low" | "normal" | "high" | "urgent";

export type NotificationStatus = "unread" | "read" | "archived";

export type ActivityModule =
  | "auth"
  | "patients"
  | "appointments"
  | "opd"
  | "ipd"
  | "ot"
  | "lis"
  | "pharmacy"
  | "billing"
  | "insurance"
  | "system";

export type TaskStatus = "open" | "in_progress" | "completed" | "cancelled";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: NotificationType;
  priority: NotificationPriority;
  status: NotificationStatus;
  module: ActivityModule;
  href?: string | null;
  entity_id?: string | null;
  entity_type?: string | null;
  created_at: string;
  read_at?: string | null;
}

export interface ActivityItem {
  id: string;
  title: string;
  description?: string | null;
  module: ActivityModule;
  actor_name?: string | null;
  entity_type?: string | null;
  entity_id?: string | null;
  created_at: string;
}

export interface TaskItem {
  id: string;
  title: string;
  description?: string | null;
  priority: NotificationPriority;
  status: TaskStatus;
  module: ActivityModule;
  due_at?: string | null;
  assigned_to_name?: string | null;
  href?: string | null;
  created_at: string;
}

export interface NotificationFilters {
  status?: NotificationStatus | "all";
  priority?: NotificationPriority | "all";
  module?: ActivityModule | "all";
  search?: string;
}

export interface ActivityFilters {
  module?: ActivityModule | "all";
  search?: string;
}

export interface TaskFilters {
  status?: TaskStatus | "all";
  priority?: NotificationPriority | "all";
  module?: ActivityModule | "all";
  search?: string;
}

export interface NotificationCenterSummary {
  unread_count: number;
  urgent_count: number;
  open_tasks_count: number;
  today_activity_count: number;
}