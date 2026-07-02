// src/features/billing/types/billing.types.ts

export type BillingInvoiceStatus =
  | "draft"
  | "issued"
  | "partially_paid"
  | "paid"
  | "cancelled"
  | "settled";

export type BillingPaymentMethod =
  | "cash"
  | "card"
  | "upi"
  | "bank_transfer"
  | "insurance"
  | "other";

export interface BillingInvoice {
  id: string;
  hospital_id: string;

  invoice_number: string;
  patient_id: string;
  patient_name: string;
  patient_uhid?: string | null;

  invoice_date: string;
  due_date?: string | null;

  subtotal: number;
  discount_amount: number;
  tax_amount: number;
  total_amount: number;
  paid_amount: number;
  balance_amount: number;

  status: BillingInvoiceStatus;

  notes?: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface BillingInvoiceItem {
  id: string;
  invoice_id: string;
  description: string;
  service_code?: string | null;
  quantity: number;
  unit_price: number;
  discount_amount?: number | null;
  tax_amount?: number | null;
  total_amount: number;
}

export interface BillingPayment {
  id: string;
  invoice_id: string;
  payment_date: string;
  amount: number;
  method: BillingPaymentMethod;
  reference_number?: string | null;
  notes?: string | null;
  received_by_name?: string | null;
}

export interface BillingListParams {
  page?: number;
  size?: number;
  search?: string;
  status?: BillingInvoiceStatus;
  patient_id?: string;
  invoice_date?: string;
}

export interface CreateBillingInvoicePayload {
  patient_id: string;
  invoice_date: string;
  due_date?: string;
  notes?: string;
}

export interface UpdateBillingInvoicePayload
  extends Partial<CreateBillingInvoicePayload> {
  status?: BillingInvoiceStatus;
}

export interface CreateBillingPaymentPayload {
  invoice_id: string;
  payment_date: string;
  amount: number;
  method: BillingPaymentMethod;
  reference_number?: string;
  notes?: string;
}