// src/features/lis/components/lab-result-entry-form.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  CheckboxField,
  FormActions,
  TextareaField,
  TextField,
} from "@/shared/components/enterprise";
import {
  labResultEntrySchema,
  type LabResultEntryInput,
  type LabResultEntryValues,
} from "../schemas/lis.schema";

interface LabResultEntryFormProps {
  sampleId: string;
  defaultTestId?: string;
  isSubmitting?: boolean;
  onSubmit: (values: LabResultEntryValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function LabResultEntryForm({
  sampleId,
  defaultTestId,
  isSubmitting,
  onSubmit,
  onCancel,
}: LabResultEntryFormProps) {
  const form = useForm<LabResultEntryInput>({
    resolver: zodResolver(labResultEntrySchema),
    defaultValues: {
      sample_id: sampleId,
      test_id: defaultTestId ?? "",
      result_value: "",
      remarks: "",
      is_abnormal: false,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(labResultEntrySchema.parse(values))
        )}
        className="space-y-6"
      >
        <section className="space-y-4 rounded-xl border bg-card p-4">
          <TextField form={form} name="sample_id" label="Sample ID" disabled />
          <TextField form={form} name="test_id" label="Test ID" />

          <TextField form={form} name="result_value" label="Result Value" />

          <TextareaField form={form} name="remarks" label="Remarks" />

          <CheckboxField
            form={form}
            name="is_abnormal"
            label="Mark as abnormal"
          />
        </section>

        <FormActions
          submitText="Save Result"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}