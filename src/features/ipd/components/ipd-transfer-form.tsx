// src/features/ipd/components/ipd-transfer-form.tsx

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
  ipdTransferFormSchema,
  type IpdTransferFormInput,
  type IpdTransferFormValues,
} from "../schemas/ipd.schema";

interface IpdTransferFormProps {
  defaultValues?: Partial<IpdTransferFormInput>;
  isSubmitting?: boolean;
  onSubmit: (values: IpdTransferFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function IpdTransferForm({
  defaultValues,
  isSubmitting,
  onSubmit,
  onCancel,
}: IpdTransferFormProps) {
  const form = useForm<IpdTransferFormInput>({
    resolver: zodResolver(ipdTransferFormSchema),
    defaultValues: {
      ward_id: "",
      bed_id: "",
      transfer_reason: "",
      ...defaultValues,
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) =>
          onSubmit(ipdTransferFormSchema.parse(values))
        )}
        className="space-y-6"
      >
        <section className="space-y-4 rounded-xl border bg-card p-4">
          <TextField form={form} name="ward_id" label="New Ward ID" />
          <TextField form={form} name="bed_id" label="New Bed ID" />

          <TextareaField
            form={form}
            name="transfer_reason"
            label="Transfer Reason"
          />
        </section>

        <FormActions
          submitText="Transfer Patient"
          isSubmitting={isSubmitting}
          onCancel={onCancel}
        />
      </form>
    </Form>
  );
}