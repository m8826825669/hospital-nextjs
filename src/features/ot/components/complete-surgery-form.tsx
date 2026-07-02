// src/features/ot/components/complete-surgery-form.tsx

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
  completeSurgeryFormSchema,
  type CompleteSurgeryFormInput,
  type CompleteSurgeryFormValues,
} from "../schemas/ot.schema";

interface CompleteSurgeryFormProps {
  isSubmitting?: boolean;
  onSubmit: (values: CompleteSurgeryFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function CompleteSurgeryForm({
  isSubmitting,
  onSubmit,
  onCancel,
}: CompleteSurgeryFormProps) {
  const form = useForm<CompleteSurgeryFormInput>({
    resolver: zodResolver(completeSurgeryFormSchema),
    defaultValues: {
      actual_end_time: "",
      notes: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(completeSurgeryFormSchema.parse(values))
        )}
        className="space-y-6"
      >
        <section className="space-y-4 rounded-xl border bg-card p-4">
          <TextField
            form={form}
            name="actual_end_time"
            label="Actual End Time"
            type="time"
          />

          <TextareaField
            form={form}
            name="notes"
            label="Completion Notes"
          />
        </section>

        <FormActions
          submitText="Complete Surgery"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}