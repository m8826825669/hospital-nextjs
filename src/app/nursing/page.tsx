// src/app/nursing/page.tsx

"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ActionMenu,
  DataTable,
  FormDrawer,
  PageHeader,
} from "@/shared/components/enterprise";
import { AppShell } from "@/shared/components/layout/app-shell";

import {
  MedicationAdminStatusBadge,
  NursingTaskPriorityBadge,
  NursingTaskStatusBadge,
} from "@/features/nursing/components/nursing-badges";
import { NursingNoteForm } from "@/features/nursing/components/nursing-note-form";
import { NursingTaskForm } from "@/features/nursing/components/nursing-task-form";
import { VitalForm } from "@/features/nursing/components/vital-form";

import {
  useCreateNursingNote,
  useCreateNursingTask,
  useCreateVital,
  useNursingMedications,
  useNursingNotes,
  useNursingPatients,
  useNursingTasks,
  useNursingVitals,
  useUpdateMedicationStatus,
  useUpdateNursingTaskStatus,
} from "@/features/nursing/api/nursing.queries";

import type {
  MedicationAdministration,
  NursingNote,
  NursingPatient,
  NursingTask,
  VitalRecord,
} from "@/features/nursing/types/nursing.types";
import type {
  NursingNoteFormValues,
  NursingTaskFormValues,
  VitalFormValues,
} from "@/features/nursing/schemas/nursing.schema";

export default function NursingPage() {
  const [search, setSearch] = useState("");
  const [selectedAdmissionId, setSelectedAdmissionId] = useState("");

  const [vitalFormOpen, setVitalFormOpen] = useState(false);
  const [noteFormOpen, setNoteFormOpen] = useState(false);
  const [taskFormOpen, setTaskFormOpen] = useState(false);

  const params = useMemo(
    () => ({
      page: 1,
      size: 100,
      search: search || undefined,
      admission_id: selectedAdmissionId || undefined,
    }),
    [search, selectedAdmissionId]
  );

  const patientsQuery = useNursingPatients(params);
  const vitalsQuery = useNursingVitals(params);
  const medicationsQuery = useNursingMedications(params);
  const notesQuery = useNursingNotes(params);
  const tasksQuery = useNursingTasks(params);

  const createVital = useCreateVital();
  const createNote = useCreateNursingNote();
  const createTask = useCreateNursingTask();
  const updateMedicationStatus = useUpdateMedicationStatus();
  const updateTaskStatus = useUpdateNursingTaskStatus();

  const patientColumns: ColumnDef<NursingPatient>[] = [
    {
      accessorKey: "patient_name",
      header: "Patient",
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.patient_name}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.patient_uhid || "-"}
          </p>
        </div>
      ),
    },
    { accessorKey: "ward_name", header: "Ward" },
    { accessorKey: "bed_number", header: "Bed" },
    { accessorKey: "doctor_name", header: "Doctor" },
    { accessorKey: "diagnosis", header: "Diagnosis" },
    {
      id: "actions",
      cell: ({ row }) => (
        <ActionMenu
          items={[
            {
              label: "Select Patient",
              onClick: () => setSelectedAdmissionId(row.original.admission_id),
            },
            {
              label: "Record Vitals",
              onClick: () => {
                setSelectedAdmissionId(row.original.admission_id);
                setVitalFormOpen(true);
              },
            },
            {
              label: "Add Note",
              onClick: () => {
                setSelectedAdmissionId(row.original.admission_id);
                setNoteFormOpen(true);
              },
            },
            {
              label: "Create Task",
              onClick: () => {
                setSelectedAdmissionId(row.original.admission_id);
                setTaskFormOpen(true);
              },
            },
          ]}
        />
      ),
    },
  ];

  const vitalColumns: ColumnDef<VitalRecord>[] = [
    { accessorKey: "recorded_at", header: "Recorded At" },
    { accessorKey: "temperature", header: "Temp" },
    { accessorKey: "pulse", header: "Pulse" },
    { accessorKey: "respiratory_rate", header: "RR" },
    { accessorKey: "blood_pressure", header: "BP" },
    { accessorKey: "spo2", header: "SpO2" },
    { accessorKey: "pain_score", header: "Pain" },
  ];

  const medicationColumns: ColumnDef<MedicationAdministration>[] = [
    { accessorKey: "medicine_name", header: "Medicine" },
    { accessorKey: "dose", header: "Dose" },
    { accessorKey: "route", header: "Route" },
    { accessorKey: "scheduled_at", header: "Scheduled" },
    { accessorKey: "administered_at", header: "Administered" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <MedicationAdminStatusBadge status={row.original.status} />
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <ActionMenu
          items={[
            {
              label: "Mark Administered",
              onClick: () =>
                updateMedicationStatus.mutate({
                  id: row.original.id,
                  status: "administered",
                }),
            },
            {
              label: "Hold",
              danger: true,
              onClick: () =>
                updateMedicationStatus.mutate({
                  id: row.original.id,
                  status: "held",
                }),
            },
            {
              label: "Skip",
              onClick: () =>
                updateMedicationStatus.mutate({
                  id: row.original.id,
                  status: "skipped",
                }),
            },
          ]}
        />
      ),
    },
  ];

  const noteColumns: ColumnDef<NursingNote>[] = [
    { accessorKey: "note_date", header: "Date" },
    { accessorKey: "note_type", header: "Type" },
    { accessorKey: "nurse_name", header: "Nurse" },
    { accessorKey: "notes", header: "Notes" },
  ];

  const taskColumns: ColumnDef<NursingTask>[] = [
    { accessorKey: "title", header: "Task" },
    { accessorKey: "due_at", header: "Due" },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => (
        <NursingTaskPriorityBadge priority={row.original.priority} />
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <NursingTaskStatusBadge status={row.original.status} />,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <ActionMenu
          items={[
            {
              label: "Start",
              onClick: () =>
                updateTaskStatus.mutate({
                  id: row.original.id,
                  status: "in_progress",
                }),
            },
            {
              label: "Complete",
              onClick: () =>
                updateTaskStatus.mutate({
                  id: row.original.id,
                  status: "completed",
                }),
            },
            {
              label: "Cancel",
              danger: true,
              onClick: () =>
                updateTaskStatus.mutate({
                  id: row.original.id,
                  status: "cancelled",
                }),
            },
          ]}
        />
      ),
    },
  ];

  async function handleVitalSubmit(values: VitalFormValues) {
    await createVital.mutateAsync(values);
    setVitalFormOpen(false);
  }

  async function handleNoteSubmit(values: NursingNoteFormValues) {
    await createNote.mutateAsync(values);
    setNoteFormOpen(false);
  }

  async function handleTaskSubmit(values: NursingTaskFormValues) {
    await createTask.mutateAsync(values);
    setTaskFormOpen(false);
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Nursing Station"
          description="Manage inpatient worklist, vitals, medication administration, nursing notes, care tasks, and handovers."
          actions={
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setVitalFormOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Vitals
              </Button>
              <Button variant="outline" onClick={() => setNoteFormOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Note
              </Button>
              <Button onClick={() => setTaskFormOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Task
              </Button>
            </div>
          }
        />

        <div className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-2">
          <input
            className="h-10 rounded-md border bg-background px-3 text-sm"
            placeholder="Search nursing station..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <input
            className="h-10 rounded-md border bg-background px-3 text-sm"
            placeholder="Selected Admission ID"
            value={selectedAdmissionId}
            onChange={(event) => setSelectedAdmissionId(event.target.value)}
          />
        </div>

        <Tabs defaultValue="patients">
          <TabsList>
            <TabsTrigger value="patients">IPD Worklist</TabsTrigger>
            <TabsTrigger value="vitals">Vitals</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="notes">Nursing Notes</TabsTrigger>
            <TabsTrigger value="tasks">Care Tasks</TabsTrigger>
          </TabsList>

          <TabsContent value="patients" className="mt-4">
            <DataTable
              columns={patientColumns}
              data={patientsQuery.data?.items ?? []}
              isLoading={patientsQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No admitted patients found"
              emptyDescription="Current IPD nursing worklist will appear here."
            />
          </TabsContent>

          <TabsContent value="vitals" className="mt-4">
            <DataTable
              columns={vitalColumns}
              data={vitalsQuery.data?.items ?? []}
              isLoading={vitalsQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No vitals found"
              emptyDescription="Patient vital records will appear here."
            />
          </TabsContent>

          <TabsContent value="medications" className="mt-4">
            <DataTable
              columns={medicationColumns}
              data={medicationsQuery.data?.items ?? []}
              isLoading={medicationsQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No medication administration records found"
              emptyDescription="Scheduled and administered medications will appear here."
            />
          </TabsContent>

          <TabsContent value="notes" className="mt-4">
            <DataTable
              columns={noteColumns}
              data={notesQuery.data?.items ?? []}
              isLoading={notesQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No nursing notes found"
              emptyDescription="Nursing notes and handover notes will appear here."
            />
          </TabsContent>

          <TabsContent value="tasks" className="mt-4">
            <DataTable
              columns={taskColumns}
              data={tasksQuery.data?.items ?? []}
              isLoading={tasksQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No nursing tasks found"
              emptyDescription="Care tasks and nursing activities will appear here."
            />
          </TabsContent>
        </Tabs>

        <FormDrawer
          open={vitalFormOpen}
          onOpenChange={setVitalFormOpen}
          title="Record Vitals"
          description="Record patient vital signs."
          size="lg"
        >
          <VitalForm
            admissionId={selectedAdmissionId}
            isSubmitting={createVital.isPending}
            onSubmit={handleVitalSubmit}
            onCancel={() => setVitalFormOpen(false)}
          />
        </FormDrawer>

        <FormDrawer
          open={noteFormOpen}
          onOpenChange={setNoteFormOpen}
          title="Nursing Note"
          description="Add nursing observation, handover, or care note."
          size="lg"
        >
          <NursingNoteForm
            admissionId={selectedAdmissionId}
            isSubmitting={createNote.isPending}
            onSubmit={handleNoteSubmit}
            onCancel={() => setNoteFormOpen(false)}
          />
        </FormDrawer>

        <FormDrawer
          open={taskFormOpen}
          onOpenChange={setTaskFormOpen}
          title="Care Task"
          description="Create nursing care task."
          size="md"
        >
          <NursingTaskForm
            admissionId={selectedAdmissionId}
            isSubmitting={createTask.isPending}
            onSubmit={handleTaskSubmit}
            onCancel={() => setTaskFormOpen(false)}
          />
        </FormDrawer>
      </div>
    </AppShell>
  );
}