// src/features/inventory/components/vendor-form.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  CheckboxField,
  FormActions,
  SelectField,
  TextareaField,
  TextField,
} from "@/shared/components/enterprise";
import { vendorStatusOptions } from "../constants/inventory.constants";
import {
  vendorFormSchema,
  type VendorFormInput,
  type VendorFormValues,
} from "../schemas/inventory.schema";

interface VendorFormProps {
  defaultValues?: Partial<VendorFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: VendorFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function VendorForm({ defaultValues, isSubmitting, onSubmit, onCancel }: VendorFormProps) {
  const form = useForm<VendorFormInput>({
    resolver: zodResolver(vendorFormSchema),
    defaultValues: {
      name: "",
      code: "",
      contact_person: "",
      phone: "",
      email: "",
      address: "",
      status: "active",
      is_active: true,
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit((v) => onSubmit(vendorFormSchema.parse(v)))} className="space-y-5">
        <TextField form={form} name="name" label="Vendor Name" />
        <TextField form={form} name="code" label="Code" />
        <TextField form={form} name="contact_person" label="Contact Person" />
        <div className="grid gap-4 md:grid-cols-2">
          <TextField form={form} name="phone" label="Phone" />
          <TextField form={form} name="email" label="Email" />
        </div>
        <TextareaField form={form} name="address" label="Address" />
        <SelectField form={form} name="status" label="Status" options={vendorStatusOptions} />
        <CheckboxField form={form} name="is_active" label="Vendor is active" />
        <FormActions submitText="Save Vendor" isSubmitting={isSubmitting} onCancel={onCancel} />
      </form>
    </Form>
  );
}