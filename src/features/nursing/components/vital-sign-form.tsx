"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormActions, TextareaField, TextField } from "@/shared/components/enterprise";
import { vitalSignFormSchema, type VitalSignFormInput, type VitalSignFormValues } from "../schemas/nursing.schema";

interface Props { isSubmitting?: boolean; onSubmit: (values: VitalSignFormValues) => void | Promise<void>; onCancel?: () => void; }
const nowLocal = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16);

export function VitalSignForm({ isSubmitting, onSubmit, onCancel }: Props) {
  const form = useForm<VitalSignFormInput>({ resolver: zodResolver(vitalSignFormSchema), defaultValues: { patient_id: "", recorded_at: nowLocal(), temperature: null, pulse: null, respiratory_rate: null, systolic_bp: null, diastolic_bp: null, spo2: null, pain_score: null, consciousness_level: "alert", notes: "" } });
  return <Form {...form}><form onSubmit={form.handleSubmit((v) => onSubmit(vitalSignFormSchema.parse(v)))} className="flex h-full flex-col"><div className="flex-1 space-y-6 overflow-y-auto px-1 pb-6"><div className="rounded-xl border bg-card p-5 shadow-sm"><h3 className="mb-4 text-sm font-semibold">Patient & Time</h3><div className="grid gap-4 md:grid-cols-2"><TextField form={form} name="patient_id" label="Patient ID" /><TextField form={form} name="recorded_at" label="Recorded At" type="datetime-local" /></div></div><div className="rounded-xl border bg-card p-5 shadow-sm"><h3 className="mb-4 text-sm font-semibold">Vitals</h3><div className="grid gap-4 md:grid-cols-3"><TextField form={form} name="temperature" label="Temperature" type="number" /><TextField form={form} name="pulse" label="Pulse" type="number" /><TextField form={form} name="respiratory_rate" label="Resp. Rate" type="number" /><TextField form={form} name="systolic_bp" label="Systolic BP" type="number" /><TextField form={form} name="diastolic_bp" label="Diastolic BP" type="number" /><TextField form={form} name="spo2" label="SpO2" type="number" /><TextField form={form} name="pain_score" label="Pain Score" type="number" /><TextField form={form} name="consciousness_level" label="Consciousness" /></div></div><div className="rounded-xl border bg-card p-5 shadow-sm"><TextareaField form={form} name="notes" label="Notes" /></div></div><div className="sticky bottom-0 -mx-6 flex justify-end gap-3 border-t bg-background px-6 py-4"><FormActions submitText="Save Vitals" isSubmitting={isSubmitting} onCancel={onCancel} /></div></form></Form>;
}
