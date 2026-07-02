// src/features/security/components/password-policy-form.tsx

"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  CheckboxField,
  FormActions,
  TextField,
} from "@/shared/components/enterprise";
import {
  passwordPolicyFormSchema,
  type PasswordPolicyFormInput,
  type PasswordPolicyFormValues,
} from "../schemas/security.schema";

interface PasswordPolicyFormProps {
  policy?: PasswordPolicyFormValues;
  isSubmitting?: boolean;
  onSubmit: (values: PasswordPolicyFormValues) => void | Promise<void>;
}

export function PasswordPolicyForm({
  policy,
  isSubmitting,
  onSubmit,
}: PasswordPolicyFormProps) {
  const form = useForm<PasswordPolicyFormInput>({
    resolver: zodResolver(passwordPolicyFormSchema),
    defaultValues: {
      min_length: 8,
      require_uppercase: true,
      require_lowercase: true,
      require_number: true,
      require_symbol: false,
      password_expiry_days: 0,
      lock_after_failed_attempts: 5,
    },
  });

  useEffect(() => {
    if (policy) {
      form.reset(policy);
    }
  }, [policy, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(passwordPolicyFormSchema.parse(values))
        )}
        className="space-y-5"
      >
        <div className="grid gap-4 md:grid-cols-3">
          <TextField form={form} name="min_length" label="Minimum Length" type="number" />
          <TextField form={form} name="password_expiry_days" label="Expiry Days" type="number" />
          <TextField form={form} name="lock_after_failed_attempts" label="Lock After Attempts" type="number" />
        </div>

        <CheckboxField form={form} name="require_uppercase" label="Require uppercase" />
        <CheckboxField form={form} name="require_lowercase" label="Require lowercase" />
        <CheckboxField form={form} name="require_number" label="Require number" />
        <CheckboxField form={form} name="require_symbol" label="Require symbol" />

        <FormActions submitText="Save Policy" isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
}