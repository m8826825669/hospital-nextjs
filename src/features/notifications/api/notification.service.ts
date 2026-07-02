// src/features/notifications/api/notification.service.ts

import { apiClient } from "@/platform/api/api-client";
import type {
  ActivityFilters,
  ActivityItem,
  NotificationCenterSummary,
  NotificationFilters,
  NotificationItem,
  TaskFilters,
  TaskItem,
} from "../types/notification.types";
import {
  getMockActivities,
  getMockNotifications,
  getMockNotificationSummary,
  getMockTasks,
} from "../utils/notification.mock";

const BASE_URL = "/notifications";

export const notificationService = {
  async listNotifications(
    filters?: NotificationFilters,
  ): Promise<NotificationItem[]> {
    try {
      const response = await apiClient.get<NotificationItem[]>(BASE_URL, {
        params: filters,
      });

      return response.data;
    } catch {
      return getMockNotifications();
    }
  },

  async getSummary(): Promise<NotificationCenterSummary> {
    try {
      const response = await apiClient.get<NotificationCenterSummary>(
        `${BASE_URL}/summary`,
      );

      return response.data;
    } catch {
      return getMockNotificationSummary();
    }
  },

  async markAsRead(id: string): Promise<void> {
    await apiClient.post(`${BASE_URL}/${id}/read`);
  },

  async markAllAsRead(): Promise<void> {
    await apiClient.post(`${BASE_URL}/mark-all-read`);
  },

  async archiveNotification(id: string): Promise<void> {
    await apiClient.post(`${BASE_URL}/${id}/archive`);
  },

  async listActivities(filters?: ActivityFilters): Promise<ActivityItem[]> {
    try {
      const response = await apiClient.get<ActivityItem[]>(
        `${BASE_URL}/activities`,
        {
          params: filters,
        },
      );

      return response.data;
    } catch {
      return getMockActivities();
    }
  },

  async listTasks(filters?: TaskFilters): Promise<TaskItem[]> {
    try {
      const response = await apiClient.get<TaskItem[]>(`${BASE_URL}/tasks`, {
        params: filters,
      });

      return response.data;
    } catch {
      return getMockTasks();
    }
  },

  async completeTask(id: string): Promise<void> {
    await apiClient.post(`${BASE_URL}/tasks/${id}/complete`);
  },

  async startTask(id: string): Promise<void> {
    await apiClient.post(`${BASE_URL}/tasks/${id}/start`);
  },
};