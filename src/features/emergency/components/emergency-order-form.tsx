"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormActions, SelectField, TextareaField, TextField } from "@/shared/components/enterprise";
import { emergencyPriorityOptions, orderTypeOptions } from "../constants/emergency.constants";
import { emergencyOrderFormSchema, type EmergencyOrderFormInput, type EmergencyOrderFormValues } from "../schemas/emergency.schema";

interface Props { isSubmitting?: boolean; onSubmit: (values: EmergencyOrderFormValues) => void | Promise<void>; onCancel?: () => void; }
export function EmergencyOrderForm({ isSubmitting, onSubmit, onCancel }: Props) {
  const now = new Date().toISOString().slice(0, 16);
  const form = useForm<EmergencyOrderFormInput>({ resolver: zodResolver(emergencyOrderFormSchema), defaultValues: { visit_id: "", order_type: "lab", order_name: "", priority: "routine", ordered_at: now, instructions: "" } });
  return <Form {...form}><form onSubmit={form.handleSubmit((v) => onSubmit(emergencyOrderFormSchema.parse(v)))} className="flex h-full flex-col"><div className="flex-1 space-y-6 overflow-y-auto px-1 pb-6"><div className="rounded-xl border bg-card p-5 shadow-sm"><h3 className="mb-4 text-sm font-semibold">Emergency Order</h3><div className="grid gap-4 md:grid-cols-2"><TextField form={form} name="visit_id" label="ER Visit ID" /><SelectField form={form} name="order_type" label="Order Type" options={orderTypeOptions} /><TextField form={form} name="order_name" label="Order Name" /><SelectField form={form} name="priority" label="Priority" options={emergencyPriorityOptions} /><TextField form={form} name="ordered_at" label="Ordered At" type="datetime-local" /></div></div><div className="rounded-xl border bg-card p-5 shadow-sm"><TextareaField form={form} name="instructions" label="Instructions" /></div></div><div className="sticky bottom-0 -mx-6 flex justify-end border-t bg-background px-6 py-4"><FormActions submitText="Create Order" isSubmitting={isSubmitting} onCancel={onCancel} /></div></form></Form>;
}
