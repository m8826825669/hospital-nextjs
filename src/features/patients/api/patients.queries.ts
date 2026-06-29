// src/features/patients/api/patients.queries.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/platform/api/query-keys";
import { getApiErrorMessage } from "@/platform/api/api-error";
import { patientsService } from "./patients.service";

import type {
  CreatePatientPayload,
  PatientListParams,
  UpdatePatientPayload,
} from "../types/patient.types";

export function usePatients(params: PatientListParams) {
  return useQuery({
    queryKey: queryKeys.patients.list(params),
    queryFn: () => patientsService.list(params),
  });
}

export function usePatient(id?: string) {
  return useQuery({
    queryKey: id ? queryKeys.patients.detail(id) : ["patients", "empty"],
    queryFn: () => patientsService.getById(id!),
    enabled: Boolean(id),
  });
}

export function useCreatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreatePatientPayload) =>
      patientsService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.patients.all });
      toast.success("Patient registered successfully");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useUpdatePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdatePatientPayload;
    }) => patientsService.update(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.patients.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.patients.detail(variables.id),
      });
      toast.success("Patient updated successfully");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useDeletePatient() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => patientsService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.patients.all });
      toast.success("Patient deleted successfully");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function usePatientTimeline(id?: string) {
  return useQuery({
    queryKey: id ? queryKeys.patients.timeline(id) : ["patients", "timeline", "empty"],
    queryFn: () => patientsService.getTimeline(id!),
    enabled: Boolean(id),
  });
}

export function usePatientDocuments(id?: string) {
  return useQuery({
    queryKey: id
      ? queryKeys.patients.documents(id)
      : ["patients", "documents", "empty"],
    queryFn: () => patientsService.getDocuments(id!),
    enabled: Boolean(id),
  });
}