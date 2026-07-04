"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormActions, SelectField, TextareaField, TextField } from "@/shared/components/enterprise";
import { acuityOptions } from "../constants/emergency.constants";
import { emergencyTriageFormSchema, type EmergencyTriageFormInput, type EmergencyTriageFormValues } from "../schemas/emergency.schema";

interface Props { isSubmitting?: boolean; onSubmit: (values: EmergencyTriageFormValues) => void | Promise<void>; onCancel?: () => void; }
export function EmergencyTriageForm({ isSubmitting, onSubmit, onCancel }: Props) {
  const now = new Date().toISOString().slice(0, 16);
  const form = useForm<EmergencyTriageFormInput>({ resolver: zodResolver(emergencyTriageFormSchema), defaultValues: { visit_id: "", triage_time: now, acuity_level: "urgent", pain_score: null, temperature: "", pulse: null, respiratory_rate: null, systolic_bp: null, diastolic_bp: null, spo2: null, triage_notes: "" } });
  return <Form {...form}><form onSubmit={form.handleSubmit((v) => onSubmit(emergencyTriageFormSchema.parse(v)))} className="flex h-full flex-col"><div className="flex-1 space-y-6 overflow-y-auto px-1 pb-6"><div className="rounded-xl border bg-card p-5 shadow-sm"><h3 className="mb-4 text-sm font-semibold">Triage & Acuity</h3><div className="grid gap-4 md:grid-cols-2"><TextField form={form} name="visit_id" label="ER Visit ID" /><TextField form={form} name="triage_time" label="Triage Time" type="datetime-local" /><SelectField form={form} name="acuity_level" label="Acuity Level" options={acuityOptions} /><TextField form={form} name="pain_score" label="Pain Score" type="number" /></div></div><div className="rounded-xl border bg-card p-5 shadow-sm"><h3 className="mb-4 text-sm font-semibold">Vitals</h3><div className="grid gap-4 md:grid-cols-3"><TextField form={form} name="temperature" label="Temperature" /><TextField form={form} name="pulse" label="Pulse" type="number" /><TextField form={form} name="respiratory_rate" label="Resp. Rate" type="number" /><TextField form={form} name="systolic_bp" label="Systolic BP" type="number" /><TextField form={form} name="diastolic_bp" label="Diastolic BP" type="number" /><TextField form={form} name="spo2" label="SpO2" type="number" /></div></div><div className="rounded-xl border bg-card p-5 shadow-sm"><TextareaField form={form} name="triage_notes" label="Triage Notes" /></div></div><div className="sticky bottom-0 -mx-6 flex justify-end border-t bg-background px-6 py-4"><FormActions submitText="Save Triage" isSubmitting={isSubmitting} onCancel={onCancel} /></div></form></Form>;
}
