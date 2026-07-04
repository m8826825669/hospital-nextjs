import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { notificationService } from "./notification.service";
import type { NotificationListParams } from "../types/notification.types";

export const notificationKeys = {
  all: ["notifications"] as const,
  dashboard: () => ["notifications", "dashboard"] as const,
  list: (params?: NotificationListParams) => ["notifications", "list", params] as const,
  tasks: (params?: NotificationListParams) => ["notifications", "tasks", params] as const,
  messages: () => ["notifications", "messages"] as const,
  announcements: () => ["notifications", "announcements"] as const,
};

export function useNotificationDashboard() {
  return useQuery({ queryKey: notificationKeys.dashboard(), queryFn: notificationService.dashboard });
}

export function useNotifications(params?: NotificationListParams) {
  return useQuery({ queryKey: notificationKeys.list(params), queryFn: () => notificationService.notifications(params) });
}

export function useTasks(params?: NotificationListParams) {
  return useQuery({ queryKey: notificationKeys.tasks(params), queryFn: () => notificationService.tasks(params) });
}

export function useMessages() {
  return useQuery({ queryKey: notificationKeys.messages(), queryFn: notificationService.messages });
}

export function useAnnouncements() {
  return useQuery({ queryKey: notificationKeys.announcements(), queryFn: notificationService.announcements });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: notificationService.markRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: notificationKeys.all }),
  });
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: notificationService.markAllRead,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: notificationKeys.all }),
  });
}
