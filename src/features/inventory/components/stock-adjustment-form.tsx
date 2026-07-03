// src/features/inventory/components/stock-adjustment-form.tsx

"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  SelectField,
  TextareaField,
  TextField,
} from "@/shared/components/enterprise";
import { stockAdjustmentTypeOptions } from "../constants/inventory.constants";
import {
  stockAdjustmentFormSchema,
  type StockAdjustmentFormInput,
  type StockAdjustmentFormValues,
} from "../schemas/inventory.schema";
import type { InventoryItem, Warehouse } from "../types/inventory.types";

interface StockAdjustmentFormProps {
  items?: InventoryItem[];
  warehouses?: Warehouse[];
  isSubmitting?: boolean;
  onSubmit: (values: StockAdjustmentFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function StockAdjustmentForm({ items = [], warehouses = [], isSubmitting, onSubmit, onCancel }: StockAdjustmentFormProps) {
  const today = new Date().toISOString().slice(0, 10);

  const form = useForm<StockAdjustmentFormInput>({
    resolver: zodResolver(stockAdjustmentFormSchema),
    defaultValues: {
      item_name: "",
      warehouse_id: "",
      adjustment_date: today,
      adjustment_type: "increase",
      quantity: 1,
      reason: "",
    },
  });

  const itemName = useWatch({ control: form.control, name: "item_name" });
  const adjustmentType = useWatch({ control: form.control, name: "adjustment_type" });
  const quantity = Number(useWatch({ control: form.control, name: "quantity" }) || 0);
  const selectedItem = items.find((item) => item.name === itemName);
  const currentStock = selectedItem?.minimum_stock ?? 0;
  const newStock = ["increase", "correction"].includes(adjustmentType)
    ? currentStock + quantity
    : Math.max(currentStock - quantity, 0);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((v) => onSubmit(stockAdjustmentFormSchema.parse(v)))} className="flex h-full flex-col">
        <div className="flex-1 space-y-6 overflow-y-auto px-1 pb-6">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Stock Context</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <SelectField
                form={form}
                name="warehouse_id"
                label="Warehouse"
                placeholder="Select warehouse"
                options={warehouses.map((warehouse) => ({
                  label: `${warehouse.name}${warehouse.code ? ` (${warehouse.code})` : ""}`,
                  value: warehouse.id,
                }))}
              />
              <SelectField
                form={form}
                name="item_name"
                label="Item"
                placeholder="Select item"
                options={items.map((item) => ({
                  label: `${item.name} (${item.code})`,
                  value: item.name,
                }))}
              />
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Adjustment Details</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <TextField form={form} name="adjustment_date" label="Adjustment Date" type="date" />
              <SelectField form={form} name="adjustment_type" label="Adjustment Type" options={stockAdjustmentTypeOptions} />
              <TextField form={form} name="quantity" label="Quantity" type="number" />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h3 className="mb-4 text-sm font-semibold">Reason & Notes</h3>
              <TextareaField form={form} name="reason" label="Reason" />
            </div>
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h3 className="mb-4 text-sm font-semibold">Stock Preview</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Current Stock</span><span>{currentStock}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Adjustment</span><span>{["increase", "correction"].includes(adjustmentType) ? "+" : "-"}{quantity}</span></div>
                <div className="border-t pt-3 flex justify-between font-semibold"><span>New Stock</span><span>{newStock}</span></div>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 -mx-6 flex items-center justify-end gap-3 border-t bg-background px-6 py-4">
          {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save Adjustment"}</Button>
        </div>
      </form>
    </Form>
  );
}
