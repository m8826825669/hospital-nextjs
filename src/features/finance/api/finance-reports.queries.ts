import { useQuery } from "@tanstack/react-query";

import { financeReportsService } from "./finance-reports.service";
import type { FinanceReportParams } from "../types/finance-reports.types";

export const financeReportKeys = {
  all: ["finance", "reports"] as const,
  ledger: (params: FinanceReportParams) => ["finance", "reports", "ledger", params] as const,
  trialBalance: (params: FinanceReportParams) => ["finance", "reports", "trial-balance", params] as const,
  dayBook: (params: FinanceReportParams) => ["finance", "reports", "day-book", params] as const,
  cashBankBook: (params: FinanceReportParams) => ["finance", "reports", "cash-bank-book", params] as const,
};

export function useLedgerReport(params: FinanceReportParams) {
  return useQuery({
    queryKey: financeReportKeys.ledger(params),
    queryFn: () => financeReportsService.getLedger(params),
  });
}

export function useTrialBalanceReport(params: FinanceReportParams) {
  return useQuery({
    queryKey: financeReportKeys.trialBalance(params),
    queryFn: () => financeReportsService.getTrialBalance(params),
  });
}

export function useDayBookReport(params: FinanceReportParams) {
  return useQuery({
    queryKey: financeReportKeys.dayBook(params),
    queryFn: () => financeReportsService.getDayBook(params),
  });
}

export function useCashBankBookReport(params: FinanceReportParams) {
  return useQuery({
    queryKey: financeReportKeys.cashBankBook(params),
    queryFn: () => financeReportsService.getCashBankBook(params),
  });
}
