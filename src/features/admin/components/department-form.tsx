// src/features/admin/components/department-form.tsx

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
  departmentFormSchema,
  type DepartmentFormInput,
  type DepartmentFormValues,
} from "../schemas/admin.schema";

interface DepartmentFormProps {
  defaultValues?: Partial<DepartmentFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: DepartmentFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function DepartmentForm({
  defaultValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: DepartmentFormProps) {
  const form = useForm<DepartmentFormInput>({
    resolver: zodResolver(departmentFormSchema),
    defaultValues: {
      name: "",
      code: "",
      description: "",
      is_active: true,
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(departmentFormSchema.parse(values))
        )}
        className="space-y-5"
      >
        <TextField form={form} name="name" label="Department Name" />
        <TextField form={form} name="code" label="Code" />
        <TextareaField form={form} name="description" label="Description" />
        <CheckboxField form={form} name="is_active" label="Department is active" />

        <FormActions
          submitText="Save Department"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}