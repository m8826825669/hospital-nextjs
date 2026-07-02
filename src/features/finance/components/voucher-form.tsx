// src/features/finance/components/voucher-form.tsx

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
import { voucherTypeOptions } from "../constants/finance.constants";
import {
  voucherFormSchema,
  type VoucherFormInput,
  type VoucherFormValues,
} from "../schemas/finance.schema";

interface VoucherFormProps {
  isSubmitting?: boolean;
  onSubmit: (values: VoucherFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function VoucherForm({
  isSubmitting,
  onSubmit,
  onCancel,
}: VoucherFormProps) {
  const today = new Date().toISOString().slice(0, 10);

  const form = useForm<VoucherFormInput>({
    resolver: zodResolver(voucherFormSchema),
    defaultValues: {
      voucher_type: "receipt",
      voucher_date: today,
      account_id: "",
      amount: undefined,
      reference_number: "",
      narration: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(voucherFormSchema.parse(values))
        )}
        className="space-y-5"
      >
        <SelectField
          form={form}
          name="voucher_type"
          label="Voucher Type"
          options={voucherTypeOptions}
        />

        <TextField form={form} name="voucher_date" label="Date" type="date" />

        <TextField form={form} name="account_id" label="Account ID" />

        <CurrencyField form={form} name="amount" label="Amount" />

        <TextField form={form} name="reference_number" label="Reference No" />

        <TextareaField form={form} name="narration" label="Narration" />

        <FormActions
          submitText="Save Voucher"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}