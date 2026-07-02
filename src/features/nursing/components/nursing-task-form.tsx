// src/features/nursing/components/nursing-task-form.tsx

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
import { nursingTaskPriorityOptions } from "../constants/nursing.constants";
import {
  nursingTaskFormSchema,
  type NursingTaskFormInput,
  type NursingTaskFormValues,
} from "../schemas/nursing.schema";

interface NursingTaskFormProps {
  admissionId?: string;
  isSubmitting?: boolean;
  onSubmit: (values: NursingTaskFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function NursingTaskForm({
  admissionId,
  isSubmitting,
  onSubmit,
  onCancel,
}: NursingTaskFormProps) {
  const form = useForm<NursingTaskFormInput>({
    resolver: zodResolver(nursingTaskFormSchema),
    defaultValues: {
      admission_id: admissionId ?? "",
      title: "",
      description: "",
      due_at: "",
      priority: "normal",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(nursingTaskFormSchema.parse(values))
        )}
        className="space-y-5"
      >
        <TextField form={form} name="admission_id" label="Admission ID" />
        <TextField form={form} name="title" label="Task Title" />
        <TextareaField form={form} name="description" label="Description" />

        <TextField form={form} name="due_at" label="Due At" type="datetime-local" />

        <SelectField
          form={form}
          name="priority"
          label="Priority"
          options={nursingTaskPriorityOptions}
        />

        <FormActions
          submitText="Save Task"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}