"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormActions, SelectField, TextareaField, TextField } from "@/shared/components/enterprise";
import { toothConditionOptions } from "../constants/dental.constants";
import { dentalChartFormSchema, type DentalChartFormInput, type DentalChartFormValues } from "../schemas/dental.schema";

export function DentalChartForm({ isSubmitting, onSubmit, onCancel }: { isSubmitting?: boolean; onSubmit: (values: DentalChartFormValues) => void | Promise<void>; onCancel?: () => void }) {
  const form = useForm<DentalChartFormInput>({ resolver: zodResolver(dentalChartFormSchema), defaultValues: { patient_id: "", visit_id: "", tooth_number: 11, surface: "", condition: "healthy", notes: "" } });
  return <Form {...form}><form onSubmit={form.handleSubmit((v) => onSubmit(dentalChartFormSchema.parse(v)))} className="space-y-5"><div className="rounded-xl border bg-card p-5 shadow-sm"><h3 className="mb-4 text-sm font-semibold">Tooth Chart Entry</h3><div className="grid gap-4 md:grid-cols-2"><TextField form={form} name="patient_id" label="Patient ID" /><TextField form={form} name="visit_id" label="Visit ID" /><TextField form={form} name="tooth_number" label="Tooth Number" type="number" /><TextField form={form} name="surface" label="Surface" /><SelectField form={form} name="condition" label="Condition" options={toothConditionOptions} /></div><div className="mt-4"><TextareaField form={form} name="notes" label="Notes" /></div></div><FormActions submitText="Save Chart" isSubmitting={isSubmitting} onCancel={onCancel} /></form></Form>;
}
