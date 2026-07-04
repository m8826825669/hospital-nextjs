// src/app/emergency/page.tsx
"use client";

import { useMemo, useState } from "react";
import { Activity, Ambulance, ClipboardList, FileText, HeartPulse, Plus, Stethoscope } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable, FormDrawer, PageHeader } from "@/shared/components/enterprise";
import { AppShell } from "@/shared/components/layout/app-shell";

import { AcuityBadge, EmergencyPriorityBadge, EmergencyStatusBadge } from "@/features/emergency/components/emergency-badges";
import { EmergencyNoteForm } from "@/features/emergency/components/emergency-note-form";
import { EmergencyOrderForm } from "@/features/emergency/components/emergency-order-form";
import { EmergencyTriageForm } from "@/features/emergency/components/emergency-triage-form";
import { EmergencyVisitForm } from "@/features/emergency/components/emergency-visit-form";
import {
  useCreateEmergencyNote,
  useCreateEmergencyOrder,
  useCreateEmergencyTriage,
  useCreateEmergencyVisit,
  useEmergencyDashboard,
  useEmergencyNotes,
  useEmergencyOrders,
  useEmergencyTriages,
  useEmergencyVisits,
} from "@/features/emergency/api/emergency.queries";
import type { EmergencyNote, EmergencyOrder, EmergencyTriage, EmergencyVisit } from "@/features/emergency/types/emergency.types";
import type { EmergencyNoteFormValues, EmergencyOrderFormValues, EmergencyTriageFormValues, EmergencyVisitFormValues } from "@/features/emergency/schemas/emergency.schema";

function formatDateTime(value?: string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function StatCard({ title, value, description, icon: Icon }: { title: string; value: string | number; description: string; icon: typeof Ambulance }) {
  return <div className="rounded-xl border bg-card p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><div><p className="text-sm text-muted-foreground">{title}</p><p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p><p className="mt-1 text-xs text-muted-foreground">{description}</p></div><div className="rounded-lg bg-muted p-2 text-muted-foreground"><Icon className="h-5 w-5" /></div></div></div>;
}

export default function EmergencyPage() {
  const [search, setSearch] = useState("");
  const [visitOpen, setVisitOpen] = useState(false);
  const [triageOpen, setTriageOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const params = useMemo(() => ({ page: 1, size: 100, search: search || undefined }), [search]);

  const dashboardQuery = useEmergencyDashboard();
  const visitsQuery = useEmergencyVisits(params);
  const triagesQuery = useEmergencyTriages({ page: 1, size: 100 });
  const notesQuery = useEmergencyNotes({ page: 1, size: 100 });
  const ordersQuery = useEmergencyOrders({ page: 1, size: 100 });
  const createVisit = useCreateEmergencyVisit();
  const createTriage = useCreateEmergencyTriage();
  const createNote = useCreateEmergencyNote();
  const createOrder = useCreateEmergencyOrder();
  const dashboard = dashboardQuery.data;

  const visitColumns: ColumnDef<EmergencyVisit>[] = [
    { accessorKey: "visit_number", header: "Visit" },
    { accessorKey: "patient_id", header: "Patient" },
    { accessorKey: "arrival_time", header: "Arrival", cell: ({ row }) => formatDateTime(row.original.arrival_time) },
    { accessorKey: "chief_complaint", header: "Chief Complaint" },
    { accessorKey: "priority", header: "Priority", cell: ({ row }) => <EmergencyPriorityBadge priority={row.original.priority} /> },
    { accessorKey: "status", header: "Status", cell: ({ row }) => <EmergencyStatusBadge status={row.original.status} /> },
    { accessorKey: "disposition", header: "Disposition" },
  ];
  const triageColumns: ColumnDef<EmergencyTriage>[] = [
    { accessorKey: "visit_id", header: "Visit" },
    { accessorKey: "triage_time", header: "Triage Time", cell: ({ row }) => formatDateTime(row.original.triage_time) },
    { accessorKey: "acuity_level", header: "Acuity", cell: ({ row }) => <AcuityBadge acuity={row.original.acuity_level} /> },
    { accessorKey: "pain_score", header: "Pain" },
    { accessorKey: "pulse", header: "Pulse" },
    { accessorKey: "spo2", header: "SpO2" },
    { id: "bp", header: "BP", cell: ({ row }) => row.original.systolic_bp && row.original.diastolic_bp ? `${row.original.systolic_bp}/${row.original.diastolic_bp}` : "-" },
  ];
  const noteColumns: ColumnDef<EmergencyNote>[] = [
    { accessorKey: "visit_id", header: "Visit" },
    { accessorKey: "note_time", header: "Time", cell: ({ row }) => formatDateTime(row.original.note_time) },
    { accessorKey: "note_type", header: "Type" },
    { accessorKey: "assessment", header: "Assessment" },
    { accessorKey: "plan", header: "Plan" },
  ];
  const orderColumns: ColumnDef<EmergencyOrder>[] = [
    { accessorKey: "visit_id", header: "Visit" },
    { accessorKey: "order_type", header: "Type" },
    { accessorKey: "order_name", header: "Order" },
    { accessorKey: "priority", header: "Priority", cell: ({ row }) => <EmergencyPriorityBadge priority={row.original.priority} /> },
    { accessorKey: "ordered_at", header: "Ordered", cell: ({ row }) => formatDateTime(row.original.ordered_at) },
    { accessorKey: "status", header: "Status", cell: ({ row }) => <EmergencyStatusBadge status={row.original.status} /> },
  ];

  async function handleVisitSubmit(values: EmergencyVisitFormValues) { await createVisit.mutateAsync(values); setVisitOpen(false); }
  async function handleTriageSubmit(values: EmergencyTriageFormValues) { await createTriage.mutateAsync(values); setTriageOpen(false); }
  async function handleNoteSubmit(values: EmergencyNoteFormValues) { await createNote.mutateAsync(values); setNoteOpen(false); }
  async function handleOrderSubmit(values: EmergencyOrderFormValues) { await createOrder.mutateAsync(values); setOrderOpen(false); }

  return <AppShell><div className="space-y-6"><PageHeader title="Emergency Department" description="Manage ER registration, triage, acuity, emergency notes, orders, observation, and disposition." />
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6"><StatCard title="Active Visits" value={dashboard?.active_visits ?? "-"} description="Currently in ER" icon={Ambulance} /><StatCard title="Waiting Triage" value={dashboard?.waiting_triage ?? "-"} description="Registered patients" icon={ClipboardList} /><StatCard title="Critical" value={dashboard?.critical_patients ?? "-"} description="Resus/emergent" icon={HeartPulse} /><StatCard title="Observation" value={dashboard?.observation_patients ?? "-"} description="Observation bay" icon={Activity} /><StatCard title="Pending Orders" value={dashboard?.pending_orders ?? "-"} description="Open ER orders" icon={Stethoscope} /><StatCard title="Discharged" value={dashboard?.discharged_today ?? "-"} description="Today" icon={FileText} /></div>
    <input className="h-10 w-full rounded-md border bg-background px-3 text-sm" placeholder="Search emergency records..." value={search} onChange={(e) => setSearch(e.target.value)} />
    <Tabs defaultValue="visits" className="space-y-4"><TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 rounded-xl bg-muted/40 p-2"><TabsTrigger value="visits">ER Queue</TabsTrigger><TabsTrigger value="triage">Triage</TabsTrigger><TabsTrigger value="orders">Orders</TabsTrigger><TabsTrigger value="notes">ER Notes</TabsTrigger></TabsList>
      <TabsContent value="visits" className="space-y-4"><Button onClick={() => setVisitOpen(true)}><Plus className="mr-2 h-4 w-4" />Register ER Visit</Button><DataTable columns={visitColumns} data={visitsQuery.data?.items ?? []} isLoading={visitsQuery.isLoading} search={search} onSearchChange={setSearch} emptyTitle="No ER visits" emptyDescription="Emergency visits will appear here." /></TabsContent>
      <TabsContent value="triage" className="space-y-4"><Button onClick={() => setTriageOpen(true)}><Plus className="mr-2 h-4 w-4" />Record Triage</Button><DataTable columns={triageColumns} data={triagesQuery.data?.items ?? []} isLoading={triagesQuery.isLoading} search={search} onSearchChange={setSearch} emptyTitle="No triage records" emptyDescription="Triage records will appear here." /></TabsContent>
      <TabsContent value="orders" className="space-y-4"><Button onClick={() => setOrderOpen(true)}><Plus className="mr-2 h-4 w-4" />New ER Order</Button><DataTable columns={orderColumns} data={ordersQuery.data?.items ?? []} isLoading={ordersQuery.isLoading} search={search} onSearchChange={setSearch} emptyTitle="No ER orders" emptyDescription="Emergency orders will appear here." /></TabsContent>
      <TabsContent value="notes" className="space-y-4"><Button onClick={() => setNoteOpen(true)}><Plus className="mr-2 h-4 w-4" />New ER Note</Button><DataTable columns={noteColumns} data={notesQuery.data?.items ?? []} isLoading={notesQuery.isLoading} search={search} onSearchChange={setSearch} emptyTitle="No ER notes" emptyDescription="Emergency clinical notes will appear here." /></TabsContent>
    </Tabs>
    <FormDrawer open={visitOpen} onOpenChange={setVisitOpen} title="Register Emergency Visit" description="Capture arrival details and chief complaint." size="xl"><EmergencyVisitForm isSubmitting={createVisit.isPending} onSubmit={handleVisitSubmit} onCancel={() => setVisitOpen(false)} /></FormDrawer>
    <FormDrawer open={triageOpen} onOpenChange={setTriageOpen} title="Emergency Triage" description="Record acuity, pain score, and initial vitals." size="xl"><EmergencyTriageForm isSubmitting={createTriage.isPending} onSubmit={handleTriageSubmit} onCancel={() => setTriageOpen(false)} /></FormDrawer>
    <FormDrawer open={orderOpen} onOpenChange={setOrderOpen} title="Emergency Order" description="Create lab, radiology, medication, or procedure order." size="lg"><EmergencyOrderForm isSubmitting={createOrder.isPending} onSubmit={handleOrderSubmit} onCancel={() => setOrderOpen(false)} /></FormDrawer>
    <FormDrawer open={noteOpen} onOpenChange={setNoteOpen} title="Emergency Clinical Note" description="Document emergency assessment and plan." size="xl"><EmergencyNoteForm isSubmitting={createNote.isPending} onSubmit={handleNoteSubmit} onCancel={() => setNoteOpen(false)} /></FormDrawer>
  </div></AppShell>;
}
