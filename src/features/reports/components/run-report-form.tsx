// src/features/reports/components/run-report-form.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  FormActions,
  SelectField,
  TextField,
} from "@/shared/components/enterprise";

import {
  reportFormatOptions,
  reportModuleOptions,
} from "../constants/reports.constants";
import {
  runReportFormSchema,
  type RunReportFormInput,
  type RunReportFormValues,
} from "../schemas/reports.schema";

interface RunReportFormProps {
  reportId: string;
  isSubmitting?: boolean;
  onSubmit: (values: RunReportFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function RunReportForm({
  reportId,
  isSubmitting,
  onSubmit,
  onCancel,
}: RunReportFormProps) {
  const form = useForm<RunReportFormInput>({
    resolver: zodResolver(runReportFormSchema),
    defaultValues: {
      report_id: reportId,
      format: "pdf",
      date_from: "",
      date_to: "",
      patient_id: "",
      doctor_id: "",
      department_id: "",
      module: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(runReportFormSchema.parse(values))
        )}
        className="space-y-6"
      >
        <section className="space-y-4 rounded-xl border bg-card p-4">
          <TextField form={form} name="report_id" label="Report ID" disabled />

          <SelectField
            form={form}
            name="format"
            label="Export Format"
            options={reportFormatOptions}
          />

          <div className="grid gap-4 md:grid-cols-2">
            <TextField form={form} name="date_from" label="Date From" type="date" />
            <TextField form={form} name="date_to" label="Date To" type="date" />
          </div>

          <SelectField
            form={form}
            name="module"
            label="Module"
            options={reportModuleOptions}
            placeholder="Optional module filter"
          />

          <div className="grid gap-4 md:grid-cols-3">
            <TextField form={form} name="patient_id" label="Patient ID" />
            <TextField form={form} name="doctor_id" label="Doctor ID" />
            <TextField form={form} name="department_id" label="Department ID" />
          </div>
        </section>

        <FormActions
          submitText="Run Report"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}