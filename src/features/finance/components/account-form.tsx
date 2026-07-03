// src/features/finance/components/account-form.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import {
  CheckboxField,
  FormActions,
  SelectField,
  TextareaField,
  TextField,
} from "@/shared/components/enterprise";
import { accountTypeOptions } from "../constants/finance.constants";
import type { FinanceAccount } from "../types/finance.types";
import {
  accountFormSchema,
  type AccountFormInput,
  type AccountFormValues,
} from "../schemas/finance.schema";

interface AccountFormProps {
  accounts?: FinanceAccount[];
  defaultValues?: Partial<AccountFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: AccountFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function AccountForm({
  accounts = [],
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
      account_type: "asset",
      parent_id: "",
      description: "",
      is_active: true,
      ...defaultValues,
    },
  });

  const accountOptions = accounts.map((account) => ({
    label: `${account.code} - ${account.name}`,
    value: account.id,
  }));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(accountFormSchema.parse(values)))}
        className="flex h-full flex-col"
      >
        <div className="flex-1 space-y-6 overflow-y-auto px-1 pb-6">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Account Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <TextField form={form} name="code" label="Account Code" />
              <TextField form={form} name="name" label="Account Name" />
              <SelectField
                form={form}
                name="account_type"
                label="Account Type"
                options={accountTypeOptions}
              />
              <SelectField
                form={form}
                name="parent_id"
                label="Parent Account"
                placeholder="Select parent account"
                options={[{ label: "No Parent", value: "" }, ...accountOptions]}
              />
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Description & Status</h3>
            <div className="space-y-4">
              <TextareaField form={form} name="description" label="Description" />
              <CheckboxField form={form} name="is_active" label="Account is active" />
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 -mx-6 flex items-center justify-end gap-3 border-t bg-background px-6 py-4">
          <FormActions submitText="Save Account" isSubmitting={isSubmitting} onCancel={onCancel} />
        </div>
      </form>
    </Form>
  );
}
