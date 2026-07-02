// src/features/emergency/components/emergency-encounter-form.tsx

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
import { erSeverityOptions } from "../constants/emergency.constants";
import {
  emergencyEncounterFormSchema,
  type EmergencyEncounterFormInput,
  type EmergencyEncounterFormValues,
} from "../schemas/emergency.schema";

interface EmergencyEncounterFormProps {
  defaultValues?: Partial<EmergencyEncounterFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: EmergencyEncounterFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function EmergencyEncounterForm({
  defaultValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: EmergencyEncounterFormProps) {
  const now = new Date().toISOString().slice(0, 16);

  const form = useForm<EmergencyEncounterFormInput>({
    resolver: zodResolver(emergencyEncounterFormSchema),
    defaultValues: {
      patient_id: "",
      arrival_time: now,
      chief_complaint: "",
      severity: "urgent",
      doctor_id: "",
      bed_number: "",
      triage_notes: "",
      vitals_summary: "",
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(emergencyEncounterFormSchema.parse(values))
        )}
        className="space-y-5"
      >
        <TextField form={form} name="patient_id" label="Patient ID" />

        <TextField
          form={form}
          name="arrival_time"
          label="Arrival Time"
          type="datetime-local"
        />

        <TextareaField
          form={form}
          name="chief_complaint"
          label="Chief Complaint"
        />

        <SelectField
          form={form}
          name="severity"
          label="Severity"
          options={erSeverityOptions}
        />

        <div className="grid gap-4 md:grid-cols-2">
          <TextField form={form} name="doctor_id" label="Doctor ID" />
          <TextField form={form} name="bed_number" label="ER Bed / Bay" />
        </div>

        <TextareaField form={form} name="vitals_summary" label="Vitals Summary" />
        <TextareaField form={form} name="triage_notes" label="Triage Notes" />

        <FormActions
          submitText="Save ER Encounter"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}