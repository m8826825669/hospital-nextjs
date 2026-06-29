"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";

import {
  TextField,
  CheckboxField,
  CurrencyField,
  FormActions,
} from "@/shared/components/enterprise";

import {
  doctorFormSchema,
  type DoctorFormInput,
  type DoctorFormValues,
} from "../schemas/doctor.schema";

interface DoctorFormProps {
  defaultValues?: Partial<DoctorFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: DoctorFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function DoctorForm({
  defaultValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: DoctorFormProps) {
  const form = useForm<DoctorFormInput>({
    resolver: zodResolver(doctorFormSchema),
    defaultValues: {
      user_id: "",
      registration_number: "",
      specialization: "",
      qualification: "",
      consultation_fee: undefined,
      department_ids: [],
      is_active: true,
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(doctorFormSchema.parse(values))
        )}
        className="space-y-5"
      >
        <TextField
          form={form}
          name="user_id"
          label="User ID"
          placeholder="Existing user UUID"
        />

        <TextField
          form={form}
          name="registration_number"
          label="Registration Number"
          placeholder="Medical registration number"
        />

        <TextField
          form={form}
          name="specialization"
          label="Specialization"
          placeholder="Cardiology, Orthopedics, etc."
        />

        <TextField
          form={form}
          name="qualification"
          label="Qualification"
          placeholder="MBBS, MD, MS, etc."
        />

        <CurrencyField
          form={form}
          name="consultation_fee"
          label="Consultation Fee"
        />

        <CheckboxField
          form={form}
          name="is_active"
          label="Doctor is active"
        />

        <FormActions
          submitText="Save Doctor"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}