// src/features/opd/components/opd-encounter-form.tsx

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
  opdEncounterFormSchema,
  type OpdEncounterFormInput,
  type OpdEncounterFormValues,
} from "../schemas/opd.schema";

interface OpdEncounterFormProps {
  defaultValues?: Partial<OpdEncounterFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: OpdEncounterFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function OpdEncounterForm({
  defaultValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: OpdEncounterFormProps) {
  const today = new Date().toISOString().slice(0, 10);

  const form = useForm<OpdEncounterFormInput>({
    resolver: zodResolver(opdEncounterFormSchema),
    defaultValues: {
      patient_id: "",
      doctor_id: "",
      appointment_id: "",
      visit_date: today,
      visit_time: "",
      chief_complaint: "",
      history_of_present_illness: "",
      diagnosis: "",
      provisional_diagnosis: "",
      final_diagnosis: "",
      notes: "",
      follow_up_date: "",
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(opdEncounterFormSchema.parse(values))
        )}
        className="space-y-6"
      >
        <section className="space-y-4 rounded-xl border bg-card p-4">
          <div>
            <h3 className="font-medium">Encounter Context</h3>
            <p className="text-sm text-muted-foreground">
              Patient, doctor, appointment, and visit timing.
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
            name="appointment_id"
            label="Appointment ID"
            placeholder="Optional appointment UUID"
          />

          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              form={form}
              name="visit_date"
              label="Visit Date"
              type="date"
            />

            <TextField
              form={form}
              name="visit_time"
              label="Visit Time"
              type="time"
            />
          </div>
        </section>

        <section className="space-y-4 rounded-xl border bg-card p-4">
          <div>
            <h3 className="font-medium">Clinical Notes</h3>
            <p className="text-sm text-muted-foreground">
              SOAP-style clinical documentation foundation.
            </p>
          </div>

          <TextareaField
            form={form}
            name="chief_complaint"
            label="Chief Complaint"
            placeholder="Patient's primary complaint"
          />

          <TextareaField
            form={form}
            name="history_of_present_illness"
            label="History of Present Illness"
            placeholder="Clinical history and symptoms"
          />

          <TextareaField
            form={form}
            name="diagnosis"
            label="Diagnosis"
            placeholder="Working diagnosis"
          />

          <TextareaField
            form={form}
            name="provisional_diagnosis"
            label="Provisional Diagnosis"
          />

          <TextareaField
            form={form}
            name="final_diagnosis"
            label="Final Diagnosis"
          />
        </section>

        <section className="space-y-4 rounded-xl border bg-card p-4">
          <div>
            <h3 className="font-medium">Plan & Follow-up</h3>
            <p className="text-sm text-muted-foreground">
              Treatment plan, general notes, and follow-up date.
            </p>
          </div>

          <TextareaField
            form={form}
            name="notes"
            label="Treatment Plan / Notes"
          />

          <TextField
            form={form}
            name="follow_up_date"
            label="Follow-up Date"
            type="date"
          />
        </section>

        <FormActions
          submitText="Save OPD Encounter"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}