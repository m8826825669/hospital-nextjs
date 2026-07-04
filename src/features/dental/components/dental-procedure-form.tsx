"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormActions, SelectField, TextareaField, TextField } from "@/shared/components/enterprise";
import { dentalProcedureStatusOptions, dentalProcedureTypeOptions } from "../constants/dental.constants";
import { dentalProcedureFormSchema, type DentalProcedureFormInput, type DentalProcedureFormValues } from "../schemas/dental.schema";

export function DentalProcedureForm({ isSubmitting, onSubmit, onCancel }: { isSubmitting?: boolean; onSubmit: (values: DentalProcedureFormValues) => void | Promise<void>; onCancel?: () => void }) {
  const form = useForm<DentalProcedureFormInput>({ resolver: zodResolver(dentalProcedureFormSchema), defaultValues: { patient_id: "", visit_id: "", tooth_number: null, procedure_name: "", procedure_type: "restorative", scheduled_at: "", performed_at: "", dentist_id: "", status: "planned", cost: 0, notes: "" } });
  return <Form {...form}><form onSubmit={form.handleSubmit((v) => onSubmit(dentalProcedureFormSchema.parse(v)))} className="space-y-5"><div className="rounded-xl border bg-card p-5 shadow-sm"><h3 className="mb-4 text-sm font-semibold">Procedure Details</h3><div className="grid gap-4 md:grid-cols-2"><TextField form={form} name="patient_id" label="Patient ID" /><TextField form={form} name="visit_id" label="Visit ID" /><TextField form={form} name="tooth_number" label="Tooth Number" type="number" /><TextField form={form} name="procedure_name" label="Procedure Name" /><SelectField form={form} name="procedure_type" label="Procedure Type" options={dentalProcedureTypeOptions} /><SelectField form={form} name="status" label="Status" options={dentalProcedureStatusOptions} /><TextField form={form} name="scheduled_at" label="Scheduled At" type="datetime-local" /><TextField form={form} name="cost" label="Cost" type="number" /></div><div className="mt-4"><TextareaField form={form} name="notes" label="Notes" /></div></div><FormActions submitText="Save Procedure" isSubmitting={isSubmitting} onCancel={onCancel} /></form></Form>;
}
