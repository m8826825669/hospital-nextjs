// src/features/billing/api/billing.service.ts

import { apiClient } from "@/platform/api/api-client";
import type { ApiListResponse } from "@/platform/api/api.types";
import type {
  BillingInvoice,
  BillingInvoiceItem,
  BillingListParams,
  BillingPayment,
  CreateBillingInvoicePayload,
  CreateBillingPaymentPayload,
  UpdateBillingInvoicePayload,
} from "../types/billing.types";

export const billingService = {
  async listInvoices(
    params: BillingListParams
  ): Promise<ApiListResponse<BillingInvoice>> {
    const response = await apiClient.get<ApiListResponse<BillingInvoice>>(
      "/billing/invoices",
      { params }
    );
    return response.data;
  },

  async getInvoiceById(id: string): Promise<BillingInvoice> {
    const response = await apiClient.get<BillingInvoice>(
      `/billing/invoices/${id}`
    );
    return response.data;
  },

  async createInvoice(
    payload: CreateBillingInvoicePayload
  ): Promise<BillingInvoice> {
    const response = await apiClient.post<BillingInvoice>(
      "/billing/invoices",
      payload
    );
    return response.data;
  },

  async updateInvoice(
    id: string,
    payload: UpdateBillingInvoicePayload
  ): Promise<BillingInvoice> {
    const response = await apiClient.patch<BillingInvoice>(
      `/billing/invoices/${id}`,
      payload
    );
    return response.data;
  },

  async deleteInvoice(id: string): Promise<void> {
    await apiClient.delete(`/billing/invoices/${id}`);
  },

  async getInvoiceItems(id: string): Promise<BillingInvoiceItem[]> {
    const response = await apiClient.get<BillingInvoiceItem[]>(
      `/billing/invoices/${id}/items`
    );
    return response.data;
  },

  async getInvoicePayments(id: string): Promise<BillingPayment[]> {
    const response = await apiClient.get<BillingPayment[]>(
      `/billing/invoices/${id}/payments`
    );
    return response.data;
  },

  async createPayment(
    payload: CreateBillingPaymentPayload
  ): Promise<BillingPayment> {
    const response = await apiClient.post<BillingPayment>(
      `/billing/invoices/${payload.invoice_id}/payments`,
      payload
    );
    return response.data;
  },
};