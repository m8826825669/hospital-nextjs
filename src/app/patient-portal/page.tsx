// src/app/patient-portal/page.tsx

"use client";

import { Download } from "lucide-react";
import { useMemo, useState } from "react";
import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  DataTable,
  ErrorState,
  PageHeader,
  SectionCard,
} from "@/shared/components/enterprise";
import { AppShell } from "@/shared/components/layout/app-shell";

import {
  PortalAppointmentStatusBadge,
  PortalBillStatusBadge,
  PortalReportStatusBadge,
} from "@/features/patient-portal/components/patient-portal-badges";
import { PatientPortalKpis } from "@/features/patient-portal/components/patient-portal-kpis";
import { PatientProfileForm } from "@/features/patient-portal/components/patient-profile-form";

import {
  usePatientPortalKpis,
  usePatientPortalProfile,
  usePortalAppointments,
  usePortalBills,
  usePortalInsuranceClaims,
  usePortalLabReports,
  usePortalPrescriptions,
  usePortalRadiologyReports,
  useUpdatePatientPortalProfile,
} from "@/features/patient-portal/api/patient-portal.queries";

import type {
  PortalAppointment,
  PortalBill,
  PortalInsuranceClaim,
  PortalLabReport,
  PortalPrescription,
  PortalRadiologyReport,
} from "@/features/patient-portal/types/patient-portal.types";
import type { PatientPortalProfileFormValues } from "@/features/patient-portal/schemas/patient-portal.schema";

export default function PatientPortalPage() {
  const [search, setSearch] = useState("");

  const params = useMemo(
    () => ({
      page: 1,
      size: 100,
      search: search || undefined,
    }),
    [search]
  );

  const kpisQuery = usePatientPortalKpis();
  const profileQuery = usePatientPortalProfile();
  const appointmentsQuery = usePortalAppointments(params);
  const prescriptionsQuery = usePortalPrescriptions(params);
  const labReportsQuery = usePortalLabReports(params);
  const radiologyReportsQuery = usePortalRadiologyReports(params);
  const billsQuery = usePortalBills(params);
  const claimsQuery = usePortalInsuranceClaims(params);
  const updateProfile = useUpdatePatientPortalProfile();

  const appointmentColumns: ColumnDef<PortalAppointment>[] = [
    { accessorKey: "appointment_number", header: "Appointment" },
    { accessorKey: "appointment_date", header: "Date" },
    { accessorKey: "appointment_time", header: "Time" },
    { accessorKey: "doctor_name", header: "Doctor" },
    { accessorKey: "department_name", header: "Department" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <PortalAppointmentStatusBadge status={row.original.status} />
      ),
    },
  ];

  const prescriptionColumns: ColumnDef<PortalPrescription>[] = [
    { accessorKey: "prescription_number", header: "Prescription" },
    { accessorKey: "encounter_date", header: "Date" },
    { accessorKey: "doctor_name", header: "Doctor" },
    { accessorKey: "diagnosis", header: "Diagnosis" },
    { accessorKey: "medicines", header: "Medicines" },
  ];

  const labReportColumns: ColumnDef<PortalLabReport>[] = [
    { accessorKey: "sample_number", header: "Sample" },
    { accessorKey: "test_name", header: "Test" },
    { accessorKey: "report_date", header: "Report Date" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <PortalReportStatusBadge status={row.original.status} />,
    },
    {
      id: "download",
      header: "Download",
      cell: ({ row }) =>
        row.original.file_url ? (
          <Button asChild size="sm" variant="outline">
            <a href={row.original.file_url} target="_blank" rel="noreferrer">
              <Download className="mr-2 h-4 w-4" />
              Download
            </a>
          </Button>
        ) : (
          "-"
        ),
    },
  ];

  const radiologyReportColumns: ColumnDef<PortalRadiologyReport>[] = [
    { accessorKey: "order_number", header: "Order" },
    { accessorKey: "modality", header: "Modality" },
    { accessorKey: "study_name", header: "Study" },
    { accessorKey: "report_date", header: "Report Date" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <PortalReportStatusBadge status={row.original.status} />,
    },
    {
      id: "download",
      header: "Download",
      cell: ({ row }) =>
        row.original.file_url ? (
          <Button asChild size="sm" variant="outline">
            <a href={row.original.file_url} target="_blank" rel="noreferrer">
              <Download className="mr-2 h-4 w-4" />
              Download
            </a>
          </Button>
        ) : (
          "-"
        ),
    },
  ];

  const billColumns: ColumnDef<PortalBill>[] = [
    { accessorKey: "invoice_number", header: "Invoice" },
    { accessorKey: "invoice_date", header: "Date" },
    {
      accessorKey: "total_amount",
      header: "Total",
      cell: ({ row }) => `₹${row.original.total_amount}`,
    },
    {
      accessorKey: "paid_amount",
      header: "Paid",
      cell: ({ row }) => `₹${row.original.paid_amount}`,
    },
    {
      accessorKey: "balance_amount",
      header: "Balance",
      cell: ({ row }) => `₹${row.original.balance_amount}`,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <PortalBillStatusBadge status={row.original.status} />,
    },
  ];

  const claimColumns: ColumnDef<PortalInsuranceClaim>[] = [
    { accessorKey: "claim_number", header: "Claim" },
    { accessorKey: "provider_name", header: "Provider" },
    { accessorKey: "claim_date", header: "Date" },
    {
      accessorKey: "claim_amount",
      header: "Claim Amount",
      cell: ({ row }) => `₹${row.original.claim_amount}`,
    },
    {
      accessorKey: "approved_amount",
      header: "Approved",
      cell: ({ row }) =>
        row.original.approved_amount != null
          ? `₹${row.original.approved_amount}`
          : "-",
    },
    { accessorKey: "status", header: "Status" },
  ];

  async function handleProfileSubmit(values: PatientPortalProfileFormValues) {
    await updateProfile.mutateAsync(values);
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Patient Portal"
          description="Patient self-service dashboard for appointments, prescriptions, reports, bills, insurance, and profile."
        />

        {kpisQuery.isError ? (
          <ErrorState
            title="Could not load patient portal"
            description="Please check your connection or try again."
            onRetry={() => kpisQuery.refetch()}
          />
        ) : kpisQuery.data ? (
          <PatientPortalKpis kpis={kpisQuery.data} />
        ) : null}

        <input
          className="h-10 w-full rounded-md border bg-background px-3 text-sm"
          placeholder="Search portal records..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <Tabs defaultValue="appointments">
          <TabsList>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="prescriptions">Prescriptions</TabsTrigger>
            <TabsTrigger value="lab">Lab Reports</TabsTrigger>
            <TabsTrigger value="radiology">Radiology Reports</TabsTrigger>
            <TabsTrigger value="bills">Bills</TabsTrigger>
            <TabsTrigger value="claims">Insurance</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="appointments" className="mt-4">
            <DataTable
              columns={appointmentColumns}
              data={appointmentsQuery.data?.items ?? []}
              isLoading={appointmentsQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No appointments found"
              emptyDescription="Your upcoming and past appointments will appear here."
            />
          </TabsContent>

          <TabsContent value="prescriptions" className="mt-4">
            <DataTable
              columns={prescriptionColumns}
              data={prescriptionsQuery.data?.items ?? []}
              isLoading={prescriptionsQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No prescriptions found"
              emptyDescription="Your prescriptions will appear here."
            />
          </TabsContent>

          <TabsContent value="lab" className="mt-4">
            <DataTable
              columns={labReportColumns}
              data={labReportsQuery.data?.items ?? []}
              isLoading={labReportsQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No lab reports found"
              emptyDescription="Your laboratory reports will appear here."
            />
          </TabsContent>

          <TabsContent value="radiology" className="mt-4">
            <DataTable
              columns={radiologyReportColumns}
              data={radiologyReportsQuery.data?.items ?? []}
              isLoading={radiologyReportsQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No radiology reports found"
              emptyDescription="Your imaging reports will appear here."
            />
          </TabsContent>

          <TabsContent value="bills" className="mt-4">
            <DataTable
              columns={billColumns}
              data={billsQuery.data?.items ?? []}
              isLoading={billsQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No bills found"
              emptyDescription="Your invoices and payment history will appear here."
            />
          </TabsContent>

          <TabsContent value="claims" className="mt-4">
            <DataTable
              columns={claimColumns}
              data={claimsQuery.data?.items ?? []}
              isLoading={claimsQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No insurance claims found"
              emptyDescription="Your insurance claim status will appear here."
            />
          </TabsContent>

          <TabsContent value="profile" className="mt-4">
            <SectionCard
              title="My Profile"
              description="View and update basic profile information."
            >
              <PatientProfileForm
                profile={profileQuery.data}
                isSubmitting={updateProfile.isPending}
                onSubmit={handleProfileSubmit}
              />
            </SectionCard>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}