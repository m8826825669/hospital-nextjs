// src/features/nursing/components/nursing-note-form.tsx

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
  nursingNoteFormSchema,
  type NursingNoteFormInput,
  type NursingNoteFormValues,
} from "../schemas/nursing.schema";

interface NursingNoteFormProps {
  admissionId?: string;
  isSubmitting?: boolean;
  onSubmit: (values: NursingNoteFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function NursingNoteForm({
  admissionId,
  isSubmitting,
  onSubmit,
  onCancel,
}: NursingNoteFormProps) {
  const today = new Date().toISOString().slice(0, 10);

  const form = useForm<NursingNoteFormInput>({
    resolver: zodResolver(nursingNoteFormSchema),
    defaultValues: {
      admission_id: admissionId ?? "",
      note_date: today,
      note_type: "",
      notes: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(nursingNoteFormSchema.parse(values))
        )}
        className="space-y-5"
      >
        <TextField form={form} name="admission_id" label="Admission ID" />

        <TextField form={form} name="note_date" label="Note Date" type="date" />

        <TextField form={form} name="note_type" label="Note Type" />

        <TextareaField form={form} name="notes" label="Nursing Notes" />

        <FormActions
          submitText="Save Note"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}