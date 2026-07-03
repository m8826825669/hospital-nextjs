"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormActions, SelectField, TextareaField, TextField } from "@/shared/components/enterprise";
import { medicationStatusOptions } from "../constants/nursing.constants";
import { medicationAdministrationFormSchema, type MedicationAdministrationFormInput, type MedicationAdministrationFormValues } from "../schemas/nursing.schema";

interface Props { isSubmitting?: boolean; onSubmit: (values: MedicationAdministrationFormValues) => void | Promise<void>; onCancel?: () => void; }
const nowLocal = () => new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0, 16);
export function MedicationAdministrationForm({ isSubmitting, onSubmit, onCancel }: Props) {
  const form = useForm<MedicationAdministrationFormInput>({ resolver: zodResolver(medicationAdministrationFormSchema), defaultValues: { patient_id: "", medication_name: "", dose: "", route: "oral", frequency: "", scheduled_at: nowLocal(), status: "scheduled", remarks: "" } });
  return <Form {...form}><form onSubmit={form.handleSubmit((v) => onSubmit(medicationAdministrationFormSchema.parse(v)))} className="flex h-full flex-col"><div className="flex-1 space-y-6 overflow-y-auto px-1 pb-6"><div className="rounded-xl border bg-card p-5 shadow-sm"><h3 className="mb-4 text-sm font-semibold">Medication Administration</h3><div className="grid gap-4 md:grid-cols-2"><TextField form={form} name="patient_id" label="Patient ID" /><TextField form={form} name="medication_name" label="Medication" /><TextField form={form} name="dose" label="Dose" /><TextField form={form} name="route" label="Route" /><TextField form={form} name="frequency" label="Frequency" /><TextField form={form} name="scheduled_at" label="Scheduled At" type="datetime-local" /><SelectField form={form} name="status" label="Status" options={medicationStatusOptions} /></div></div><div className="rounded-xl border bg-card p-5 shadow-sm"><TextareaField form={form} name="remarks" label="Remarks" /></div></div><div className="sticky bottom-0 -mx-6 flex justify-end border-t bg-background px-6 py-4"><FormActions submitText="Save Medication" isSubmitting={isSubmitting} onCancel={onCancel} /></div></form></Form>;
}
