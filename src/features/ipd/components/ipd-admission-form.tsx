// src/features/ipd/components/ipd-admission-form.tsx

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
  ipdAdmissionFormSchema,
  type IpdAdmissionFormInput,
  type IpdAdmissionFormValues,
} from "../schemas/ipd.schema";

interface IpdAdmissionFormProps {
  defaultValues?: Partial<IpdAdmissionFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: IpdAdmissionFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function IpdAdmissionForm({
  defaultValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: IpdAdmissionFormProps) {
  const today = new Date().toISOString().slice(0, 10);

  const form = useForm<IpdAdmissionFormInput>({
    resolver: zodResolver(ipdAdmissionFormSchema),
    defaultValues: {
      patient_id: "",
      doctor_id: "",
      department_id: "",
      ward_id: "",
      bed_id: "",
      admission_date: today,
      admission_time: "",
      diagnosis: "",
      reason_for_admission: "",
      notes: "",
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(ipdAdmissionFormSchema.parse(values))
        )}
        className="space-y-6"
      >
        <section className="space-y-4 rounded-xl border bg-card p-4">
          <h3 className="font-medium">Admission Context</h3>

          <div className="grid gap-4 md:grid-cols-2">
            <TextField form={form} name="patient_id" label="Patient ID" />
            <TextField form={form} name="doctor_id" label="Doctor ID" />
          </div>

          <TextField form={form} name="department_id" label="Department ID" />

          <div className="grid gap-4 md:grid-cols-2">
            <TextField form={form} name="ward_id" label="Ward ID" />
            <TextField form={form} name="bed_id" label="Bed ID" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              form={form}
              name="admission_date"
              label="Admission Date"
              type="date"
            />
            <TextField
              form={form}
              name="admission_time"
              label="Admission Time"
              type="time"
            />
          </div>
        </section>

        <section className="space-y-4 rounded-xl border bg-card p-4">
          <h3 className="font-medium">Clinical Admission Details</h3>

          <TextareaField form={form} name="diagnosis" label="Diagnosis" />
          <TextareaField
            form={form}
            name="reason_for_admission"
            label="Reason for Admission"
          />
          <TextareaField form={form} name="notes" label="Notes" />
        </section>

        <FormActions
          submitText="Save Admission"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}