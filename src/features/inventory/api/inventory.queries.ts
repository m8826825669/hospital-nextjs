// src/features/inventory/api/inventory.queries.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/platform/api/query-keys";
import { getApiErrorMessage } from "@/platform/api/api-error";
import { inventoryService } from "./inventory.service";

import type { InventoryListParams } from "../types/inventory.types";
import type {
  GrnFormValues,
  PurchaseOrderFormValues,
  StockAdjustmentFormValues,
  VendorFormValues,
  WarehouseFormValues,
} from "../schemas/inventory.schema";

export function useVendors(params: InventoryListParams) {
  return useQuery({
    queryKey: queryKeys.inventory.vendors.list(params),
    queryFn: () => inventoryService.listVendors(params),
  });
}

export function useCreateVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: VendorFormValues) => inventoryService.createVendor(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.inventory.vendors.all });
      toast.success("Vendor created");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useUpdateVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: VendorFormValues }) =>
      inventoryService.updateVendor(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.inventory.vendors.all });
      toast.success("Vendor updated");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useDeleteVendor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => inventoryService.deleteVendor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.inventory.vendors.all });
      toast.success("Vendor deleted");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useWarehouses(params: InventoryListParams) {
  return useQuery({
    queryKey: queryKeys.inventory.warehouses.list(params),
    queryFn: () => inventoryService.listWarehouses(params),
  });
}

export function useCreateWarehouse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: WarehouseFormValues) =>
      inventoryService.createWarehouse(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.inventory.warehouses.all,
      });
      toast.success("Warehouse created");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useUpdateWarehouse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: WarehouseFormValues }) =>
      inventoryService.updateWarehouse(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.inventory.warehouses.all,
      });
      toast.success("Warehouse updated");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useDeleteWarehouse() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => inventoryService.deleteWarehouse(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.inventory.warehouses.all,
      });
      toast.success("Warehouse deleted");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function usePurchaseOrders(params: InventoryListParams) {
  return useQuery({
    queryKey: queryKeys.inventory.purchaseOrders.list(params),
    queryFn: () => inventoryService.listPurchaseOrders(params),
  });
}

export function useCreatePurchaseOrder() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PurchaseOrderFormValues) =>
      inventoryService.createPurchaseOrder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.inventory.purchaseOrders.all,
      });
      toast.success("Purchase order created");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useGrns(params: InventoryListParams) {
  return useQuery({
    queryKey: queryKeys.inventory.grns.list(params),
    queryFn: () => inventoryService.listGrns(params),
  });
}

export function useCreateGrn() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: GrnFormValues) => inventoryService.createGrn(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.inventory.grns.all });
      toast.success("GRN created");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useStockAdjustments(params: InventoryListParams) {
  return useQuery({
    queryKey: queryKeys.inventory.adjustments.list(params),
    queryFn: () => inventoryService.listAdjustments(params),
  });
}

export function useCreateStockAdjustment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: StockAdjustmentFormValues) =>
      inventoryService.createAdjustment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.inventory.adjustments.all,
      });
      toast.success("Stock adjustment created");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}