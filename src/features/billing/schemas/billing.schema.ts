// src/features/billing/schemas/billing.schema.ts

import { z } from "zod";

export const billingInvoiceFormSchema = z.object({
  patient_id: z.string().min(1, "Patient is required"),
  invoice_date: z.string().min(1, "Invoice date is required"),
  due_date: z.string().optional(),
  notes: z.string().optional(),
});

export const billingPaymentFormSchema = z.object({
  invoice_id: z.string().min(1, "Invoice is required"),
  payment_date: z.string().min(1, "Payment date is required"),
  amount: z.coerce.number().min(1, "Amount is required"),
  method: z.enum([
    "cash",
    "card",
    "upi",
    "bank_transfer",
    "insurance",
    "other",
  ]),
  reference_number: z.string().optional(),
  notes: z.string().optional(),
});

export type BillingInvoiceFormInput = z.input<typeof billingInvoiceFormSchema>;
export type BillingInvoiceFormValues = z.output<typeof billingInvoiceFormSchema>;

export type BillingPaymentFormInput = z.input<typeof billingPaymentFormSchema>;
export type BillingPaymentFormValues = z.output<typeof billingPaymentFormSchema>;