"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { FormActions, SelectField, TextareaField, TextField } from "@/shared/components/enterprise";
import { taskPriorityOptions, taskStatusOptions } from "../constants/nursing.constants";
import { nursingTaskFormSchema, type NursingTaskFormInput, type NursingTaskFormValues } from "../schemas/nursing.schema";

interface Props { isSubmitting?: boolean; onSubmit: (values: NursingTaskFormValues) => void | Promise<void>; onCancel?: () => void; }
export function NursingTaskForm({ isSubmitting, onSubmit, onCancel }: Props) {
  const form = useForm<NursingTaskFormInput>({ resolver: zodResolver(nursingTaskFormSchema), defaultValues: { patient_id: "", assigned_to: "", title: "", description: "", priority: "routine", due_at: "", status: "pending" } });
  return <Form {...form}><form onSubmit={form.handleSubmit((v) => onSubmit(nursingTaskFormSchema.parse(v)))} className="flex h-full flex-col"><div className="flex-1 space-y-6 overflow-y-auto px-1 pb-6"><div className="rounded-xl border bg-card p-5 shadow-sm"><h3 className="mb-4 text-sm font-semibold">Task Details</h3><div className="grid gap-4 md:grid-cols-2"><TextField form={form} name="patient_id" label="Patient ID" /><TextField form={form} name="assigned_to" label="Assigned Nurse/User ID" /><TextField form={form} name="title" label="Task Title" /><TextField form={form} name="due_at" label="Due At" type="datetime-local" /><SelectField form={form} name="priority" label="Priority" options={taskPriorityOptions} /><SelectField form={form} name="status" label="Status" options={taskStatusOptions} /></div></div><div className="rounded-xl border bg-card p-5 shadow-sm"><TextareaField form={form} name="description" label="Description" /></div></div><div className="sticky bottom-0 -mx-6 flex justify-end border-t bg-background px-6 py-4"><FormActions submitText="Save Task" isSubmitting={isSubmitting} onCancel={onCancel} /></div></form></Form>;
}
