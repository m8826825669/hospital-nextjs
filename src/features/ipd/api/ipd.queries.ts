// src/features/ipd/api/ipd.queries.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/platform/api/query-keys";
import { getApiErrorMessage } from "@/platform/api/api-error";
import { ipdService } from "./ipd.service";

import type {
  CreateIpdAdmissionPayload,
  IpdDischargePayload,
  IpdListParams,
  IpdTransferPayload,
  UpdateIpdAdmissionPayload,
} from "../types/ipd.types";

export function useIpdAdmissions(params: IpdListParams) {
  return useQuery({
    queryKey: queryKeys.ipd.list(params),
    queryFn: () => ipdService.list(params),
  });
}

export function useIpdAdmission(id?: string) {
  return useQuery({
    queryKey: id ? queryKeys.ipd.detail(id) : ["ipd", "empty"],
    queryFn: () => ipdService.getById(id!),
    enabled: Boolean(id),
  });
}

export function useCreateIpdAdmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateIpdAdmissionPayload) =>
      ipdService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ipd.all });
      toast.success("IPD admission created successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useUpdateIpdAdmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateIpdAdmissionPayload;
    }) => ipdService.update(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ipd.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.ipd.detail(variables.id),
      });
      toast.success("IPD admission updated successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useDeleteIpdAdmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => ipdService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ipd.all });
      toast.success("IPD admission deleted successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useTransferIpdAdmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: IpdTransferPayload;
    }) => ipdService.transfer(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ipd.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.ipd.detail(variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.ipd.bedAllocations(variables.id),
      });
      toast.success("Patient transferred successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useDischargeIpdAdmission() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: IpdDischargePayload;
    }) => ipdService.discharge(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.ipd.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.ipd.detail(variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.ipd.statusHistory(variables.id),
      });
      toast.success("Patient discharged successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useIpdBedAllocations(id?: string) {
  return useQuery({
    queryKey: id
      ? queryKeys.ipd.bedAllocations(id)
      : ["ipd", "bed-allocations", "empty"],
    queryFn: () => ipdService.getBedAllocations(id!),
    enabled: Boolean(id),
  });
}

export function useIpdStatusHistory(id?: string) {
  return useQuery({
    queryKey: id
      ? queryKeys.ipd.statusHistory(id)
      : ["ipd", "status-history", "empty"],
    queryFn: () => ipdService.getStatusHistory(id!),
    enabled: Boolean(id),
  });
}