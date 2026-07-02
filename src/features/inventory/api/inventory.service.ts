// src/features/inventory/api/inventory.service.ts

import { apiClient } from "@/platform/api/api-client";
import type { ApiListResponse } from "@/platform/api/api.types";
import type {
  Grn,
  InventoryListParams,
  PurchaseOrder,
  StockAdjustment,
  Vendor,
  Warehouse,
} from "../types/inventory.types";
import type {
  GrnFormValues,
  PurchaseOrderFormValues,
  StockAdjustmentFormValues,
  VendorFormValues,
  WarehouseFormValues,
} from "../schemas/inventory.schema";

export const inventoryService = {
  async listVendors(params: InventoryListParams): Promise<ApiListResponse<Vendor>> {
    const response = await apiClient.get<ApiListResponse<Vendor>>(
      "/inventory/vendors",
      { params }
    );
    return response.data;
  },

  async createVendor(payload: VendorFormValues): Promise<Vendor> {
    const response = await apiClient.post<Vendor>("/inventory/vendors", payload);
    return response.data;
  },

  async updateVendor(id: string, payload: VendorFormValues): Promise<Vendor> {
    const response = await apiClient.patch<Vendor>(
      `/inventory/vendors/${id}`,
      payload
    );
    return response.data;
  },

  async deleteVendor(id: string): Promise<void> {
    await apiClient.delete(`/inventory/vendors/${id}`);
  },

  async listWarehouses(
    params: InventoryListParams
  ): Promise<ApiListResponse<Warehouse>> {
    const response = await apiClient.get<ApiListResponse<Warehouse>>(
      "/inventory/warehouses",
      { params }
    );
    return response.data;
  },

  async createWarehouse(payload: WarehouseFormValues): Promise<Warehouse> {
    const response = await apiClient.post<Warehouse>(
      "/inventory/warehouses",
      payload
    );
    return response.data;
  },

  async updateWarehouse(
    id: string,
    payload: WarehouseFormValues
  ): Promise<Warehouse> {
    const response = await apiClient.patch<Warehouse>(
      `/inventory/warehouses/${id}`,
      payload
    );
    return response.data;
  },

  async deleteWarehouse(id: string): Promise<void> {
    await apiClient.delete(`/inventory/warehouses/${id}`);
  },

  async listPurchaseOrders(
    params: InventoryListParams
  ): Promise<ApiListResponse<PurchaseOrder>> {
    const response = await apiClient.get<ApiListResponse<PurchaseOrder>>(
      "/inventory/purchase-orders",
      { params }
    );
    return response.data;
  },

  async createPurchaseOrder(
    payload: PurchaseOrderFormValues
  ): Promise<PurchaseOrder> {
    const response = await apiClient.post<PurchaseOrder>(
      "/inventory/purchase-orders",
      payload
    );
    return response.data;
  },

  async listGrns(params: InventoryListParams): Promise<ApiListResponse<Grn>> {
    const response = await apiClient.get<ApiListResponse<Grn>>(
      "/inventory/grns",
      { params }
    );
    return response.data;
  },

  async createGrn(payload: GrnFormValues): Promise<Grn> {
    const response = await apiClient.post<Grn>("/inventory/grns", payload);
    return response.data;
  },

  async listAdjustments(
    params: InventoryListParams
  ): Promise<ApiListResponse<StockAdjustment>> {
    const response = await apiClient.get<ApiListResponse<StockAdjustment>>(
      "/inventory/stock-adjustments",
      { params }
    );
    return response.data;
  },

  async createAdjustment(
    payload: StockAdjustmentFormValues
  ): Promise<StockAdjustment> {
    const response = await apiClient.post<StockAdjustment>(
      "/inventory/stock-adjustments",
      payload
    );
    return response.data;
  },
};