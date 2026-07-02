// src/features/pharmacy/api/pharmacy.service.ts

import { apiClient } from "@/platform/api/api-client";
import type { ApiListResponse } from "@/platform/api/api.types";
import type {
  CreateMedicinePayload,
  Medicine,
  MedicineBatch,
  PharmacyInvoice,
  PharmacyListParams,
  PharmacyStockTransaction,
  UpdateMedicinePayload,
} from "../types/pharmacy.types";

export const pharmacyService = {
  async listMedicines(
    params: PharmacyListParams
  ): Promise<ApiListResponse<Medicine>> {
    const response = await apiClient.get<ApiListResponse<Medicine>>(
      "/pharmacy/medicines",
      { params }
    );

    return response.data;
  },

  async getMedicineById(id: string): Promise<Medicine> {
    const response = await apiClient.get<Medicine>(
      `/pharmacy/medicines/${id}`
    );
    return response.data;
  },

  async createMedicine(payload: CreateMedicinePayload): Promise<Medicine> {
    const response = await apiClient.post<Medicine>(
      "/pharmacy/medicines",
      payload
    );
    return response.data;
  },

  async updateMedicine(
    id: string,
    payload: UpdateMedicinePayload
  ): Promise<Medicine> {
    const response = await apiClient.patch<Medicine>(
      `/pharmacy/medicines/${id}`,
      payload
    );
    return response.data;
  },

  async deleteMedicine(id: string): Promise<void> {
    await apiClient.delete(`/pharmacy/medicines/${id}`);
  },

  async getMedicineBatches(id: string): Promise<MedicineBatch[]> {
    const response = await apiClient.get<MedicineBatch[]>(
      `/pharmacy/medicines/${id}/batches`
    );
    return response.data;
  },

  async getMedicineTransactions(
    id: string
  ): Promise<PharmacyStockTransaction[]> {
    const response = await apiClient.get<PharmacyStockTransaction[]>(
      `/pharmacy/medicines/${id}/transactions`
    );
    return response.data;
  },

  async listInvoices(
    params: PharmacyListParams
  ): Promise<ApiListResponse<PharmacyInvoice>> {
    const response = await apiClient.get<ApiListResponse<PharmacyInvoice>>(
      "/pharmacy/invoices",
      { params }
    );
    return response.data;
  },
};