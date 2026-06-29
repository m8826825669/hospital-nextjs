// src/features/doctors/api/doctors.queries.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/platform/api/query-keys";
import { getApiErrorMessage } from "@/platform/api/api-error";
import { doctorsService } from "./doctors.service";

import type {
  CreateDoctorPayload,
  DoctorListParams,
  UpdateDoctorPayload,
} from "../types/doctor.types";

export function useDoctors(params: DoctorListParams) {
  return useQuery({
    queryKey: queryKeys.doctors.list(params),
    queryFn: () => doctorsService.list(params),
  });
}

export function useDoctor(id?: string) {
  return useQuery({
    queryKey: id ? queryKeys.doctors.detail(id) : ["doctor", "empty"],
    queryFn: () => doctorsService.getById(id!),
    enabled: Boolean(id),
  });
}

export function useCreateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateDoctorPayload) =>
      doctorsService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.doctors.all });
      toast.success("Doctor created successfully");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useUpdateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateDoctorPayload;
    }) => doctorsService.update(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.doctors.all });
      queryClient.invalidateQueries({
        queryKey: queryKeys.doctors.detail(variables.id),
      });
      toast.success("Doctor updated successfully");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useDeleteDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => doctorsService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.doctors.all });
      toast.success("Doctor deleted successfully");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useDoctorDepartments(id?: string) {
  return useQuery({
    queryKey: id
      ? queryKeys.doctors.departments(id)
      : ["doctor-departments", "empty"],
    queryFn: () => doctorsService.getDepartments(id!),
    enabled: Boolean(id),
  });
}

export function useDoctorSchedules(id?: string) {
  return useQuery({
    queryKey: id ? queryKeys.doctors.schedules(id) : ["doctor-schedules", "empty"],
    queryFn: () => doctorsService.getSchedules(id!),
    enabled: Boolean(id),
  });
}

export function useDoctorAvailableSlots(id?: string, date?: string) {
  return useQuery({
    queryKey:
      id && date
        ? queryKeys.doctors.slots(id, { date })
        : ["doctor-slots", "empty"],
    queryFn: () => doctorsService.getAvailableSlots(id!, { date: date! }),
    enabled: Boolean(id && date),
  });
}