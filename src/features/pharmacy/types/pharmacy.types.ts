// src/features/pharmacy/types/pharmacy.types.ts

export type MedicineStatus = "active" | "inactive" | "discontinued";
export type StockTransactionType = "purchase" | "sale" | "return" | "adjustment" | "expiry";
export type PharmacyInvoiceStatus = "draft" | "issued" | "paid" | "partially_paid" | "cancelled";

export interface Medicine {
  id: string;
  hospital_id: string;
  name: string;
  generic_name?: string | null;
  brand_name?: string | null;
  category_id?: string | null;
  category_name?: string | null;
  dosage_form?: string | null;
  strength?: string | null;
  unit?: string | null;
  manufacturer?: string | null;
  reorder_level?: number | null;
  status: MedicineStatus;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface MedicineBatch {
  id: string;
  medicine_id: string;
  medicine_name: string;
  batch_number: string;
  expiry_date: string;
  purchase_price: number;
  selling_price: number;
  quantity_available: number;
  supplier_name?: string | null;
  created_at?: string;
}

export interface PharmacyStockTransaction {
  id: string;
  medicine_id: string;
  medicine_name: string;
  batch_id?: string | null;
  batch_number?: string | null;
  transaction_type: StockTransactionType;
  quantity: number;
  notes?: string | null;
  created_at: string;
}

export interface PharmacyInvoice {
  id: string;
  invoice_number: string;
  patient_id?: string | null;
  patient_name?: string | null;
  invoice_date: string;
  total_amount: number;
  paid_amount: number;
  balance_amount: number;
  status: PharmacyInvoiceStatus;
  created_at?: string;
}

export interface PharmacyListParams {
  page?: number;
  size?: number;
  search?: string;
  status?: MedicineStatus;
  category_id?: string;
  is_active?: boolean;
}

export interface CreateMedicinePayload {
  name: string;
  generic_name?: string;
  brand_name?: string;
  category_id?: string;
  dosage_form?: string;
  strength?: string;
  unit?: string;
  manufacturer?: string;
  reorder_level?: number;
  is_active?: boolean;
}

export interface UpdateMedicinePayload extends Partial<CreateMedicinePayload> {
  status?: MedicineStatus;
}