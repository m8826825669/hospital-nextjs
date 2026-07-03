import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getApiErrorMessage } from "@/platform/api/api-error";
import { nursingService } from "./nursing.service";
import type { NursingListParams } from "../types/nursing.types";
import type {
  CarePlanFormValues,
  MedicationAdministrationFormValues,
  NursingNoteFormValues,
  NursingTaskFormValues,
  VitalSignFormValues,
} from "../schemas/nursing.schema";

const nursingKeys = {
  all: ["nursing"] as const,
  dashboard: ["nursing", "dashboard"] as const,
  vitals: { all: ["nursing", "vitals"] as const, list: (p: NursingListParams) => ["nursing", "vitals", p] as const },
  notes: { all: ["nursing", "notes"] as const, list: (p: NursingListParams) => ["nursing", "notes", p] as const },
  carePlans: { all: ["nursing", "care-plans"] as const, list: (p: NursingListParams) => ["nursing", "care-plans", p] as const },
  tasks: { all: ["nursing", "tasks"] as const, list: (p: NursingListParams) => ["nursing", "tasks", p] as const },
  medications: { all: ["nursing", "medication-administrations"] as const, list: (p: NursingListParams) => ["nursing", "medication-administrations", p] as const },
};

export function useNursingDashboard() {
  return useQuery({ queryKey: nursingKeys.dashboard, queryFn: nursingService.dashboard });
}
export function useVitals(params: NursingListParams) {
  return useQuery({ queryKey: nursingKeys.vitals.list(params), queryFn: () => nursingService.listVitals(params) });
}
export function useNotes(params: NursingListParams) {
  return useQuery({ queryKey: nursingKeys.notes.list(params), queryFn: () => nursingService.listNotes(params) });
}
export function useCarePlans(params: NursingListParams) {
  return useQuery({ queryKey: nursingKeys.carePlans.list(params), queryFn: () => nursingService.listCarePlans(params) });
}
export function useTasks(params: NursingListParams) {
  return useQuery({ queryKey: nursingKeys.tasks.list(params), queryFn: () => nursingService.listTasks(params) });
}
export function useMedications(params: NursingListParams) {
  return useQuery({ queryKey: nursingKeys.medications.list(params), queryFn: () => nursingService.listMedications(params) });
}

export function useCreateVital() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: (payload: VitalSignFormValues) => nursingService.createVital(payload), onSuccess: () => { queryClient.invalidateQueries({ queryKey: nursingKeys.vitals.all }); queryClient.invalidateQueries({ queryKey: nursingKeys.dashboard }); toast.success("Vitals recorded"); }, onError: (e) => toast.error(getApiErrorMessage(e)) });
}
export function useCreateNote() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: (payload: NursingNoteFormValues) => nursingService.createNote(payload), onSuccess: () => { queryClient.invalidateQueries({ queryKey: nursingKeys.notes.all }); toast.success("Nursing note saved"); }, onError: (e) => toast.error(getApiErrorMessage(e)) });
}
export function useCreateCarePlan() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: (payload: CarePlanFormValues) => nursingService.createCarePlan(payload), onSuccess: () => { queryClient.invalidateQueries({ queryKey: nursingKeys.carePlans.all }); queryClient.invalidateQueries({ queryKey: nursingKeys.dashboard }); toast.success("Care plan created"); }, onError: (e) => toast.error(getApiErrorMessage(e)) });
}
export function useCreateTask() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: (payload: NursingTaskFormValues) => nursingService.createTask(payload), onSuccess: () => { queryClient.invalidateQueries({ queryKey: nursingKeys.tasks.all }); queryClient.invalidateQueries({ queryKey: nursingKeys.dashboard }); toast.success("Task created"); }, onError: (e) => toast.error(getApiErrorMessage(e)) });
}
export function useUpdateTaskStatus() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: ({ id, status }: { id: string; status: string }) => nursingService.updateTaskStatus(id, status), onSuccess: () => { queryClient.invalidateQueries({ queryKey: nursingKeys.tasks.all }); queryClient.invalidateQueries({ queryKey: nursingKeys.dashboard }); toast.success("Task updated"); }, onError: (e) => toast.error(getApiErrorMessage(e)) });
}
export function useCreateMedication() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: (payload: MedicationAdministrationFormValues) => nursingService.createMedication(payload), onSuccess: () => { queryClient.invalidateQueries({ queryKey: nursingKeys.medications.all }); queryClient.invalidateQueries({ queryKey: nursingKeys.dashboard }); toast.success("Medication scheduled"); }, onError: (e) => toast.error(getApiErrorMessage(e)) });
}
export function useUpdateMedicationStatus() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: ({ id, status }: { id: string; status: string }) => nursingService.updateMedicationStatus(id, status), onSuccess: () => { queryClient.invalidateQueries({ queryKey: nursingKeys.medications.all }); queryClient.invalidateQueries({ queryKey: nursingKeys.dashboard }); toast.success("Medication status updated"); }, onError: (e) => toast.error(getApiErrorMessage(e)) });
}
