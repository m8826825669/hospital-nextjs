// src/features/hr/components/employee-form.tsx

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
  employeeStatusOptions,
  employmentTypeOptions,
} from "../constants/hr.constants";
import {
  employeeFormSchema,
  type EmployeeFormInput,
  type EmployeeFormValues,
} from "../schemas/hr.schema";

interface EmployeeFormProps {
  defaultValues?: Partial<EmployeeFormInput>;
  employeeCode?: string;
  departments?: Department[];
  isSubmitting?: boolean;
  onSubmit: (values: EmployeeFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function EmployeeForm({
  defaultValues,
  employeeCode,
  departments = [],
  isSubmitting,
  onSubmit,
  onCancel,
}: EmployeeFormProps) {
  const form = useForm<EmployeeFormInput>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone: "",
      department_id: "",
      designation: "",
      employment_type: "full_time",
      joining_date: "",
      status: "active",
      address: "",
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
        onSubmit={form.handleSubmit((values) =>
          onSubmit(employeeFormSchema.parse(values))
        )}
        className="flex h-full flex-col"
      >
        <div className="flex-1 space-y-6 overflow-y-auto px-1 pb-6">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="mb-4">
              <h3 className="text-sm font-semibold">Employee Identity</h3>
              <p className="text-xs text-muted-foreground">
                Employee code is generated automatically by the backend after saving.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-lg border bg-muted/30 px-3 py-2">
                <div className="text-xs font-medium text-muted-foreground">
                  Employee Code
                </div>
                <div className="mt-1 text-sm font-semibold">
                  {employeeCode || "Auto generated"}
                </div>
              </div>
              <TextField form={form} name="first_name" label="First Name" />
              <TextField form={form} name="last_name" label="Last Name" />
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="mb-4">
              <h3 className="text-sm font-semibold">Contact Information</h3>
              <p className="text-xs text-muted-foreground">
                Store employee contact and communication details.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <TextField form={form} name="email" label="Email" />
              <TextField form={form} name="phone" label="Phone" />
            </div>

            <div className="mt-4">
              <TextareaField form={form} name="address" label="Address" />
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="mb-4">
              <h3 className="text-sm font-semibold">Employment Information</h3>
              <p className="text-xs text-muted-foreground">
                Assign department, designation, employment type, and joining date.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <SelectField
                form={form}
                name="department_id"
                label="Department"
                placeholder="Select department"
                options={departmentOptions}
              />
              <TextField form={form} name="designation" label="Designation" />
              <SelectField
                form={form}
                name="employment_type"
                label="Employment Type"
                options={employmentTypeOptions}
              />
              <TextField
                form={form}
                name="joining_date"
                label="Joining Date"
                type="date"
              />
              <SelectField
                form={form}
                name="status"
                label="Status"
                options={employeeStatusOptions}
              />
              <div className="flex items-end pb-2">
                <CheckboxField
                  form={form}
                  name="is_active"
                  label="Employee is active"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 -mx-6 flex items-center justify-end gap-3 border-t bg-background px-6 py-4">
          <FormActions
            submitText="Save Employee"
            isSubmitting={isSubmitting}
            onCancel={onCancel}
          />
        </div>
      </form>
    </Form>
  );
}
