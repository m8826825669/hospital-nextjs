// src/features/hr/components/attendance-form.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  FormActions,
  SelectField,
  TextareaField,
  TextField,
} from "@/shared/components/enterprise";
import { attendanceStatusOptions } from "../constants/hr.constants";
import {
  attendanceFormSchema,
  type AttendanceFormInput,
  type AttendanceFormValues,
} from "../schemas/hr.schema";

interface AttendanceFormProps {
  isSubmitting?: boolean;
  onSubmit: (values: AttendanceFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function AttendanceForm({
  isSubmitting,
  onSubmit,
  onCancel,
}: AttendanceFormProps) {
  const today = new Date().toISOString().slice(0, 10);

  const form = useForm<AttendanceFormInput>({
    resolver: zodResolver(attendanceFormSchema),
    defaultValues: {
      employee_id: "",
      attendance_date: today,
      check_in: "",
      check_out: "",
      status: "present",
      remarks: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(attendanceFormSchema.parse(values))
        )}
        className="space-y-5"
      >
        <TextField form={form} name="employee_id" label="Employee ID" />

        <div className="grid gap-4 md:grid-cols-3">
          <TextField
            form={form}
            name="attendance_date"
            label="Date"
            type="date"
          />
          <TextField form={form} name="check_in" label="Check In" type="time" />
          <TextField form={form} name="check_out" label="Check Out" type="time" />
        </div>

        <SelectField
          form={form}
          name="status"
          label="Status"
          options={attendanceStatusOptions}
        />

        <TextareaField form={form} name="remarks" label="Remarks" />

        <FormActions
          submitText="Save Attendance"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}