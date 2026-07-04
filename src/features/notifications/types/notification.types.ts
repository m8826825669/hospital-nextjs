export type NotificationType = "info" | "success" | "warning" | "error" | "approval" | "task" | "system";
export type NotificationPriority = "low" | "normal" | "high" | "urgent";
export type NotificationStatus = "unread" | "read" | "archived";
export type TaskStatus = "open" | "in_progress" | "completed" | "cancelled";

export interface ActivityItem {
  id: string;
  title: string;
  description?: string | null;
  module: string;
  actor_name?: string | null;
  entity_type?: string | null;
  entity_id?: string | null;
  created_at: string;
}

export interface TaskItem {
  id: string;
  title: string;
  description?: string | null;
  priority: string;
  status: string;
  module: string;
  assigned_to_name?: string | null;
  href?: string | null;
  due_at?: string | null;
  created_at: string;
}

export interface NotificationCenterSummary {
  unread_count: number;
  urgent_count: number;
  open_tasks_count: number;
  today_activity_count: number;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  module: string;
  priority: string;
  notification_type?: string | null;
  type?: string | null;
  status: string;
  action_url?: string | null;
  href?: string | null;
  entity_type?: string | null;
  entity_id?: string | null;
  read_at?: string | null;
  created_at: string;
}

export interface CommunicationTask {
  id: string;
  title: string;
  description?: string | null;
  module: string;
  priority: string;
  status: string;
  due_at?: string | null;
  created_at: string;
}

export interface CommunicationMessage {
  id: string;
  subject: string;
  body: string;
  priority: string;
  status: string;
  created_at: string;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  audience: string;
  active: boolean;
  created_at: string;
}

export interface NotificationDashboard {
  unread_notifications: number;
  pending_tasks: number;
  unread_messages: number;
  active_announcements: number;
  critical_alerts: number;
  recent_notifications: Array<Record<string, string>>;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  page_size: number;
  pages: number;
}

export interface NotificationListParams {
  page?: number;
  page_size?: number;
  status?: string;
  priority?: string;
  module?: string;
}
