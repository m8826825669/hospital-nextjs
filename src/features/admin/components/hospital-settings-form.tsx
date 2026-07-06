// src/features/admin/components/hospital-settings-form.tsx

"use client";

import { useEffect, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Clock3, Coins, Hash, Info, Phone, RotateCcw, Save } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  SelectField,
  TextareaField,
  TextField,
} from "@/shared/components/enterprise";
import type { HospitalSetting } from "../types/admin.types";
import {
  hospitalSettingFormSchema,
  type HospitalSettingFormInput,
  type HospitalSettingFormValues,
} from "../schemas/admin.schema";

interface HospitalSettingsFormProps {
  settings?: HospitalSetting;
  isSubmitting?: boolean;
  onSubmit: (values: HospitalSettingFormValues) => void | Promise<void>;
}

const timezoneOptions = [
  { label: "Asia/Kolkata (GMT +05:30)", value: "Asia/Kolkata" },
  { label: "UTC", value: "UTC" },
  { label: "Asia/Dubai (GMT +04:00)", value: "Asia/Dubai" },
  { label: "Europe/London", value: "Europe/London" },
  { label: "America/New_York", value: "America/New_York" },
];

const currencyOptions = [
  { label: "INR - Indian Rupee (₹)", value: "INR" },
  { label: "USD - US Dollar ($)", value: "USD" },
  { label: "AED - UAE Dirham", value: "AED" },
  { label: "GBP - British Pound (£)", value: "GBP" },
  { label: "EUR - Euro (€)", value: "EUR" },
];

function getDefaultValues(settings?: HospitalSetting): HospitalSettingFormInput {
  return {
    hospital_name: settings?.hospital_name ?? "",
    timezone: settings?.timezone ?? "Asia/Kolkata",
    currency: settings?.currency ?? "INR",
    phone: settings?.phone ?? "",
    email: settings?.email ?? "",
    address: settings?.address ?? "",
  };
}

function SettingsSection({
  children,
  description,
  icon,
  number,
  title,
}: {
  children: ReactNode;
  description?: string;
  icon: ReactNode;
  number: string;
  title: string;
}) {
  return (
    <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-sm font-bold text-blue-700">
          {number}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-blue-700">{icon}</span>
            <h3 className="font-semibold text-slate-950">{title}</h3>
            <Info className="h-3.5 w-3.5 text-slate-400" />
          </div>
          {description ? <p className="mt-1 text-sm text-slate-500">{description}</p> : null}
        </div>
      </div>
      {children}
    </section>
  );
}

export function HospitalSettingsForm({
  settings,
  isSubmitting,
  onSubmit,
}: HospitalSettingsFormProps) {
  const form = useForm<HospitalSettingFormInput>({
    resolver: zodResolver(hospitalSettingFormSchema),
    defaultValues: getDefaultValues(settings),
  });

  useEffect(() => {
    form.reset(getDefaultValues(settings));
  }, [settings, form]);

  function handleReset() {
    form.reset(getDefaultValues(settings));
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(hospitalSettingFormSchema.parse(values))
        )}
        className="space-y-4"
      >
        <SettingsSection
          number="1"
          title="Basic Information"
          description="Official identity used across invoices, reports, and patient documents."
          icon={<Building2 className="h-4 w-4" />}
        >
          <div className="grid gap-4 lg:grid-cols-2">
            <TextField
              form={form}
              name="hospital_name"
              label="Hospital Name"
              placeholder="Enter hospital name"
            />
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">Hospital Code</label>
              <div className="flex h-10 items-center rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-500">
                <Hash className="mr-2 h-4 w-4 text-slate-400" />
                Auto generated after setup
              </div>
            </div>
          </div>
        </SettingsSection>

        <SettingsSection
          number="2"
          title="Localization & Preferences"
          description="Default regional values used by scheduling, billing, and reports."
          icon={<Clock3 className="h-4 w-4" />}
        >
          <div className="grid gap-4 lg:grid-cols-4">
            <SelectField
              form={form}
              name="timezone"
              label="Timezone"
              options={timezoneOptions}
            />
            <SelectField
              form={form}
              name="currency"
              label="Currency"
              options={currencyOptions}
            />
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">Date Format</label>
              <div className="flex h-10 items-center rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600">
                <Clock3 className="mr-2 h-4 w-4 text-slate-400" />
                DD-MM-YYYY
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-900">Time Format</label>
              <div className="flex h-10 items-center rounded-lg border border-slate-200 bg-slate-50 px-3 text-sm text-slate-600">
                <Coins className="mr-2 h-4 w-4 text-slate-400" />
                12 Hour (AM/PM)
              </div>
            </div>
          </div>
        </SettingsSection>

        <SettingsSection
          number="3"
          title="Contact Information"
          description="Contact details shown in patient slips, receipts, and official documents."
          icon={<Phone className="h-4 w-4" />}
        >
          <div className="grid gap-4 lg:grid-cols-[1fr_1fr_2fr]">
            <TextField
              form={form}
              name="phone"
              label="Phone"
              placeholder="Enter phone number"
            />
            <TextField
              form={form}
              name="email"
              label="Email"
              placeholder="Enter email address"
              type="email"
            />
            <TextareaField
              form={form}
              name="address"
              label="Address"
              placeholder="Enter complete address"
            />
          </div>
        </SettingsSection>

        <div className="sticky bottom-0 -mx-5 -mb-5 flex flex-col gap-3 border-t border-slate-200 bg-white/95 px-5 py-4 backdrop-blur sm:-mx-6 sm:-mb-6 sm:flex-row sm:justify-end sm:px-6">
          <Button
            type="button"
            variant="outline"
            className="h-10 gap-2"
            onClick={handleReset}
            disabled={isSubmitting}
          >
            <RotateCcw className="h-4 w-4" />
            Reset
          </Button>
          <Button type="submit" className="h-10 gap-2 bg-blue-700 px-5 hover:bg-blue-800" disabled={isSubmitting}>
            <Save className="h-4 w-4" />
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
