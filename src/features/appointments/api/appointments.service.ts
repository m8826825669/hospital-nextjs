// src/features/appointments/api/appointments.service.ts

import { apiClient } from "@/platform/api/api-client";
import type { ApiListResponse } from "@/platform/api/api.types";
import type {
  Appointment,
  AppointmentListParams,
  CreateAppointmentPayload,
  UpdateAppointmentPayload,
} from "../types/appointment.types";

export const appointmentsService = {
  async list(
    params: AppointmentListParams
  ): Promise<ApiListResponse<Appointment>> {
    const response = await apiClient.get<ApiListResponse<Appointment>>(
      "/appointments",
      { params }
    );

    return response.data;
  },

  async getById(id: string): Promise<Appointment> {
    const response = await apiClient.get<Appointment>(`/appointments/${id}`);
    return response.data;
  },

  async create(payload: CreateAppointmentPayload): Promise<Appointment> {
    const response = await apiClient.post<Appointment>(
      "/appointments",
      payload
    );

    return response.data;
  },

  async update(
    id: string,
    payload: UpdateAppointmentPayload
  ): Promise<Appointment> {
    const response = await apiClient.patch<Appointment>(
      `/appointments/${id}`,
      payload
    );

    return response.data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/appointments/${id}`);
  },

  async updateStatus(
    id: string,
    status: Appointment["status"]
  ): Promise<Appointment> {
    const response = await apiClient.patch<Appointment>(
      `/appointments/${id}/status`,
      { status }
    );

    return response.data;
  },
};