// src/features/inventory/components/item-form.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import {
  CheckboxField,
  SelectField,
  TextareaField,
  TextField,
} from "@/shared/components/enterprise";
import { Button } from "@/components/ui/button";
import {
  inventoryCategoryOptions,
  inventoryUnitOptions,
} from "../constants/inventory.constants";
import {
  inventoryItemFormSchema,
  type InventoryItemFormInput,
  type InventoryItemFormValues,
} from "../schemas/inventory.schema";

interface ItemFormProps {
  defaultValues?: Partial<InventoryItemFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: InventoryItemFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function ItemForm({ defaultValues, isSubmitting, onSubmit, onCancel }: ItemFormProps) {
  const form = useForm<InventoryItemFormInput>({
    resolver: zodResolver(inventoryItemFormSchema),
    defaultValues: {
      name: "",
      code: "",
      category: "Medicine",
      unit: "Piece",
      brand: "",
      generic_name: "",
      description: "",
      minimum_stock: 0,
      reorder_level: 0,
      maximum_stock: 0,
      purchase_price: 0,
      selling_price: 0,
      gst_percent: 0,
      hsn_code: "",
      is_active: true,
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((value) => onSubmit(inventoryItemFormSchema.parse(value)))}
        className="flex h-full flex-col"
      >
        <div className="flex-1 space-y-6 overflow-y-auto px-1 pb-6">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Item Master</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <TextField form={form} name="name" label="Item Name" />
              <TextField form={form} name="code" label="Item Code" />
              <SelectField form={form} name="category" label="Category" options={inventoryCategoryOptions} />
              <SelectField form={form} name="unit" label="Unit of Measure" options={inventoryUnitOptions} />
              <TextField form={form} name="brand" label="Brand" />
              <TextField form={form} name="generic_name" label="Generic Name" />
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Stock Rules</h3>
            <div className="grid gap-4 md:grid-cols-3">
              <TextField form={form} name="minimum_stock" label="Minimum Stock" type="number" />
              <TextField form={form} name="reorder_level" label="Reorder Level" type="number" />
              <TextField form={form} name="maximum_stock" label="Maximum Stock" type="number" />
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Pricing & Tax</h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <TextField form={form} name="purchase_price" label="Purchase Price" type="number" />
              <TextField form={form} name="selling_price" label="Selling Price" type="number" />
              <TextField form={form} name="gst_percent" label="GST %" type="number" />
              <TextField form={form} name="hsn_code" label="HSN Code" />
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Description & Status</h3>
            <div className="space-y-4">
              <TextareaField form={form} name="description" label="Description" />
              <CheckboxField form={form} name="is_active" label="Item is active" />
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 -mx-6 flex items-center justify-end gap-3 border-t bg-background px-6 py-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Item"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
