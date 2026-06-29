// src/features/doctors/schemas/doctor-schedule.schema.ts

import { z } from "zod";

export const doctorScheduleSchema = z.object({
  day_of_week: z.coerce.number().min(0).max(6),
  start_time: z.string().min(1, "Start time is required"),
  end_time: z.string().min(1, "End time is required"),
  slot_duration_minutes: z.coerce.number().min(5),
  is_active: z.boolean().default(true),
});

export type DoctorScheduleFormValues =
  z.infer<typeof doctorScheduleSchema>;

  export type DoctorScheduleFormInput =
  z.input<typeof doctorScheduleSchema>;

export type DoctorScheduleFormOutput =
  z.output<typeof doctorScheduleSchema>;