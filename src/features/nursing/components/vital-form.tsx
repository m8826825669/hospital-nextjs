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
  vitalSignFormSchema,
  type VitalSignFormInput,
  type VitalSignFormValues,
} from "../schemas/nursing.schema";

interface VitalFormProps {
  admissionId?: string;
  isSubmitting?: boolean;
  onSubmit: (values: VitalSignFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function VitalForm({
  admissionId,
  isSubmitting,
  onSubmit,
  onCancel,
}: VitalFormProps) {
  const now = new Date().toISOString().slice(0, 16);

  const form = useForm<VitalSignFormInput>({
    resolver: zodResolver(vitalSignFormSchema),
    defaultValues: {
      patient_id: admissionId ?? "",
      recorded_at: now,
      temperature: undefined,
      pulse: undefined,
      respiratory_rate: undefined,
      systolic_bp: undefined,
      diastolic_bp: undefined,
      spo2: undefined,
      pain_score: undefined,
      consciousness_level: "",
      notes: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(vitalSignFormSchema.parse(values))
        )}
        className="space-y-5"
      >
        <TextField form={form} name="patient_id" label="Patient ID" />

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
          <TextField form={form} name="systolic_bp" label="Systolic BP" type="number" />
          <TextField form={form} name="diastolic_bp" label="Diastolic BP" type="number" />
          <TextField form={form} name="spo2" label="SpO2" type="number" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <TextField form={form} name="pain_score" label="Pain Score" type="number" />
          <TextField form={form} name="consciousness_level" label="Consciousness Level" />
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