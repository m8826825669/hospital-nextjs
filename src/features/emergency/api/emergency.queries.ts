// src/features/emergency/api/emergency.queries.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/platform/api/query-keys";
import { getApiErrorMessage } from "@/platform/api/api-error";
import { emergencyService } from "./emergency.service";
import type {
  EmergencyListParams,
  ErEncounterStatus,
} from "../types/emergency.types";
import type {
  EmergencyDispositionFormValues,
  EmergencyEncounterFormValues,
  EmergencyOrderFormValues,
} from "../schemas/emergency.schema";

export function useEmergencyEncounters(params: EmergencyListParams) {
  return useQuery({
    queryKey: queryKeys.emergency.encounters.list(params),
    queryFn: () => emergencyService.listEncounters(params),
  });
}

export function useCreateEmergencyEncounter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EmergencyEncounterFormValues) =>
      emergencyService.createEncounter(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.emergency.encounters.all,
      });
      toast.success("Emergency encounter created");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useUpdateEmergencyEncounter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: EmergencyEncounterFormValues;
    }) => emergencyService.updateEncounter(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.emergency.encounters.all,
      });
      toast.success("Emergency encounter updated");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useDeleteEmergencyEncounter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => emergencyService.deleteEncounter(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.emergency.encounters.all,
      });
      toast.success("Emergency encounter deleted");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useUpdateEmergencyStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: ErEncounterStatus }) =>
      emergencyService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.emergency.encounters.all,
      });
      toast.success("Emergency status updated");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useSaveEmergencyDisposition() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: EmergencyDispositionFormValues;
    }) => emergencyService.saveDisposition(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.emergency.encounters.all,
      });
      toast.success("Disposition saved");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useEmergencyOrders(params: EmergencyListParams) {
  return useQuery({
    queryKey: queryKeys.emergency.orders.list(params),
    queryFn: () => emergencyService.listOrders(params),
  });
}

export function useCreateEmergencyOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EmergencyOrderFormValues) =>
      emergencyService.createOrder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.emergency.orders.all });
      toast.success("Emergency order created");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useEmergencyTimeline(id?: string) {
  return useQuery({
    queryKey: id
      ? queryKeys.emergency.encounters.timeline(id)
      : ["emergency", "timeline", "empty"],
    queryFn: () => emergencyService.getTimeline(id!),
    enabled: Boolean(id),
  });
}