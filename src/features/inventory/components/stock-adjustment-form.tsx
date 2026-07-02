// src/features/inventory/components/stock-adjustment-form.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  FormActions,
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

interface StockAdjustmentFormProps {
  isSubmitting?: boolean;
  onSubmit: (values: StockAdjustmentFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function StockAdjustmentForm({ isSubmitting, onSubmit, onCancel }: StockAdjustmentFormProps) {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((v) => onSubmit(stockAdjustmentFormSchema.parse(v)))} className="space-y-5">
        <TextField form={form} name="item_name" label="Item Name" />
        <TextField form={form} name="warehouse_id" label="Warehouse ID" />
        <TextField form={form} name="adjustment_date" label="Adjustment Date" type="date" />
        <SelectField form={form} name="adjustment_type" label="Adjustment Type" options={stockAdjustmentTypeOptions} />
        <TextField form={form} name="quantity" label="Quantity" type="number" />
        <TextareaField form={form} name="reason" label="Reason" />
        <FormActions submitText="Save Adjustment" isSubmitting={isSubmitting} onCancel={onCancel} />
      </form>
    </Form>
  );
}