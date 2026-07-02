// src/features/admin/components/bed-form.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  CheckboxField,
  FormActions,
  SelectField,
  TextField,
} from "@/shared/components/enterprise";
import { bedStatusOptions } from "../constants/admin.constants";
import {
  bedFormSchema,
  type BedFormInput,
  type BedFormValues,
} from "../schemas/admin.schema";

interface BedFormProps {
  defaultValues?: Partial<BedFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: BedFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function BedForm({
  defaultValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: BedFormProps) {
  const form = useForm<BedFormInput>({
    resolver: zodResolver(bedFormSchema),
    defaultValues: {
      ward_id: "",
      bed_number: "",
      bed_type: "",
      status: "available",
      is_active: true,
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(bedFormSchema.parse(values))
        )}
        className="space-y-5"
      >
        <TextField form={form} name="ward_id" label="Ward ID" />
        <TextField form={form} name="bed_number" label="Bed Number" />
        <TextField form={form} name="bed_type" label="Bed Type" />

        <SelectField
          form={form}
          name="status"
          label="Status"
          options={bedStatusOptions}
        />

        <CheckboxField form={form} name="is_active" label="Bed is active" />

        <FormActions
          submitText="Save Bed"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}