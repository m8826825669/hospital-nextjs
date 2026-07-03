"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormActions, SelectField, TextareaField, TextField } from "@/shared/components/enterprise";
import { carePlanStatusOptions } from "../constants/nursing.constants";
import { carePlanFormSchema, type CarePlanFormInput, type CarePlanFormValues } from "../schemas/nursing.schema";

interface Props { isSubmitting?: boolean; onSubmit: (values: CarePlanFormValues) => void | Promise<void>; onCancel?: () => void; }
export function CarePlanForm({ isSubmitting, onSubmit, onCancel }: Props) {
  const today = new Date().toISOString().slice(0, 10);
  const form = useForm<CarePlanFormInput>({ resolver: zodResolver(carePlanFormSchema), defaultValues: { patient_id: "", problem: "", goal: "", interventions: "", evaluation: "", start_date: today, target_date: "", status: "active" } });
  return <Form {...form}><form onSubmit={form.handleSubmit((v) => onSubmit(carePlanFormSchema.parse(v)))} className="flex h-full flex-col"><div className="flex-1 space-y-6 overflow-y-auto px-1 pb-6"><div className="rounded-xl border bg-card p-5 shadow-sm"><h3 className="mb-4 text-sm font-semibold">Care Plan</h3><div className="grid gap-4 md:grid-cols-2"><TextField form={form} name="patient_id" label="Patient ID" /><TextField form={form} name="problem" label="Nursing Problem" /><TextField form={form} name="start_date" label="Start Date" type="date" /><TextField form={form} name="target_date" label="Target Date" type="date" /><SelectField form={form} name="status" label="Status" options={carePlanStatusOptions} /></div></div><div className="rounded-xl border bg-card p-5 shadow-sm"><div className="grid gap-4 md:grid-cols-2"><TextareaField form={form} name="goal" label="Goal" /><TextareaField form={form} name="interventions" label="Interventions" /><TextareaField form={form} name="evaluation" label="Evaluation" /></div></div></div><div className="sticky bottom-0 -mx-6 flex justify-end border-t bg-background px-6 py-4"><FormActions submitText="Save Care Plan" isSubmitting={isSubmitting} onCancel={onCancel} /></div></form></Form>;
}
