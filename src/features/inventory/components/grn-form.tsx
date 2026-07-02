// src/features/inventory/components/grn-form.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { CurrencyField, FormActions, TextareaField, TextField } from "@/shared/components/enterprise";
import {
  grnFormSchema,
  type GrnFormInput,
  type GrnFormValues,
} from "../schemas/inventory.schema";

interface GrnFormProps {
  isSubmitting?: boolean;
  onSubmit: (values: GrnFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function GrnForm({ isSubmitting, onSubmit, onCancel }: GrnFormProps) {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((v) => onSubmit(grnFormSchema.parse(v)))} className="space-y-5">
        <TextField form={form} name="purchase_order_id" label="Purchase Order ID" />
        <TextField form={form} name="received_date" label="Received Date" type="date" />
        <CurrencyField form={form} name="total_amount" label="Total Amount" />
        <TextareaField form={form} name="remarks" label="Remarks" />
        <FormActions submitText="Save GRN" isSubmitting={isSubmitting} onCancel={onCancel} />
      </form>
    </Form>
  );
}