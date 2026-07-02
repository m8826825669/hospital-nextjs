// src/features/insurance/api/insurance.service.ts

import { apiClient } from "@/platform/api/api-client";
import type { ApiListResponse } from "@/platform/api/api.types";
import type {
  CreateInsuranceClaimPayload,
  InsuranceClaim,
  InsuranceListParams,
  InsuranceSettlement,
  InsuranceTimelineItem,
  ReviewInsuranceClaimPayload,
  SettleInsuranceClaimPayload,
  UpdateInsuranceClaimPayload,
} from "../types/insurance.types";

export const insuranceService = {
  async listClaims(
    params: InsuranceListParams
  ): Promise<ApiListResponse<InsuranceClaim>> {
    const response = await apiClient.get<ApiListResponse<InsuranceClaim>>(
      "/insurance/claims",
      { params }
    );
    return response.data;
  },

  async getClaimById(id: string): Promise<InsuranceClaim> {
    const response = await apiClient.get<InsuranceClaim>(
      `/insurance/claims/${id}`
    );
    return response.data;
  },

  async createClaim(
    payload: CreateInsuranceClaimPayload
  ): Promise<InsuranceClaim> {
    const response = await apiClient.post<InsuranceClaim>(
      "/insurance/claims",
      payload
    );
    return response.data;
  },

  async updateClaim(
    id: string,
    payload: UpdateInsuranceClaimPayload
  ): Promise<InsuranceClaim> {
    const response = await apiClient.patch<InsuranceClaim>(
      `/insurance/claims/${id}`,
      payload
    );
    return response.data;
  },

  async deleteClaim(id: string): Promise<void> {
    await apiClient.delete(`/insurance/claims/${id}`);
  },

  async reviewClaim(
    id: string,
    payload: ReviewInsuranceClaimPayload
  ): Promise<InsuranceClaim> {
    const response = await apiClient.post<InsuranceClaim>(
      `/insurance/claims/${id}/review`,
      payload
    );
    return response.data;
  },

  async settleClaim(
    id: string,
    payload: SettleInsuranceClaimPayload
  ): Promise<InsuranceClaim> {
    const response = await apiClient.post<InsuranceClaim>(
      `/insurance/claims/${id}/settle`,
      payload
    );
    return response.data;
  },

  async getSettlements(id: string): Promise<InsuranceSettlement[]> {
    const response = await apiClient.get<InsuranceSettlement[]>(
      `/insurance/claims/${id}/settlements`
    );
    return response.data;
  },

  async getTimeline(id: string): Promise<InsuranceTimelineItem[]> {
    const response = await apiClient.get<InsuranceTimelineItem[]>(
      `/insurance/claims/${id}/timeline`
    );
    return response.data;
  },
};