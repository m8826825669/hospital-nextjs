"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormActions, SelectField, TextareaField, TextField } from "@/shared/components/enterprise";
import { dentalVisitStatusOptions } from "../constants/dental.constants";
import { dentalVisitFormSchema, type DentalVisitFormInput, type DentalVisitFormValues } from "../schemas/dental.schema";

export function DentalVisitForm({ isSubmitting, onSubmit, onCancel }: { isSubmitting?: boolean; onSubmit: (values: DentalVisitFormValues) => void | Promise<void>; onCancel?: () => void }) {
  const form = useForm<DentalVisitFormInput>({ resolver: zodResolver(dentalVisitFormSchema), defaultValues: { patient_id: "", doctor_id: "", chief_complaint: "", oral_examination: "", diagnosis: "", treatment_plan: "", status: "open", notes: "" } });
  return <Form {...form}><form onSubmit={form.handleSubmit((v) => onSubmit(dentalVisitFormSchema.parse(v)))} className="flex h-full flex-col"><div className="flex-1 space-y-6 overflow-y-auto px-1 pb-6"><div className="rounded-xl border bg-card p-5 shadow-sm"><h3 className="mb-4 text-sm font-semibold">Visit Details</h3><div className="grid gap-4 md:grid-cols-2"><TextField form={form} name="patient_id" label="Patient ID" /><TextField form={form} name="doctor_id" label="Dentist ID" /><SelectField form={form} name="status" label="Status" options={dentalVisitStatusOptions} /></div><div className="mt-4 space-y-4"><TextareaField form={form} name="chief_complaint" label="Chief Complaint" /><TextareaField form={form} name="oral_examination" label="Oral Examination" /><TextareaField form={form} name="diagnosis" label="Diagnosis" /><TextareaField form={form} name="treatment_plan" label="Treatment Plan" /><TextareaField form={form} name="notes" label="Notes" /></div></div></div><div className="sticky bottom-0 -mx-6 flex justify-end border-t bg-background px-6 py-4"><FormActions submitText="Save Dental Visit" isSubmitting={isSubmitting} onCancel={onCancel} /></div></form></Form>;
}
