// src/features/inventory/components/purchase-order-form.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { CurrencyField, FormActions, TextareaField, TextField } from "@/shared/components/enterprise";
import {
  purchaseOrderFormSchema,
  type PurchaseOrderFormInput,
  type PurchaseOrderFormValues,
} from "../schemas/inventory.schema";

interface PurchaseOrderFormProps {
  isSubmitting?: boolean;
  onSubmit: (values: PurchaseOrderFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function PurchaseOrderForm({ isSubmitting, onSubmit, onCancel }: PurchaseOrderFormProps) {
  const today = new Date().toISOString().slice(0, 10);

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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((v) => onSubmit(purchaseOrderFormSchema.parse(v)))} className="space-y-5">
        <TextField form={form} name="vendor_id" label="Vendor ID" />
        <div className="grid gap-4 md:grid-cols-2">
          <TextField form={form} name="order_date" label="Order Date" type="date" />
          <TextField form={form} name="expected_date" label="Expected Date" type="date" />
        </div>
        <CurrencyField form={form} name="total_amount" label="Total Amount" />
        <TextareaField form={form} name="remarks" label="Remarks" />
        <FormActions submitText="Save Purchase Order" isSubmitting={isSubmitting} onCancel={onCancel} />
      </form>
    </Form>
  );
}