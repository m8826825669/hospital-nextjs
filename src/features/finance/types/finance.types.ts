// src/features/finance/types/finance.types.ts

export type AccountType = "asset" | "liability" | "equity" | "income" | "expense";
export type VoucherType = "receipt" | "payment" | "journal";
export type VoucherStatus = "draft" | "posted" | "cancelled";

export interface Account {
  id: string;
  hospital_id: string;
  code: string;
  name: string;
  type: AccountType;
  parent_id?: string | null;
  parent_name?: string | null;
  is_active: boolean;
}

export interface Voucher {
  id: string;
  hospital_id: string;
  voucher_number: string;
  voucher_type: VoucherType;
  voucher_date: string;
  account_id: string;
  account_name: string;
  amount: number;
  narration?: string | null;
  reference_number?: string | null;
  status: VoucherStatus;
  created_at?: string;
}

export interface LedgerEntry {
  id: string;
  account_id: string;
  account_name: string;
  voucher_number: string;
  voucher_date: string;
  description?: string | null;
  debit: number;
  credit: number;
  balance: number;
}

export interface FinanceListParams {
  page?: number;
  size?: number;
  search?: string;
  account_type?: AccountType;
  voucher_type?: VoucherType;
  status?: VoucherStatus;
  date?: string;
  account_id?: string;
}