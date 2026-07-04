"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppShell } from "@/shared/components/layout/app-shell";
import { DataTable, EmptyState, PageHeader, SectionCard } from "@/shared/components/enterprise";
import { PatientPortalKpis } from "@/features/patient-portal/components/patient-portal-kpis";
import {
  usePatientPortalAppointments,
  usePatientPortalBills,
  usePatientPortalDashboard,
  usePatientPortalReports,
} from "@/features/patient-portal/api/patient-portal.queries";

export default function PatientPortalPage() {
  const [patientId, setPatientId] = useState("");
  const dashboardQuery = usePatientPortalDashboard(patientId);
  const appointmentsQuery = usePatientPortalAppointments(patientId);
  const reportsQuery = usePatientPortalReports(patientId);
  const billsQuery = usePatientPortalBills(patientId);

  const profile = dashboardQuery.data?.profile;

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Patient Portal"
          description="Patient-facing workspace for appointments, reports, bills, and prescriptions."
        />

        <SectionCard title="Portal Access" description="Select or paste a patient ID while authentication mapping is being connected." className="p-5">
          <input
            className="h-10 w-full rounded-md border bg-background px-3 text-sm md:w-[520px]"
            placeholder="Patient UUID"
            value={patientId}
            onChange={(event) => setPatientId(event.target.value)}
          />
        </SectionCard>

        {!patientId ? (
          <EmptyState title="Select a patient" description="Enter a patient ID to load the patient portal." />
        ) : (
          <>
            <SectionCard className="p-5">
              <div>
                <p className="text-sm text-muted-foreground">Patient</p>
                <h2 className="text-xl font-semibold">
                  {profile ? `${profile.first_name} ${profile.last_name ?? ""}` : "Loading profile..."}
                </h2>
                <p className="text-sm text-muted-foreground">
                  {profile?.patient_code ?? "-"} · {profile?.mobile ?? "No mobile"}
                </p>
              </div>
            </SectionCard>

            <PatientPortalKpis dashboard={dashboardQuery.data} />

            <Tabs defaultValue="appointments" className="space-y-4">
              <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 rounded-xl bg-muted/40 p-2">
                <TabsTrigger value="appointments">Appointments</TabsTrigger>
                <TabsTrigger value="reports">Reports</TabsTrigger>
                <TabsTrigger value="bills">Bills</TabsTrigger>
                <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
              </TabsList>

              <TabsContent value="appointments">
                <DataTable
                  columns={[
                    { accessorKey: "appointment_number", header: "Appointment" },
                    { accessorKey: "appointment_date", header: "Date" },
                    { accessorKey: "doctor_name", header: "Doctor" },
                    { accessorKey: "status", header: "Status" },
                  ]}
                  data={appointmentsQuery.data ?? []}
                  isLoading={appointmentsQuery.isLoading}
                  emptyTitle="No appointments"
                  emptyDescription="Appointments will appear here."
                />
              </TabsContent>

              <TabsContent value="reports">
                <DataTable
                  columns={[
                    { accessorKey: "title", header: "Report" },
                    { accessorKey: "department", header: "Department" },
                    { accessorKey: "status", header: "Status" },
                  ]}
                  data={reportsQuery.data ?? []}
                  isLoading={reportsQuery.isLoading}
                  emptyTitle="No reports"
                  emptyDescription="Lab and radiology reports will appear here."
                />
              </TabsContent>

              <TabsContent value="bills">
                <DataTable
                  columns={[
                    { accessorKey: "invoice_number", header: "Invoice" },
                    { accessorKey: "invoice_date", header: "Date" },
                    { accessorKey: "total_amount", header: "Total" },
                    { accessorKey: "balance_amount", header: "Balance" },
                    { accessorKey: "status", header: "Status" },
                  ]}
                  data={billsQuery.data ?? []}
                  isLoading={billsQuery.isLoading}
                  emptyTitle="No bills"
                  emptyDescription="Invoices and receipts will appear here."
                />
              </TabsContent>

              <TabsContent value="prescriptions">
                <EmptyState title="Prescriptions" description="Prescription history integration will be connected from pharmacy/OPD next." />
              </TabsContent>
            </Tabs>
          </>
        )}
      </div>
    </AppShell>
  );
}
