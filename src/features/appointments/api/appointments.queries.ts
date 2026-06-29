// src/features/appointments/api/appointments.queries.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/platform/api/query-keys";
import { getApiErrorMessage } from "@/platform/api/api-error";
import { appointmentsService } from "./appointments.service";

import type {
  Appointment,
  AppointmentListParams,
  CreateAppointmentPayload,
  UpdateAppointmentPayload,
} from "../types/appointment.types";

export function useAppointments(params: AppointmentListParams) {
  return useQuery({
    queryKey: queryKeys.appointments.list(params),
    queryFn: () => appointmentsService.list(params),
  });
}

export function useAppointment(id?: string) {
  return useQuery({
    queryKey: id ? queryKeys.appointments.detail(id) : ["appointments", "empty"],
    queryFn: () => appointmentsService.getById(id!),
    enabled: Boolean(id),
  });
}

export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateAppointmentPayload) =>
      appointmentsService.create(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.appointments.all,
      });
      toast.success("Appointment created successfully");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useUpdateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateAppointmentPayload;
    }) => appointmentsService.update(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.appointments.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.appointments.detail(variables.id),
      });
      toast.success("Appointment updated successfully");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useDeleteAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => appointmentsService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.appointments.all,
      });
      toast.success("Appointment deleted successfully");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}

export function useUpdateAppointmentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      status,
    }: {
      id: string;
      status: Appointment["status"];
    }) => appointmentsService.updateStatus(id, status),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.appointments.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.appointments.detail(variables.id),
      });
      toast.success("Appointment status updated");
    },
    onError: (error) => {
      toast.error(getApiErrorMessage(error));
    },
  });
}