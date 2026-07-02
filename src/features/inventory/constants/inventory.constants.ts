// src/features/inventory/constants/inventory.constants.ts

export const vendorStatusOptions = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
];

export const purchaseOrderStatusOptions = [
  { label: "Draft", value: "draft" },
  { label: "Submitted", value: "submitted" },
  { label: "Approved", value: "approved" },
  { label: "Partially Received", value: "partially_received" },
  { label: "Received", value: "received" },
  { label: "Cancelled", value: "cancelled" },
];

export const grnStatusOptions = [
  { label: "Draft", value: "draft" },
  { label: "Posted", value: "posted" },
  { label: "Cancelled", value: "cancelled" },
];

export const stockAdjustmentTypeOptions = [
  { label: "Increase", value: "increase" },
  { label: "Decrease", value: "decrease" },
  { label: "Damage", value: "damage" },
  { label: "Expiry", value: "expiry" },
  { label: "Correction", value: "correction" },
];