// src/features/billing/components/billing-invoice-form.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  FormActions,
  TextareaField,
  TextField,
} from "@/shared/components/enterprise";
import {
  billingInvoiceFormSchema,
  type BillingInvoiceFormInput,
  type BillingInvoiceFormValues,
} from "../schemas/billing.schema";

interface BillingInvoiceFormProps {
  defaultValues?: Partial<BillingInvoiceFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: BillingInvoiceFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function BillingInvoiceForm({
  defaultValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: BillingInvoiceFormProps) {
  const today = new Date().toISOString().slice(0, 10);

  const form = useForm<BillingInvoiceFormInput>({
    resolver: zodResolver(billingInvoiceFormSchema),
    defaultValues: {
      patient_id: "",
      invoice_date: today,
      due_date: "",
      notes: "",
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(billingInvoiceFormSchema.parse(values))
        )}
        className="space-y-6"
      >
        <section className="space-y-4 rounded-xl border bg-card p-4">
          <TextField
            form={form}
            name="patient_id"
            label="Patient ID"
            placeholder="Temporary patient UUID"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              form={form}
              name="invoice_date"
              label="Invoice Date"
              type="date"
            />

            <TextField
              form={form}
              name="due_date"
              label="Due Date"
              type="date"
            />
          </div>

          <TextareaField form={form} name="notes" label="Notes" />
        </section>

        <FormActions
          submitText="Save Invoice"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}