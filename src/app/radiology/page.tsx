// src/app/radiology/page.tsx

"use client";

import { useMemo, useState } from "react";
import { AlertTriangle, CheckCircle2, Clock, Plus, ScanLine } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable, FormDrawer, PageHeader, SectionCard } from "@/shared/components/enterprise";
import { AppShell } from "@/shared/components/layout/app-shell";
import {
  useCreateRadiologyOrder,
  useCreateRadiologyReport,
  useCreateRadiologyTest,
  useRadiologyDashboard,
  useRadiologyDoctorOptions,
  useRadiologyOrders,
  useRadiologyPatientOptions,
  useRadiologyReports,
  useRadiologyTests,
  useUpdateRadiologyOrderStatus,
} from "@/features/radiology/api/radiology.queries";
import {
  ModalityBadge,
  PriorityBadge,
  RadiologyOrderStatusBadge,
  RadiologyReportStatusBadge,
} from "@/features/radiology/components/radiology-badges";
import { RadiologyOrderForm } from "@/features/radiology/components/radiology-order-form";
import { RadiologyReportForm } from "@/features/radiology/components/radiology-report-form";
import { RadiologyTestForm } from "@/features/radiology/components/radiology-test-form";
import {
  modalityOptions,
  radiologyOrderStatusOptions,
  radiologyPriorityOptions,
  radiologyReportStatusOptions,
} from "@/features/radiology/constants/radiology.constants";
import type {
  RadiologyModality,
  RadiologyOrder,
  RadiologyOrderStatus,
  RadiologyPriority,
  RadiologyReport,
  RadiologyReportStatus,
  RadiologyTest,
} from "@/features/radiology/types/radiology.types";
import type {
  RadiologyOrderFormValues,
  RadiologyReportFormValues,
  RadiologyTestFormValues,
} from "@/features/radiology/schemas/radiology.schema";

type KpiCardProps = {
  label: string;
  value: number;
  description: string;
  tone?: "default" | "warning" | "success" | "danger";
};

function KpiCard({ label, value, description, tone = "default" }: KpiCardProps) {
  const icon = tone === "success" ? CheckCircle2 : tone === "warning" || tone === "danger" ? AlertTriangle : Clock;
  const Icon = icon;

  return (
    <SectionCard className="p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-semibold">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="rounded-full bg-muted p-3">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    </SectionCard>
  );
}

function nextWorkflowStatus(status: string): RadiologyOrderStatus | null {
  const flow: RadiologyOrderStatus[] = [
    "ordered",
    "scheduled",
    "patient_arrived",
    "in_progress",
    "images_uploaded",
    "reporting",
    "reported",
    "verified",
    "approved",
    "completed",
  ];
  const index = flow.indexOf(status as RadiologyOrderStatus);
  if (index < 0 || index === flow.length - 1) return null;
  return flow[index + 1];
}

export default function RadiologyPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<RadiologyOrderStatus | "all">("all");
  const [priorityFilter, setPriorityFilter] = useState<RadiologyPriority | "all">("all");
  const [modalityFilter, setModalityFilter] = useState<RadiologyModality | "all">("all");
  const [reportStatusFilter, setReportStatusFilter] = useState<RadiologyReportStatus | "all">("all");

  const [testDrawerOpen, setTestDrawerOpen] = useState(false);
  const [orderDrawerOpen, setOrderDrawerOpen] = useState(false);
  const [reportDrawerOpen, setReportDrawerOpen] = useState(false);

  const orderParams = useMemo(
    () => ({
      page: 1,
      size: 100,
      search: search || undefined,
      status: statusFilter === "all" ? undefined : statusFilter,
      priority: priorityFilter === "all" ? undefined : priorityFilter,
      modality: modalityFilter === "all" ? undefined : modalityFilter,
    }),
    [search, statusFilter, priorityFilter, modalityFilter]
  );

  const testParams = useMemo(
    () => ({
      page: 1,
      size: 100,
      search: search || undefined,
      modality: modalityFilter === "all" ? undefined : modalityFilter,
    }),
    [search, modalityFilter]
  );

  const reportParams = useMemo(
    () => ({
      page: 1,
      size: 100,
      search: search || undefined,
      status: reportStatusFilter === "all" ? undefined : reportStatusFilter,
    }),
    [search, reportStatusFilter]
  );

  const activeOrderParams = useMemo(() => ({ page: 1, size: 100 }), []);

  const dashboardQuery = useRadiologyDashboard();
  const testsQuery = useRadiologyTests(testParams);
  const ordersQuery = useRadiologyOrders(orderParams);
  const reportOrdersQuery = useRadiologyOrders(activeOrderParams);
  const reportsQuery = useRadiologyReports(reportParams);
  const patientOptionsQuery = useRadiologyPatientOptions();
  const doctorOptionsQuery = useRadiologyDoctorOptions();

  const createTest = useCreateRadiologyTest();
  const createOrder = useCreateRadiologyOrder();
  const createReport = useCreateRadiologyReport();
  const updateOrderStatus = useUpdateRadiologyOrderStatus();

  const testColumns: ColumnDef<RadiologyTest>[] = [
    { accessorKey: "code", header: "Code" },
    { accessorKey: "name", header: "Test" },
    { accessorKey: "modality", header: "Modality", cell: ({ row }) => <ModalityBadge modality={row.original.modality} /> },
    { accessorKey: "body_part", header: "Body Part" },
    { accessorKey: "estimated_duration_minutes", header: "Duration", cell: ({ row }) => row.original.estimated_duration_minutes ? `${row.original.estimated_duration_minutes} min` : "-" },
    { accessorKey: "contrast_required", header: "Contrast", cell: ({ row }) => (row.original.contrast_required ? "Yes" : "No") },
    { accessorKey: "price", header: "Price", cell: ({ row }) => `₹${Number(row.original.price).toFixed(2)}` },
    { accessorKey: "is_active", header: "Active", cell: ({ row }) => (row.original.is_active ? "Yes" : "No") },
  ];

  const orderColumns: ColumnDef<RadiologyOrder>[] = [
    { accessorKey: "order_number", header: "Order" },
    { accessorKey: "patient_name", header: "Patient" },
    { accessorKey: "test_name", header: "Test" },
    { accessorKey: "modality", header: "Modality", cell: ({ row }) => <ModalityBadge modality={row.original.modality ?? "-"} /> },
    { accessorKey: "scheduled_date", header: "Scheduled", cell: ({ row }) => row.original.scheduled_date ?? "-" },
    { accessorKey: "priority", header: "Priority", cell: ({ row }) => <PriorityBadge priority={row.original.priority} /> },
    { accessorKey: "status", header: "Status", cell: ({ row }) => <RadiologyOrderStatusBadge status={row.original.status} /> },
    {
      id: "actions",
      cell: ({ row }) => {
        const next = nextWorkflowStatus(row.original.status);
        return (
          <div className="flex justify-end gap-2">
            {next && (
              <Button size="sm" variant="outline" onClick={() => updateOrderStatus.mutate({ id: row.original.id, status: next })}>
                Move to {next.replaceAll("_", " ")}
              </Button>
            )}
          </div>
        );
      },
    },
  ];

  const reportColumns: ColumnDef<RadiologyReport>[] = [
    { accessorKey: "order_number", header: "Order" },
    { accessorKey: "patient_name", header: "Patient" },
    { accessorKey: "test_name", header: "Test" },
    { accessorKey: "critical_finding", header: "Critical", cell: ({ row }) => (row.original.critical_finding ? "Yes" : "No") },
    { accessorKey: "impression", header: "Impression" },
    { accessorKey: "status", header: "Status", cell: ({ row }) => <RadiologyReportStatusBadge status={row.original.status} /> },
  ];

  async function handleCreateTest(values: RadiologyTestFormValues) {
    await createTest.mutateAsync(values);
    setTestDrawerOpen(false);
  }

  async function handleCreateOrder(values: RadiologyOrderFormValues) {
    await createOrder.mutateAsync(values);
    setOrderDrawerOpen(false);
  }

  async function handleCreateReport(values: RadiologyReportFormValues) {
    await createReport.mutateAsync(values);
    setReportDrawerOpen(false);
  }

  const dashboard = dashboardQuery.data;

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Radiology Information System"
          description="Manage imaging test catalogue, scheduling, scan workflow, structured reporting, verification, and approvals."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
          <KpiCard label="Today" value={dashboard?.today_orders ?? 0} description="Orders today" />
          <KpiCard label="Pending" value={dashboard?.pending_orders ?? 0} description="Awaiting scheduling" />
          <KpiCard label="Scheduled" value={dashboard?.scheduled_orders ?? 0} description="Booked scans" />
          <KpiCard label="In Progress" value={dashboard?.in_progress_orders ?? 0} description="Scanning" tone="warning" />
          <KpiCard label="Critical" value={dashboard?.critical_reports ?? 0} description="Critical reports" tone="danger" />
          <KpiCard label="Approved" value={dashboard?.approved_reports ?? 0} description="Final reports" tone="success" />
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px_180px_180px]">
            <input
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              placeholder="Search by order, patient, test, diagnosis..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <select className="h-10 rounded-md border bg-background px-3 text-sm" value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as RadiologyOrderStatus | "all")}>
              <option value="all">All Order Statuses</option>
              {radiologyOrderStatusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
            <select className="h-10 rounded-md border bg-background px-3 text-sm" value={priorityFilter} onChange={(event) => setPriorityFilter(event.target.value as RadiologyPriority | "all")}>
              <option value="all">All Priorities</option>
              {radiologyPriorityOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
            <select className="h-10 rounded-md border bg-background px-3 text-sm" value={modalityFilter} onChange={(event) => setModalityFilter(event.target.value as RadiologyModality | "all")}>
              <option value="all">All Modalities</option>
              {modalityOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
            <select className="h-10 rounded-md border bg-background px-3 text-sm" value={reportStatusFilter} onChange={(event) => setReportStatusFilter(event.target.value as RadiologyReportStatus | "all")}>
              <option value="all">All Report Statuses</option>
              {radiologyReportStatusOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
          </div>
        </div>

        <Tabs defaultValue="orders" className="space-y-4">
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 rounded-xl bg-muted/40 p-2">
            <TabsTrigger className="h-9 flex-none px-4" value="orders">Orders</TabsTrigger>
            <TabsTrigger className="h-9 flex-none px-4" value="reports">Reports</TabsTrigger>
            <TabsTrigger className="h-9 flex-none px-4" value="tests">Test Catalogue</TabsTrigger>
            <TabsTrigger className="h-9 flex-none px-4" value="viewer">Viewer Workspace</TabsTrigger>
          </TabsList>

          <TabsContent value="orders" className="space-y-4">
            <Button onClick={() => setOrderDrawerOpen(true)}><Plus className="mr-2 h-4 w-4" />New Imaging Order</Button>
            <DataTable columns={orderColumns} data={ordersQuery.data?.items ?? []} isLoading={ordersQuery.isLoading} search={search} onSearchChange={setSearch} emptyTitle="No radiology orders found" emptyDescription="Create imaging orders for X-Ray, CT, MRI, ultrasound, and other modalities." />
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Button onClick={() => setReportDrawerOpen(true)}><Plus className="mr-2 h-4 w-4" />New Report</Button>
            <DataTable columns={reportColumns} data={reportsQuery.data?.items ?? []} isLoading={reportsQuery.isLoading} search={search} onSearchChange={setSearch} emptyTitle="No radiology reports found" emptyDescription="Draft, verified, critical, and approved reports will appear here." />
          </TabsContent>

          <TabsContent value="tests" className="space-y-4">
            <Button onClick={() => setTestDrawerOpen(true)}><Plus className="mr-2 h-4 w-4" />Add Radiology Test</Button>
            <DataTable columns={testColumns} data={testsQuery.data?.items ?? []} isLoading={testsQuery.isLoading} search={search} onSearchChange={setSearch} emptyTitle="No test catalogue records found" emptyDescription="Create imaging tests, protocols, preparation notes, duration, and modality pricing." />
          </TabsContent>

          <TabsContent value="viewer" className="space-y-4">
            <div className="grid min-h-[480px] gap-4 lg:grid-cols-[280px_1fr_420px]">
              <SectionCard className="p-4">
                <h3 className="font-semibold">Study List</h3>
                <p className="mt-1 text-sm text-muted-foreground">Select a scheduled or reported study from the order list.</p>
                <div className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <p>CT / MRI / X-Ray / Ultrasound worklist placeholder.</p>
                  <p>DICOM integration will connect here later.</p>
                </div>
              </SectionCard>
              <SectionCard className="flex items-center justify-center p-4">
                <div className="text-center text-muted-foreground">
                  <ScanLine className="mx-auto h-12 w-12" />
                  <p className="mt-3 font-medium">PACS Viewer Workspace</p>
                  <p className="text-sm">Zoom, rotate, brightness, contrast, measurements, and series navigation.</p>
                </div>
              </SectionCard>
              <SectionCard className="p-4">
                <h3 className="font-semibold">Report Preview</h3>
                <p className="mt-1 text-sm text-muted-foreground">Structured report editor opens in the Reports tab.</p>
              </SectionCard>
            </div>
          </TabsContent>
        </Tabs>

        <FormDrawer open={testDrawerOpen} onOpenChange={setTestDrawerOpen} title="Add Radiology Test" description="Create imaging test catalogue item." size="wide">
          <RadiologyTestForm isSubmitting={createTest.isPending} onSubmit={handleCreateTest} onCancel={() => setTestDrawerOpen(false)} />
        </FormDrawer>

        <FormDrawer open={orderDrawerOpen} onOpenChange={setOrderDrawerOpen} title="New Imaging Order" description="Create a radiology order for patient imaging." size="wide">
          <RadiologyOrderForm patients={patientOptionsQuery.data ?? []} doctors={doctorOptionsQuery.data ?? []} tests={testsQuery.data?.items ?? []} isSubmitting={createOrder.isPending} onSubmit={handleCreateOrder} onCancel={() => setOrderDrawerOpen(false)} />
        </FormDrawer>

        <FormDrawer open={reportDrawerOpen} onOpenChange={setReportDrawerOpen} title="New Radiology Report" description="Record clinical history, technique, findings, impression, and approval status." size="wide">
          <RadiologyReportForm orders={reportOrdersQuery.data?.items ?? []} doctors={doctorOptionsQuery.data ?? []} isSubmitting={createReport.isPending} onSubmit={handleCreateReport} onCancel={() => setReportDrawerOpen(false)} />
        </FormDrawer>
      </div>
    </AppShell>
  );
}
