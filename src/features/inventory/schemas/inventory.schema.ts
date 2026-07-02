// src/features/inventory/schemas/inventory.schema.ts

import { z } from "zod";

export const vendorFormSchema = z.object({
  name: z.string().min(2, "Vendor name is required"),
  code: z.string().optional(),
  contact_person: z.string().optional(),
  phone: z.string().optional(),
  email: z.string().optional(),
  address: z.string().optional(),
  status: z.enum(["active", "inactive"]),
  is_active: z.boolean().default(true),
});

export const warehouseFormSchema = z.object({
  name: z.string().min(2, "Warehouse name is required"),
  code: z.string().optional(),
  location: z.string().optional(),
  is_active: z.boolean().default(true),
});

export const purchaseOrderFormSchema = z.object({
  vendor_id: z.string().min(1, "Vendor is required"),
  order_date: z.string().min(1, "Order date is required"),
  expected_date: z.string().optional(),
  total_amount: z.coerce.number().min(0),
  remarks: z.string().optional(),
});

export const grnFormSchema = z.object({
  purchase_order_id: z.string().optional(),
  received_date: z.string().min(1, "Received date is required"),
  total_amount: z.coerce.number().min(0),
  remarks: z.string().optional(),
});

export const stockAdjustmentFormSchema = z.object({
  item_name: z.string().min(1, "Item is required"),
  warehouse_id: z.string().optional(),
  adjustment_date: z.string().min(1, "Date is required"),
  adjustment_type: z.enum(["increase", "decrease", "damage", "expiry", "correction"]),
  quantity: z.coerce.number().min(1),
  reason: z.string().optional(),
});

export type VendorFormInput = z.input<typeof vendorFormSchema>;
export type VendorFormValues = z.output<typeof vendorFormSchema>;

export type WarehouseFormInput = z.input<typeof warehouseFormSchema>;
export type WarehouseFormValues = z.output<typeof warehouseFormSchema>;

export type PurchaseOrderFormInput = z.input<typeof purchaseOrderFormSchema>;
export type PurchaseOrderFormValues = z.output<typeof purchaseOrderFormSchema>;

export type GrnFormInput = z.input<typeof grnFormSchema>;
export type GrnFormValues = z.output<typeof grnFormSchema>;

export type StockAdjustmentFormInput = z.input<typeof stockAdjustmentFormSchema>;
export type StockAdjustmentFormValues = z.output<typeof stockAdjustmentFormSchema>;