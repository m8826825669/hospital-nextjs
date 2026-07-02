// src/features/pharmacy/api/pharmacy.queries.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/platform/api/query-keys";
import { getApiErrorMessage } from "@/platform/api/api-error";
import { pharmacyService } from "./pharmacy.service";

import type {
  CreateMedicinePayload,
  PharmacyListParams,
  UpdateMedicinePayload,
} from "../types/pharmacy.types";

export function useMedicines(params: PharmacyListParams) {
  return useQuery({
    queryKey: queryKeys.pharmacy.medicines.list(params),
    queryFn: () => pharmacyService.listMedicines(params),
  });
}

export function useMedicine(id?: string) {
  return useQuery({
    queryKey: id
      ? queryKeys.pharmacy.medicines.detail(id)
      : ["pharmacy", "medicine", "empty"],
    queryFn: () => pharmacyService.getMedicineById(id!),
    enabled: Boolean(id),
  });
}

export function useCreateMedicine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateMedicinePayload) =>
      pharmacyService.createMedicine(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.pharmacy.medicines.all,
      });
      toast.success("Medicine created successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useUpdateMedicine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateMedicinePayload;
    }) => pharmacyService.updateMedicine(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.pharmacy.medicines.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.pharmacy.medicines.detail(variables.id),
      });
      toast.success("Medicine updated successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useDeleteMedicine() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => pharmacyService.deleteMedicine(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.pharmacy.medicines.all,
      });
      toast.success("Medicine deleted successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useMedicineBatches(id?: string) {
  return useQuery({
    queryKey: id
      ? queryKeys.pharmacy.medicines.batches(id)
      : ["pharmacy", "medicine", "batches", "empty"],
    queryFn: () => pharmacyService.getMedicineBatches(id!),
    enabled: Boolean(id),
  });
}

export function useMedicineTransactions(id?: string) {
  return useQuery({
    queryKey: id
      ? queryKeys.pharmacy.medicines.transactions(id)
      : ["pharmacy", "medicine", "transactions", "empty"],
    queryFn: () => pharmacyService.getMedicineTransactions(id!),
    enabled: Boolean(id),
  });
}