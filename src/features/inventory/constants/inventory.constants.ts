
export const inventoryCategoryOptions = [
  { label: "Medicine", value: "Medicine" },
  { label: "Injection", value: "Injection" },
  { label: "IV Fluid", value: "IV Fluid" },
  { label: "Consumable", value: "Consumable" },
  { label: "Laboratory", value: "Laboratory" },
  { label: "Radiology", value: "Radiology" },
  { label: "OT", value: "OT" },
  { label: "PPE", value: "PPE" },
  { label: "Housekeeping", value: "Housekeeping" },
  { label: "Biomedical", value: "Biomedical" },
];

export const inventoryUnitOptions = [
  { label: "Piece", value: "Piece" },
  { label: "Strip", value: "Strip" },
  { label: "Vial", value: "Vial" },
  { label: "Bottle", value: "Bottle" },
  { label: "Box", value: "Box" },
  { label: "Pack", value: "Pack" },
  { label: "Pair", value: "Pair" },
  { label: "Roll", value: "Roll" },
  { label: "Sheet", value: "Sheet" },
];

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