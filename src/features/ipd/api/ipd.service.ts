// src/features/ipd/api/ipd.service.ts

import { apiClient } from "@/platform/api/api-client";
import type { ApiListResponse } from "@/platform/api/api.types";
import type {
  CreateIpdAdmissionPayload,
  IpdAdmission,
  IpdBedAllocation,
  IpdDischargePayload,
  IpdListParams,
  IpdStatusHistory,
  IpdTransferPayload,
  UpdateIpdAdmissionPayload,
} from "../types/ipd.types";

export const ipdService = {
  async list(params: IpdListParams): Promise<ApiListResponse<IpdAdmission>> {
    const response = await apiClient.get<ApiListResponse<IpdAdmission>>(
      "/ipd/admissions",
      { params }
    );
    return response.data;
  },

  async getById(id: string): Promise<IpdAdmission> {
    const response = await apiClient.get<IpdAdmission>(
      `/ipd/admissions/${id}`
    );
    return response.data;
  },

  async create(payload: CreateIpdAdmissionPayload): Promise<IpdAdmission> {
    const response = await apiClient.post<IpdAdmission>(
      "/ipd/admissions",
      payload
    );
    return response.data;
  },

  async update(
    id: string,
    payload: UpdateIpdAdmissionPayload
  ): Promise<IpdAdmission> {
    const response = await apiClient.patch<IpdAdmission>(
      `/ipd/admissions/${id}`,
      payload
    );
    return response.data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/ipd/admissions/${id}`);
  },

  async transfer(
    id: string,
    payload: IpdTransferPayload
  ): Promise<IpdAdmission> {
    const response = await apiClient.post<IpdAdmission>(
      `/ipd/admissions/${id}/transfer`,
      payload
    );
    return response.data;
  },

  async discharge(
    id: string,
    payload: IpdDischargePayload
  ): Promise<IpdAdmission> {
    const response = await apiClient.post<IpdAdmission>(
      `/ipd/admissions/${id}/discharge`,
      payload
    );
    return response.data;
  },

  async getBedAllocations(id: string): Promise<IpdBedAllocation[]> {
    const response = await apiClient.get<IpdBedAllocation[]>(
      `/ipd/admissions/${id}/bed-allocations`
    );
    return response.data;
  },

  async getStatusHistory(id: string): Promise<IpdStatusHistory[]> {
    const response = await apiClient.get<IpdStatusHistory[]>(
      `/ipd/admissions/${id}/status-history`
    );
    return response.data;
  },
};