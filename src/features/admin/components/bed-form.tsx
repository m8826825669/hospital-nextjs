// src/features/admin/components/bed-form.tsx

"use client";

import { BedDouble, Building2, Layers3, ShieldCheck } from "lucide-react";
import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import {
  CheckboxField,
  EnterpriseFormActions,
  EnterpriseFormGrid,
  EnterpriseFormHero,
  EnterpriseFormNotice,
  EnterpriseFormSection,
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
  const wardOptions = activeWards.map((ward) => ({ label: getWardLabel(ward), value: ward.id }));
  const wardId = useWatch({ control: form.control, name: "ward_id" });
  const selectedWard = activeWards.find((ward) => ward.id === wardId);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(bedFormSchema.parse(values))
        )}
        className="flex min-h-[calc(100vh-10rem)] flex-col"
      >
        <div className="space-y-5 pb-8">
          <EnterpriseFormHero
            eyebrow="Capacity Master Data"
            title="Configure Bed"
            description="Beds are the operational unit for admissions, transfers, nursing assignment, housekeeping, and billing workflows."
            icon={BedDouble}
            aside={
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-900">
                  <ShieldCheck className="h-4 w-4 text-emerald-600" />
                  Allocation Rules
                </div>
                <ul className="mt-3 space-y-2 text-xs leading-5 text-slate-600">
                  <li>• Select an active ward first</li>
                  <li>• Use stable bed numbers</li>
                  <li>• Match status with occupancy</li>
                </ul>
              </div>
            }
          />

          <EnterpriseFormSection
            step="1"
            icon={Building2}
            title="Ward Assignment"
            description="Choose the clinical location where this bed belongs."
          >
            <EnterpriseFormGrid columns={2}>
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
                        ? "Select ward"
                        : "Create an active ward first"
                }
                options={wardOptions}
                disabled={isSubmitting || isWardsLoading || wardsError || !wardOptions.length}
              />
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                {selectedWard ? (
                  <>
                    <div className="font-semibold text-slate-900">{selectedWard.name}</div>
                    <div className="mt-1 text-xs text-slate-500">
                      {[selectedWard.floor, selectedWard.ward_type].filter(Boolean).join(" • ") || "Ward details not specified"}
                    </div>
                  </>
                ) : (
                  "Select a ward to preview its location and ward type."
                )}
              </div>
            </EnterpriseFormGrid>
          </EnterpriseFormSection>

          <EnterpriseFormSection
            step="2"
            icon={Layers3}
            title="Bed Details"
            description="Define the bed number, type, operational status, and workflow availability."
          >
            <EnterpriseFormGrid columns={2}>
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
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <CheckboxField
                  form={form}
                  name="active"
                  label="Bed is active and available for hospital workflows"
                  disabled={isSubmitting}
                />
              </div>
            </EnterpriseFormGrid>
          </EnterpriseFormSection>

          <EnterpriseFormNotice tone="warning">
            Before deactivating or deleting a bed, verify that there are no active
            admissions, transfers, reservations, housekeeping tasks, or billing workflows linked to it.
          </EnterpriseFormNotice>
        </div>

        <EnterpriseFormActions
          submitText="Save Bed"
          isSubmitting={isSubmitting}
          submitDisabled={isWardsLoading || wardsError || !wardOptions.length}
          onCancel={onCancel}
          hint="Changes will update bed master data immediately after save."
        />
      </form>
    </Form>
  );
}
