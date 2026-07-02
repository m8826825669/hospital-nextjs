// src/features/billing/utils/billing.mapper.ts

import type {
  BillingInvoice,
  CreateBillingInvoicePayload,
  UpdateBillingInvoicePayload,
  CreateBillingPaymentPayload,
} from "../types/billing.types";
import type {
  BillingInvoiceFormValues,
  BillingPaymentFormValues,
} from "../schemas/billing.schema";

function emptyToUndefined(value?: string | null) {
  return value && value.trim() !== "" ? value : undefined;
}

export function billingInvoiceToFormValues(
  invoice: BillingInvoice
): Partial<BillingInvoiceFormValues> {
  return {
    patient_id: invoice.patient_id,
    invoice_date: invoice.invoice_date,
    due_date: invoice.due_date ?? "",
    notes: invoice.notes ?? "",
  };
}

export function billingInvoiceFormToCreatePayload(
  values: BillingInvoiceFormValues
): CreateBillingInvoicePayload {
  return {
    patient_id: values.patient_id,
    invoice_date: values.invoice_date,
    due_date: emptyToUndefined(values.due_date),
    notes: emptyToUndefined(values.notes),
  };
}

export function billingInvoiceFormToUpdatePayload(
  values: BillingInvoiceFormValues
): UpdateBillingInvoicePayload {
  return {
    ...billingInvoiceFormToCreatePayload(values),
  };
}

export function billingPaymentFormToCreatePayload(
  values: BillingPaymentFormValues
): CreateBillingPaymentPayload {
  return {
    invoice_id: values.invoice_id,
    payment_date: values.payment_date,
    amount: values.amount,
    method: values.method,
    reference_number: emptyToUndefined(values.reference_number),
    notes: emptyToUndefined(values.notes),
  };
}