// src/features/finance/constants/finance.constants.ts

export const accountTypeOptions = [
  { label: "Asset", value: "asset" },
  { label: "Liability", value: "liability" },
  { label: "Equity", value: "equity" },
  { label: "Income", value: "income" },
  { label: "Expense", value: "expense" },
];

export const voucherTypeOptions = [
  { label: "Receipt", value: "receipt" },
  { label: "Payment", value: "payment" },
  { label: "Journal", value: "journal" },
];

export const voucherStatusOptions = [
  { label: "Draft", value: "draft" },
  { label: "Posted", value: "posted" },
  { label: "Cancelled", value: "cancelled" },
];