// src/features/admin/components/ward-form.tsx

"use client";

import {
  Building2,
  CheckCircle2,
  CircleAlert,
  DoorOpen,
  Hospital,
  Layers3,
  ShieldCheck,
  Sparkles,
  Stethoscope,
} from "lucide-react";
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

function FormSectionHeader({
  step,
  icon: Icon,
  title,
  description,
}: {
  step: string;
  icon: typeof Building2;
  title: string;
  description: string;
}) {
  return (
    <div className="mb-5 flex items-start gap-3">
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-sm font-bold text-blue-700">
        {step}
      </div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Icon className="h-4 w-4 text-blue-600" />
          <h3 className="text-sm font-semibold uppercase tracking-wide text-slate-900">
            {title}
          </h3>
        </div>
        <p className="mt-1 text-sm leading-6 text-slate-500">{description}</p>
      </div>
    </div>
  );
}

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
        className="flex min-h-[calc(100vh-10rem)] flex-col"
      >
        <div className="space-y-5 pb-8">
          <div className="overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-br from-blue-50 via-white to-cyan-50 shadow-sm">
            <div className="grid gap-6 p-6 lg:grid-cols-[1fr_220px] lg:items-center">
              <div className="flex items-start gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
                  <Hospital className="h-7 w-7" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-white px-3 py-1 text-xs font-medium text-blue-700 shadow-sm">
                    <Sparkles className="h-3.5 w-3.5" />
                    Inpatient Master Data
                  </div>
                  <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">
                    Configure Ward
                  </h2>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600">
                    Wards organize inpatient admissions, nursing assignment, bed capacity,
                    emergency observation, and clinical location visibility.
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Production Checklist
                </div>
                <ul className="mt-3 space-y-2 text-xs text-slate-600">
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Unique ward name</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Floor selected</li>
                  <li className="flex items-center gap-2"><CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" /> Active status confirmed</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
            <FormSectionHeader
              step="1"
              icon={Building2}
              title="Ward Identity"
              description="Define how this ward will appear across admissions, nursing, and bed allocation screens."
            />

            <div className="grid gap-5 lg:grid-cols-2">
              <TextField
                form={form}
                name="name"
                label="Ward Name"
                placeholder="Example: General Ward A"
              />

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

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                    <DoorOpen className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">Ward Code</p>
                    <p className="mt-1 text-xs leading-5 text-slate-500">
                      Generated by backend rules after save. It will be used for bed numbering and reports.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-5 lg:grid-cols-2">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <FormSectionHeader
                step="2"
                icon={Layers3}
                title="Bed Allocation"
                description="This ward becomes available for bed creation and inpatient movement workflows."
              />
              <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
                Beds are managed from the Beds tab after the ward is saved. Keep ward names stable once beds are assigned.
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <FormSectionHeader
                step="3"
                icon={Stethoscope}
                title="Clinical Availability"
                description="Inactive wards are hidden from admission and allocation workflows."
              />
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <CheckboxField
                  form={form}
                  name="active"
                  label="Ward is active and available for hospital workflows"
                />
              </div>
            </div>
          </div>

          <div className="flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <CircleAlert className="mt-0.5 h-4 w-4 shrink-0" />
            <p>
              Before deleting or deactivating a ward, verify that no active beds, admissions, or transfer workflows depend on it.
            </p>
          </div>
        </div>

        <div className="sticky bottom-0 -mx-6 mt-auto border-t border-slate-200 bg-white/95 px-6 py-4 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              Changes will update ward master data immediately after save.
            </div>
            <div className="flex justify-end gap-2">
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel} className="h-11 rounded-xl px-5">
                  Cancel
                </Button>
              )}
              <Button type="submit" disabled={isSubmitting} className="h-11 rounded-xl px-6 shadow-lg shadow-blue-100">
                {isSubmitting ? "Saving..." : "Save Ward"}
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
