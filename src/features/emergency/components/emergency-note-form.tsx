"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormActions, SelectField, TextareaField, TextField } from "@/shared/components/enterprise";
import { emergencyNoteFormSchema, type EmergencyNoteFormInput, type EmergencyNoteFormValues } from "../schemas/emergency.schema";

const noteTypeOptions = [{ label: "Clinical", value: "clinical" }, { label: "Procedure", value: "procedure" }, { label: "Observation", value: "observation" }, { label: "Disposition", value: "disposition" }];
interface Props { isSubmitting?: boolean; onSubmit: (values: EmergencyNoteFormValues) => void | Promise<void>; onCancel?: () => void; }
export function EmergencyNoteForm({ isSubmitting, onSubmit, onCancel }: Props) {
  const now = new Date().toISOString().slice(0, 16);
  const form = useForm<EmergencyNoteFormInput>({ resolver: zodResolver(emergencyNoteFormSchema), defaultValues: { visit_id: "", note_time: now, note_type: "clinical", subjective: "", objective: "", assessment: "", plan: "" } });
  return <Form {...form}><form onSubmit={form.handleSubmit((v) => onSubmit(emergencyNoteFormSchema.parse(v)))} className="flex h-full flex-col"><div className="flex-1 space-y-6 overflow-y-auto px-1 pb-6"><div className="rounded-xl border bg-card p-5 shadow-sm"><h3 className="mb-4 text-sm font-semibold">ER Note</h3><div className="grid gap-4 md:grid-cols-2"><TextField form={form} name="visit_id" label="ER Visit ID" /><TextField form={form} name="note_time" label="Note Time" type="datetime-local" /><SelectField form={form} name="note_type" label="Note Type" options={noteTypeOptions} /></div></div><div className="grid gap-6 lg:grid-cols-2"><div className="rounded-xl border bg-card p-5 shadow-sm"><TextareaField form={form} name="subjective" label="Subjective" /><TextareaField form={form} name="objective" label="Objective" /></div><div className="rounded-xl border bg-card p-5 shadow-sm"><TextareaField form={form} name="assessment" label="Assessment" /><TextareaField form={form} name="plan" label="Plan" /></div></div></div><div className="sticky bottom-0 -mx-6 flex justify-end border-t bg-background px-6 py-4"><FormActions submitText="Save ER Note" isSubmitting={isSubmitting} onCancel={onCancel} /></div></form></Form>;
}
