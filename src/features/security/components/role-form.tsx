// src/features/security/components/role-form.tsx

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
  roleFormSchema,
  type RoleFormInput,
  type RoleFormValues,
} from "../schemas/security.schema";

interface RoleFormProps {
  defaultValues?: Partial<RoleFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: RoleFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function RoleForm({
  defaultValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: RoleFormProps) {
  const form = useForm<RoleFormInput>({
    resolver: zodResolver(roleFormSchema),
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
          onSubmit(roleFormSchema.parse(values))
        )}
        className="space-y-5"
      >
        <TextField form={form} name="name" label="Role Name" />
        <TextField form={form} name="code" label="Role Code" />
        <TextareaField form={form} name="description" label="Description" />
        <CheckboxField form={form} name="is_active" label="Role is active" />

        <FormActions
          submitText="Save Role"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}