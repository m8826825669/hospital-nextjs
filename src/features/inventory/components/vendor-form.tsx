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
    <form
      onSubmit={form.handleSubmit((v) => onSubmit(vendorFormSchema.parse(v)))}
      className="flex h-full flex-col"
    >
      <div className="flex-1 space-y-6 overflow-y-auto px-6 py-6">
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold">Vendor Information</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <TextField form={form} name="name" label="Vendor Name" />
            <TextField form={form} name="code" label="Code" />
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold">Contact Details</h3>
          <div className="grid gap-4 md:grid-cols-2">
            <TextField form={form} name="contact_person" label="Contact Person" />
            <TextField form={form} name="phone" label="Phone" />
            <TextField form={form} name="email" label="Email" />
          </div>
        </div>

        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold">Address & Status</h3>
          <div className="space-y-4">
            <TextareaField form={form} name="address" label="Address" />
            <div className="grid gap-4 md:grid-cols-2">
              <SelectField
                form={form}
                name="status"
                label="Status"
                options={vendorStatusOptions}
              />
              <div className="flex items-end pb-2">
                <CheckboxField form={form} name="is_active" label="Vendor is active" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="sticky bottom-0 flex items-center justify-end gap-3 border-t bg-background px-6 py-4">
        <FormActions
          submitText="Save Vendor"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </div>
    </form>
  </Form>
);
}