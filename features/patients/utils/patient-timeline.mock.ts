import type { TimelineItem } from "@/components/timeline/timeline.types";
import type { PatientResponse } from "../types/patient.types";

export function getMockPatientTimeline(patient: PatientResponse): TimelineItem[] {
  return [
    {
      id: "registration",
      type: "registration",
      title: "Patient Registered",
      description: `${patient.first_name} ${patient.last_name} was registered in the hospital system.`,
      timestamp: patient.created_at || "Today",
      actor: "Front Desk",
      meta: patient.patient_code,
    },
    {
      id: "appointment",
      type: "appointment",
      title: "Appointment Booked",
      description: "Initial consultation appointment booked.",
      timestamp: "Today, 10:30 AM",
      actor: "Reception",
      meta: "OPD",
    },
    {
      id: "billing",
      type: "billing",
      title: "Registration Fee Paid",
      description: "Patient registration fee payment recorded.",
      timestamp: "Today, 10:35 AM",
      actor: "Billing Desk",
      meta: "₹200",
    },
  ];
}