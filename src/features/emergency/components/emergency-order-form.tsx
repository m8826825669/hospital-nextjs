// src/features/emergency/components/emergency-order-form.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  FormActions,
  SelectField,
  TextField,
} from "@/shared/components/enterprise";
import {
  emergencyOrderPriorityOptions,
  emergencyOrderTypeOptions,
} from "../constants/emergency.constants";
import {
  emergencyOrderFormSchema,
  type EmergencyOrderFormInput,
  type EmergencyOrderFormValues,
} from "../schemas/emergency.schema";

interface EmergencyOrderFormProps {
  encounterId?: string;
  isSubmitting?: boolean;
  onSubmit: (values: EmergencyOrderFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function EmergencyOrderForm({
  encounterId,
  isSubmitting,
  onSubmit,
  onCancel,
}: EmergencyOrderFormProps) {
  const form = useForm<EmergencyOrderFormInput>({
    resolver: zodResolver(emergencyOrderFormSchema),
    defaultValues: {
      encounter_id: encounterId ?? "",
      order_type: "lab",
      order_name: "",
      priority: "urgent",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(emergencyOrderFormSchema.parse(values))
        )}
        className="space-y-5"
      >
        <TextField form={form} name="encounter_id" label="Encounter ID" />

        <SelectField
          form={form}
          name="order_type"
          label="Order Type"
          options={emergencyOrderTypeOptions}
        />

        <TextField form={form} name="order_name" label="Order Name" />

        <SelectField
          form={form}
          name="priority"
          label="Priority"
          options={emergencyOrderPriorityOptions}
        />

        <FormActions
          submitText="Save Order"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}