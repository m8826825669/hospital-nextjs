// src/features/radiology/components/radiology-report-form.tsx

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
  radiologyReportFormSchema,
  type RadiologyReportFormInput,
  type RadiologyReportFormValues,
} from "../schemas/radiology.schema";

interface RadiologyReportFormProps {
  defaultValues?: Partial<RadiologyReportFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: RadiologyReportFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function RadiologyReportForm({
  defaultValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: RadiologyReportFormProps) {
  const form = useForm<RadiologyReportFormInput>({
    resolver: zodResolver(radiologyReportFormSchema),
    defaultValues: {
      report_text: "",
      impression: "",
      radiologist_id: "",
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(radiologyReportFormSchema.parse(values))
        )}
        className="space-y-5"
      >
        <TextField form={form} name="radiologist_id" label="Radiologist ID" />

        <TextareaField form={form} name="report_text" label="Report Text" />

        <TextareaField form={form} name="impression" label="Impression" />

        <FormActions
          submitText="Save Report"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}