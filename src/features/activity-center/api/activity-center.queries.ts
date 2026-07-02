// src/features/activity-center/api/activity-center.queries.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/platform/api/query-keys";
import { getApiErrorMessage } from "@/platform/api/api-error";
import { activityCenterService } from "./activity-center.service";

import type {
  ActivityCenterListParams,
  TaskStatus,
} from "../types/activity-center.types";

export function useNotifications(params: ActivityCenterListParams) {
  return useQuery({
    queryKey: queryKeys.activityCenter.notifications.list(params),
    queryFn: () => activityCenterService.listNotifications(params),
  });
}

export function useUnreadNotificationsCount() {
  return useQuery({
    queryKey: queryKeys.activityCenter.notifications.unreadCount,
    queryFn: () => activityCenterService.getUnreadCount(),
    refetchInterval: 60_000,
  });
}

export function useMarkNotificationRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => activityCenterService.markNotificationRead(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.activityCenter.notifications.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.activityCenter.notifications.unreadCount,
      });
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useMarkAllNotificationsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => activityCenterService.markAllNotificationsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.activityCenter.notifications.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.activityCenter.notifications.unreadCount,
      });
      toast.success("All notifications marked as read");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useTasks(params: ActivityCenterListParams) {
  return useQuery({
    queryKey: queryKeys.activityCenter.tasks.list(params),
    queryFn: () => activityCenterService.listTasks(params),
  });
}

export function useUpdateTaskStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: TaskStatus }) =>
      activityCenterService.updateTaskStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.activityCenter.tasks.all,
      });
      toast.success("Task status updated");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useAuditActivity(params: ActivityCenterListParams) {
  return useQuery({
    queryKey: queryKeys.activityCenter.audit.list(params),
    queryFn: () => activityCenterService.listAuditActivity(params),
  });
}