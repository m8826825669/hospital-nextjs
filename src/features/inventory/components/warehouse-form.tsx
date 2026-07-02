// src/features/inventory/components/warehouse-form.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { CheckboxField, FormActions, TextField } from "@/shared/components/enterprise";
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
      <form onSubmit={form.handleSubmit((v) => onSubmit(warehouseFormSchema.parse(v)))} className="space-y-5">
        <TextField form={form} name="name" label="Warehouse Name" />
        <TextField form={form} name="code" label="Code" />
        <TextField form={form} name="location" label="Location" />
        <CheckboxField form={form} name="is_active" label="Warehouse is active" />
        <FormActions submitText="Save Warehouse" isSubmitting={isSubmitting} onCancel={onCancel} />
      </form>
    </Form>
  );
}