// src/features/pharmacy/components/medicine-form.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  CheckboxField,
  FormActions,
  TextField,
} from "@/shared/components/enterprise";
import {
  medicineFormSchema,
  type MedicineFormInput,
  type MedicineFormValues,
} from "../schemas/medicine.schema";

interface MedicineFormProps {
  defaultValues?: Partial<MedicineFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: MedicineFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function MedicineForm({
  defaultValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: MedicineFormProps) {
  const form = useForm<MedicineFormInput>({
    resolver: zodResolver(medicineFormSchema),
    defaultValues: {
      name: "",
      generic_name: "",
      brand_name: "",
      category_id: "",
      dosage_form: "",
      strength: "",
      unit: "",
      manufacturer: "",
      reorder_level: undefined,
      is_active: true,
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(medicineFormSchema.parse(values))
        )}
        className="space-y-6"
      >
        <section className="space-y-4 rounded-xl border bg-card p-4">
          <div>
            <h3 className="font-medium">Medicine Details</h3>
            <p className="text-sm text-muted-foreground">
              Basic medicine master information.
            </p>
          </div>

          <TextField form={form} name="name" label="Medicine Name" />

          <div className="grid gap-4 md:grid-cols-2">
            <TextField form={form} name="generic_name" label="Generic Name" />
            <TextField form={form} name="brand_name" label="Brand Name" />
          </div>

          <TextField
            form={form}
            name="category_id"
            label="Category ID"
            placeholder="Temporary category UUID"
          />

          <div className="grid gap-4 md:grid-cols-3">
            <TextField form={form} name="dosage_form" label="Dosage Form" />
            <TextField form={form} name="strength" label="Strength" />
            <TextField form={form} name="unit" label="Unit" />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <TextField form={form} name="manufacturer" label="Manufacturer" />
            <TextField
              form={form}
              name="reorder_level"
              label="Reorder Level"
              type="number"
            />
          </div>

          <CheckboxField
            form={form}
            name="is_active"
            label="Medicine is active"
          />
        </section>

        <FormActions
          submitText="Save Medicine"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}