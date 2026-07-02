// src/features/hr/components/employee-form.tsx

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
import { employeeStatusOptions } from "../constants/hr.constants";
import {
  employeeFormSchema,
  type EmployeeFormInput,
  type EmployeeFormValues,
} from "../schemas/hr.schema";

interface EmployeeFormProps {
  defaultValues?: Partial<EmployeeFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: EmployeeFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function EmployeeForm({
  defaultValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: EmployeeFormProps) {
  const form = useForm<EmployeeFormInput>({
    resolver: zodResolver(employeeFormSchema),
    defaultValues: {
      employee_code: "",
      full_name: "",
      email: "",
      phone: "",
      department_id: "",
      designation: "",
      joining_date: "",
      status: "active",
      is_active: true,
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(employeeFormSchema.parse(values))
        )}
        className="space-y-5"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextField form={form} name="employee_code" label="Employee Code" />
          <TextField form={form} name="full_name" label="Full Name" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <TextField form={form} name="email" label="Email" />
          <TextField form={form} name="phone" label="Phone" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <TextField form={form} name="department_id" label="Department ID" />
          <TextField form={form} name="designation" label="Designation" />
        </div>

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

        <CheckboxField form={form} name="is_active" label="Employee is active" />

        <FormActions
          submitText="Save Employee"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}