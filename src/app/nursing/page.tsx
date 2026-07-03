// src/app/nursing/page.tsx

"use client";

import { useMemo, useState } from "react";
import { ClipboardList, HeartPulse, ListChecks, Pill, Plus, Stethoscope } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable, FormDrawer, PageHeader } from "@/shared/components/enterprise";
import { AppShell } from "@/shared/components/layout/app-shell";

import { CarePlanForm } from "@/features/nursing/components/care-plan-form";
import { MedicationAdministrationForm } from "@/features/nursing/components/medication-administration-form";
import { NursingNoteForm } from "@/features/nursing/components/nursing-note-form";
import { NursingPriorityBadge, NursingStatusBadge } from "@/features/nursing/components/nursing-badges";
import { NursingTaskForm } from "@/features/nursing/components/nursing-task-form";
import { VitalSignForm } from "@/features/nursing/components/vital-sign-form";
import {
  useCarePlans,
  useCreateCarePlan,
  useCreateMedication,
  useCreateNote,
  useCreateTask,
  useCreateVital,
  useMedications,
  useNotes,
  useNursingDashboard,
  useTasks,
  useVitals,
} from "@/features/nursing/api/nursing.queries";
import type { CarePlan, MedicationAdministration, NursingNote, NursingTask, VitalSign } from "@/features/nursing/types/nursing.types";
import type { CarePlanFormValues, MedicationAdministrationFormValues, NursingNoteFormValues, NursingTaskFormValues, VitalSignFormValues } from "@/features/nursing/schemas/nursing.schema";

function formatDateTime(value?: string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
}

function formatDate(value?: string | null) {
  if (!value) return "-";
  return new Intl.DateTimeFormat("en-IN", { day: "2-digit", month: "short", year: "numeric" }).format(new Date(value));
}

function StatCard({ title, value, description, icon: Icon }: { title: string; value: string | number; description: string; icon: typeof HeartPulse }) {
  return <div className="rounded-xl border bg-card p-5 shadow-sm"><div className="flex items-start justify-between gap-3"><div><p className="text-sm text-muted-foreground">{title}</p><p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p><p className="mt-1 text-xs text-muted-foreground">{description}</p></div><div className="rounded-lg bg-muted p-2 text-muted-foreground"><Icon className="h-5 w-5" /></div></div></div>;
}

export default function NursingPage() {
  const [search, setSearch] = useState("");
  const [vitalsOpen, setVitalsOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const [carePlanOpen, setCarePlanOpen] = useState(false);
  const [taskOpen, setTaskOpen] = useState(false);
  const [medicationOpen, setMedicationOpen] = useState(false);

  const params = useMemo(() => ({ page: 1, size: 100 }), []);

  const dashboardQuery = useNursingDashboard();
  const vitalsQuery = useVitals(params);
  const notesQuery = useNotes(params);
  const carePlansQuery = useCarePlans(params);
  const tasksQuery = useTasks(params);
  const medicationsQuery = useMedications(params);

  const createVital = useCreateVital();
  const createNote = useCreateNote();
  const createCarePlan = useCreateCarePlan();
  const createTask = useCreateTask();
  const createMedication = useCreateMedication();

  const dashboard = dashboardQuery.data;

  const vitalColumns: ColumnDef<VitalSign>[] = [
    { accessorKey: "patient_id", header: "Patient" },
    { accessorKey: "recorded_at", header: "Recorded", cell: ({ row }) => formatDateTime(row.original.recorded_at) },
    { accessorKey: "temperature", header: "Temp" },
    { accessorKey: "pulse", header: "Pulse" },
    { accessorKey: "spo2", header: "SpO2" },
    { id: "bp", header: "BP", cell: ({ row }) => row.original.systolic_bp && row.original.diastolic_bp ? `${row.original.systolic_bp}/${row.original.diastolic_bp}` : "-" },
    { accessorKey: "pain_score", header: "Pain" },
  ];

  const noteColumns: ColumnDef<NursingNote>[] = [
    { accessorKey: "patient_id", header: "Patient" },
    { accessorKey: "note_date", header: "Date", cell: ({ row }) => formatDateTime(row.original.note_date) },
    { accessorKey: "note_type", header: "Type" },
    { accessorKey: "shift", header: "Shift" },
    { accessorKey: "assessment", header: "Assessment" },
  ];

  const carePlanColumns: ColumnDef<CarePlan>[] = [
    { accessorKey: "patient_id", header: "Patient" },
    { accessorKey: "problem", header: "Problem" },
    { accessorKey: "start_date", header: "Start", cell: ({ row }) => formatDate(row.original.start_date) },
    { accessorKey: "target_date", header: "Target", cell: ({ row }) => formatDate(row.original.target_date) },
    { accessorKey: "status", header: "Status", cell: ({ row }) => <NursingStatusBadge status={row.original.status} /> },
  ];

  const taskColumns: ColumnDef<NursingTask>[] = [
    { accessorKey: "patient_id", header: "Patient" },
    { accessorKey: "title", header: "Task" },
    { accessorKey: "priority", header: "Priority", cell: ({ row }) => <NursingPriorityBadge priority={row.original.priority} /> },
    { accessorKey: "due_at", header: "Due", cell: ({ row }) => formatDateTime(row.original.due_at) },
    { accessorKey: "status", header: "Status", cell: ({ row }) => <NursingStatusBadge status={row.original.status} /> },
  ];

  const medicationColumns: ColumnDef<MedicationAdministration>[] = [
    { accessorKey: "patient_id", header: "Patient" },
    { accessorKey: "medication_name", header: "Medication" },
    { accessorKey: "dose", header: "Dose" },
    { accessorKey: "route", header: "Route" },
    { accessorKey: "scheduled_at", header: "Scheduled", cell: ({ row }) => formatDateTime(row.original.scheduled_at) },
    { accessorKey: "status", header: "Status", cell: ({ row }) => <NursingStatusBadge status={row.original.status} /> },
  ];

  async function handleVitalSubmit(values: VitalSignFormValues) { await createVital.mutateAsync(values); setVitalsOpen(false); }
  async function handleNoteSubmit(values: NursingNoteFormValues) { await createNote.mutateAsync(values); setNoteOpen(false); }
  async function handleCarePlanSubmit(values: CarePlanFormValues) { await createCarePlan.mutateAsync(values); setCarePlanOpen(false); }
  async function handleTaskSubmit(values: NursingTaskFormValues) { await createTask.mutateAsync(values); setTaskOpen(false); }
  async function handleMedicationSubmit(values: MedicationAdministrationFormValues) { await createMedication.mutateAsync(values); setMedicationOpen(false); }

  return <AppShell><div className="space-y-6"><PageHeader title="Nursing Station" description="Manage vitals, nursing notes, care plans, tasks, and medication administration." />
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5"><StatCard title="Pending Tasks" value={dashboard?.pending_tasks ?? "-"} description="Open nursing workload" icon={ListChecks} /><StatCard title="Scheduled MAR" value={dashboard?.scheduled_medications ?? "-"} description="Medication due" icon={Pill} /><StatCard title="Overdue MAR" value={dashboard?.overdue_medications ?? "-"} description="Needs attention" icon={ClipboardList} /><StatCard title="Care Plans" value={dashboard?.active_care_plans ?? "-"} description="Active plans" icon={Stethoscope} /><StatCard title="Vitals Today" value={dashboard?.vitals_today ?? "-"} description="Recorded today" icon={HeartPulse} /></div>
    <input className="h-10 w-full rounded-md border bg-background px-3 text-sm" placeholder="Search nursing records..." value={search} onChange={(e) => setSearch(e.target.value)} />
    <Tabs defaultValue="vitals" className="space-y-4"><TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 rounded-xl bg-muted/40 p-2"><TabsTrigger value="vitals">Vitals</TabsTrigger><TabsTrigger value="notes">Notes</TabsTrigger><TabsTrigger value="care-plans">Care Plans</TabsTrigger><TabsTrigger value="tasks">Tasks</TabsTrigger><TabsTrigger value="mar">MAR</TabsTrigger></TabsList>
      <TabsContent value="vitals" className="space-y-4"><Button onClick={() => setVitalsOpen(true)}><Plus className="mr-2 h-4 w-4" />Record Vitals</Button><DataTable columns={vitalColumns} data={vitalsQuery.data?.items ?? []} isLoading={vitalsQuery.isLoading} search={search} onSearchChange={setSearch} emptyTitle="No vitals recorded" emptyDescription="Vitals will appear here." /></TabsContent>
      <TabsContent value="notes" className="space-y-4"><Button onClick={() => setNoteOpen(true)}><Plus className="mr-2 h-4 w-4" />New Nursing Note</Button><DataTable columns={noteColumns} data={notesQuery.data?.items ?? []} isLoading={notesQuery.isLoading} search={search} onSearchChange={setSearch} emptyTitle="No nursing notes" emptyDescription="Nursing notes will appear here." /></TabsContent>
      <TabsContent value="care-plans" className="space-y-4"><Button onClick={() => setCarePlanOpen(true)}><Plus className="mr-2 h-4 w-4" />New Care Plan</Button><DataTable columns={carePlanColumns} data={carePlansQuery.data?.items ?? []} isLoading={carePlansQuery.isLoading} search={search} onSearchChange={setSearch} emptyTitle="No care plans" emptyDescription="Care plans will appear here." /></TabsContent>
      <TabsContent value="tasks" className="space-y-4"><Button onClick={() => setTaskOpen(true)}><Plus className="mr-2 h-4 w-4" />New Task</Button><DataTable columns={taskColumns} data={tasksQuery.data?.items ?? []} isLoading={tasksQuery.isLoading} search={search} onSearchChange={setSearch} emptyTitle="No tasks" emptyDescription="Nursing tasks will appear here." /></TabsContent>
      <TabsContent value="mar" className="space-y-4"><Button onClick={() => setMedicationOpen(true)}><Plus className="mr-2 h-4 w-4" />Schedule Medication</Button><DataTable columns={medicationColumns} data={medicationsQuery.data?.items ?? []} isLoading={medicationsQuery.isLoading} search={search} onSearchChange={setSearch} emptyTitle="No medication records" emptyDescription="Medication administration records will appear here." /></TabsContent>
    </Tabs>
    <FormDrawer open={vitalsOpen} onOpenChange={setVitalsOpen} title="Record Vitals" description="Capture patient vital signs." size="lg"><VitalSignForm isSubmitting={createVital.isPending} onSubmit={handleVitalSubmit} onCancel={() => setVitalsOpen(false)} /></FormDrawer>
    <FormDrawer open={noteOpen} onOpenChange={setNoteOpen} title="Nursing Note" description="Create a structured nursing note." size="xl"><NursingNoteForm isSubmitting={createNote.isPending} onSubmit={handleNoteSubmit} onCancel={() => setNoteOpen(false)} /></FormDrawer>
    <FormDrawer open={carePlanOpen} onOpenChange={setCarePlanOpen} title="Care Plan" description="Create nursing care plan." size="xl"><CarePlanForm isSubmitting={createCarePlan.isPending} onSubmit={handleCarePlanSubmit} onCancel={() => setCarePlanOpen(false)} /></FormDrawer>
    <FormDrawer open={taskOpen} onOpenChange={setTaskOpen} title="Nursing Task" description="Assign or track nursing tasks." size="lg"><NursingTaskForm isSubmitting={createTask.isPending} onSubmit={handleTaskSubmit} onCancel={() => setTaskOpen(false)} /></FormDrawer>
    <FormDrawer open={medicationOpen} onOpenChange={setMedicationOpen} title="Medication Administration" description="Schedule medication administration record." size="lg"><MedicationAdministrationForm isSubmitting={createMedication.isPending} onSubmit={handleMedicationSubmit} onCancel={() => setMedicationOpen(false)} /></FormDrawer>
  </div></AppShell>;
}
