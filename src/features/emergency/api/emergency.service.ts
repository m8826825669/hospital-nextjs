// src/features/emergency/api/emergency.service.ts

import { apiClient } from "@/platform/api/api-client";
import type { ApiListResponse } from "@/platform/api/api.types";
import type {
  EmergencyEncounter,
  EmergencyListParams,
  EmergencyOrder,
  EmergencyTimelineItem,
  ErEncounterStatus,
} from "../types/emergency.types";
import type {
  EmergencyDispositionFormValues,
  EmergencyEncounterFormValues,
  EmergencyOrderFormValues,
} from "../schemas/emergency.schema";

export const emergencyService = {
  async listEncounters(
    params: EmergencyListParams
  ): Promise<ApiListResponse<EmergencyEncounter>> {
    const response = await apiClient.get<ApiListResponse<EmergencyEncounter>>(
      "/emergency/encounters",
      { params }
    );
    return response.data;
  },

  async createEncounter(
    payload: EmergencyEncounterFormValues
  ): Promise<EmergencyEncounter> {
    const response = await apiClient.post<EmergencyEncounter>(
      "/emergency/encounters",
      payload
    );
    return response.data;
  },

  async updateEncounter(
    id: string,
    payload: EmergencyEncounterFormValues
  ): Promise<EmergencyEncounter> {
    const response = await apiClient.patch<EmergencyEncounter>(
      `/emergency/encounters/${id}`,
      payload
    );
    return response.data;
  },

  async deleteEncounter(id: string): Promise<void> {
    await apiClient.delete(`/emergency/encounters/${id}`);
  },

  async updateStatus(
    id: string,
    status: ErEncounterStatus
  ): Promise<EmergencyEncounter> {
    const response = await apiClient.patch<EmergencyEncounter>(
      `/emergency/encounters/${id}/status`,
      { status }
    );
    return response.data;
  },

  async saveDisposition(
    id: string,
    payload: EmergencyDispositionFormValues
  ): Promise<EmergencyEncounter> {
    const response = await apiClient.post<EmergencyEncounter>(
      `/emergency/encounters/${id}/disposition`,
      payload
    );
    return response.data;
  },

  async listOrders(
    params: EmergencyListParams
  ): Promise<ApiListResponse<EmergencyOrder>> {
    const response = await apiClient.get<ApiListResponse<EmergencyOrder>>(
      "/emergency/orders",
      { params }
    );
    return response.data;
  },

  async createOrder(payload: EmergencyOrderFormValues): Promise<EmergencyOrder> {
    const response = await apiClient.post<EmergencyOrder>(
      "/emergency/orders",
      payload
    );
    return response.data;
  },

  async getTimeline(id: string): Promise<EmergencyTimelineItem[]> {
    const response = await apiClient.get<EmergencyTimelineItem[]>(
      `/emergency/encounters/${id}/timeline`
    );
    return response.data;
  },
};