// src/features/nursing/components/vital-form.tsx

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
  vitalFormSchema,
  type VitalFormInput,
  type VitalFormValues,
} from "../schemas/nursing.schema";

interface VitalFormProps {
  admissionId?: string;
  isSubmitting?: boolean;
  onSubmit: (values: VitalFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function VitalForm({
  admissionId,
  isSubmitting,
  onSubmit,
  onCancel,
}: VitalFormProps) {
  const now = new Date().toISOString().slice(0, 16);

  const form = useForm<VitalFormInput>({
    resolver: zodResolver(vitalFormSchema),
    defaultValues: {
      admission_id: admissionId ?? "",
      recorded_at: now,
      temperature: undefined,
      pulse: undefined,
      respiratory_rate: undefined,
      blood_pressure: "",
      spo2: undefined,
      pain_score: undefined,
      notes: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(vitalFormSchema.parse(values))
        )}
        className="space-y-5"
      >
        <TextField form={form} name="admission_id" label="Admission ID" />

        <TextField
          form={form}
          name="recorded_at"
          label="Recorded At"
          type="datetime-local"
        />

        <div className="grid gap-4 md:grid-cols-3">
          <TextField form={form} name="temperature" label="Temperature" type="number" />
          <TextField form={form} name="pulse" label="Pulse" type="number" />
          <TextField
            form={form}
            name="respiratory_rate"
            label="Respiratory Rate"
            type="number"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <TextField form={form} name="blood_pressure" label="Blood Pressure" />
          <TextField form={form} name="spo2" label="SpO2" type="number" />
          <TextField form={form} name="pain_score" label="Pain Score" type="number" />
        </div>

        <TextareaField form={form} name="notes" label="Notes" />

        <FormActions
          submitText="Save Vitals"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}