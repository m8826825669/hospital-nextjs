// src/features/ot/components/surgery-form.tsx

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
import { anesthesiaTypeOptions } from "../constants/ot.constants";
import {
  surgeryFormSchema,
  type SurgeryFormInput,
  type SurgeryFormValues,
} from "../schemas/ot.schema";

interface SurgeryFormProps {
  defaultValues?: Partial<SurgeryFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: SurgeryFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function SurgeryForm({
  defaultValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: SurgeryFormProps) {
  const today = new Date().toISOString().slice(0, 10);

  const form = useForm<SurgeryFormInput>({
    resolver: zodResolver(surgeryFormSchema),
    defaultValues: {
      patient_id: "",
      surgeon_id: "",
      assistant_surgeon_id: "",
      theatre_id: "",
      scheduled_date: today,
      scheduled_start_time: "09:00",
      scheduled_end_time: "",
      procedure_name: "",
      diagnosis: "",
      anesthesia_type: "",
      notes: "",
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(surgeryFormSchema.parse(values))
        )}
        className="space-y-6"
      >
        <section className="space-y-4 rounded-xl border bg-card p-4">
          <h3 className="font-medium">Surgery Context</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <TextField form={form} name="patient_id" label="Patient ID" />
            <TextField form={form} name="surgeon_id" label="Surgeon ID" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              form={form}
              name="assistant_surgeon_id"
              label="Assistant Surgeon ID"
            />
            <TextField form={form} name="theatre_id" label="Theatre ID" />
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <TextField
              form={form}
              name="scheduled_date"
              label="Scheduled Date"
              type="date"
            />
            <TextField
              form={form}
              name="scheduled_start_time"
              label="Start Time"
              type="time"
            />
            <TextField
              form={form}
              name="scheduled_end_time"
              label="End Time"
              type="time"
            />
          </div>
        </section>

        <section className="space-y-4 rounded-xl border bg-card p-4">
          <h3 className="font-medium">Procedure Details</h3>

          <TextField
            form={form}
            name="procedure_name"
            label="Procedure Name"
          />

          <TextareaField form={form} name="diagnosis" label="Diagnosis" />

          <SelectField
            form={form}
            name="anesthesia_type"
            label="Anesthesia Type"
            options={anesthesiaTypeOptions}
            placeholder="Select anesthesia type"
          />

          <TextareaField form={form} name="notes" label="Notes" />
        </section>

        <FormActions
          submitText="Save Surgery"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}