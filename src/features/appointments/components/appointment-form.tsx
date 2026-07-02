// src/features/appointments/components/appointment-form.tsx

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
import { appointmentTypeOptions } from "../constants/appointment.constants";
import {
  appointmentFormSchema,
  type AppointmentFormInput,
  type AppointmentFormValues,
} from "../schemas/appointment.schema";

interface AppointmentFormProps {
  defaultValues?: Partial<AppointmentFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: AppointmentFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function AppointmentForm({
  defaultValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: AppointmentFormProps) {
  const today = new Date().toISOString().slice(0, 10);

  const form = useForm<AppointmentFormInput>({
    resolver: zodResolver(appointmentFormSchema),
    defaultValues: {
      patient_id: "",
      doctor_id: "",
      department_id: "",
      appointment_date: today,
      start_time: "09:00",
      end_time: "",
      appointment_type: "opd",
      reason: "",
      notes: "",
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(appointmentFormSchema.parse(values))
        )}
        className="space-y-6"
      >
        <section className="space-y-4 rounded-xl border bg-card p-4">
          <div>
            <h3 className="font-medium">Core Appointment Details</h3>
            <p className="text-sm text-muted-foreground">
              Patient, doctor, date, time, and appointment type.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              form={form}
              name="patient_id"
              label="Patient ID"
              placeholder="Temporary patient UUID"
            />

            <TextField
              form={form}
              name="doctor_id"
              label="Doctor ID"
              placeholder="Temporary doctor UUID"
            />
          </div>

          <TextField
            form={form}
            name="department_id"
            label="Department ID"
            placeholder="Optional department UUID"
          />

          <div className="grid gap-4 md:grid-cols-3">
            <TextField
              form={form}
              name="appointment_date"
              label="Date"
              type="date"
            />

            <TextField
              form={form}
              name="start_time"
              label="Start Time"
              type="time"
            />

            <TextField
              form={form}
              name="end_time"
              label="End Time"
              type="time"
            />
          </div>

          <SelectField
            form={form}
            name="appointment_type"
            label="Appointment Type"
            options={appointmentTypeOptions}
          />
        </section>

        <section className="space-y-4 rounded-xl border bg-card p-4">
          <div>
            <h3 className="font-medium">Reason & Notes</h3>
            <p className="text-sm text-muted-foreground">
              Capture appointment reason and internal notes.
            </p>
          </div>

          <TextareaField
            form={form}
            name="reason"
            label="Reason"
            placeholder="Reason for appointment"
          />

          <TextareaField
            form={form}
            name="notes"
            label="Notes"
            placeholder="Internal appointment notes"
          />
        </section>

        <FormActions
          submitText="Save Appointment"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}