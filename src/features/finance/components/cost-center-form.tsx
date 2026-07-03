// src/features/finance/components/cost-center-form.tsx

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
import type { Department } from "@/features/admin/types/admin.types";
import {
  costCenterFormSchema,
  type CostCenterFormInput,
  type CostCenterFormValues,
} from "../schemas/finance.schema";

interface CostCenterFormProps {
  departments?: Department[];
  defaultValues?: Partial<CostCenterFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: CostCenterFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function CostCenterForm({
  departments = [],
  defaultValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: CostCenterFormProps) {
  const form = useForm<CostCenterFormInput>({
    resolver: zodResolver(costCenterFormSchema),
    defaultValues: {
      code: "",
      name: "",
      department_id: "",
      description: "",
      is_active: true,
      ...defaultValues,
    },
  });

  const departmentOptions = departments.map((department) => ({
    label: `${department.name}${department.code ? ` (${department.code})` : ""}`,
    value: department.id,
  }));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(costCenterFormSchema.parse(values)))}
        className="flex h-full flex-col"
      >
        <div className="flex-1 space-y-6 overflow-y-auto px-1 pb-6">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Cost Center Information</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <TextField form={form} name="code" label="Code" />
              <TextField form={form} name="name" label="Name" />
              <SelectField
                form={form}
                name="department_id"
                label="Department"
                placeholder="Select department"
                options={[{ label: "No Department", value: "" }, ...departmentOptions]}
              />
              <div className="flex items-end pb-2">
                <CheckboxField form={form} name="is_active" label="Cost center is active" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Description</h3>
            <TextareaField form={form} name="description" label="Description" />
          </div>
        </div>

        <div className="sticky bottom-0 -mx-6 flex items-center justify-end gap-3 border-t bg-background px-6 py-4">
          <FormActions submitText="Save Cost Center" isSubmitting={isSubmitting} onCancel={onCancel} />
        </div>
      </form>
    </Form>
  );
}
