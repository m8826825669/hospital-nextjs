// src/features/inventory/types/inventory.types.ts

export type VendorStatus = "active" | "inactive";
export type PurchaseOrderStatus =
  | "draft"
  | "submitted"
  | "approved"
  | "partially_received"
  | "received"
  | "cancelled";

export type GrnStatus = "draft" | "posted" | "cancelled";
export type StockAdjustmentType = "increase" | "decrease" | "damage" | "expiry" | "correction";
export type StockTransferStatus = "draft" | "in_transit" | "received" | "cancelled";


export interface InventoryItem {
  id: string;
  hospital_id: string;
  name: string;
  code: string;
  category: string;
  unit: string;
  brand?: string | null;
  generic_name?: string | null;
  description?: string | null;
  minimum_stock: number;
  reorder_level: number;
  maximum_stock: number;
  purchase_price: number;
  selling_price: number;
  gst_percent?: number | null;
  hsn_code?: string | null;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface InventoryBulkImportResult {
  created: number;
  skipped: number;
  errors: string[];
  items: InventoryItem[];
}

export interface Vendor {
  id: string;
  hospital_id: string;
  name: string;
  code?: string | null;
  contact_person?: string | null;
  phone?: string | null;
  email?: string | null;
  address?: string | null;
  status: VendorStatus;
  is_active: boolean;
}

export interface Warehouse {
  id: string;
  hospital_id: string;
  name: string;
  code?: string | null;
  location?: string | null;
  is_active: boolean;
}

export interface PurchaseOrder {
  id: string;
  hospital_id: string;
  po_number: string;
  vendor_id: string;
  vendor_name: string;
  order_date: string;
  expected_date?: string | null;
  total_amount: number;
  status: PurchaseOrderStatus;
  remarks?: string | null;
  created_at?: string;
}

export interface Grn {
  id: string;
  hospital_id: string;
  grn_number: string;
  purchase_order_id?: string | null;
  po_number?: string | null;
  vendor_name?: string | null;
  received_date: string;
  total_amount: number;
  status: GrnStatus;
  remarks?: string | null;
}

export interface StockTransfer {
  id: string;
  hospital_id: string;
  transfer_number: string;
  from_warehouse_name: string;
  to_warehouse_name: string;
  transfer_date: string;
  status: StockTransferStatus;
  remarks?: string | null;
}

export interface StockAdjustment {
  id: string;
  hospital_id: string;
  item_name: string;
  warehouse_name?: string | null;
  adjustment_date: string;
  adjustment_type: StockAdjustmentType;
  quantity: number;
  reason?: string | null;
}

export interface InventoryListParams {
  page?: number;
  size?: number;
  search?: string;
  status?: string;
  vendor_id?: string;
  warehouse_id?: string;
  date?: string;
}