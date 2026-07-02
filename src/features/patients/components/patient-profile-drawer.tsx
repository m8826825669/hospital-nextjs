"use client";

import {
  EntityWorkspaceDrawer,
  EntityWorkspaceTabs,
} from "@/shared/components/enterprise";
import type { Patient } from "../types/patient.types";
import { PatientHeader } from "./patient-header";
import { PatientOverviewTab } from "./patient-overeview-tab";
import { PatientDemographicsTab } from "./patient-demographics-tab";
import { PatientContactsTab } from "./patient-contacts-tab";
import { PatientInsuranceTab } from "./patient-insurance-tab";
import { PatientVisitsTab } from "./patient-visits-tab";
import { PatientDocumentsTab } from "./patient-documents-tab";
import { PatientTimelineTab } from "./patient-timeline-tab";

interface PatientProfileDrawerProps {
  open: boolean;
  patient: Patient | null;
  onOpenChange: (open: boolean) => void;
}

export function PatientProfileDrawer({
  open,
  patient,
  onOpenChange,
}: PatientProfileDrawerProps) {
  return (
    <EntityWorkspaceDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={patient?.full_name || "Patient Profile"}
      description="Patient demographics, visits, insurance, documents, and timeline."
    >
      {!patient ? null : (
        <>
          <PatientHeader patient={patient} />

          <EntityWorkspaceTabs
            defaultValue="overview"
            tabs={[
              {
                value: "overview",
                label: "Overview",
                content: <PatientOverviewTab patient={patient} />,
              },
              {
                value: "demographics",
                label: "Demo",
                content: <PatientDemographicsTab patient={patient} />,
              },
              {
                value: "contacts",
                label: "Contacts",
                content: <PatientContactsTab patient={patient} />,
              },
              {
                value: "insurance",
                label: "Insurance",
                content: <PatientInsuranceTab patient={patient} />,
              },
              {
                value: "visits",
                label: "Visits",
                content: <PatientVisitsTab patient={patient} />,
              },
              {
                value: "documents",
                label: "Docs",
                content: <PatientDocumentsTab patient={patient} />,
              },
              {
                value: "timeline",
                label: "Timeline",
                content: <PatientTimelineTab patient={patient} />,
              },
            ]}
          />
        </>
      )}
    </EntityWorkspaceDrawer>
  );
}