// src/features/insurance/components/insurance-settlement-form.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  CurrencyField,
  FormActions,
  TextareaField,
  TextField,
} from "@/shared/components/enterprise";
import {
  insuranceSettlementFormSchema,
  type InsuranceSettlementFormInput,
  type InsuranceSettlementFormValues,
} from "../schemas/insurance.schema";

interface InsuranceSettlementFormProps {
  isSubmitting?: boolean;
  onSubmit: (values: InsuranceSettlementFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function InsuranceSettlementForm({
  isSubmitting,
  onSubmit,
  onCancel,
}: InsuranceSettlementFormProps) {
  const today = new Date().toISOString().slice(0, 10);

  const form = useForm<InsuranceSettlementFormInput>({
    resolver: zodResolver(insuranceSettlementFormSchema),
    defaultValues: {
      settlement_date: today,
      settled_amount: undefined,
      settlement_reference: "",
      remarks: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(insuranceSettlementFormSchema.parse(values))
        )}
        className="space-y-6"
      >
        <section className="space-y-4 rounded-xl border bg-card p-4">
          <TextField
            form={form}
            name="settlement_date"
            label="Settlement Date"
            type="date"
          />

          <CurrencyField
            form={form}
            name="settled_amount"
            label="Settled Amount"
          />

          <TextField
            form={form}
            name="settlement_reference"
            label="Settlement Reference"
          />

          <TextareaField form={form} name="remarks" label="Remarks" />
        </section>

        <FormActions
          submitText="Record Settlement"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}