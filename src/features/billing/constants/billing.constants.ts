// src/features/billing/constants/billing.constants.ts

import type {
  BillingInvoiceStatus,
  BillingPaymentMethod,
} from "../types/billing.types";

export const billingStatusOptions: {
  label: string;
  value: BillingInvoiceStatus;
}[] = [
  { label: "Draft", value: "draft" },
  { label: "Issued", value: "issued" },
  { label: "Partially Paid", value: "partially_paid" },
  { label: "Paid", value: "paid" },
  { label: "Cancelled", value: "cancelled" },
  { label: "Settled", value: "settled" },
];

export const billingPaymentMethodOptions: {
  label: string;
  value: BillingPaymentMethod;
}[] = [
  { label: "Cash", value: "cash" },
  { label: "Card", value: "card" },
  { label: "UPI", value: "upi" },
  { label: "Bank Transfer", value: "bank_transfer" },
  { label: "Insurance", value: "insurance" },
  { label: "Other", value: "other" },
];