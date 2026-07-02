// src/features/ot/api/ot.service.ts

import { apiClient } from "@/platform/api/api-client";
import type { ApiListResponse } from "@/platform/api/api.types";
import type {
  CompleteSurgeryPayload,
  CreateSurgeryPayload,
  OtTheatre,
  Surgery,
  SurgeryListParams,
  SurgeryTimelineItem,
  UpdateSurgeryPayload,
} from "../types/ot.types";

export const otService = {
  async listSurgeries(
    params: SurgeryListParams
  ): Promise<ApiListResponse<Surgery>> {
    const response = await apiClient.get<ApiListResponse<Surgery>>(
      "/ot/surgeries",
      { params }
    );
    return response.data;
  },

  async getSurgeryById(id: string): Promise<Surgery> {
    const response = await apiClient.get<Surgery>(`/ot/surgeries/${id}`);
    return response.data;
  },

  async createSurgery(payload: CreateSurgeryPayload): Promise<Surgery> {
    const response = await apiClient.post<Surgery>("/ot/surgeries", payload);
    return response.data;
  },

  async updateSurgery(
    id: string,
    payload: UpdateSurgeryPayload
  ): Promise<Surgery> {
    const response = await apiClient.patch<Surgery>(
      `/ot/surgeries/${id}`,
      payload
    );
    return response.data;
  },

  async deleteSurgery(id: string): Promise<void> {
    await apiClient.delete(`/ot/surgeries/${id}`);
  },

  async startSurgery(id: string): Promise<Surgery> {
    const response = await apiClient.post<Surgery>(
      `/ot/surgeries/${id}/start`
    );
    return response.data;
  },

  async completeSurgery(
    id: string,
    payload: CompleteSurgeryPayload
  ): Promise<Surgery> {
    const response = await apiClient.post<Surgery>(
      `/ot/surgeries/${id}/complete`,
      payload
    );
    return response.data;
  },

  async getSurgeryTimeline(id: string): Promise<SurgeryTimelineItem[]> {
    const response = await apiClient.get<SurgeryTimelineItem[]>(
      `/ot/surgeries/${id}/timeline`
    );
    return response.data;
  },

  async listTheatres(params?: {
    search?: string;
  }): Promise<ApiListResponse<OtTheatre>> {
    const response = await apiClient.get<ApiListResponse<OtTheatre>>(
      "/ot/theatres",
      { params }
    );
    return response.data;
  },
};