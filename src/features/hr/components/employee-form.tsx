// src/features/hr/components/employee-form.tsx

"use client";

import { BriefcaseBusiness, IdCard, Mail } from "lucide-react";
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
  EnterpriseReadonlyField,
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
        className="flex min-h-[calc(100vh-10rem)] flex-col"
      >
        <div className="space-y-5 pb-8">
          <EnterpriseFormHero
            eyebrow="HR Master Data"
            title="Configure Employee"
            description="Create and maintain the employee profile used by HR, scheduling, clinical assignments, approvals, and access workflows."
            icon={IdCard}
          />

          <EnterpriseFormSection
            step="1"
            icon={IdCard}
            title="Employee Identity"
            description="Employee code is generated automatically by the backend after saving."
          >
            <EnterpriseFormGrid columns={3}>
              <EnterpriseReadonlyField
                label="Employee Code"
                value={employeeCode || "Auto generated"}
                icon={IdCard}
              />
              <TextField form={form} name="first_name" label="First Name" disabled={isSubmitting} />
              <TextField form={form} name="last_name" label="Last Name" disabled={isSubmitting} />
            </EnterpriseFormGrid>
          </EnterpriseFormSection>

          <EnterpriseFormSection
            step="2"
            icon={Mail}
            title="Contact Information"
            description="Store employee contact and communication details."
          >
            <EnterpriseFormGrid columns={2}>
              <TextField form={form} name="email" label="Email" type="email" disabled={isSubmitting} />
              <TextField form={form} name="phone" label="Phone" disabled={isSubmitting} />
            </EnterpriseFormGrid>
            <div className="mt-5">
              <TextareaField form={form} name="address" label="Address" disabled={isSubmitting} />
            </div>
          </EnterpriseFormSection>

          <EnterpriseFormSection
            step="3"
            icon={BriefcaseBusiness}
            title="Employment Information"
            description="Assign department, designation, employment type, joining date, and HR status."
          >
            <EnterpriseFormGrid columns={2}>
              <SelectField
                form={form}
                name="department_id"
                label="Department"
                placeholder="Select department"
                options={departmentOptions}
                disabled={isSubmitting}
              />
              <TextField form={form} name="designation" label="Designation" disabled={isSubmitting} />
              <SelectField
                form={form}
                name="employment_type"
                label="Employment Type"
                options={employmentTypeOptions}
                disabled={isSubmitting}
              />
              <TextField
                form={form}
                name="joining_date"
                label="Joining Date"
                type="date"
                disabled={isSubmitting}
              />
              <SelectField
                form={form}
                name="status"
                label="Status"
                options={employeeStatusOptions}
                disabled={isSubmitting}
              />
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <CheckboxField
                  form={form}
                  name="is_active"
                  label="Employee is active and available for hospital workflows"
                  disabled={isSubmitting}
                />
              </div>
            </EnterpriseFormGrid>
          </EnterpriseFormSection>

          <EnterpriseFormNotice tone="warning">
            Before deactivating an employee, verify open schedules, clinical assignments,
            user access, payroll, and pending approvals.
          </EnterpriseFormNotice>
        </div>

        <EnterpriseFormActions
          submitText="Save Employee"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
          hint="Changes will update employee master data immediately after save."
        />
      </form>
    </Form>
  );
}
