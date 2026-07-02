// src/features/insurance/components/insurance-review-form.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  CurrencyField,
  FormActions,
  SelectField,
  TextareaField,
} from "@/shared/components/enterprise";
import {
  insuranceReviewFormSchema,
  type InsuranceReviewFormInput,
  type InsuranceReviewFormValues,
} from "../schemas/insurance.schema";

const reviewStatusOptions = [
  { label: "Under Review", value: "under_review" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];

interface InsuranceReviewFormProps {
  isSubmitting?: boolean;
  onSubmit: (values: InsuranceReviewFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function InsuranceReviewForm({
  isSubmitting,
  onSubmit,
  onCancel,
}: InsuranceReviewFormProps) {
  const form = useForm<InsuranceReviewFormInput>({
    resolver: zodResolver(insuranceReviewFormSchema),
    defaultValues: {
      status: "under_review",
      approved_amount: undefined,
      remarks: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(insuranceReviewFormSchema.parse(values))
        )}
        className="space-y-6"
      >
        <section className="space-y-4 rounded-xl border bg-card p-4">
          <SelectField
            form={form}
            name="status"
            label="Review Decision"
            options={reviewStatusOptions}
          />

          <CurrencyField
            form={form}
            name="approved_amount"
            label="Approved Amount"
          />

          <TextareaField form={form} name="remarks" label="Review Remarks" />
        </section>

        <FormActions
          submitText="Save Review"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}