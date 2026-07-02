// src/features/finance/components/account-form.tsx

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
import { accountTypeOptions } from "../constants/finance.constants";
import {
  accountFormSchema,
  type AccountFormInput,
  type AccountFormValues,
} from "../schemas/finance.schema";

interface AccountFormProps {
  defaultValues?: Partial<AccountFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: AccountFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function AccountForm({
  defaultValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: AccountFormProps) {
  const form = useForm<AccountFormInput>({
    resolver: zodResolver(accountFormSchema),
    defaultValues: {
      code: "",
      name: "",
      type: "asset",
      parent_id: "",
      is_active: true,
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(accountFormSchema.parse(values))
        )}
        className="space-y-5"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextField form={form} name="code" label="Account Code" />
          <TextField form={form} name="name" label="Account Name" />
        </div>

        <SelectField
          form={form}
          name="type"
          label="Account Type"
          options={accountTypeOptions}
        />

        <TextField form={form} name="parent_id" label="Parent Account ID" />

        <CheckboxField form={form} name="is_active" label="Account is active" />

        <FormActions
          submitText="Save Account"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}