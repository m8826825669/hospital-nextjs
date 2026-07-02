// src/features/radiology/api/radiology.service.ts

import { apiClient } from "@/platform/api/api-client";
import type { ApiListResponse } from "@/platform/api/api.types";
import type {
  RadiologyAttachment,
  RadiologyListParams,
  RadiologyOrder,
  RadiologyOrderStatus,
  RadiologyTimelineItem,
} from "../types/radiology.types";
import type {
  RadiologyOrderFormValues,
  RadiologyReportFormValues,
} from "../schemas/radiology.schema";

export const radiologyService = {
  async listOrders(
    params: RadiologyListParams
  ): Promise<ApiListResponse<RadiologyOrder>> {
    const response = await apiClient.get<ApiListResponse<RadiologyOrder>>(
      "/radiology/orders",
      { params }
    );
    return response.data;
  },

  async createOrder(payload: RadiologyOrderFormValues): Promise<RadiologyOrder> {
    const response = await apiClient.post<RadiologyOrder>(
      "/radiology/orders",
      payload
    );
    return response.data;
  },

  async updateOrder(
    id: string,
    payload: RadiologyOrderFormValues
  ): Promise<RadiologyOrder> {
    const response = await apiClient.patch<RadiologyOrder>(
      `/radiology/orders/${id}`,
      payload
    );
    return response.data;
  },

  async deleteOrder(id: string): Promise<void> {
    await apiClient.delete(`/radiology/orders/${id}`);
  },

  async updateStatus(
    id: string,
    status: RadiologyOrderStatus
  ): Promise<RadiologyOrder> {
    const response = await apiClient.patch<RadiologyOrder>(
      `/radiology/orders/${id}/status`,
      { status }
    );
    return response.data;
  },

  async saveReport(
    id: string,
    payload: RadiologyReportFormValues
  ): Promise<RadiologyOrder> {
    const response = await apiClient.post<RadiologyOrder>(
      `/radiology/orders/${id}/report`,
      payload
    );
    return response.data;
  },

  async getAttachments(id: string): Promise<RadiologyAttachment[]> {
    const response = await apiClient.get<RadiologyAttachment[]>(
      `/radiology/orders/${id}/attachments`
    );
    return response.data;
  },

  async getTimeline(id: string): Promise<RadiologyTimelineItem[]> {
    const response = await apiClient.get<RadiologyTimelineItem[]>(
      `/radiology/orders/${id}/timeline`
    );
    return response.data;
  },
};