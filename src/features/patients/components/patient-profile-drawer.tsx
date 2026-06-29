// src/features/patients/components/patient-profile-drawer.tsx

"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EntityDrawer } from "@/shared/components/enterprise";
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
    <EntityDrawer
        open={open}
        onOpenChange={onOpenChange}
        title={patient?.full_name || "Patient Profile"}
        description="Patient demographics, visits, insurance, documents, and timeline."
        size="xl"
        >
      {!patient ? null : (
        <div className="space-y-6">
          <PatientHeader patient={patient} />

          <Tabs defaultValue="overview">
            <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="demographics">Demo</TabsTrigger>
              <TabsTrigger value="contacts">Contacts</TabsTrigger>
              <TabsTrigger value="insurance">Insurance</TabsTrigger>
              <TabsTrigger value="visits">Visits</TabsTrigger>
              <TabsTrigger value="documents">Docs</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-4">
              <PatientOverviewTab patient={patient} />
            </TabsContent>

            <TabsContent value="demographics" className="mt-4">
              <PatientDemographicsTab patient={patient} />
            </TabsContent>

            <TabsContent value="contacts" className="mt-4">
              <PatientContactsTab patient={patient} />
            </TabsContent>

            <TabsContent value="insurance" className="mt-4">
              <PatientInsuranceTab patient={patient} />
            </TabsContent>

            <TabsContent value="visits" className="mt-4">
              <PatientVisitsTab patient={patient} />
            </TabsContent>

            <TabsContent value="documents" className="mt-4">
              <PatientDocumentsTab patient={patient} />
            </TabsContent>

            <TabsContent value="timeline" className="mt-4">
              <PatientTimelineTab patient={patient} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </EntityDrawer>
  );
}