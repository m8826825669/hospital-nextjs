// src/features/billing/api/billing.queries.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/platform/api/query-keys";
import { getApiErrorMessage } from "@/platform/api/api-error";
import { billingService } from "./billing.service";
import type {
  BillingListParams,
  CreateBillingInvoicePayload,
  CreateBillingPaymentPayload,
  UpdateBillingInvoicePayload,
} from "../types/billing.types";

export function useBillingInvoices(params: BillingListParams) {
  return useQuery({
    queryKey: queryKeys.billing.invoices.list(params),
    queryFn: () => billingService.listInvoices(params),
  });
}

export function useBillingInvoice(id?: string) {
  return useQuery({
    queryKey: id
      ? queryKeys.billing.invoices.detail(id)
      : ["billing", "invoice", "empty"],
    queryFn: () => billingService.getInvoiceById(id!),
    enabled: Boolean(id),
  });
}

export function useCreateBillingInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBillingInvoicePayload) =>
      billingService.createInvoice(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.billing.invoices.all,
      });
      toast.success("Invoice created successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useUpdateBillingInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      payload,
    }: {
      id: string;
      payload: UpdateBillingInvoicePayload;
    }) => billingService.updateInvoice(id, payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.billing.invoices.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.billing.invoices.detail(variables.id),
      });
      toast.success("Invoice updated successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useDeleteBillingInvoice() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => billingService.deleteInvoice(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.billing.invoices.all,
      });
      toast.success("Invoice deleted successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useBillingInvoiceItems(id?: string) {
  return useQuery({
    queryKey: id
      ? queryKeys.billing.invoices.items(id)
      : ["billing", "invoice", "items", "empty"],
    queryFn: () => billingService.getInvoiceItems(id!),
    enabled: Boolean(id),
  });
}

export function useBillingInvoicePayments(id?: string) {
  return useQuery({
    queryKey: id
      ? queryKeys.billing.invoices.payments(id)
      : ["billing", "invoice", "payments", "empty"],
    queryFn: () => billingService.getInvoicePayments(id!),
    enabled: Boolean(id),
  });
}

export function useCreateBillingPayment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CreateBillingPaymentPayload) =>
      billingService.createPayment(payload),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.billing.invoices.all,
      });
      queryClient.invalidateQueries({
        queryKey: queryKeys.billing.invoices.payments(variables.invoice_id),
      });
      toast.success("Payment recorded successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}