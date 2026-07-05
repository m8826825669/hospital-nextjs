"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormActions, SelectField, TextField } from "@/shared/components/enterprise";
import { shiftOptions } from "../constants/scheduling.constants";
import { staffRosterFormSchema, type StaffRosterFormInput, type StaffRosterFormValues } from "../schemas/scheduling.schema";

interface Props { isSubmitting?: boolean; onSubmit: (values: StaffRosterFormValues) => void | Promise<void>; onCancel?: () => void }
export function StaffRosterForm({ isSubmitting, onSubmit, onCancel }: Props) {
  const form = useForm<StaffRosterFormInput>({ resolver: zodResolver(staffRosterFormSchema), defaultValues: { employee_id: "", department_id: "", roster_date: new Date().toISOString().slice(0,10), shift: "morning", start_time: "08:00", end_time: "16:00", location: "", status: "assigned" } });
  return <Form {...form}><form onSubmit={form.handleSubmit((v) => onSubmit(staffRosterFormSchema.parse(v)))} className="space-y-5">
    <TextField form={form} name="employee_id" label="Employee ID" />
    <div className="grid gap-4 md:grid-cols-3"><TextField form={form} name="roster_date" label="Date" type="date" /><SelectField form={form} name="shift" label="Shift" options={shiftOptions} /><TextField form={form} name="location" label="Location" /></div>
    <div className="grid gap-4 md:grid-cols-2"><TextField form={form} name="start_time" label="Start" type="time" /><TextField form={form} name="end_time" label="End" type="time" /></div>
    <FormActions submitText="Save Roster" isSubmitting={isSubmitting} onCancel={onCancel} />
  </form></Form>;
}
