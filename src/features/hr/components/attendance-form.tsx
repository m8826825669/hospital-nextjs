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
import type { Employee } from "../types/hr.types";
import {
  attendanceFormSchema,
  type AttendanceFormInput,
  type AttendanceFormValues,
} from "../schemas/hr.schema";

interface AttendanceFormProps {
  employees?: Employee[];
  isSubmitting?: boolean;
  onSubmit: (values: AttendanceFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function AttendanceForm({
  employees = [],
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

  const employeeOptions = employees.map((employee) => ({
    label: `${employee.employee_code} - ${employee.first_name} ${employee.last_name}`,
    value: employee.id,
  }));

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(attendanceFormSchema.parse(values))
        )}
        className="flex h-full flex-col"
      >
        <div className="flex-1 space-y-6 overflow-y-auto px-1 pb-6">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Attendance Details</h3>
            <SelectField
              form={form}
              name="employee_id"
              label="Employee"
              placeholder="Select employee"
              options={employeeOptions}
            />

            <div className="mt-4 grid gap-4 md:grid-cols-3">
              <TextField form={form} name="attendance_date" label="Date" type="date" />
              <TextField form={form} name="check_in" label="Check In" type="time" />
              <TextField form={form} name="check_out" label="Check Out" type="time" />
            </div>

            <div className="mt-4">
              <SelectField
                form={form}
                name="status"
                label="Status"
                options={attendanceStatusOptions}
              />
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Remarks</h3>
            <TextareaField form={form} name="remarks" label="Remarks" />
          </div>
        </div>

        <div className="sticky bottom-0 -mx-6 flex items-center justify-end gap-3 border-t bg-background px-6 py-4">
          <FormActions
            submitText="Save Attendance"
            isSubmitting={isSubmitting}
            onCancel={onCancel}
          />
        </div>
      </form>
    </Form>
  );
}
