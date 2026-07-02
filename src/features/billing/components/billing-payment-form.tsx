// src/features/billing/components/billing-payment-form.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  CurrencyField,
  FormActions,
  SelectField,
  TextareaField,
  TextField,
} from "@/shared/components/enterprise";
import { billingPaymentMethodOptions } from "../constants/billing.constants";
import {
  billingPaymentFormSchema,
  type BillingPaymentFormInput,
  type BillingPaymentFormValues,
} from "../schemas/billing.schema";

interface BillingPaymentFormProps {
  invoiceId: string;
  isSubmitting?: boolean;
  onSubmit: (values: BillingPaymentFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function BillingPaymentForm({
  invoiceId,
  isSubmitting,
  onSubmit,
  onCancel,
}: BillingPaymentFormProps) {
  const today = new Date().toISOString().slice(0, 10);

  const form = useForm<BillingPaymentFormInput>({
    resolver: zodResolver(billingPaymentFormSchema),
    defaultValues: {
      invoice_id: invoiceId,
      payment_date: today,
      amount: undefined,
      method: "cash",
      reference_number: "",
      notes: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(billingPaymentFormSchema.parse(values))
        )}
        className="space-y-6"
      >
        <section className="space-y-4 rounded-xl border bg-card p-4">
          <TextField form={form} name="invoice_id" label="Invoice ID" disabled />

          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              form={form}
              name="payment_date"
              label="Payment Date"
              type="date"
            />

            <CurrencyField form={form} name="amount" label="Amount" />
          </div>

          <SelectField
            form={form}
            name="method"
            label="Payment Method"
            options={billingPaymentMethodOptions}
          />

          <TextField
            form={form}
            name="reference_number"
            label="Reference Number"
          />

          <TextareaField form={form} name="notes" label="Notes" />
        </section>

        <FormActions
          submitText="Record Payment"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}