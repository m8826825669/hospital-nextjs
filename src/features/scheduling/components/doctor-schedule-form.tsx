"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { CheckboxField, FormActions, SelectField, TextField } from "@/shared/components/enterprise";
import { schedulingStatusOptions } from "../constants/scheduling.constants";
import { doctorScheduleFormSchema, type DoctorScheduleFormInput, type DoctorScheduleFormValues } from "../schemas/scheduling.schema";

interface Props { isSubmitting?: boolean; onSubmit: (values: DoctorScheduleFormValues) => void | Promise<void>; onCancel?: () => void }
export function DoctorScheduleForm({ isSubmitting, onSubmit, onCancel }: Props) {
  const form = useForm<DoctorScheduleFormInput>({ resolver: zodResolver(doctorScheduleFormSchema), defaultValues: { doctor_id: "", department_id: "", schedule_date: new Date().toISOString().slice(0,10), start_time: "09:00", end_time: "17:00", slot_minutes: 15, location: "", status: "available", is_active: true } });
  return <Form {...form}><form onSubmit={form.handleSubmit((v) => onSubmit(doctorScheduleFormSchema.parse(v)))} className="space-y-5">
    <TextField form={form} name="doctor_id" label="Doctor ID" />
    <div className="grid gap-4 md:grid-cols-3"><TextField form={form} name="schedule_date" label="Date" type="date" /><TextField form={form} name="start_time" label="Start" type="time" /><TextField form={form} name="end_time" label="End" type="time" /></div>
    <div className="grid gap-4 md:grid-cols-3"><TextField form={form} name="slot_minutes" label="Slot Minutes" type="number" /><TextField form={form} name="location" label="Location" /><SelectField form={form} name="status" label="Status" options={schedulingStatusOptions} /></div>
    <CheckboxField form={form} name="is_active" label="Schedule is active" />
    <FormActions submitText="Save Schedule" isSubmitting={isSubmitting} onCancel={onCancel} />
  </form></Form>;
}
