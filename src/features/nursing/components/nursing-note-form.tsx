"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormActions, SelectField, TextareaField, TextField } from "@/shared/components/enterprise";
import { shiftOptions } from "../constants/nursing.constants";
import { nursingNoteFormSchema, type NursingNoteFormInput, type NursingNoteFormValues } from "../schemas/nursing.schema";

interface Props { isSubmitting?: boolean; onSubmit: (values: NursingNoteFormValues) => void | Promise<void>; onCancel?: () => void; }
const nowLocal = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16);

export function NursingNoteForm({ isSubmitting, onSubmit, onCancel }: Props) {
  const form = useForm<NursingNoteFormInput>({ resolver: zodResolver(nursingNoteFormSchema), defaultValues: { patient_id: "", note_date: nowLocal(), note_type: "progress", shift: "morning", subjective: "", objective: "", assessment: "", plan: "" } });
  return <Form {...form}><form onSubmit={form.handleSubmit((v) => onSubmit(nursingNoteFormSchema.parse(v)))} className="flex h-full flex-col"><div className="flex-1 space-y-6 overflow-y-auto px-1 pb-6"><div className="rounded-xl border bg-card p-5 shadow-sm"><h3 className="mb-4 text-sm font-semibold">Note Header</h3><div className="grid gap-4 md:grid-cols-2"><TextField form={form} name="patient_id" label="Patient ID" /><TextField form={form} name="note_date" label="Note Date" type="datetime-local" /><TextField form={form} name="note_type" label="Note Type" /><SelectField form={form} name="shift" label="Shift" options={shiftOptions} /></div></div><div className="rounded-xl border bg-card p-5 shadow-sm"><h3 className="mb-4 text-sm font-semibold">SOAP Note</h3><div className="grid gap-4 md:grid-cols-2"><TextareaField form={form} name="subjective" label="Subjective" /><TextareaField form={form} name="objective" label="Objective" /><TextareaField form={form} name="assessment" label="Assessment" /><TextareaField form={form} name="plan" label="Plan" /></div></div></div><div className="sticky bottom-0 -mx-6 flex justify-end border-t bg-background px-6 py-4"><FormActions submitText="Save Note" isSubmitting={isSubmitting} onCancel={onCancel} /></div></form></Form>;
}
