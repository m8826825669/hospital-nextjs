// src/features/admin/components/hospital-settings-form.tsx

"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  FormActions,
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

export function HospitalSettingsForm({
  settings,
  isSubmitting,
  onSubmit,
}: HospitalSettingsFormProps) {
  const form = useForm<HospitalSettingFormInput>({
    resolver: zodResolver(hospitalSettingFormSchema),
    defaultValues: {
      hospital_name: "",
      timezone: "",
      currency: "",
      phone: "",
      email: "",
      address: "",
    },
  });

  useEffect(() => {
    if (settings) {
      form.reset({
        hospital_name: settings.hospital_name,
        timezone: settings.timezone ?? "",
        currency: settings.currency ?? "",
        phone: settings.phone ?? "",
        email: settings.email ?? "",
        address: settings.address ?? "",
      });
    }
  }, [settings, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(hospitalSettingFormSchema.parse(values))
        )}
        className="space-y-5"
      >
        <TextField form={form} name="hospital_name" label="Hospital Name" />

        <div className="grid gap-4 md:grid-cols-2">
          <TextField form={form} name="timezone" label="Timezone" />
          <TextField form={form} name="currency" label="Currency" />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <TextField form={form} name="phone" label="Phone" />
          <TextField form={form} name="email" label="Email" />
        </div>

        <TextareaField form={form} name="address" label="Address" />

        <FormActions
          submitText="Save Settings"
          isSubmitting={isSubmitting}
        />
      </form>
    </Form>
  );
}