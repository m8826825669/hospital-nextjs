"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormActions, SelectField, TextareaField, TextField } from "@/shared/components/enterprise";
import { bookingTypeOptions, priorityOptions } from "../constants/scheduling.constants";
import type { HospitalResource } from "../types/scheduling.types";
import { bookingFormSchema, type BookingFormInput, type BookingFormValues } from "../schemas/scheduling.schema";

interface Props { resources?: HospitalResource[]; isSubmitting?: boolean; onSubmit: (values: BookingFormValues) => void | Promise<void>; onCancel?: () => void }
export function BookingForm({ resources = [], isSubmitting, onSubmit, onCancel }: Props) {
  const form = useForm<BookingFormInput>({ resolver: zodResolver(bookingFormSchema), defaultValues: { resource_id: "", title: "", booking_type: "general", start_time: "", end_time: "", status: "scheduled", priority: "routine", patient_id: "", doctor_id: "", notes: "" } });
  const resourceOptions = resources.map((r) => ({ label: `${r.code} - ${r.name}`, value: r.id }));
  return <Form {...form}><form onSubmit={form.handleSubmit((v) => onSubmit(bookingFormSchema.parse(v)))} className="space-y-5">
    <SelectField form={form} name="resource_id" label="Resource" placeholder="Select resource" options={resourceOptions} />
    <TextField form={form} name="title" label="Booking Title" />
    <div className="grid gap-4 md:grid-cols-2"><SelectField form={form} name="booking_type" label="Booking Type" options={bookingTypeOptions} /><SelectField form={form} name="priority" label="Priority" options={priorityOptions} /></div>
    <div className="grid gap-4 md:grid-cols-2"><TextField form={form} name="start_time" label="Start" type="datetime-local" /><TextField form={form} name="end_time" label="End" type="datetime-local" /></div>
    <TextareaField form={form} name="notes" label="Notes" />
    <FormActions submitText="Save Booking" isSubmitting={isSubmitting} onCancel={onCancel} />
  </form></Form>;
}
