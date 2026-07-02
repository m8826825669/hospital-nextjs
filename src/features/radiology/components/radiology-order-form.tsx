// src/features/radiology/components/radiology-order-form.tsx

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
import {
  radiologyModalityOptions,
  radiologyPriorityOptions,
} from "../constants/radiology.constants";
import {
  radiologyOrderFormSchema,
  type RadiologyOrderFormInput,
  type RadiologyOrderFormValues,
} from "../schemas/radiology.schema";

interface RadiologyOrderFormProps {
  defaultValues?: Partial<RadiologyOrderFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: RadiologyOrderFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function RadiologyOrderForm({
  defaultValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: RadiologyOrderFormProps) {
  const today = new Date().toISOString().slice(0, 10);

  const form = useForm<RadiologyOrderFormInput>({
    resolver: zodResolver(radiologyOrderFormSchema),
    defaultValues: {
      patient_id: "",
      doctor_id: "",
      modality: "xray",
      study_name: "",
      body_part: "",
      order_date: today,
      scheduled_date: "",
      scheduled_time: "",
      priority: "routine",
      clinical_notes: "",
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(radiologyOrderFormSchema.parse(values))
        )}
        className="space-y-5"
      >
        <div className="grid gap-4 md:grid-cols-2">
          <TextField form={form} name="patient_id" label="Patient ID" />
          <TextField form={form} name="doctor_id" label="Doctor ID" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <SelectField
            form={form}
            name="modality"
            label="Modality"
            options={radiologyModalityOptions}
          />
          <TextField form={form} name="study_name" label="Study Name" />
        </div>

        <TextField form={form} name="body_part" label="Body Part" />

        <div className="grid gap-4 md:grid-cols-3">
          <TextField form={form} name="order_date" label="Order Date" type="date" />
          <TextField
            form={form}
            name="scheduled_date"
            label="Scheduled Date"
            type="date"
          />
          <TextField
            form={form}
            name="scheduled_time"
            label="Scheduled Time"
            type="time"
          />
        </div>

        <SelectField
          form={form}
          name="priority"
          label="Priority"
          options={radiologyPriorityOptions}
        />

        <TextareaField form={form} name="clinical_notes" label="Clinical Notes" />

        <FormActions
          submitText="Save Order"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}