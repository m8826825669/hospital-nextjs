// src/features/lis/api/lis.service.ts

import { apiClient } from "@/platform/api/api-client";
import type { ApiListResponse } from "@/platform/api/api.types";
import type {
  CreateLabSamplePayload,
  LabResult,
  LabResultEntryPayload,
  LabSample,
  LabTest,
  LabTimelineItem,
  LisListParams,
  UpdateLabSamplePayload,
} from "../types/lis.types";

export const lisService = {
  async listSamples(
    params: LisListParams
  ): Promise<ApiListResponse<LabSample>> {
    const response = await apiClient.get<ApiListResponse<LabSample>>(
      "/lis/samples",
      { params }
    );
    return response.data;
  },

  async getSampleById(id: string): Promise<LabSample> {
    const response = await apiClient.get<LabSample>(`/lis/samples/${id}`);
    return response.data;
  },

  async createSample(payload: CreateLabSamplePayload): Promise<LabSample> {
    const response = await apiClient.post<LabSample>("/lis/samples", payload);
    return response.data;
  },

  async updateSample(
    id: string,
    payload: UpdateLabSamplePayload
  ): Promise<LabSample> {
    const response = await apiClient.patch<LabSample>(
      `/lis/samples/${id}`,
      payload
    );
    return response.data;
  },

  async deleteSample(id: string): Promise<void> {
    await apiClient.delete(`/lis/samples/${id}`);
  },

  async updateSampleStatus(
    id: string,
    status: LabSample["status"]
  ): Promise<LabSample> {
    const response = await apiClient.patch<LabSample>(
      `/lis/samples/${id}/status`,
      { status }
    );
    return response.data;
  },

  async enterResults(payload: LabResultEntryPayload): Promise<LabResult[]> {
    const response = await apiClient.post<LabResult[]>(
      `/lis/samples/${payload.sample_id}/results`,
      payload
    );
    return response.data;
  },

  async getResults(id: string): Promise<LabResult[]> {
    const response = await apiClient.get<LabResult[]>(
      `/lis/samples/${id}/results`
    );
    return response.data;
  },

  async getTimeline(id: string): Promise<LabTimelineItem[]> {
    const response = await apiClient.get<LabTimelineItem[]>(
      `/lis/samples/${id}/timeline`
    );
    return response.data;
  },

  async listTests(params?: { search?: string }): Promise<ApiListResponse<LabTest>> {
    const response = await apiClient.get<ApiListResponse<LabTest>>(
      "/lis/tests",
      { params }
    );
    return response.data;
  },
};