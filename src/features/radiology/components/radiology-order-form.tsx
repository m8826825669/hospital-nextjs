// src/features/radiology/components/radiology-order-form.tsx

"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { FormActions, SelectField, TextareaField, TextField } from "@/shared/components/enterprise";
import { radiologyPriorityOptions, radiologyRoomOptions } from "../constants/radiology.constants";
import {
  radiologyOrderFormSchema,
  type RadiologyOrderFormInput,
  type RadiologyOrderFormValues,
} from "../schemas/radiology.schema";
import type { LookupOption, RadiologyTest } from "../types/radiology.types";

interface RadiologyOrderFormProps {
  patients?: LookupOption[];
  doctors?: LookupOption[];
  tests?: RadiologyTest[];
  isSubmitting?: boolean;
  onSubmit: (values: RadiologyOrderFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function RadiologyOrderForm({
  patients = [],
  doctors = [],
  tests = [],
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
      test_id: "",
      order_date: today,
      scheduled_date: "",
      priority: "routine",
      clinical_notes: "",
      clinical_indication: "",
      diagnosis: "",
      instructions: "",
      technologist_id: "",
      room: "",
    },
  });

  const testId = useWatch({ control: form.control, name: "test_id" });
  const selectedTest = tests.find((test) => test.id === testId);

  const testOptions = tests.map((test) => ({
    label: `${test.name} (${test.modality.toUpperCase()})${test.body_part ? ` - ${test.body_part}` : ""}`,
    value: test.id,
  }));
  const patientOptions = patients.map((patient) => ({ label: patient.label, value: patient.id }));
  const doctorOptions = [
    { label: "No doctor selected", value: "" },
    ...doctors.map((doctor) => ({ label: doctor.label, value: doctor.id })),
  ];

  const testSummary = selectedTest ? [
      ["Modality", selectedTest.modality?.toUpperCase()],
      ["Body Part", selectedTest.body_part ?? "-"],
      ["Duration", selectedTest.estimated_duration_minutes ? `${selectedTest.estimated_duration_minutes} min` : "-"],
      ["Contrast", selectedTest.contrast_required ? "Required" : "Not required"],
  ] : null;

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(radiologyOrderFormSchema.parse(values)))}
        className="flex h-full flex-col"
      >
        <div className="flex-1 space-y-6 overflow-y-auto px-1 pb-6">
          <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <div className="mb-4">
                <h3 className="text-sm font-semibold">Patient & Referrer</h3>
                <p className="text-xs text-muted-foreground">Select the patient and referring clinician.</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <SelectField form={form} name="patient_id" label="Patient" placeholder="Select patient" options={patientOptions} />
                <SelectField form={form} name="doctor_id" label="Referring Doctor" placeholder="Select doctor" options={doctorOptions} />
                <TextField form={form} name="diagnosis" label="Diagnosis" />
                <SelectField form={form} name="priority" label="Priority" options={radiologyPriorityOptions} />
              </div>
            </div>

            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <h3 className="mb-4 text-sm font-semibold">Selected Test</h3>
              <SelectField form={form} name="test_id" label="Radiology Test" placeholder="Select test" options={testOptions} />
              <div className="mt-4 rounded-lg border bg-muted/30 p-3 text-xs">
                {testSummary ? (
                  <div className="grid gap-2">
                    {testSummary.map(([label, value]) => (
                      <div className="flex justify-between gap-4" key={label}>
                        <span className="text-muted-foreground">{label}</span>
                        <span className="font-medium">{value}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">Test protocol details appear after selection.</p>
                )}
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="mb-4">
              <h3 className="text-sm font-semibold">Scheduling</h3>
              <p className="text-xs text-muted-foreground">Assign scan date, room, and workflow instructions.</p>
            </div>
            <div className="grid gap-4 md:grid-cols-3">
              <TextField form={form} name="order_date" label="Order Date" type="date" />
              <TextField form={form} name="scheduled_date" label="Scheduled Date" type="date" />
              <SelectField form={form} name="room" label="Room" options={[{ label: "Select room", value: "" }, ...radiologyRoomOptions]} />
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Clinical Indication & Instructions</h3>
            <div className="grid gap-4 lg:grid-cols-3">
              <TextareaField form={form} name="clinical_indication" label="Clinical Indication" />
              <TextareaField form={form} name="instructions" label="Technologist Instructions" />
              <TextareaField form={form} name="clinical_notes" label="Additional Notes" />
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 -mx-6 flex items-center justify-end gap-3 border-t bg-background px-6 py-4">
          <FormActions submitText="Create Order" isSubmitting={isSubmitting} onCancel={onCancel} />
        </div>
      </form>
    </Form>
  );
}
