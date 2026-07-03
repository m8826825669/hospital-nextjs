export interface FinanceReportParams {
  account_id?: string;
  from_date?: string;
  to_date?: string;
  as_of_date?: string;
}

export interface LedgerLine {
  entry_id: string;
  entry_number: string;
  entry_date: string;
  reference?: string | null;
  description?: string | null;
  account_id: string;
  account_code: string;
  account_name: string;
  debit: number;
  credit: number;
  running_balance: number;
}

export interface LedgerReport {
  account_id?: string | null;
  account_code?: string | null;
  account_name?: string | null;
  from_date?: string | null;
  to_date?: string | null;
  opening_balance: number;
  total_debit: number;
  total_credit: number;
  closing_balance: number;
  lines: LedgerLine[];
}

export interface TrialBalanceLine {
  account_id: string;
  account_code: string;
  account_name: string;
  account_type: string;
  debit: number;
  credit: number;
  balance: number;
}

export interface TrialBalanceReport {
  as_of_date?: string | null;
  total_debit: number;
  total_credit: number;
  balance_difference: number;
  lines: TrialBalanceLine[];
}

export interface DayBookEntry {
  entry_id: string;
  entry_number: string;
  entry_date: string;
  reference?: string | null;
  description?: string | null;
  status: string;
  total_debit: number;
  total_credit: number;
}

export interface DayBookReport {
  from_date?: string | null;
  to_date?: string | null;
  total_debit: number;
  total_credit: number;
  entries: DayBookEntry[];
}

export interface CashBankBookAccount {
  account_id: string;
  account_code: string;
  account_name: string;
  account_type: string;
  total_debit: number;
  total_credit: number;
  balance: number;
}

export interface CashBankBookReport {
  from_date?: string | null;
  to_date?: string | null;
  total_debit: number;
  total_credit: number;
  balance: number;
  accounts: CashBankBookAccount[];
}
