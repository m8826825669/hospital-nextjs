// src/features/ot/api/ot.queries.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/platform/api/query-keys";
import { getApiErrorMessage } from "@/platform/api/api-error";
import { otService } from "./ot.service";

import type {
  CompleteSurgeryPayload,
  CreateSurgeryPayload,
  SurgeryListParams,
  UpdateSurgeryPayload,
} from "../types/ot.types";

export function useSurgeries(params: SurgeryListParams) {
  return useQuery({
    queryKey: queryKeys.ot.surgeries.list(params),
    queryFn: () => otService.listSurgeries(params),
  });
}

export function useSurgery(id?: string) {
  return useQuery({
    queryKey: id ? queryKeys.ot.surgeries.detail(id) : ["ot", "surgery", "empty"],
    queryFn: () => otService.getSurgeryById(id!),
    enabled: Boolean(id),
  });
}

export function useCreateSurgery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateSurgeryPayload) =>
      otService.createSurgery(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.ot.surgeries.all,
      });
      toast.success("Surgery scheduled successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useUpdateSurgery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateSurgeryPayload;
    }) => otService.updateSurgery(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.ot.surgeries.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.ot.surgeries.detail(variables.id),
      });
      toast.success("Surgery updated successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useDeleteSurgery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => otService.deleteSurgery(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.ot.surgeries.all,
      });
      toast.success("Surgery deleted successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useStartSurgery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => otService.startSurgery(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.ot.surgeries.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.ot.surgeries.detail(id),
      });
      toast.success("Surgery started");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useCompleteSurgery() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: CompleteSurgeryPayload;
    }) => otService.completeSurgery(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.ot.surgeries.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.ot.surgeries.detail(variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.ot.surgeries.timeline(variables.id),
      });
      toast.success("Surgery completed");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useSurgeryTimeline(id?: string) {
  return useQuery({
    queryKey: id
      ? queryKeys.ot.surgeries.timeline(id)
      : ["ot", "surgery", "timeline", "empty"],
    queryFn: () => otService.getSurgeryTimeline(id!),
    enabled: Boolean(id),
  });
}

export function useOtTheatres(params?: { search?: string }) {
  return useQuery({
    queryKey: queryKeys.ot.theatres.list(params ?? {}),
    queryFn: () => otService.listTheatres(params),
  });
}