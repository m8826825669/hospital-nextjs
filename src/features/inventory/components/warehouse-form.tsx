// src/features/inventory/components/warehouse-form.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CheckboxField, TextField } from "@/shared/components/enterprise";
import {
  warehouseFormSchema,
  type WarehouseFormInput,
  type WarehouseFormValues,
} from "../schemas/inventory.schema";

interface WarehouseFormProps {
  defaultValues?: Partial<WarehouseFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: WarehouseFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function WarehouseForm({ defaultValues, isSubmitting, onSubmit, onCancel }: WarehouseFormProps) {
  const form = useForm<WarehouseFormInput>({
    resolver: zodResolver(warehouseFormSchema),
    defaultValues: {
      name: "",
      code: "",
      location: "",
      is_active: true,
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((v) => onSubmit(warehouseFormSchema.parse(v)))} className="flex h-full flex-col">
        <div className="flex-1 space-y-6 overflow-y-auto px-1 pb-6">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Warehouse Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <TextField form={form} name="name" label="Warehouse Name" />
              <TextField form={form} name="code" label="Code" />
              <div className="md:col-span-2">
                <TextField form={form} name="location" label="Location" />
              </div>
              <div className="md:col-span-2 rounded-lg border bg-muted/30 p-4">
                <CheckboxField form={form} name="is_active" label="Warehouse is active" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Inventory Statistics</h3>
            <div className="grid gap-3 md:grid-cols-3">
              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="text-xs text-muted-foreground">Current Items</p>
                <p className="mt-1 text-xl font-semibold">0</p>
              </div>
              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="text-xs text-muted-foreground">Current Value</p>
                <p className="mt-1 text-xl font-semibold">₹0</p>
              </div>
              <div className="rounded-lg border bg-muted/30 p-4">
                <p className="text-xs text-muted-foreground">Pending GRN</p>
                <p className="mt-1 text-xl font-semibold">0</p>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 -mx-6 flex items-center justify-end gap-3 border-t bg-background px-6 py-4">
          {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save Warehouse"}</Button>
        </div>
      </form>
    </Form>
  );
}
