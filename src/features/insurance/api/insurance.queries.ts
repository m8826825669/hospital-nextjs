// src/features/insurance/api/insurance.queries.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/platform/api/query-keys";
import { getApiErrorMessage } from "@/platform/api/api-error";
import { insuranceService } from "./insurance.service";

import type {
  CreateInsuranceClaimPayload,
  InsuranceListParams,
  ReviewInsuranceClaimPayload,
  SettleInsuranceClaimPayload,
  UpdateInsuranceClaimPayload,
} from "../types/insurance.types";

export function useInsuranceClaims(params: InsuranceListParams) {
  return useQuery({
    queryKey: queryKeys.insurance.claims.list(params),
    queryFn: () => insuranceService.listClaims(params),
  });
}

export function useInsuranceClaim(id?: string) {
  return useQuery({
    queryKey: id
      ? queryKeys.insurance.claims.detail(id)
      : ["insurance", "claim", "empty"],
    queryFn: () => insuranceService.getClaimById(id!),
    enabled: Boolean(id),
  });
}

export function useCreateInsuranceClaim() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateInsuranceClaimPayload) =>
      insuranceService.createClaim(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.insurance.claims.all,
      });
      toast.success("Insurance claim created successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useUpdateInsuranceClaim() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateInsuranceClaimPayload;
    }) => insuranceService.updateClaim(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.insurance.claims.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.insurance.claims.detail(variables.id),
      });
      toast.success("Insurance claim updated successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useDeleteInsuranceClaim() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => insuranceService.deleteClaim(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.insurance.claims.all,
      });
      toast.success("Insurance claim deleted successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useReviewInsuranceClaim() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: ReviewInsuranceClaimPayload;
    }) => insuranceService.reviewClaim(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.insurance.claims.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.insurance.claims.detail(variables.id),
      });
      toast.success("Claim review saved");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useSettleInsuranceClaim() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: SettleInsuranceClaimPayload;
    }) => insuranceService.settleClaim(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.insurance.claims.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.insurance.claims.detail(variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.insurance.claims.settlements(variables.id),
      });
      toast.success("Claim settlement recorded");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useInsuranceSettlements(id?: string) {
  return useQuery({
    queryKey: id
      ? queryKeys.insurance.claims.settlements(id)
      : ["insurance", "settlements", "empty"],
    queryFn: () => insuranceService.getSettlements(id!),
    enabled: Boolean(id),
  });
}

export function useInsuranceTimeline(id?: string) {
  return useQuery({
    queryKey: id
      ? queryKeys.insurance.claims.timeline(id)
      : ["insurance", "timeline", "empty"],
    queryFn: () => insuranceService.getTimeline(id!),
    enabled: Boolean(id),
  });
}