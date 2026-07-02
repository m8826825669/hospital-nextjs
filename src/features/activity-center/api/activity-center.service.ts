// src/features/activity-center/api/activity-center.service.ts

import { apiClient } from "@/platform/api/api-client";
import type { ApiListResponse } from "@/platform/api/api.types";
import type {
  ActivityCenterListParams,
  AuditActivityItem,
  NotificationItem,
  TaskItem,
  TaskStatus,
} from "../types/activity-center.types";

export const activityCenterService = {
  async listNotifications(
    params: ActivityCenterListParams
  ): Promise<ApiListResponse<NotificationItem>> {
    const response = await apiClient.get<ApiListResponse<NotificationItem>>(
      "/activity-center/notifications",
      { params }
    );
    return response.data;
  },

  async getUnreadCount(): Promise<{ count: number }> {
    const response = await apiClient.get<{ count: number }>(
      "/activity-center/notifications/unread-count"
    );
    return response.data;
  },

  async markNotificationRead(id: string): Promise<NotificationItem> {
    const response = await apiClient.patch<NotificationItem>(
      `/activity-center/notifications/${id}/read`
    );
    return response.data;
  },

  async markAllNotificationsRead(): Promise<void> {
    await apiClient.patch("/activity-center/notifications/read-all");
  },

  async listTasks(
    params: ActivityCenterListParams
  ): Promise<ApiListResponse<TaskItem>> {
    const response = await apiClient.get<ApiListResponse<TaskItem>>(
      "/activity-center/tasks",
      { params }
    );
    return response.data;
  },

  async updateTaskStatus(id: string, status: TaskStatus): Promise<TaskItem> {
    const response = await apiClient.patch<TaskItem>(
      `/activity-center/tasks/${id}/status`,
      { status }
    );
    return response.data;
  },

  async listAuditActivity(
    params: ActivityCenterListParams
  ): Promise<ApiListResponse<AuditActivityItem>> {
    const response = await apiClient.get<ApiListResponse<AuditActivityItem>>(
      "/activity-center/audit",
      { params }
    );
    return response.data;
  },
};