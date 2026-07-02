// src/features/ipd/components/ipd-discharge-form.tsx

"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import {
  FormActions,
  TextareaField,
  TextField,
} from "@/shared/components/enterprise";
import {
  ipdDischargeFormSchema,
  type IpdDischargeFormInput,
  type IpdDischargeFormValues,
} from "../schemas/ipd.schema";

interface IpdDischargeFormProps {
  defaultValues?: Partial<IpdDischargeFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: IpdDischargeFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function IpdDischargeForm({
  defaultValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: IpdDischargeFormProps) {
  const today = new Date().toISOString().slice(0, 10);

  const form = useForm<IpdDischargeFormInput>({
    resolver: zodResolver(ipdDischargeFormSchema),
    defaultValues: {
      discharge_date: today,
      discharge_time: "",
      discharge_summary: "",
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(ipdDischargeFormSchema.parse(values))
        )}
        className="space-y-6"
      >
        <section className="space-y-4 rounded-xl border bg-card p-4">
          <div className="grid gap-4 md:grid-cols-2">
            <TextField
              form={form}
              name="discharge_date"
              label="Discharge Date"
              type="date"
            />

            <TextField
              form={form}
              name="discharge_time"
              label="Discharge Time"
              type="time"
            />
          </div>

          <TextareaField
            form={form}
            name="discharge_summary"
            label="Discharge Summary"
          />
        </section>

        <FormActions
          submitText="Discharge Patient"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}