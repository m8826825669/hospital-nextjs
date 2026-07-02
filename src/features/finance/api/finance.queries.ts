// src/features/finance/api/finance.queries.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/platform/api/query-keys";
import { getApiErrorMessage } from "@/platform/api/api-error";
import { financeService } from "./finance.service";
import type { FinanceListParams } from "../types/finance.types";
import type {
  AccountFormValues,
  VoucherFormValues,
} from "../schemas/finance.schema";

export function useAccounts(params: FinanceListParams) {
  return useQuery({
    queryKey: queryKeys.finance.accounts.list(params),
    queryFn: () => financeService.listAccounts(params),
  });
}

export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AccountFormValues) =>
      financeService.createAccount(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.accounts.all });
      toast.success("Account created");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useUpdateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: AccountFormValues }) =>
      financeService.updateAccount(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.accounts.all });
      toast.success("Account updated");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => financeService.deleteAccount(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.accounts.all });
      toast.success("Account deleted");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useVouchers(params: FinanceListParams) {
  return useQuery({
    queryKey: queryKeys.finance.vouchers.list(params),
    queryFn: () => financeService.listVouchers(params),
  });
}

export function useCreateVoucher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: VoucherFormValues) =>
      financeService.createVoucher(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.vouchers.all });
      toast.success("Voucher created");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function usePostVoucher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => financeService.postVoucher(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.vouchers.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.ledger.all });
      toast.success("Voucher posted");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useCancelVoucher() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => financeService.cancelVoucher(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.vouchers.all });
      toast.success("Voucher cancelled");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useLedger(params: FinanceListParams) {
  return useQuery({
    queryKey: queryKeys.finance.ledger.list(params),
    queryFn: () => financeService.listLedger(params),
  });
}