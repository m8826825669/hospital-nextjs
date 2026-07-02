// src/features/pharmacy/constants/pharmacy.constants.ts

import type {
  MedicineStatus,
  PharmacyInvoiceStatus,
  StockTransactionType,
} from "../types/pharmacy.types";

export const medicineStatusOptions: { label: string; value: MedicineStatus }[] = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
  { label: "Discontinued", value: "discontinued" },
];

export const stockTransactionTypeOptions: {
  label: string;
  value: StockTransactionType;
}[] = [
  { label: "Purchase", value: "purchase" },
  { label: "Sale", value: "sale" },
  { label: "Return", value: "return" },
  { label: "Adjustment", value: "adjustment" },
  { label: "Expiry", value: "expiry" },
];

export const pharmacyInvoiceStatusOptions: {
  label: string;
  value: PharmacyInvoiceStatus;
}[] = [
  { label: "Draft", value: "draft" },
  { label: "Issued", value: "issued" },
  { label: "Paid", value: "paid" },
  { label: "Partially Paid", value: "partially_paid" },
  { label: "Cancelled", value: "cancelled" },
];