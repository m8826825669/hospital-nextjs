// src/features/emergency/components/emergency-disposition-form.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  FormActions,
  SelectField,
  TextareaField,
} from "@/shared/components/enterprise";
import { erDispositionOptions } from "../constants/emergency.constants";
import {
  emergencyDispositionFormSchema,
  type EmergencyDispositionFormInput,
  type EmergencyDispositionFormValues,
} from "../schemas/emergency.schema";

interface EmergencyDispositionFormProps {
  isSubmitting?: boolean;
  onSubmit: (values: EmergencyDispositionFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function EmergencyDispositionForm({
  isSubmitting,
  onSubmit,
  onCancel,
}: EmergencyDispositionFormProps) {
  const form = useForm<EmergencyDispositionFormInput>({
    resolver: zodResolver(emergencyDispositionFormSchema),
    defaultValues: {
      disposition: "discharge",
      notes: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(emergencyDispositionFormSchema.parse(values))
        )}
        className="space-y-5"
      >
        <SelectField
          form={form}
          name="disposition"
          label="Disposition"
          options={erDispositionOptions}
        />

        <TextareaField form={form} name="notes" label="Disposition Notes" />

        <FormActions
          submitText="Save Disposition"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}