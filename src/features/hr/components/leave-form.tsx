// src/features/hr/components/leave-form.tsx

"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  FormActions,
  SelectField,
  TextareaField,
  TextField,
} from "@/shared/components/enterprise";
import { leaveTypeOptions } from "../constants/hr.constants";
import type { Employee } from "../types/hr.types";
import {
  leaveFormSchema,
  type LeaveFormInput,
  type LeaveFormValues,
} from "../schemas/hr.schema";

interface LeaveFormProps {
  employees?: Employee[];
  isSubmitting?: boolean;
  onSubmit: (values: LeaveFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function LeaveForm({
  employees = [],
  isSubmitting,
  onSubmit,
  onCancel,
}: LeaveFormProps) {
  const form = useForm<LeaveFormInput>({
    resolver: zodResolver(leaveFormSchema),
    defaultValues: {
      employee_id: "",
      leave_type: "annual",
      start_date: "",
      end_date: "",
      reason: "",
    },
  });

  const employeeOptions = employees.map((employee) => ({
    label: `${employee.employee_code} - ${employee.first_name} ${employee.last_name}`,
    value: employee.id,
  }));

  const startDate = useWatch({ control: form.control, name: "start_date" });
  const endDate = useWatch({ control: form.control, name: "end_date" });

  const leaveDays = (() => {
    if (!startDate || !endDate) return 0;
    const start = new Date(startDate);
    const end = new Date(endDate);
    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime()) || end < start) {
      return 0;
    }
    return Math.floor((end.getTime() - start.getTime()) / 86400000) + 1;
  })();

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(leaveFormSchema.parse(values))
        )}
        className="flex h-full flex-col"
      >
        <div className="flex-1 space-y-6 overflow-y-auto px-1 pb-6">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Leave Request</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <SelectField
                form={form}
                name="employee_id"
                label="Employee"
                placeholder="Select employee"
                options={employeeOptions}
              />
              <SelectField
                form={form}
                name="leave_type"
                label="Leave Type"
                options={leaveTypeOptions}
              />
              <TextField form={form} name="start_date" label="Start Date" type="date" />
              <TextField form={form} name="end_date" label="End Date" type="date" />
            </div>

            <div className="mt-4 rounded-lg border bg-muted/30 px-3 py-2 text-sm">
              Calculated leave days: <span className="font-semibold">{leaveDays}</span>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Reason</h3>
            <TextareaField form={form} name="reason" label="Reason" />
          </div>
        </div>

        <div className="sticky bottom-0 -mx-6 flex items-center justify-end gap-3 border-t bg-background px-6 py-4">
          <FormActions
            submitText="Submit Leave"
            isSubmitting={isSubmitting}
            onCancel={onCancel}
          />
        </div>
      </form>
    </Form>
  );
}
