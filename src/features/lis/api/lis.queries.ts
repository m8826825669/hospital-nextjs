// src/features/lis/api/lis.queries.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/platform/api/query-keys";
import { getApiErrorMessage } from "@/platform/api/api-error";
import { lisService } from "./lis.service";

import type {
  CreateLabSamplePayload,
  LabResultEntryPayload,
  LabSample,
  LisListParams,
  UpdateLabSamplePayload,
} from "../types/lis.types";

export function useLabSamples(params: LisListParams) {
  return useQuery({
    queryKey: queryKeys.lis.samples.list(params),
    queryFn: () => lisService.listSamples(params),
  });
}

export function useLabSample(id?: string) {
  return useQuery({
    queryKey: id ? queryKeys.lis.samples.detail(id) : ["lis", "sample", "empty"],
    queryFn: () => lisService.getSampleById(id!),
    enabled: Boolean(id),
  });
}

export function useCreateLabSample() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateLabSamplePayload) =>
      lisService.createSample(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lis.samples.all });
      toast.success("Lab sample created successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useUpdateLabSample() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateLabSamplePayload;
    }) => lisService.updateSample(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lis.samples.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.lis.samples.detail(variables.id),
      });
      toast.success("Lab sample updated successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useDeleteLabSample() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => lisService.deleteSample(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lis.samples.all });
      toast.success("Lab sample deleted successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useUpdateLabSampleStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: LabSample["status"] }) =>
      lisService.updateSampleStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lis.samples.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.lis.samples.detail(variables.id),
      });
      toast.success("Sample status updated");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useEnterLabResults() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LabResultEntryPayload) =>
      lisService.enterResults(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.lis.samples.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.lis.samples.results(variables.sample_id),
      });
      toast.success("Lab result entered successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useLabResults(id?: string) {
  return useQuery({
    queryKey: id ? queryKeys.lis.samples.results(id) : ["lis", "results", "empty"],
    queryFn: () => lisService.getResults(id!),
    enabled: Boolean(id),
  });
}

export function useLabTimeline(id?: string) {
  return useQuery({
    queryKey: id
      ? queryKeys.lis.samples.timeline(id)
      : ["lis", "timeline", "empty"],
    queryFn: () => lisService.getTimeline(id!),
    enabled: Boolean(id),
  });
}

export function useLabTests(params?: { search?: string }) {
  return useQuery({
    queryKey: queryKeys.lis.tests.list(params ?? {}),
    queryFn: () => lisService.listTests(params),
  });
}