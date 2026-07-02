// src/features/appointments/components/appointment-workspace-drawer.tsx

"use client";

import {
  EntityWorkspaceDrawer,
  EntityWorkspaceTabs,
} from "@/shared/components/enterprise";
import type { Appointment } from "../types/appointment.types";
import { AppointmentHeader } from "./appointment-header";
import { AppointmentOverviewTab } from "./appointment-overview-tab";
import { AppointmentPatientTab } from "./appointment-patient-tab";
import { AppointmentDoctorTab } from "./appointment-doctor-tab";
import { AppointmentTimelineTab } from "./appointment-timeline-tab";

interface AppointmentWorkspaceDrawerProps {
  open: boolean;
  appointment: Appointment | null;
  onOpenChange: (open: boolean) => void;
}

export function AppointmentWorkspaceDrawer({
  open,
  appointment,
  onOpenChange,
}: AppointmentWorkspaceDrawerProps) {
  return (
    <EntityWorkspaceDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={appointment ? "Appointment Workspace" : "Appointment"}
      description="Appointment details, patient, doctor, billing, and timeline."
    >
      {!appointment ? null : (
        <>
          <AppointmentHeader appointment={appointment} />

          <EntityWorkspaceTabs
            defaultValue="overview"
            tabs={[
              {
                value: "overview",
                label: "Overview",
                content: <AppointmentOverviewTab appointment={appointment} />,
              },
              {
                value: "patient",
                label: "Patient",
                content: <AppointmentPatientTab appointment={appointment} />,
              },
              {
                value: "doctor",
                label: "Doctor",
                content: <AppointmentDoctorTab appointment={appointment} />,
              },
              {
                value: "timeline",
                label: "Timeline",
                content: <AppointmentTimelineTab />,
              },
            ]}
          />
        </>
      )}
    </EntityWorkspaceDrawer>
  );
}