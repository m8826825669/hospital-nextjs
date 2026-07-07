// src/features/admin/components/hospital-settings-form.tsx

"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Building2, Clock3, Coins, Hash, Phone } from "lucide-react";

import { Form } from "@/components/ui/form";
import {
  EnterpriseFormActions,
  EnterpriseFormGrid,
  EnterpriseFormHero,
  EnterpriseFormSection,
  EnterpriseReadonlyField,
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
        className="flex min-h-[calc(100vh-16rem)] flex-col"
      >
        <div className="space-y-5 pb-8">
          <EnterpriseFormHero
            eyebrow="Hospital Profile"
            title="Hospital Settings"
            description="Configure the official hospital identity, regional defaults, and communication details used across documents, billing, and reports."
            icon={Building2}
          />

          <EnterpriseFormSection
            step="1"
            icon={Building2}
            title="Basic Information"
            description="Official identity used across invoices, reports, and patient documents."
          >
            <EnterpriseFormGrid columns={2}>
              <TextField
                form={form}
                name="hospital_name"
                label="Hospital Name"
                placeholder="Enter hospital name"
                disabled={isSubmitting}
              />
              <EnterpriseReadonlyField
                label="Hospital Code"
                value="Auto generated after setup"
                icon={Hash}
              />
            </EnterpriseFormGrid>
          </EnterpriseFormSection>

          <EnterpriseFormSection
            step="2"
            icon={Clock3}
            title="Localization & Preferences"
            description="Default regional values used by scheduling, billing, and reports."
          >
            <EnterpriseFormGrid columns={4}>
              <SelectField
                form={form}
                name="timezone"
                label="Timezone"
                options={timezoneOptions}
                disabled={isSubmitting}
              />
              <SelectField
                form={form}
                name="currency"
                label="Currency"
                options={currencyOptions}
                disabled={isSubmitting}
              />
              <EnterpriseReadonlyField
                label="Date Format"
                value="DD-MM-YYYY"
                icon={Clock3}
              />
              <EnterpriseReadonlyField
                label="Time Format"
                value="12 Hour (AM/PM)"
                icon={Coins}
              />
            </EnterpriseFormGrid>
          </EnterpriseFormSection>

          <EnterpriseFormSection
            step="3"
            icon={Phone}
            title="Contact Information"
            description="Contact details shown in patient slips, receipts, and official documents."
          >
            <EnterpriseFormGrid columns={3}>
              <TextField
                form={form}
                name="phone"
                label="Phone"
                placeholder="Enter phone number"
                disabled={isSubmitting}
              />
              <TextField
                form={form}
                name="email"
                label="Email"
                placeholder="Enter email address"
                type="email"
                disabled={isSubmitting}
              />
              <TextareaField
                form={form}
                name="address"
                label="Address"
                placeholder="Enter complete address"
                disabled={isSubmitting}
              />
            </EnterpriseFormGrid>
          </EnterpriseFormSection>
        </div>

        <EnterpriseFormActions
          submitText="Save Changes"
          resetText="Reset"
          isSubmitting={isSubmitting}
          onReset={handleReset}
          hint="Hospital profile changes are reflected across documents and reports."
        />
      </form>
    </Form>
  );
}
