// src/features/admin/components/ward-form.tsx

"use client";

import { Building2, CheckCircle2, Layers3, Stethoscope } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  CheckboxField,
  SelectField,
  TextField,
} from "@/shared/components/enterprise";
import {
  wardFormSchema,
  type WardFormInput,
  type WardFormValues,
} from "../schemas/admin.schema";

interface WardFormProps {
  defaultValues?: Partial<WardFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: WardFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

const wardTypeOptions = [
  { label: "General Ward", value: "General" },
  { label: "Intensive Care Unit", value: "ICU" },
  { label: "Emergency Observation", value: "Emergency" },
  { label: "Maternity Ward", value: "Maternity" },
  { label: "Isolation Ward", value: "Isolation" },
  { label: "Private Ward", value: "Private" },
  { label: "Semi-Private Ward", value: "Semi-Private" },
  { label: "Day Care", value: "Day Care" },
];

const floorOptions = [
  { label: "Ground Floor", value: "Ground Floor" },
  { label: "1st Floor", value: "1" },
  { label: "2nd Floor", value: "2" },
  { label: "3rd Floor", value: "3" },
  { label: "4th Floor", value: "4" },
  { label: "5th Floor", value: "5" },
];

export function WardForm({
  defaultValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: WardFormProps) {
  const form = useForm<WardFormInput>({
    resolver: zodResolver(wardFormSchema),
    defaultValues: {
      name: "",
      ward_type: "General",
      floor: "",
      active: true,
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(wardFormSchema.parse(values))
        )}
        className="flex min-h-[calc(100vh-9rem)] flex-col"
      >
        <div className="space-y-5 pb-6">
          <div className="rounded-2xl border bg-card p-5 shadow-sm">
            <div className="mb-5 flex items-start gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border bg-primary/10 text-primary">
                <Building2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-base font-semibold">Ward Information</h3>
                <p className="text-sm text-muted-foreground">
                  Define the ward name, clinical category, floor, and operating status.
                </p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <TextField
                  form={form}
                  name="name"
                  label="Ward Name"
                  placeholder="Example: General Ward A"
                />
              </div>

              <SelectField
                form={form}
                name="ward_type"
                label="Ward Type"
                placeholder="Select ward type"
                options={wardTypeOptions}
              />

              <SelectField
                form={form}
                name="floor"
                label="Floor"
                placeholder="Select floor"
                options={floorOptions}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <Layers3 className="h-4 w-4 text-primary" />
                Bed Allocation Ready
              </div>
              <p className="text-sm text-muted-foreground">
                After saving the ward, beds can be created and linked to this ward from the Beds tab.
              </p>
            </div>

            <div className="rounded-2xl border bg-card p-5 shadow-sm">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
                <Stethoscope className="h-4 w-4 text-primary" />
                Clinical Visibility
              </div>
              <CheckboxField form={form} name="active" label="Ward is active and available for hospital workflows" />
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 -mx-6 mt-auto border-t bg-background/95 px-6 py-4 backdrop-blur">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              This will be saved as ward master data.
            </div>
            <div className="flex justify-end gap-2">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel}>
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "Saving..." : "Save Ward"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
