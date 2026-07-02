// src/features/patient-portal/components/patient-profile-form.tsx

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
import type { PatientPortalProfile } from "../types/patient-portal.types";
import {
  patientPortalProfileFormSchema,
  type PatientPortalProfileFormInput,
  type PatientPortalProfileFormValues,
} from "../schemas/patient-portal.schema";

interface PatientProfileFormProps {
  profile?: PatientPortalProfile;
  isSubmitting?: boolean;
  onSubmit: (values: PatientPortalProfileFormValues) => void | Promise<void>;
}

export function PatientProfileForm({
  profile,
  isSubmitting,
  onSubmit,
}: PatientProfileFormProps) {
  const form = useForm<PatientPortalProfileFormInput>({
    resolver: zodResolver(patientPortalProfileFormSchema),
    defaultValues: {
      full_name: "",
      email: "",
      phone: "",
      gender: "",
      date_of_birth: "",
      address: "",
      blood_group: "",
    },
  });

  useEffect(() => {
    if (profile) {
      form.reset({
        full_name: profile.full_name,
        email: profile.email ?? "",
        phone: profile.phone ?? "",
        gender: profile.gender ?? "",
        date_of_birth: profile.date_of_birth ?? "",
        address: profile.address ?? "",
        blood_group: profile.blood_group ?? "",
      });
    }
  }, [profile, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(patientPortalProfileFormSchema.parse(values))
        )}
        className="space-y-5"
      >
        <TextField form={form} name="full_name" label="Full Name" />

        <div className="grid gap-4 md:grid-cols-2">
          <TextField form={form} name="email" label="Email" />
          <TextField form={form} name="phone" label="Phone" />
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <TextField form={form} name="gender" label="Gender" />
          <TextField
            form={form}
            name="date_of_birth"
            label="Date of Birth"
            type="date"
          />
          <TextField form={form} name="blood_group" label="Blood Group" />
        </div>

        <TextareaField form={form} name="address" label="Address" />

        <FormActions submitText="Save Profile" isSubmitting={isSubmitting} />
      </form>
    </Form>
  );
}