// src/features/appointments/schemas/appointment.schema.ts

import { z } from "zod";

export const appointmentFormSchema = z.object({
  patient_id: z.string().min(1, "Patient is required"),
  doctor_id: z.string().min(1, "Doctor is required"),
  department_id: z.string().optional(),

  appointment_date: z.string().min(1, "Appointment date is required"),
  start_time: z.string().min(1, "Start time is required"),
  end_time: z.string().optional(),

  appointment_type: z.enum([
    "opd",
    "follow_up",
    "emergency",
    "teleconsultation",
  ]),

  reason: z.string().optional(),
  notes: z.string().optional(),
});

export type AppointmentFormInput = z.input<typeof appointmentFormSchema>;
export type AppointmentFormValues = z.output<typeof appointmentFormSchema>;