import { apiClient } from "@/platform/api/api-client";
import type {
  CashBankBookReport,
  DayBookReport,
  FinanceReportParams,
  LedgerReport,
  TrialBalanceReport,
} from "../types/finance-reports.types";

function cleanParams(params: FinanceReportParams = {}) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== "" && value !== "all")
  );
}

export const financeReportsService = {
  async getLedger(params: FinanceReportParams): Promise<LedgerReport> {
    const response = await apiClient.get<LedgerReport>("/finance/reports/ledger", {
      params: cleanParams(params),
    });
    return response.data;
  },

  async getTrialBalance(params: FinanceReportParams): Promise<TrialBalanceReport> {
    const response = await apiClient.get<TrialBalanceReport>("/finance/reports/trial-balance", {
      params: cleanParams(params),
    });
    return response.data;
  },

  async getDayBook(params: FinanceReportParams): Promise<DayBookReport> {
    const response = await apiClient.get<DayBookReport>("/finance/reports/day-book", {
      params: cleanParams(params),
    });
    return response.data;
  },

  async getCashBankBook(params: FinanceReportParams): Promise<CashBankBookReport> {
    const response = await apiClient.get<CashBankBookReport>("/finance/reports/cash-bank-book", {
      params: cleanParams(params),
    });
    return response.data;
  },
};
