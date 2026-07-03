// src/features/radiology/components/radiology-report-form.tsx

"use client";

import { useForm, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { Form } from "@/components/ui/form";
import { CheckboxField, FormActions, SelectField, TextareaField } from "@/shared/components/enterprise";
import { radiologyReportStatusOptions } from "../constants/radiology.constants";
import {
  radiologyReportFormSchema,
  type RadiologyReportFormInput,
  type RadiologyReportFormValues,
} from "../schemas/radiology.schema";
import type { LookupOption, RadiologyOrder } from "../types/radiology.types";

interface RadiologyReportFormProps {
  orders?: RadiologyOrder[];
  doctors?: LookupOption[];
  isSubmitting?: boolean;
  onSubmit: (values: RadiologyReportFormValues) => void | Promise<void>;
  onCancel?: () => void;
}

export function RadiologyReportForm({
  orders = [],
  doctors = [],
  isSubmitting,
  onSubmit,
  onCancel,
}: RadiologyReportFormProps) {
  const form = useForm<RadiologyReportFormInput>({
    resolver: zodResolver(radiologyReportFormSchema),
    defaultValues: {
      order_id: "",
      radiologist_id: "",
      clinical_history: "",
      technique: "",
      findings: "",
      impression: "",
      recommendation: "",
      critical_finding: false,
      attachments_note: "",
      status: "draft",
    },
  });

  const orderId = useWatch({ control: form.control, name: "order_id" });
  const selectedOrder = orders.find((order) => order.id === orderId);
  const orderOptions = orders.map((order) => ({
    label: `${order.order_number} - ${order.patient_name ?? "Patient"} - ${order.test_name ?? "Test"}`,
    value: order.id,
  }));
  const doctorOptions = [
    { label: "No radiologist selected", value: "" },
    ...doctors.map((doctor) => ({ label: doctor.label, value: doctor.id })),
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(radiologyReportFormSchema.parse(values)))}
        className="flex h-full flex-col"
      >
        <div className="flex-1 space-y-6 overflow-y-auto px-1 pb-6">
          <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
            <div className="space-y-6">
              <div className="rounded-xl border bg-card p-5 shadow-sm">
                <h3 className="mb-4 text-sm font-semibold">Study Context</h3>
                <div className="space-y-4">
                  <SelectField form={form} name="order_id" label="Radiology Order" placeholder="Select order" options={orderOptions} />
                  <SelectField form={form} name="radiologist_id" label="Radiologist" placeholder="Select radiologist" options={doctorOptions} />
                  <SelectField form={form} name="status" label="Report Status" options={radiologyReportStatusOptions} />
                </div>

                <div className="mt-4 rounded-lg border bg-muted/30 p-3 text-xs">
                  <div className="font-medium">{selectedOrder?.order_number ?? "No order selected"}</div>
                  <div className="mt-2 grid gap-1 text-muted-foreground">
                    <span>Patient: {selectedOrder?.patient_name ?? "-"}</span>
                    <span>Test: {selectedOrder?.test_name ?? "-"}</span>
                    <span>Priority: {selectedOrder?.priority?.toUpperCase() ?? "-"}</span>
                    <span>Diagnosis: {selectedOrder?.diagnosis ?? "-"}</span>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border bg-card p-5 shadow-sm">
                <h3 className="mb-4 text-sm font-semibold">Safety Flags</h3>
                <div className="space-y-4">
                  <CheckboxField form={form} name="critical_finding" label="Critical finding" />
                  <TextareaField form={form} name="attachments_note" label="Attachment / Image Notes" />
                </div>
              </div>
            </div>

            <div className="rounded-xl border bg-card p-5 shadow-sm">
              <div className="mb-4">
                <h3 className="text-sm font-semibold">Structured Report Editor</h3>
                <p className="text-xs text-muted-foreground">Write the clinical history, technique, findings, impression, and recommendations.</p>
              </div>
              <div className="space-y-4">
                <TextareaField form={form} name="clinical_history" label="Clinical History" />
                <TextareaField form={form} name="technique" label="Technique" />
                <TextareaField form={form} name="findings" label="Findings" />
                <TextareaField form={form} name="impression" label="Impression" />
                <TextareaField form={form} name="recommendation" label="Recommendation" />
              </div>
            </div>
          </div>
        </div>

        <div className="sticky bottom-0 -mx-6 flex items-center justify-end gap-3 border-t bg-background px-6 py-4">
          <FormActions submitText="Save Report" isSubmitting={isSubmitting} onCancel={onCancel} />
        </div>
      </form>
    </Form>
  );
}
