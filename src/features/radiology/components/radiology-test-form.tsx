// src/features/radiology/components/radiology-test-form.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import {
  CheckboxField,
  FormActions,
  SelectField,
  TextareaField,
  TextField,
} from "@/shared/components/enterprise";
import { bodyPartOptions, modalityOptions } from "../constants/radiology.constants";
import {
  radiologyTestFormSchema,
  type RadiologyTestFormInput,
  type RadiologyTestFormValues,
} from "../schemas/radiology.schema";

interface RadiologyTestFormProps {
  defaultValues?: Partial<RadiologyTestFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: RadiologyTestFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function RadiologyTestForm({
  defaultValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: RadiologyTestFormProps) {
  const form = useForm<RadiologyTestFormInput>({
    resolver: zodResolver(radiologyTestFormSchema),
    defaultValues: {
      code: "",
      name: "",
      modality: "xray",
      body_part: "",
      department_id: "",
      estimated_duration_minutes: 30,
      contrast_required: false,
      description: "",
      preparation: "",
      price: 0,
      is_active: true,
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(radiologyTestFormSchema.parse(values)))}
        className="flex h-full flex-col"
      >
        <div className="flex-1 space-y-6 overflow-y-auto px-1 pb-6">
          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="mb-4">
              <h3 className="text-sm font-semibold">Test Catalogue</h3>
              <p className="text-xs text-muted-foreground">
                Define modality, body part, scan duration, preparation, and pricing.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
              <TextField form={form} name="code" label="Code" />
              <TextField form={form} name="name" label="Test Name" />
              <SelectField form={form} name="modality" label="Modality" options={modalityOptions} />
              <SelectField form={form} name="body_part" label="Body Part" options={bodyPartOptions} />
              <TextField form={form} name="estimated_duration_minutes" label="Estimated Duration (minutes)" type="number" />
              <TextField form={form} name="price" label="Cost / Price" type="number" />
              <div className="flex items-end pb-2">
                <CheckboxField form={form} name="contrast_required" label="Contrast required" />
              </div>
              <div className="flex items-end pb-2">
                <CheckboxField form={form} name="is_active" label="Active test" />
              </div>
            </div>
          </div>

          <div className="rounded-xl border bg-card p-5 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold">Preparation & Notes</h3>
            <div className="grid gap-4 lg:grid-cols-2">
              <TextareaField form={form} name="preparation" label="Patient Preparation" />
              <TextareaField form={form} name="description" label="Description / Protocol Notes" />
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 -mx-6 flex items-center justify-end gap-3 border-t bg-background px-6 py-4">
          <FormActions submitText="Save Test" isSubmitting={isSubmitting} onCancel={onCancel} />
        </div>
      </form>
    </Form>
  );
}
