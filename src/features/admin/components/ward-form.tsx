// src/features/admin/components/ward-form.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { CheckboxField, FormActions, TextField } from "@/shared/components/enterprise";
import {
  wardFormSchema,
  type WardFormInput,
  type WardFormValues,
} from "../schemas/admin.schema";

interface WardFormProps {
  defaultValues?: Partial<WardFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: WardFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function WardForm({
  defaultValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: WardFormProps) {
  const form = useForm<WardFormInput>({
    resolver: zodResolver(wardFormSchema),
    defaultValues: {
      name: "",
      code: "",
      floor: "",
      is_active: true,
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(wardFormSchema.parse(values))
        )}
        className="space-y-5"
      >
        <TextField form={form} name="name" label="Ward Name" />
        <TextField form={form} name="code" label="Code" />
        <TextField form={form} name="floor" label="Floor" />
        <CheckboxField form={form} name="is_active" label="Ward is active" />

        <FormActions
          submitText="Save Ward"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}