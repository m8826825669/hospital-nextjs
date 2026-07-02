// src/features/nursing/api/nursing.queries.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/platform/api/query-keys";
import { getApiErrorMessage } from "@/platform/api/api-error";
import { nursingService } from "./nursing.service";

import type {
  MedicationAdministration,
  NursingListParams,
  NursingTaskStatus,
} from "../types/nursing.types";
import type {
  NursingNoteFormValues,
  NursingTaskFormValues,
  VitalFormValues,
} from "../schemas/nursing.schema";

export function useNursingPatients(params: NursingListParams) {
  return useQuery({
    queryKey: queryKeys.nursing.patients.list(params),
    queryFn: () => nursingService.listPatients(params),
  });
}

export function useNursingVitals(params: NursingListParams) {
  return useQuery({
    queryKey: queryKeys.nursing.vitals.list(params),
    queryFn: () => nursingService.listVitals(params),
  });
}

export function useCreateVital() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: VitalFormValues) => nursingService.createVital(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.nursing.vitals.all });
      toast.success("Vitals recorded");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useNursingMedications(params: NursingListParams) {
  return useQuery({
    queryKey: queryKeys.nursing.medications.list(params),
    queryFn: () => nursingService.listMedications(params),
  });
}

export function useUpdateMedicationStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: MedicationAdministration["status"];
    }) => nursingService.updateMedicationStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.nursing.medications.all,
      });
      toast.success("Medication status updated");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useNursingNotes(params: NursingListParams) {
  return useQuery({
    queryKey: queryKeys.nursing.notes.list(params),
    queryFn: () => nursingService.listNotes(params),
  });
}

export function useCreateNursingNote() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: NursingNoteFormValues) =>
      nursingService.createNote(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.nursing.notes.all });
      toast.success("Nursing note added");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useNursingTasks(params: NursingListParams) {
  return useQuery({
    queryKey: queryKeys.nursing.tasks.list(params),
    queryFn: () => nursingService.listTasks(params),
  });
}

export function useCreateNursingTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: NursingTaskFormValues) =>
      nursingService.createTask(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.nursing.tasks.all });
      toast.success("Nursing task created");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useUpdateNursingTaskStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: NursingTaskStatus }) =>
      nursingService.updateTaskStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.nursing.tasks.all });
      toast.success("Task status updated");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}