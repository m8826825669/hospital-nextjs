// src/features/radiology/api/radiology.queries.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/platform/api/query-keys";
import { getApiErrorMessage } from "@/platform/api/api-error";
import { radiologyService } from "./radiology.service";

import type {
  RadiologyListParams,
  RadiologyOrderStatus,
} from "../types/radiology.types";
import type {
  RadiologyOrderFormValues,
  RadiologyReportFormValues,
} from "../schemas/radiology.schema";

export function useRadiologyOrders(params: RadiologyListParams) {
  return useQuery({
    queryKey: queryKeys.radiology.orders.list(params),
    queryFn: () => radiologyService.listOrders(params),
  });
}

export function useCreateRadiologyOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RadiologyOrderFormValues) =>
      radiologyService.createOrder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.radiology.orders.all });
      toast.success("Radiology order created");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useUpdateRadiologyOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: RadiologyOrderFormValues }) =>
      radiologyService.updateOrder(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.radiology.orders.all });
      toast.success("Radiology order updated");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useDeleteRadiologyOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => radiologyService.deleteOrder(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.radiology.orders.all });
      toast.success("Radiology order deleted");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useUpdateRadiologyStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: RadiologyOrderStatus }) =>
      radiologyService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.radiology.orders.all });
      toast.success("Radiology status updated");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useSaveRadiologyReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: RadiologyReportFormValues }) =>
      radiologyService.saveReport(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.radiology.orders.all });
      toast.success("Radiology report saved");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useRadiologyAttachments(id?: string) {
  return useQuery({
    queryKey: id
      ? queryKeys.radiology.orders.attachments(id)
      : ["radiology", "attachments", "empty"],
    queryFn: () => radiologyService.getAttachments(id!),
    enabled: Boolean(id),
  });
}

export function useRadiologyTimeline(id?: string) {
  return useQuery({
    queryKey: id
      ? queryKeys.radiology.orders.timeline(id)
      : ["radiology", "timeline", "empty"],
    queryFn: () => radiologyService.getTimeline(id!),
    enabled: Boolean(id),
  });
}