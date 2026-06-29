// src/features/doctors/components/doctor-schedules-panel.tsx

"use client";

import { useState } from "react";
import { Clock, Plus } from "lucide-react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Doctor } from "../types/doctor.types";
import { doctorsService } from "../api/doctors.service";
import { useDoctorSchedules } from "../api/doctors.queries";
import { queryKeys } from "@/platform/api/query-keys";

import {
  CheckboxField,
  FormActions,
  SelectField,
  TextField,
} from "@/shared/components/enterprise";

import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import {
  doctorScheduleSchema,
  DoctorScheduleFormOutput,
  type DoctorScheduleFormInput,
} from "../schemas/doctor-schedule.schema";

const dayOptions = [
  { label: "Sunday", value: "0" },
  { label: "Monday", value: "1" },
  { label: "Tuesday", value: "2" },
  { label: "Wednesday", value: "3" },
  { label: "Thursday", value: "4" },
  { label: "Friday", value: "5" },
  { label: "Saturday", value: "6" },
];

const dayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export function DoctorSchedulesPanel({ doctor }: { doctor: Doctor }) {
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const queryClient = useQueryClient();

  const schedulesQuery = useDoctorSchedules(doctor.id);

  const form = useForm<DoctorScheduleFormInput>({
    resolver: zodResolver(doctorScheduleSchema),
    defaultValues: {
      day_of_week: 1,
      start_time: "09:00",
      end_time: "17:00",
      slot_duration_minutes: 15,
      is_active: true,
    },
  });

  async function onSubmit(values: DoctorScheduleFormOutput) {
    setSubmitting(true);

    try {
      await doctorsService.createSchedule(doctor.id, values);

      await queryClient.invalidateQueries({
        queryKey: queryKeys.doctors.schedules(doctor.id),
      });

      toast.success("Schedule created successfully");
      form.reset();
      setShowForm(false);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-medium">Doctor Schedules</h3>
          <p className="text-sm text-muted-foreground">
            Weekly consulting schedule and slot duration.
          </p>
        </div>

        <Button variant="outline" onClick={() => setShowForm((value) => !value)}>
          <Plus className="mr-2 h-4 w-4" />
          Schedule
        </Button>
      </div>

      <div className="space-y-2">
        {schedulesQuery.isLoading ? (
          <p className="text-sm text-muted-foreground">Loading schedules...</p>
        ) : schedulesQuery.data?.length ? (
          schedulesQuery.data.map((schedule) => (
            <div
              key={schedule.id}
              className="rounded-lg border bg-card p-3 text-sm"
            >
              <div className="flex items-center justify-between">
                <p className="font-medium">
                  {dayNames[schedule.day_of_week]}
                </p>
                <span className="text-xs text-muted-foreground">
                  {schedule.slot_duration_minutes} min slots
                </span>
              </div>

              <div className="mt-2 flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                {schedule.start_time} - {schedule.end_time}
              </div>
            </div>
          ))
        ) : (
          <p className="rounded-lg border border-dashed p-4 text-sm text-muted-foreground">
            No schedules configured.
          </p>
        )}
      </div>

      {showForm && (
        <div className="rounded-xl border bg-muted/30 p-4">
          <Form {...form}>
            <form
                onSubmit={form.handleSubmit((values) =>
                  onSubmit(doctorScheduleSchema.parse(values))
                )}
                className="space-y-4"
              >
              <SelectField
                form={form}
                name="day_of_week"
                label="Day"
                options={dayOptions}
                valueType="number"
              />

              <div className="grid gap-4 md:grid-cols-2">
                <TextField
                  form={form}
                  name="start_time"
                  label="Start Time"
                  type="time"
                />

                <TextField
                  form={form}
                  name="end_time"
                  label="End Time"
                  type="time"
                />
              </div>

              <TextField
                form={form}
                name="slot_duration_minutes"
                label="Slot Duration"
                type="number"
              />

              <CheckboxField
                form={form}
                name="is_active"
                label="Schedule is active"
              />

              <FormActions
                submitText="Save Schedule"
                isSubmitting={submitting}
                onCancel={() => setShowForm(false)}
              />
            </form>
          </Form>
        </div>
      )}
    </div>
  );
}
