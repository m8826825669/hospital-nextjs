// src/features/security/components/security-user-form.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  CheckboxField,
  FormActions,
  SelectField,
  TextField,
} from "@/shared/components/enterprise";
import { userStatusOptions } from "../constants/security.constants";
import {
  securityUserFormSchema,
  type SecurityUserFormInput,
  type SecurityUserFormValues,
} from "../schemas/security.schema";

interface SecurityUserFormProps {
  defaultValues?: Partial<SecurityUserFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: SecurityUserFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function SecurityUserForm({
  defaultValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: SecurityUserFormProps) {
  const form = useForm<SecurityUserFormInput>({
    resolver: zodResolver(securityUserFormSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      status: "active",
      is_active: true,
      mfa_enabled: false,
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(securityUserFormSchema.parse(values))
        )}
        className="space-y-5"
      >
        <TextField form={form} name="full_name" label="Full Name" />
        <TextField form={form} name="email" label="Email" />
        <TextField form={form} name="phone" label="Phone" />

        <SelectField
          form={form}
          name="status"
          label="Status"
          options={userStatusOptions}
        />

        <CheckboxField form={form} name="is_active" label="User is active" />
        <CheckboxField form={form} name="mfa_enabled" label="MFA enabled" />

        <FormActions
          submitText="Save User"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}