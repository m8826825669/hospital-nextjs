// src/features/lis/components/lab-sample-form.tsx

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
import { labPriorityOptions } from "../constants/lis.constants";
import {
  labSampleFormSchema,
  type LabSampleFormInput,
  type LabSampleFormValues,
} from "../schemas/lis.schema";

interface LabSampleFormProps {
  defaultValues?: Partial<LabSampleFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: LabSampleFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function LabSampleForm({
  defaultValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: LabSampleFormProps) {
  const form = useForm<LabSampleFormInput>({
    resolver: zodResolver(labSampleFormSchema),
    defaultValues: {
      patient_id: "",
      doctor_id: "",
      test_id: "",
      profile_id: "",
      sample_type: "",
      priority: "routine",
      remarks: "",
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(labSampleFormSchema.parse(values))
        )}
        className="space-y-6"
      >
        <section className="space-y-4 rounded-xl border bg-card p-4">
          <h3 className="font-medium">Sample Context</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <TextField form={form} name="patient_id" label="Patient ID" />
            <TextField form={form} name="doctor_id" label="Doctor ID" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <TextField form={form} name="test_id" label="Test ID" />
            <TextField form={form} name="profile_id" label="Profile ID" />
          </div>

          <TextField form={form} name="sample_type" label="Sample Type" />

          <SelectField
            form={form}
            name="priority"
            label="Priority"
            options={labPriorityOptions}
          />

          <TextareaField form={form} name="remarks" label="Remarks" />
        </section>

        <FormActions
          submitText="Save Sample"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}