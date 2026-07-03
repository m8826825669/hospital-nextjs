// src/features/inventory/components/grn-form.tsx

"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { CurrencyField, SelectField, TextareaField, TextField } from "@/shared/components/enterprise";
import {
  grnFormSchema,
  type GrnFormInput,
  type GrnFormValues,
} from "../schemas/inventory.schema";
import type { PurchaseOrder } from "../types/inventory.types";

interface GrnFormProps {
  purchaseOrders?: PurchaseOrder[];
  isSubmitting?: boolean;
  onSubmit: (values: GrnFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(value ?? 0);
}

export function GrnForm({ purchaseOrders = [], isSubmitting, onSubmit, onCancel }: GrnFormProps) {
  const today = new Date().toISOString().slice(0, 10);

  const form = useForm<GrnFormInput>({
    resolver: zodResolver(grnFormSchema),
    defaultValues: {
      purchase_order_id: "",
      received_date: today,
      total_amount: 0,
      remarks: "",
    },
  });

  const purchaseOrderId = useWatch({ control: form.control, name: "purchase_order_id" });
  const selectedPo = purchaseOrders.find((po) => po.id === purchaseOrderId);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((v) => onSubmit(grnFormSchema.parse(v)))} className="flex h-full flex-col">
        <div className="flex-1 space-y-6 overflow-y-auto px-1 pb-6">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Purchase Order Reference</h3>
            <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
              <SelectField
                form={form}
                name="purchase_order_id"
                label="Purchase Order"
                placeholder="Select purchase order"
                options={purchaseOrders.map((po) => ({
                  label: `${po.po_number} - ${po.vendor_name ?? "Vendor"}`,
                  value: po.id,
                }))}
              />
              <div className="rounded-lg border bg-muted/30 p-4 text-sm">
                <p className="font-medium">{selectedPo?.po_number ?? "No PO selected"}</p>
                <div className="mt-2 grid gap-1 text-xs text-muted-foreground">
                  <span>Vendor: {selectedPo?.vendor_name || "-"}</span>
                  <span>Status: {selectedPo?.status || "-"}</span>
                  <span>Total: {selectedPo ? formatCurrency(selectedPo.total_amount) : "-"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Receipt Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <TextField form={form} name="received_date" label="Received Date" type="date" />
              <CurrencyField form={form} name="total_amount" label="Received Value" />
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Received Items</h3>
            <div className="rounded-lg border bg-muted/30 p-6 text-center text-sm text-muted-foreground">
              Item-level receiving will activate after backend GRN line items are added.
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Remarks</h3>
            <TextareaField form={form} name="remarks" label="Receiving Notes" />
          </div>
        </div>

        <div className="sticky bottom-0 -mx-6 flex items-center justify-end gap-3 border-t bg-background px-6 py-4">
          {onCancel && <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>}
          <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save GRN"}</Button>
        </div>
      </form>
    </Form>
  );
}
