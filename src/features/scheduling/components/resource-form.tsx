"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { CheckboxField, FormActions, SelectField, TextareaField, TextField } from "@/shared/components/enterprise";
import { resourceTypeOptions, schedulingStatusOptions } from "../constants/scheduling.constants";
import { resourceFormSchema, type ResourceFormInput, type ResourceFormValues } from "../schemas/scheduling.schema";

interface Props { isSubmitting?: boolean; onSubmit: (values: ResourceFormValues) => void | Promise<void>; onCancel?: () => void }
export function ResourceForm({ isSubmitting, onSubmit, onCancel }: Props) {
  const form = useForm<ResourceFormInput>({ resolver: zodResolver(resourceFormSchema), defaultValues: { name: "", code: "", resource_type: "room", department_id: "", location: "", capacity: 1, status: "available", description: "", is_active: true } });
  return <Form {...form}><form onSubmit={form.handleSubmit((v) => onSubmit(resourceFormSchema.parse(v)))} className="space-y-5">
    <div className="grid gap-4 md:grid-cols-2"><TextField form={form} name="name" label="Resource Name" /><TextField form={form} name="code" label="Code" /></div>
    <div className="grid gap-4 md:grid-cols-2"><SelectField form={form} name="resource_type" label="Type" options={resourceTypeOptions} /><SelectField form={form} name="status" label="Status" options={schedulingStatusOptions} /></div>
    <div className="grid gap-4 md:grid-cols-2"><TextField form={form} name="location" label="Location" /><TextField form={form} name="capacity" label="Capacity" type="number" /></div>
    <TextareaField form={form} name="description" label="Description" />
    <CheckboxField form={form} name="is_active" label="Resource is active" />
    <FormActions submitText="Save Resource" isSubmitting={isSubmitting} onCancel={onCancel} />
  </form></Form>;
}
