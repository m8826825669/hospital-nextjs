// src/features/finance/types/finance.types.ts

export type AccountType = "asset" | "liability" | "equity" | "income" | "expense";
export type JournalStatus = "draft" | "posted" | "cancelled";

export interface FinanceListParams {
  page?: number;
  size?: number;
  page_size?: number;
  search?: string;
  account_type?: AccountType | "all";
  status?: JournalStatus | "all";
}

export interface FinanceDashboard {
  total_accounts: number;
  active_cost_centers: number;
  journal_entries: number;
  total_debit: number;
  total_credit: number;
  balance_difference: number;
}

export interface FinanceAccount {
  id: string;
  hospital_id: string;
  code: string;
  name: string;
  account_type: AccountType;
  parent_id?: string | null;
  description?: string | null;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface CostCenter {
  id: string;
  hospital_id: string;
  code: string;
  name: string;
  department_id?: string | null;
  description?: string | null;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface JournalEntryLine {
  id?: string;
  hospital_id?: string;
  journal_entry_id?: string;
  account_id: string;
  cost_center_id?: string | null;
  description?: string | null;
  debit: number;
  credit: number;
  created_at?: string;
  updated_at?: string;
}

export interface JournalEntry {
  id: string;
  hospital_id: string;
  entry_number: string;
  entry_date: string;
  reference?: string | null;
  description?: string | null;
  status: JournalStatus;
  total_debit: number;
  total_credit: number;
  created_by: string;
  created_at?: string;
  updated_at?: string;
  lines: JournalEntryLine[];
}
