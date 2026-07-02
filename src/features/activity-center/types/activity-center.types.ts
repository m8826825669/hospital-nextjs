// src/features/activity-center/types/activity-center.types.ts

export type NotificationType =
  | "info"
  | "success"
  | "warning"
  | "error"
  | "task";

export type NotificationPriority = "low" | "normal" | "high" | "urgent";

export type TaskStatus = "open" | "in_progress" | "completed" | "cancelled";

export interface NotificationItem {
  id: string;
  hospital_id: string;
  title: string;
  message?: string | null;
  module?: string | null;
  type: NotificationType;
  priority: NotificationPriority;
  is_read: boolean;
  action_url?: string | null;
  created_at: string;
}

export interface TaskItem {
  id: string;
  hospital_id: string;
  title: string;
  description?: string | null;
  module?: string | null;
  status: TaskStatus;
  priority: NotificationPriority;
  assigned_to_name?: string | null;
  due_date?: string | null;
  action_url?: string | null;
  created_at: string;
}

export interface AuditActivityItem {
  id: string;
  hospital_id: string;
  actor_name?: string | null;
  action: string;
  module?: string | null;
  entity_type?: string | null;
  entity_id?: string | null;
  description?: string | null;
  created_at: string;
}

export interface ActivityCenterListParams {
  page?: number;
  size?: number;
  search?: string;
  module?: string;
  priority?: NotificationPriority;
  is_read?: boolean;
  status?: TaskStatus;
  date?: string;
}