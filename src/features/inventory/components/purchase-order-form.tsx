// src/features/inventory/components/purchase-order-form.tsx

"use client";

import { useMemo, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  SelectField,
  TextareaField,
  TextField,
} from "@/shared/components/enterprise";
import {
  purchaseOrderFormSchema,
  type PurchaseOrderFormInput,
  type PurchaseOrderFormValues,
} from "../schemas/inventory.schema";
import type { Vendor, Warehouse } from "../types/inventory.types";

type PurchaseOrderLine = {
  id: string;
  item_name: string;
  unit: string;
  quantity: number;
  unit_price: number;
  gst_percent: number;
  discount_percent: number;
};

interface PurchaseOrderFormProps {
  vendors?: Vendor[];
  warehouses?: Warehouse[];
  isSubmitting?: boolean;
  onSubmit: (values: PurchaseOrderFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

const defaultLine = (): PurchaseOrderLine => ({
  id: crypto.randomUUID(),
  item_name: "",
  unit: "Piece",
  quantity: 1,
  unit_price: 0,
  gst_percent: 0,
  discount_percent: 0,
});

function lineSubtotal(line: PurchaseOrderLine) {
  return line.quantity * line.unit_price;
}

function lineDiscount(line: PurchaseOrderLine) {
  return lineSubtotal(line) * (line.discount_percent / 100);
}

function lineTaxable(line: PurchaseOrderLine) {
  return lineSubtotal(line) - lineDiscount(line);
}

function lineGst(line: PurchaseOrderLine) {
  return lineTaxable(line) * (line.gst_percent / 100);
}

function lineTotal(line: PurchaseOrderLine) {
  return lineTaxable(line) + lineGst(line);
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value);
}

export function PurchaseOrderForm({
  vendors = [],
  warehouses = [],
  isSubmitting,
  onSubmit,
  onCancel,
}: PurchaseOrderFormProps) {
  const today = new Date().toISOString().slice(0, 10);
  const [lines, setLines] = useState<PurchaseOrderLine[]>([defaultLine()]);

  const form = useForm<PurchaseOrderFormInput>({
    resolver: zodResolver(purchaseOrderFormSchema),
    defaultValues: {
      vendor_id: "",
      order_date: today,
      expected_date: "",
      total_amount: 0,
      remarks: "",
    },
  });

  const vendorId = useWatch({ control: form.control, name: "vendor_id" });
  const selectedVendor = vendors.find((vendor) => vendor.id === vendorId);

  const totals = useMemo(() => {
    const subtotal = lines.reduce((sum, line) => sum + lineSubtotal(line), 0);
    const discount = lines.reduce((sum, line) => sum + lineDiscount(line), 0);
    const gst = lines.reduce((sum, line) => sum + lineGst(line), 0);
    const grandTotal = lines.reduce((sum, line) => sum + lineTotal(line), 0);

    return { subtotal, discount, gst, grandTotal };
  }, [lines]);

  function updateLine(id: string, patch: Partial<PurchaseOrderLine>) {
    setLines((current) =>
      current.map((line) => (line.id === id ? { ...line, ...patch } : line))
    );
  }

  function removeLine(id: string) {
    setLines((current) =>
      current.length === 1 ? current : current.filter((line) => line.id !== id)
    );
  }

  function handleSubmit(values: PurchaseOrderFormInput) {
    const parsed = purchaseOrderFormSchema.parse({
      ...values,
      total_amount: Number(totals.grandTotal.toFixed(2)),
    });

    return onSubmit(parsed);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="flex h-full flex-col">
        <div className="flex-1 space-y-6 overflow-y-auto px-1 pb-6">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="mb-4">
              <h3 className="text-sm font-semibold">Supplier Information</h3>
              <p className="text-xs text-muted-foreground">
                Select the vendor for this purchase order. Contact details are shown automatically.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <SelectField
                form={form}
                name="vendor_id"
                label="Vendor"
                placeholder="Select vendor"
                options={vendors.map((vendor) => ({
                  label: `${vendor.name}${vendor.code ? ` (${vendor.code})` : ""}`,
                  value: vendor.id,
                }))}
              />

              <div className="rounded-lg border bg-muted/30 p-3 text-sm">
                <div className="font-medium">
                  {selectedVendor?.name ?? "No vendor selected"}
                </div>
                <div className="mt-2 grid gap-1 text-xs text-muted-foreground">
                  <span>Contact: {selectedVendor?.contact_person || "-"}</span>
                  <span>Phone: {selectedVendor?.phone || "-"}</span>
                  <span>Email: {selectedVendor?.email || "-"}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="mb-4">
              <h3 className="text-sm font-semibold">Order Information</h3>
              <p className="text-xs text-muted-foreground">
                Define dates and receiving warehouse for procurement tracking.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <TextField form={form} name="order_date" label="Order Date" type="date" />
              <TextField form={form} name="expected_date" label="Expected Date" type="date" />

              <div className="space-y-2">
                <label className="text-sm font-medium">Receiving Warehouse</label>
                <select className="h-10 w-full rounded-md border bg-background px-3 text-sm">
                  <option value="">Select warehouse</option>
                  {warehouses.map((warehouse) => (
                    <option key={warehouse.id} value={warehouse.id}>
                      {warehouse.name}{warehouse.code ? ` (${warehouse.code})` : ""}
                    </option>
                  ))}
                </select>
                <p className="text-xs text-muted-foreground">
                  UI-only until warehouse is added to the backend PO contract.
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold">Purchase Items</h3>
                <p className="text-xs text-muted-foreground">
                  Add item lines to calculate subtotal, tax, discount, and grand total.
                </p>
              </div>

              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setLines((current) => [...current, defaultLine()])}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Item
              </Button>
            </div>

            <div className="overflow-x-auto rounded-lg border">
              <table className="w-full min-w-[780px] text-sm">
                <thead className="bg-muted/50 text-left text-xs uppercase text-muted-foreground">
                  <tr>
                    <th className="px-3 py-2">Item</th>
                    <th className="px-3 py-2">Unit</th>
                    <th className="px-3 py-2">Qty</th>
                    <th className="px-3 py-2">Unit Price</th>
                    <th className="px-3 py-2">GST %</th>
                    <th className="px-3 py-2">Disc %</th>
                    <th className="px-3 py-2 text-right">Line Total</th>
                    <th className="px-3 py-2" />
                  </tr>
                </thead>
                <tbody>
                  {lines.map((line) => (
                    <tr key={line.id} className="border-t">
                      <td className="px-3 py-2">
                        <input
                          className="h-9 w-full rounded-md border bg-background px-3 text-sm"
                          placeholder="Item name"
                          value={line.item_name}
                          onChange={(event) =>
                            updateLine(line.id, { item_name: event.target.value })
                          }
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          className="h-9 w-24 rounded-md border bg-background px-3 text-sm"
                          value={line.unit}
                          onChange={(event) => updateLine(line.id, { unit: event.target.value })}
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          min={1}
                          className="h-9 w-20 rounded-md border bg-background px-3 text-sm"
                          value={line.quantity}
                          onChange={(event) =>
                            updateLine(line.id, { quantity: Number(event.target.value) || 0 })
                          }
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          min={0}
                          step="0.01"
                          className="h-9 w-28 rounded-md border bg-background px-3 text-sm"
                          value={line.unit_price}
                          onChange={(event) =>
                            updateLine(line.id, { unit_price: Number(event.target.value) || 0 })
                          }
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          min={0}
                          step="0.01"
                          className="h-9 w-20 rounded-md border bg-background px-3 text-sm"
                          value={line.gst_percent}
                          onChange={(event) =>
                            updateLine(line.id, { gst_percent: Number(event.target.value) || 0 })
                          }
                        />
                      </td>
                      <td className="px-3 py-2">
                        <input
                          type="number"
                          min={0}
                          step="0.01"
                          className="h-9 w-20 rounded-md border bg-background px-3 text-sm"
                          value={line.discount_percent}
                          onChange={(event) =>
                            updateLine(line.id, { discount_percent: Number(event.target.value) || 0 })
                          }
                        />
                      </td>
                      <td className="px-3 py-2 text-right font-medium">
                        {formatCurrency(lineTotal(line))}
                      </td>
                      <td className="px-3 py-2 text-right">
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          disabled={lines.length === 1}
                          onClick={() => removeLine(line.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h3 className="mb-4 text-sm font-semibold">Remarks</h3>
              <TextareaField form={form} name="remarks" label="Internal Notes" />
            </div>

            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h3 className="mb-4 text-sm font-semibold">Order Summary</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span>{formatCurrency(totals.subtotal)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Discount</span>
                  <span>{formatCurrency(totals.discount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">GST</span>
                  <span>{formatCurrency(totals.gst)}</span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-base font-semibold">
                    <span>Grand Total</span>
                    <span>{formatCurrency(totals.grandTotal)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 -mx-6 flex items-center justify-end gap-3 border-t bg-background px-6 py-4">
          {onCancel && (
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          )}
          <Button type="submit" disabled={isSubmitting || !selectedVendor}>
            {isSubmitting ? "Saving..." : "Save Purchase Order"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
