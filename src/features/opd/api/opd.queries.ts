// src/features/opd/api/opd.queries.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/platform/api/query-keys";
import { getApiErrorMessage } from "@/platform/api/api-error";
import { opdService } from "./opd.service";

import type {
  CreateOpdEncounterPayload,
  OpdEncounter,
  OpdListParams,
  UpdateOpdEncounterPayload,
} from "../types/opd.types";

export function useOpdEncounters(params: OpdListParams) {
  return useQuery({
    queryKey: queryKeys.opd.list(params),
    queryFn: () => opdService.list(params),
  });
}

export function useOpdEncounter(id?: string) {
  return useQuery({
    queryKey: id ? queryKeys.opd.detail(id) : ["opd", "empty"],
    queryFn: () => opdService.getById(id!),
    enabled: Boolean(id),
  });
}

export function useCreateOpdEncounter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateOpdEncounterPayload) =>
      opdService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.opd.all });
      toast.success("OPD encounter created successfully");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useUpdateOpdEncounter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateOpdEncounterPayload;
    }) => opdService.update(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.opd.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.opd.detail(variables.id),
      });
      toast.success("OPD encounter updated successfully");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useDeleteOpdEncounter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => opdService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.opd.all });
      toast.success("OPD encounter deleted successfully");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useUpdateOpdStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: OpdEncounter["status"];
    }) => opdService.updateStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.opd.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.opd.detail(variables.id),
      });
      toast.success("OPD status updated");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useOpdPrescriptions(id?: string) {
  return useQuery({
    queryKey: id
      ? queryKeys.opd.prescriptions(id)
      : ["opd", "prescriptions", "empty"],
    queryFn: () => opdService.getPrescriptions(id!),
    enabled: Boolean(id),
  });
}

export function useOpdLabOrders(id?: string) {
  return useQuery({
    queryKey: id ? queryKeys.opd.labOrders(id) : ["opd", "lab-orders", "empty"],
    queryFn: () => opdService.getLabOrders(id!),
    enabled: Boolean(id),
  });
}

export function useOpdTimeline(id?: string) {
  return useQuery({
    queryKey: id ? queryKeys.opd.timeline(id) : ["opd", "timeline", "empty"],
    queryFn: () => opdService.getTimeline(id!),
    enabled: Boolean(id),
  });
}