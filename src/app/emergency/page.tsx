// src/app/emergency/page.tsx

"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  ActionMenu,
  ConfirmDialog,
  DataTable,
  FormDrawer,
  PageHeader,
} from "@/shared/components/enterprise";
import { AppShell } from "@/shared/components/layout/app-shell";

import { ErSeverityBadge, ErStatusBadge } from "@/features/emergency/components/emergency-badges";
import { EmergencyDispositionForm } from "@/features/emergency/components/emergency-disposition-form";
import { EmergencyEncounterForm } from "@/features/emergency/components/emergency-encounter-form";
import { EmergencyOrderForm } from "@/features/emergency/components/emergency-order-form";
import { EmergencyWorkspaceDrawer } from "@/features/emergency/components/emergency-workspace-drawer";

import {
  useCreateEmergencyEncounter,
  useCreateEmergencyOrder,
  useDeleteEmergencyEncounter,
  useEmergencyEncounters,
  useEmergencyOrders,
  useSaveEmergencyDisposition,
  useUpdateEmergencyEncounter,
  useUpdateEmergencyStatus,
} from "@/features/emergency/api/emergency.queries";

import type {
  EmergencyEncounter,
  EmergencyOrder,
  ErEncounterStatus,
  ErSeverity,
} from "@/features/emergency/types/emergency.types";
import type {
  EmergencyDispositionFormValues,
  EmergencyEncounterFormValues,
  EmergencyOrderFormValues,
} from "@/features/emergency/schemas/emergency.schema";

function encounterToFormValues(
  encounter: EmergencyEncounter
): Partial<EmergencyEncounterFormValues> {
  return {
    patient_id: encounter.patient_id,
    arrival_time: encounter.arrival_time,
    chief_complaint: encounter.chief_complaint,
    severity: encounter.severity,
    doctor_id: encounter.doctor_id ?? "",
    bed_number: encounter.bed_number ?? "",
    triage_notes: encounter.triage_notes ?? "",
    vitals_summary: encounter.vitals_summary ?? "",
  };
}

export default function EmergencyPage() {
  const [search, setSearch] = useState("");
  const [severity, setSeverity] = useState("");
  const [status, setStatus] = useState("");

  const [selectedEncounter, setSelectedEncounter] =
    useState<EmergencyEncounter | null>(null);
  const [selectedEncounterId, setSelectedEncounterId] = useState("");

  const [encounterFormOpen, setEncounterFormOpen] = useState(false);
  const [orderFormOpen, setOrderFormOpen] = useState(false);
  const [dispositionFormOpen, setDispositionFormOpen] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [deleteEncounter, setDeleteEncounter] =
    useState<EmergencyEncounter | null>(null);

  const params = useMemo(
    () => ({
      page: 1,
      size: 100,
      search: search || undefined,
      severity: severity ? (severity as ErSeverity) : undefined,
      status: status ? (status as ErEncounterStatus) : undefined,
    }),
    [search, severity, status]
  );

  const orderParams = useMemo(
    () => ({
      page: 1,
      size: 100,
      search: search || undefined,
    }),
    [search]
  );

  const encountersQuery = useEmergencyEncounters(params);
  const ordersQuery = useEmergencyOrders(orderParams);

  const createEncounter = useCreateEmergencyEncounter();
  const updateEncounter = useUpdateEmergencyEncounter();
  const deleteEncounterMutation = useDeleteEmergencyEncounter();
  const updateStatus = useUpdateEmergencyStatus();

  const createOrder = useCreateEmergencyOrder();
  const saveDisposition = useSaveEmergencyDisposition();

  const encounterColumns: ColumnDef<EmergencyEncounter>[] = [
    { accessorKey: "encounter_number", header: "Encounter" },
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
    { accessorKey: "arrival_time", header: "Arrival" },
    { accessorKey: "chief_complaint", header: "Chief Complaint" },
    {
      accessorKey: "severity",
      header: "Severity",
      cell: ({ row }) => <ErSeverityBadge severity={row.original.severity} />,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <ErStatusBadge status={row.original.status} />,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <ActionMenu
          items={[
            {
              label: "Open Workspace",
              onClick: () => {
                setSelectedEncounter(row.original);
                setWorkspaceOpen(true);
              },
            },
            {
              label: "Edit Encounter",
              onClick: () => {
                setSelectedEncounter(row.original);
                setEncounterFormOpen(true);
              },
            },
            {
              label: "Start Treatment",
              onClick: () =>
                updateStatus.mutate({
                  id: row.original.id,
                  status: "in_treatment",
                }),
            },
            {
              label: "Observation",
              onClick: () =>
                updateStatus.mutate({
                  id: row.original.id,
                  status: "under_observation",
                }),
            },
            {
              label: "Create Order",
              onClick: () => {
                setSelectedEncounterId(row.original.id);
                setOrderFormOpen(true);
              },
            },
            {
              label: "Disposition",
              onClick: () => {
                setSelectedEncounter(row.original);
                setDispositionFormOpen(true);
              },
            },
            {
              label: "Delete",
              danger: true,
              onClick: () => setDeleteEncounter(row.original),
            },
          ]}
        />
      ),
    },
  ];

  const orderColumns: ColumnDef<EmergencyOrder>[] = [
    { accessorKey: "order_type", header: "Type" },
    { accessorKey: "order_name", header: "Order" },
    { accessorKey: "priority", header: "Priority" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "ordered_at", header: "Ordered At" },
  ];

  async function handleEncounterSubmit(values: EmergencyEncounterFormValues) {
    if (selectedEncounter) {
      await updateEncounter.mutateAsync({
        id: selectedEncounter.id,
        payload: values,
      });
    } else {
      await createEncounter.mutateAsync(values);
    }

    setEncounterFormOpen(false);
    setSelectedEncounter(null);
  }

  async function handleOrderSubmit(values: EmergencyOrderFormValues) {
    await createOrder.mutateAsync(values);
    setOrderFormOpen(false);
    setSelectedEncounterId("");
  }

  async function handleDispositionSubmit(values: EmergencyDispositionFormValues) {
    if (!selectedEncounter) return;

    await saveDisposition.mutateAsync({
      id: selectedEncounter.id,
      payload: values,
    });

    setDispositionFormOpen(false);
    setSelectedEncounter(null);
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Emergency Department"
          description="Manage ER arrivals, triage, severity, trauma workflow, emergency orders, observation, and disposition."
          actions={
            <Button
              onClick={() => {
                setSelectedEncounter(null);
                setEncounterFormOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              New ER Encounter
            </Button>
          }
        />

        <div className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-3">
          <input
            className="h-10 rounded-md border bg-background px-3 text-sm"
            placeholder="Search ER records..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            className="h-10 rounded-md border bg-background px-3 text-sm"
            value={severity}
            onChange={(event) => setSeverity(event.target.value)}
          >
            <option value="">All Severity</option>
            <option value="critical">Critical</option>
            <option value="emergent">Emergent</option>
            <option value="urgent">Urgent</option>
            <option value="semi_urgent">Semi Urgent</option>
            <option value="non_urgent">Non Urgent</option>
          </select>

          <select
            className="h-10 rounded-md border bg-background px-3 text-sm"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="">All Status</option>
            <option value="arrived">Arrived</option>
            <option value="triaged">Triaged</option>
            <option value="in_treatment">In Treatment</option>
            <option value="under_observation">Under Observation</option>
            <option value="admitted">Admitted</option>
            <option value="discharged">Discharged</option>
            <option value="transferred">Transferred</option>
          </select>
        </div>

        <DataTable
          columns={encounterColumns}
          data={encountersQuery.data?.items ?? []}
          isLoading={encountersQuery.isLoading}
          search={search}
          onSearchChange={setSearch}
          emptyTitle="No ER encounters found"
          emptyDescription="Create emergency encounters for triage and treatment."
        />

        <DataTable
          columns={orderColumns}
          data={ordersQuery.data?.items ?? []}
          isLoading={ordersQuery.isLoading}
          search={search}
          onSearchChange={setSearch}
          emptyTitle="No emergency orders found"
          emptyDescription="ER labs, radiology, medication, procedure, and observation orders will appear here."
        />

        <EmergencyWorkspaceDrawer
          open={workspaceOpen}
          encounter={selectedEncounter}
          onOpenChange={(open) => {
            setWorkspaceOpen(open);
            if (!open) setSelectedEncounter(null);
          }}
        />

        <FormDrawer
          open={encounterFormOpen}
          onOpenChange={(open) => {
            setEncounterFormOpen(open);
            if (!open) setSelectedEncounter(null);
          }}
          title={selectedEncounter ? "Edit ER Encounter" : "New ER Encounter"}
          description="Create or update emergency encounter and triage details."
          size="lg"
        >
          <EmergencyEncounterForm
            defaultValues={
              selectedEncounter
                ? encounterToFormValues(selectedEncounter)
                : undefined
            }
            isSubmitting={createEncounter.isPending || updateEncounter.isPending}
            onSubmit={handleEncounterSubmit}
            onCancel={() => {
              setEncounterFormOpen(false);
              setSelectedEncounter(null);
            }}
          />
        </FormDrawer>

        <FormDrawer
          open={orderFormOpen}
          onOpenChange={(open) => {
            setOrderFormOpen(open);
            if (!open) setSelectedEncounterId("");
          }}
          title="Emergency Order"
          description="Create emergency lab, radiology, medication, procedure, or observation order."
          size="md"
        >
          <EmergencyOrderForm
            encounterId={selectedEncounterId}
            isSubmitting={createOrder.isPending}
            onSubmit={handleOrderSubmit}
            onCancel={() => {
              setOrderFormOpen(false);
              setSelectedEncounterId("");
            }}
          />
        </FormDrawer>

        <FormDrawer
          open={dispositionFormOpen}
          onOpenChange={(open) => {
            setDispositionFormOpen(open);
            if (!open) setSelectedEncounter(null);
          }}
          title="ER Disposition"
          description="Discharge, admit, transfer, or close ER encounter."
          size="md"
        >
          <EmergencyDispositionForm
            isSubmitting={saveDisposition.isPending}
            onSubmit={handleDispositionSubmit}
            onCancel={() => {
              setDispositionFormOpen(false);
              setSelectedEncounter(null);
            }}
          />
        </FormDrawer>

        <ConfirmDialog
          open={Boolean(deleteEncounter)}
          onOpenChange={() => setDeleteEncounter(null)}
          title="Delete ER encounter?"
          description={
            deleteEncounter
              ? `This will permanently delete ${deleteEncounter.encounter_number}.`
              : "This ER encounter will be deleted."
          }
          confirmText="Delete"
          danger
          isLoading={deleteEncounterMutation.isPending}
          onConfirm={async () => {
            if (!deleteEncounter) return;
            await deleteEncounterMutation.mutateAsync(deleteEncounter.id);
            setDeleteEncounter(null);
          }}
        />
      </div>
    </AppShell>
  );
}