// src/features/admin/components/bed-form.tsx

"use client";

import { Building2, CheckCircle2, Layers3, ShieldCheck } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  CheckboxField,
  SelectField,
  TextField,
} from "@/shared/components/enterprise";
import { bedStatusOptions, bedTypeOptions } from "../constants/admin.constants";
import {
  bedFormSchema,
  type BedFormInput,
  type BedFormValues,
} from "../schemas/admin.schema";
import type { Ward } from "../types/admin.types";

interface BedFormProps {
  defaultValues?: Partial<BedFormInput>;
  isSubmitting?: boolean;
  isWardsLoading?: boolean;
  wardsError?: boolean;
  wards: Ward[];
  onSubmit: (values: BedFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

function getWardLabel(ward: Ward) {
  const details = [ward.floor, ward.ward_type].filter(Boolean).join(" • ");
  return details ? `${ward.name} — ${details}` : ward.name;
}

export function BedForm({
  defaultValues,
  isSubmitting,
  isWardsLoading = false,
  wardsError = false,
  wards,
  onSubmit,
  onCancel,
}: BedFormProps) {
  const form = useForm<BedFormInput>({
    resolver: zodResolver(bedFormSchema),
    defaultValues: {
      ward_id: "",
      bed_number: "",
      bed_type: "GENERAL",
      status: "AVAILABLE",
      active: true,
      ...defaultValues,
    },
  });

  const activeWards = wards.filter((ward) => ward.active ?? ward.is_active ?? true);

  const wardOptions = activeWards.map((ward) => ({
    label: getWardLabel(ward),
    value: ward.id,
  }));

  const wardId = useWatch({ control: form.control, name: "ward_id" });
  const selectedWard = activeWards.find((ward) => ward.id === wardId);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(bedFormSchema.parse(values))
        )}
        className="-mx-6 -mb-6"
      >
        <div className="space-y-6 px-6 pb-28">
          <div className="rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 p-5 shadow-sm">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
              <Building2 className="h-3.5 w-3.5" />
              Inpatient Capacity Master
            </div>

            <h2 className="text-2xl font-bold tracking-tight text-slate-950">
              Configure Bed
            </h2>
            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-600">
              Beds are assigned to wards and used by admissions, transfers,
              nursing allocation, housekeeping, and billing workflows.
            </p>

            <div className="mt-5 grid gap-3 rounded-xl border border-slate-200 bg-white p-4 text-sm shadow-sm sm:grid-cols-3">
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Ward selected from master list
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Unique bed number
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
                Availability status confirmed
              </div>
            </div>
          </div>

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-sm font-bold text-blue-700">
                  1
                </div>
                <div>
                  <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-slate-900">
                    <Layers3 className="h-4 w-4 text-blue-600" />
                    Ward Assignment
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    Select the ward from the active ward master list. Do not type
                    ward IDs manually.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-5 lg:grid-cols-[1.2fr_0.8fr]">
              <SelectField
                form={form}
                name="ward_id"
                label="Ward"
                placeholder={
                  isWardsLoading
                    ? "Loading active wards..."
                    : wardsError
                      ? "Could not load wards"
                      : wardOptions.length
                        ? "Select active ward"
                        : "Create an active ward first"
                }
                options={wardOptions}
                disabled={isWardsLoading || wardsError || !wardOptions.length || isSubmitting}
              />

              <div className="rounded-xl border border-dashed border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Selected Ward
                </p>
                <p className="mt-2 font-semibold text-slate-950">
                  {selectedWard?.name ?? "No ward selected"}
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  {selectedWard
                    ? [selectedWard.floor, selectedWard.ward_type]
                        .filter(Boolean)
                        .join(" • ") || "Ward details not available"
                    : isWardsLoading
                      ? "Loading active ward master list..."
                      : wardsError
                        ? "Could not load wards. Please refresh the page or check the wards API."
                        : "Choose a ward to attach this bed to inpatient workflows."}
                </p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="border-b border-slate-100 p-5">
              <div className="flex items-start gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-blue-50 text-sm font-bold text-blue-700">
                  2
                </div>
                <div>
                  <div className="text-sm font-bold uppercase tracking-wide text-slate-900">
                    Bed Identity
                  </div>
                  <p className="mt-1 text-sm text-slate-600">
                    Define the bed number, bed class, and current operational
                    availability.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid gap-5 p-5 md:grid-cols-2">
              <TextField
                form={form}
                name="bed_number"
                label="Bed Number"
                placeholder="Example: GEN-001"
                disabled={isSubmitting}
              />

              <SelectField
                form={form}
                name="bed_type"
                label="Bed Type"
                placeholder="Select bed type"
                options={bedTypeOptions}
                disabled={isSubmitting}
              />

              <SelectField
                form={form}
                name="status"
                label="Operational Status"
                placeholder="Select status"
                options={bedStatusOptions}
                disabled={isSubmitting}
              />

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                <CheckboxField
                  form={form}
                  name="active"
                  label="Bed is active and available for hospital workflows"
                  disabled={isSubmitting}
                />
              </div>
            </div>
          </section>

          <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">
            <div className="flex items-start gap-3">
              <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0" />
              <p>
                Before deactivating or deleting a bed, verify that there are no
                active admissions, transfers, reservations, housekeeping tasks,
                or billing workflows linked to it.
              </p>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 flex items-center justify-between gap-3 border-t border-slate-200 bg-white/95 px-6 py-4 shadow-[0_-10px_30px_rgba(15,23,42,0.08)] backdrop-blur">
          <p className="hidden text-sm text-slate-600 sm:block">
            Changes will update bed master data immediately after save.
          </p>
          <div className="ml-auto flex items-center gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting || isWardsLoading || wardsError || !wardOptions.length}>
              {isSubmitting ? "Saving..." : "Save Bed"}
            </Button>
          </div>
        </div>
      </form>
    </Form>
  );
}
