// src/features/insurance/components/insurance-claim-form.tsx

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
import { insuranceClaimPriorityOptions } from "../constants/insurance.constants";
import {
  insuranceClaimFormSchema,
  type InsuranceClaimFormInput,
  type InsuranceClaimFormValues,
} from "../schemas/insurance.schema";

interface InsuranceClaimFormProps {
  defaultValues?: Partial<InsuranceClaimFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: InsuranceClaimFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function InsuranceClaimForm({
  defaultValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: InsuranceClaimFormProps) {
  const today = new Date().toISOString().slice(0, 10);

  const form = useForm<InsuranceClaimFormInput>({
    resolver: zodResolver(insuranceClaimFormSchema),
    defaultValues: {
      patient_id: "",
      provider_id: "",
      policy_id: "",
      invoice_id: "",
      claim_date: today,
      claim_amount: undefined,
      diagnosis: "",
      treatment_summary: "",
      remarks: "",
      priority: "normal",
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(insuranceClaimFormSchema.parse(values))
        )}
        className="space-y-6"
      >
        <section className="space-y-4 rounded-xl border bg-card p-4">
          <h3 className="font-medium">Claim Context</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <TextField form={form} name="patient_id" label="Patient ID" />
            <TextField form={form} name="provider_id" label="Provider ID" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <TextField form={form} name="policy_id" label="Policy ID" />
            <TextField form={form} name="invoice_id" label="Invoice ID" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              form={form}
              name="claim_date"
              label="Claim Date"
              type="date"
            />

            <CurrencyField
              form={form}
              name="claim_amount"
              label="Claim Amount"
            />
          </div>

          <SelectField
            form={form}
            name="priority"
            label="Priority"
            options={insuranceClaimPriorityOptions}
          />
        </section>

        <section className="space-y-4 rounded-xl border bg-card p-4">
          <h3 className="font-medium">Clinical & Claim Notes</h3>

          <TextareaField form={form} name="diagnosis" label="Diagnosis" />

          <TextareaField
            form={form}
            name="treatment_summary"
            label="Treatment Summary"
          />

          <TextareaField form={form} name="remarks" label="Remarks" />
        </section>

        <FormActions
          submitText="Save Claim"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}