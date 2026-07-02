// src/features/notifications/api/notification.queries.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/platform/api/query-keys";
import { notificationService } from "./notification.service";
import type {
  ActivityFilters,
  NotificationFilters,
  TaskFilters,
} from "../types/notification.types";

export function useNotifications(filters?: NotificationFilters) {
  return useQuery({
    queryKey: queryKeys.notifications.list(filters),
    queryFn: () => notificationService.listNotifications(filters),
  });
}

export function useNotificationSummary() {
  return useQuery({
    queryKey: queryKeys.notifications.unreadCount,
    queryFn: notificationService.getSummary,
  });
}

export function useActivities(filters?: ActivityFilters) {
  return useQuery({
    queryKey: queryKeys.notifications.activities(filters),
    queryFn: () => notificationService.listActivities(filters),
  });
}

export function useTasks(filters?: TaskFilters) {
  return useQuery({
    queryKey: queryKeys.notifications.tasks(filters),
    queryFn: () => notificationService.listTasks(filters),
  });
}

export function useMarkNotificationAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationService.markAsRead,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.all,
      });
    },
  });
}

export function useMarkAllNotificationsAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationService.markAllAsRead,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.all,
      });
    },
  });
}

export function useArchiveNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationService.archiveNotification,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.all,
      });
    },
  });
}

export function useStartTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationService.startTask,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.all,
      });
    },
  });
}

export function useCompleteTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: notificationService.completeTask,
    onSuccess: () => {
      void queryClient.invalidateQueries({
        queryKey: queryKeys.notifications.all,
      });
    },
  });
}