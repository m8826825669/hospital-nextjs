// src/features/finance/api/finance.service.ts

import { apiClient } from "@/platform/api/api-client";
import type { ApiListResponse } from "@/platform/api/api.types";
import type {
  Account,
  FinanceListParams,
  LedgerEntry,
  Voucher,
} from "../types/finance.types";
import type {
  AccountFormValues,
  VoucherFormValues,
} from "../schemas/finance.schema";

export const financeService = {
  async listAccounts(
    params: FinanceListParams
  ): Promise<ApiListResponse<Account>> {
    const response = await apiClient.get<ApiListResponse<Account>>(
      "/finance/accounts",
      { params }
    );
    return response.data;
  },

  async createAccount(payload: AccountFormValues): Promise<Account> {
    const response = await apiClient.post<Account>("/finance/accounts", payload);
    return response.data;
  },

  async updateAccount(id: string, payload: AccountFormValues): Promise<Account> {
    const response = await apiClient.patch<Account>(
      `/finance/accounts/${id}`,
      payload
    );
    return response.data;
  },

  async deleteAccount(id: string): Promise<void> {
    await apiClient.delete(`/finance/accounts/${id}`);
  },

  async listVouchers(
    params: FinanceListParams
  ): Promise<ApiListResponse<Voucher>> {
    const response = await apiClient.get<ApiListResponse<Voucher>>(
      "/finance/vouchers",
      { params }
    );
    return response.data;
  },

  async createVoucher(payload: VoucherFormValues): Promise<Voucher> {
    const response = await apiClient.post<Voucher>(
      "/finance/vouchers",
      payload
    );
    return response.data;
  },

  async postVoucher(id: string): Promise<Voucher> {
    const response = await apiClient.patch<Voucher>(
      `/finance/vouchers/${id}/post`
    );
    return response.data;
  },

  async cancelVoucher(id: string): Promise<Voucher> {
    const response = await apiClient.patch<Voucher>(
      `/finance/vouchers/${id}/cancel`
    );
    return response.data;
  },

  async listLedger(
    params: FinanceListParams
  ): Promise<ApiListResponse<LedgerEntry>> {
    const response = await apiClient.get<ApiListResponse<LedgerEntry>>(
      "/finance/ledger",
      { params }
    );
    return response.data;
  },
};