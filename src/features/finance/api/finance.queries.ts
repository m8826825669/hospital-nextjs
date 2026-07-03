// src/features/finance/api/finance.queries.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/platform/api/query-keys";
import { getApiErrorMessage } from "@/platform/api/api-error";
import { financeService } from "./finance.service";
import type { FinanceListParams } from "../types/finance.types";
import type {
  AccountFormValues,
  CostCenterFormValues,
  JournalEntryFormValues,
} from "../schemas/finance.schema";

export function useFinanceDashboard() {
  return useQuery({
    queryKey: queryKeys.finance.dashboard,
    queryFn: () => financeService.getDashboard(),
  });
}

export function useAccounts(params: FinanceListParams) {
  return useQuery({
    queryKey: queryKeys.finance.accounts.list(params),
    queryFn: () => financeService.listAccounts(params),
  });
}

export function useCreateAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AccountFormValues) => financeService.createAccount(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.accounts.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.dashboard });
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
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.dashboard });
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
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.dashboard });
      toast.success("Account deleted");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useCostCenters(params: FinanceListParams) {
  return useQuery({
    queryKey: queryKeys.finance.costCenters.list(params),
    queryFn: () => financeService.listCostCenters(params),
  });
}

export function useCreateCostCenter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: CostCenterFormValues) => financeService.createCostCenter(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.costCenters.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.dashboard });
      toast.success("Cost center created");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useUpdateCostCenter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: CostCenterFormValues }) =>
      financeService.updateCostCenter(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.costCenters.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.dashboard });
      toast.success("Cost center updated");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useDeleteCostCenter() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => financeService.deleteCostCenter(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.costCenters.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.dashboard });
      toast.success("Cost center deleted");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useJournalEntries(params: FinanceListParams) {
  return useQuery({
    queryKey: queryKeys.finance.journalEntries.list(params),
    queryFn: () => financeService.listJournalEntries(params),
  });
}

export function useCreateJournalEntry() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: JournalEntryFormValues) => financeService.createJournalEntry(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.journalEntries.all });
      queryClient.invalidateQueries({ queryKey: queryKeys.finance.dashboard });
      toast.success("Journal entry created");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}
