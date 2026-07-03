// src/features/finance/api/finance.service.ts

import { apiClient } from "@/platform/api/api-client";
import type { ApiListResponse } from "@/platform/api/api.types";
import type {
  CostCenter,
  FinanceAccount,
  FinanceDashboard,
  FinanceListParams,
  JournalEntry,
} from "../types/finance.types";
import type {
  AccountFormValues,
  CostCenterFormValues,
  JournalEntryFormValues,
} from "../schemas/finance.schema";

function normalizeParams(params: FinanceListParams = {}) {
  const { size, page_size, account_type, status, ...rest } = params;

  return {
    ...rest,
    page_size: page_size ?? size ?? 20,
    account_type: account_type === "all" ? undefined : account_type,
    status: status === "all" ? undefined : status,
  };
}

export const financeService = {
  async getDashboard(): Promise<FinanceDashboard> {
    const response = await apiClient.get<FinanceDashboard>("/finance/dashboard");
    return response.data;
  },

  async listAccounts(params: FinanceListParams): Promise<ApiListResponse<FinanceAccount>> {
    const response = await apiClient.get<ApiListResponse<FinanceAccount>>("/finance/accounts", {
      params: normalizeParams(params),
    });
    return response.data;
  },

  async createAccount(payload: AccountFormValues): Promise<FinanceAccount> {
    const response = await apiClient.post<FinanceAccount>("/finance/accounts", payload);
    return response.data;
  },

  async updateAccount(id: string, payload: AccountFormValues): Promise<FinanceAccount> {
    const response = await apiClient.put<FinanceAccount>(`/finance/accounts/${id}`, payload);
    return response.data;
  },

  async deleteAccount(id: string): Promise<void> {
    await apiClient.delete(`/finance/accounts/${id}`);
  },

  async listCostCenters(params: FinanceListParams): Promise<ApiListResponse<CostCenter>> {
    const response = await apiClient.get<ApiListResponse<CostCenter>>("/finance/cost-centers", {
      params: normalizeParams(params),
    });
    return response.data;
  },

  async createCostCenter(payload: CostCenterFormValues): Promise<CostCenter> {
    const response = await apiClient.post<CostCenter>("/finance/cost-centers", payload);
    return response.data;
  },

  async updateCostCenter(id: string, payload: CostCenterFormValues): Promise<CostCenter> {
    const response = await apiClient.put<CostCenter>(`/finance/cost-centers/${id}`, payload);
    return response.data;
  },

  async deleteCostCenter(id: string): Promise<void> {
    await apiClient.delete(`/finance/cost-centers/${id}`);
  },

  async listJournalEntries(params: FinanceListParams): Promise<ApiListResponse<JournalEntry>> {
    const response = await apiClient.get<ApiListResponse<JournalEntry>>("/finance/journal-entries", {
      params: normalizeParams(params),
    });
    return response.data;
  },

  async createJournalEntry(payload: JournalEntryFormValues): Promise<JournalEntry> {
    const response = await apiClient.post<JournalEntry>("/finance/journal-entries", payload);
    return response.data;
  },
};
