"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppShell } from "@/shared/components/layout/app-shell";
import { DataTable, FormDrawer, PageHeader, StatCard } from "@/shared/components/enterprise";
import { DentalChartForm } from "@/features/dental/components/dental-chart-form";
import { DentalProcedureForm } from "@/features/dental/components/dental-procedure-form";
import { DentalVisitForm } from "@/features/dental/components/dental-visit-form";
import { DentalStatusBadge, ToothConditionBadge } from "@/features/dental/components/dental-badges";
import { useCreateDentalChart, useCreateDentalProcedure, useCreateDentalVisit, useDentalCharts, useDentalDashboard, useDentalProcedures, useDentalVisits } from "@/features/dental/api/dental.queries";
import type { DentalChart, DentalProcedure, DentalVisit } from "@/features/dental/types/dental.types";
import type { DentalChartFormValues, DentalProcedureFormValues, DentalVisitFormValues } from "@/features/dental/schemas/dental.schema";

export default function DentalPage() {
  const [search, setSearch] = useState("");
  const [visitOpen, setVisitOpen] = useState(false);
  const [chartOpen, setChartOpen] = useState(false);
  const [procedureOpen, setProcedureOpen] = useState(false);

  const params = useMemo(() => ({ page: 1, size: 100, search: search || undefined }), [search]);
  const dashboard = useDentalDashboard();
  const visits = useDentalVisits(params);
  const charts = useDentalCharts(params);
  const procedures = useDentalProcedures(params);
  const createVisit = useCreateDentalVisit();
  const createChart = useCreateDentalChart();
  const createProcedure = useCreateDentalProcedure();

  const visitColumns: ColumnDef<DentalVisit>[] = [
    { accessorKey: "visit_number", header: "Visit" },
    { accessorKey: "chief_complaint", header: "Chief Complaint" },
    { accessorKey: "diagnosis", header: "Diagnosis" },
    { accessorKey: "status", header: "Status", cell: ({ row }) => <DentalStatusBadge status={row.original.status} /> },
  ];
  const chartColumns: ColumnDef<DentalChart>[] = [
    { accessorKey: "tooth_number", header: "Tooth" },
    { accessorKey: "surface", header: "Surface" },
    { accessorKey: "condition", header: "Condition", cell: ({ row }) => <ToothConditionBadge condition={row.original.condition} /> },
    { accessorKey: "notes", header: "Notes" },
  ];
  const procedureColumns: ColumnDef<DentalProcedure>[] = [
    { accessorKey: "procedure_name", header: "Procedure" },
    { accessorKey: "procedure_type", header: "Type" },
    { accessorKey: "tooth_number", header: "Tooth" },
    { accessorKey: "cost", header: "Cost", cell: ({ row }) => `₹${row.original.cost}` },
    { accessorKey: "status", header: "Status", cell: ({ row }) => <DentalStatusBadge status={row.original.status} /> },
  ];

  async function handleVisitSubmit(values: DentalVisitFormValues) { await createVisit.mutateAsync(values); setVisitOpen(false); }
  async function handleChartSubmit(values: DentalChartFormValues) { await createChart.mutateAsync(values); setChartOpen(false); }
  async function handleProcedureSubmit(values: DentalProcedureFormValues) { await createProcedure.mutateAsync(values); setProcedureOpen(false); }

  return <AppShell><div className="space-y-6"><PageHeader title="Dental Department" description="Manage dental visits, tooth charting, treatment plans, and procedures." />
    <div className="grid gap-4 md:grid-cols-5"><StatCard title="Visits Today" value={dashboard.data?.visits_today ?? 0} /><StatCard title="Open Visits" value={dashboard.data?.open_visits ?? 0} /><StatCard title="Planned Procedures" value={dashboard.data?.planned_procedures ?? 0} /><StatCard title="Completed" value={dashboard.data?.completed_procedures ?? 0} /><StatCard title="Chart Entries" value={dashboard.data?.chart_entries ?? 0} /></div>
    <input className="h-10 w-full rounded-md border bg-background px-3 text-sm" placeholder="Search dental records..." value={search} onChange={(e) => setSearch(e.target.value)} />
    <Tabs defaultValue="visits"><TabsList className="mb-4 flex h-auto flex-wrap gap-2 rounded-xl bg-muted/40 p-2"><TabsTrigger value="visits">Visits</TabsTrigger><TabsTrigger value="chart">Tooth Chart</TabsTrigger><TabsTrigger value="procedures">Procedures</TabsTrigger></TabsList>
      <TabsContent value="visits" className="space-y-4"><Button onClick={() => setVisitOpen(true)}><Plus className="mr-2 h-4 w-4" />New Dental Visit</Button><DataTable columns={visitColumns} data={visits.data?.items ?? []} isLoading={visits.isLoading} search={search} onSearchChange={setSearch} emptyTitle="No dental visits" emptyDescription="Create a dental visit to start diagnosis and treatment planning." /></TabsContent>
      <TabsContent value="chart" className="space-y-4"><Button onClick={() => setChartOpen(true)}><Plus className="mr-2 h-4 w-4" />Add Tooth Chart</Button><DataTable columns={chartColumns} data={charts.data?.items ?? []} isLoading={charts.isLoading} search={search} onSearchChange={setSearch} emptyTitle="No chart entries" emptyDescription="Add tooth conditions and odontogram entries." /></TabsContent>
      <TabsContent value="procedures" className="space-y-4"><Button onClick={() => setProcedureOpen(true)}><Plus className="mr-2 h-4 w-4" />New Procedure</Button><DataTable columns={procedureColumns} data={procedures.data?.items ?? []} isLoading={procedures.isLoading} search={search} onSearchChange={setSearch} emptyTitle="No procedures" emptyDescription="Plan and track dental procedures." /></TabsContent>
    </Tabs>
    <FormDrawer open={visitOpen} onOpenChange={setVisitOpen} title="New Dental Visit" description="Record dental complaint, examination, diagnosis, and treatment plan." size="wide"><DentalVisitForm isSubmitting={createVisit.isPending} onSubmit={handleVisitSubmit} onCancel={() => setVisitOpen(false)} /></FormDrawer>
    <FormDrawer open={chartOpen} onOpenChange={setChartOpen} title="Tooth Chart Entry" description="Record tooth condition and clinical notes." size="lg"><DentalChartForm isSubmitting={createChart.isPending} onSubmit={handleChartSubmit} onCancel={() => setChartOpen(false)} /></FormDrawer>
    <FormDrawer open={procedureOpen} onOpenChange={setProcedureOpen} title="Dental Procedure" description="Plan or complete dental procedure." size="lg"><DentalProcedureForm isSubmitting={createProcedure.isPending} onSubmit={handleProcedureSubmit} onCancel={() => setProcedureOpen(false)} /></FormDrawer>
  </div></AppShell>;
}
