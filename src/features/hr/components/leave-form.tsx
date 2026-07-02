// src/features/hr/components/leave-form.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  FormActions,
  TextareaField,
  TextField,
} from "@/shared/components/enterprise";
import {
  leaveFormSchema,
  type LeaveFormInput,
  type LeaveFormValues,
} from "../schemas/hr.schema";

interface LeaveFormProps {
  isSubmitting?: boolean;
  onSubmit: (values: LeaveFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function LeaveForm({ isSubmitting, onSubmit, onCancel }: LeaveFormProps) {
  const form = useForm<LeaveFormInput>({
    resolver: zodResolver(leaveFormSchema),
    defaultValues: {
      employee_id: "",
      leave_type: "",
      start_date: "",
      end_date: "",
      reason: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(leaveFormSchema.parse(values))
        )}
        className="space-y-5"
      >
        <TextField form={form} name="employee_id" label="Employee ID" />
        <TextField form={form} name="leave_type" label="Leave Type" />

        <div className="grid gap-4 md:grid-cols-2">
          <TextField form={form} name="start_date" label="Start Date" type="date" />
          <TextField form={form} name="end_date" label="End Date" type="date" />
        </div>

        <TextareaField form={form} name="reason" label="Reason" />

        <FormActions
          submitText="Submit Leave"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}