import { apiClient } from "@/platform/api/api-client";
import type {
  Announcement,
  CommunicationMessage,
  CommunicationTask,
  NotificationDashboard,
  NotificationItem,
  NotificationListParams,
  PaginatedResponse,
} from "../types/notification.types";

const buildParams = (params?: NotificationListParams) => ({
  page: params?.page ?? 1,
  page_size: params?.page_size ?? 20,
  status: params?.status === "all" ? undefined : params?.status,
  priority: params?.priority === "all" ? undefined : params?.priority,
  module: params?.module === "all" ? undefined : params?.module,
});

export const notificationService = {
  dashboard: async () => {
    const { data } = await apiClient.get<NotificationDashboard>("/notifications/dashboard");
    return data;
  },
  notifications: async (params?: NotificationListParams) => {
    const { data } = await apiClient.get<PaginatedResponse<NotificationItem>>("/notifications", { params: buildParams(params) });
    return data;
  },
  tasks: async (params?: NotificationListParams) => {
    const { data } = await apiClient.get<PaginatedResponse<CommunicationTask>>("/notifications/tasks", { params: buildParams(params) });
    return data;
  },
  messages: async () => {
    const { data } = await apiClient.get<PaginatedResponse<CommunicationMessage>>("/notifications/messages");
    return data;
  },
  announcements: async () => {
    const { data } = await apiClient.get<PaginatedResponse<Announcement>>("/notifications/announcements");
    return data;
  },
  markRead: async (id: string) => {
    const { data } = await apiClient.post<NotificationItem>(`/notifications/${id}/read`);
    return data;
  },
  markAllRead: async () => {
    const { data } = await apiClient.post<{ updated: number }>("/notifications/read-all");
    return data;
  },
};
