// src/features/admin/components/department-form.tsx

"use client";

import { Building2, FileText, ShieldCheck } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  CheckboxField,
  EnterpriseFormActions,
  EnterpriseFormGrid,
  EnterpriseFormHero,
  EnterpriseFormNotice,
  EnterpriseFormSection,
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
        className="flex min-h-[calc(100vh-10rem)] flex-col"
      >
        <div className="space-y-5 pb-8">
          <EnterpriseFormHero
            eyebrow="Hospital Master Data"
            title="Configure Department"
            description="Departments organize doctors, appointments, billing, clinical workflows, diagnostics, and reporting across the hospital."
            icon={Building2}
          />

          <EnterpriseFormSection
            step="1"
            icon={Building2}
            title="Department Identity"
            description="Define the official department name and short code used across the HMS."
          >
            <EnterpriseFormGrid columns={2}>
              <TextField
                form={form}
                name="name"
                label="Department Name"
                placeholder="Example: Cardiology"
                disabled={isSubmitting}
              />
              <TextField
                form={form}
                name="code"
                label="Department Code"
                placeholder="Example: CARD"
                disabled={isSubmitting}
              />
            </EnterpriseFormGrid>
          </EnterpriseFormSection>

          <EnterpriseFormSection
            step="2"
            icon={FileText}
            title="Description"
            description="Add a short operational description for admin users and reports."
          >
            <TextareaField
              form={form}
              name="description"
              label="Description"
              placeholder="Describe the department scope, services, or operational notes."
              disabled={isSubmitting}
            />
          </EnterpriseFormSection>

          <EnterpriseFormSection
            step="3"
            icon={ShieldCheck}
            title="Availability"
            description="Inactive departments are hidden from new transactional workflows."
          >
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
              <CheckboxField
                form={form}
                name="is_active"
                label="Department is active and available for hospital workflows"
                disabled={isSubmitting}
              />
            </div>
          </EnterpriseFormSection>

          <EnterpriseFormNotice tone="warning">
            Before deactivating a department, verify that no active doctors,
            appointments, orders, or reports depend on it.
          </EnterpriseFormNotice>
        </div>

        <EnterpriseFormActions
          submitText="Save Department"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
          hint="Changes will update department master data immediately after save."
        />
      </form>
    </Form>
  );
}
