"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormActions, SelectField, TextareaField, TextField } from "@/shared/components/enterprise";
import { arrivalModeOptions, emergencyPriorityOptions } from "../constants/emergency.constants";
import { emergencyVisitFormSchema, type EmergencyVisitFormInput, type EmergencyVisitFormValues } from "../schemas/emergency.schema";

interface Props { isSubmitting?: boolean; onSubmit: (values: EmergencyVisitFormValues) => void | Promise<void>; onCancel?: () => void; }
export function EmergencyVisitForm({ isSubmitting, onSubmit, onCancel }: Props) {
  const now = new Date().toISOString().slice(0, 16);
  const form = useForm<EmergencyVisitFormInput>({ resolver: zodResolver(emergencyVisitFormSchema), defaultValues: { patient_id: "", arrival_time: now, chief_complaint: "", arrival_mode: "walk_in", priority: "routine", assigned_doctor_id: "", notes: "" } });
  return <Form {...form}><form onSubmit={form.handleSubmit((v) => onSubmit(emergencyVisitFormSchema.parse(v)))} className="flex h-full flex-col"><div className="flex-1 space-y-6 overflow-y-auto px-1 pb-6"><div className="rounded-xl border bg-card p-5 shadow-sm"><h3 className="mb-4 text-sm font-semibold">Emergency Registration</h3><div className="grid gap-4 md:grid-cols-2"><TextField form={form} name="patient_id" label="Patient ID" /><TextField form={form} name="arrival_time" label="Arrival Time" type="datetime-local" /><TextareaField form={form} name="chief_complaint" label="Chief Complaint" /><SelectField form={form} name="arrival_mode" label="Arrival Mode" options={arrivalModeOptions} /><SelectField form={form} name="priority" label="Priority" options={emergencyPriorityOptions} /><TextField form={form} name="assigned_doctor_id" label="Assigned Doctor ID" /></div></div><div className="rounded-xl border bg-card p-5 shadow-sm"><TextareaField form={form} name="notes" label="Registration Notes" /></div></div><div className="sticky bottom-0 -mx-6 flex justify-end border-t bg-background px-6 py-4"><FormActions submitText="Register ER Visit" isSubmitting={isSubmitting} onCancel={onCancel} /></div></form></Form>;
}
