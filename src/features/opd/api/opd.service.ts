// src/features/opd/api/opd.service.ts

import { apiClient } from "@/platform/api/api-client";
import type { ApiListResponse } from "@/platform/api/api.types";
import type {
  CreateOpdEncounterPayload,
  OpdEncounter,
  OpdLabOrder,
  OpdListParams,
  OpdPrescriptionItem,
  OpdTimelineItem,
  UpdateOpdEncounterPayload,
} from "../types/opd.types";

export const opdService = {
  async list(params: OpdListParams): Promise<ApiListResponse<OpdEncounter>> {
    const response = await apiClient.get<ApiListResponse<OpdEncounter>>(
      "/opd",
      { params }
    );

    return response.data;
  },

  async getById(id: string): Promise<OpdEncounter> {
    const response = await apiClient.get<OpdEncounter>(`/opd/${id}`);
    return response.data;
  },

  async create(payload: CreateOpdEncounterPayload): Promise<OpdEncounter> {
    const response = await apiClient.post<OpdEncounter>("/opd", payload);
    return response.data;
  },

  async update(
    id: string,
    payload: UpdateOpdEncounterPayload
  ): Promise<OpdEncounter> {
    const response = await apiClient.patch<OpdEncounter>(`/opd/${id}`, payload);
    return response.data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/opd/${id}`);
  },

  async updateStatus(
    id: string,
    status: OpdEncounter["status"]
  ): Promise<OpdEncounter> {
    const response = await apiClient.patch<OpdEncounter>(`/opd/${id}/status`, {
      status,
    });

    return response.data;
  },

  async getPrescriptions(id: string): Promise<OpdPrescriptionItem[]> {
    const response = await apiClient.get<OpdPrescriptionItem[]>(
      `/opd/${id}/prescriptions`
    );

    return response.data;
  },

  async getLabOrders(id: string): Promise<OpdLabOrder[]> {
    const response = await apiClient.get<OpdLabOrder[]>(
      `/opd/${id}/lab-orders`
    );

    return response.data;
  },

  async getTimeline(id: string): Promise<OpdTimelineItem[]> {
    const response = await apiClient.get<OpdTimelineItem[]>(
      `/opd/${id}/timeline`
    );

    return response.data;
  },
};