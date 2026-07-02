// src/app/opd/page.tsx

"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import {
  ConfirmDialog,
  DataTable,
  ErrorState,
  FormDrawer,
  LoadingState,
  PageHeader,
} from "@/shared/components/enterprise";
import { AppShell } from "@/shared/components/layout/app-shell";
import { Button } from "@/components/ui/button";

import { OpdFilters } from "@/features/opd/components/opd-filters";
import { OpdStats } from "@/features/opd/components/opd-stats";
import { OpdEncounterForm } from "@/features/opd/components/opd-encounter-form";
import { OpdWorkspaceDrawer } from "@/features/opd/components/opd-workspace-drawer";
import { getOpdColumns } from "@/features/opd/components/opd-columns";

import {
  useCreateOpdEncounter,
  useDeleteOpdEncounter,
  useOpdEncounters,
  useUpdateOpdEncounter,
  useUpdateOpdStatus,
} from "@/features/opd/api/opd.queries";

import {
  opdEncounterToFormValues,
  opdFormToCreatePayload,
  opdFormToUpdatePayload,
} from "@/features/opd/utils/opd.mapper";

import type {
  OpdEncounter,
  OpdEncounterStatus,
} from "@/features/opd/types/opd.types";
import type { OpdEncounterFormValues } from "@/features/opd/schemas/opd.schema";

export default function OpdPage() {
  const today = new Date().toISOString().slice(0, 10);

  const [search, setSearch] = useState("");
  const [visitDate, setVisitDate] = useState(today);
  const [status, setStatus] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState("");

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [selectedEncounter, setSelectedEncounter] =
    useState<OpdEncounter | null>(null);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteEncounter, setDeleteEncounter] =
    useState<OpdEncounter | null>(null);
  const [completeEncounter, setCompleteEncounter] =
    useState<OpdEncounter | null>(null);

  const params = useMemo(
    () => ({
      page: pageIndex + 1,
      size: pageSize,
      search: search || undefined,
      visit_date: visitDate || undefined,
      status: status ? (status as OpdEncounterStatus) : undefined,
      doctor_id: doctorId || undefined,
      patient_id: patientId || undefined,
    }),
    [pageIndex, pageSize, search, visitDate, status, doctorId, patientId]
  );

  const opdQuery = useOpdEncounters(params);
  const createEncounter = useCreateOpdEncounter();
  const updateEncounter = useUpdateOpdEncounter();
  const deleteEncounterMutation = useDeleteOpdEncounter();
  const updateStatus = useUpdateOpdStatus();

  const encounters = opdQuery.data?.items ?? [];
  const total = opdQuery.data?.total ?? 0;
  const pageCount = Math.ceil(total / pageSize);

  const open = encounters.filter((item) => item.status === "open").length;
  const inProgress = encounters.filter(
    (item) => item.status === "in_progress"
  ).length;
  const completed = encounters.filter(
    (item) => item.status === "completed"
  ).length;

  const columns = getOpdColumns({
    onView: (encounter) => {
      setSelectedEncounter(encounter);
      setWorkspaceOpen(true);
    },
    onEdit: (encounter) => {
      setSelectedEncounter(encounter);
      setFormOpen(true);
    },
    onComplete: (encounter) => {
      setCompleteEncounter(encounter);
    },
    onDelete: (encounter) => {
      setDeleteEncounter(encounter);
    },
  });

  function resetFilters() {
    setSearch("");
    setVisitDate(today);
    setStatus("");
    setDoctorId("");
    setPatientId("");
    setPageIndex(0);
  }

  async function handleSubmit(values: OpdEncounterFormValues) {
    if (selectedEncounter) {
      await updateEncounter.mutateAsync({
        id: selectedEncounter.id,
        payload: opdFormToUpdatePayload(values),
      });
    } else {
      await createEncounter.mutateAsync(opdFormToCreatePayload(values));
    }

    setFormOpen(false);
    setSelectedEncounter(null);
  }

  async function handleDelete() {
    if (!deleteEncounter) return;

    await deleteEncounterMutation.mutateAsync(deleteEncounter.id);
    setDeleteEncounter(null);
  }

  async function handleComplete() {
    if (!completeEncounter) return;

    await updateStatus.mutateAsync({
      id: completeEncounter.id,
      status: "completed",
    });

    setCompleteEncounter(null);
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="OPD"
          description="Manage outpatient encounters, clinical notes, prescriptions, lab orders, and follow-up."
          actions={
            <Button
              onClick={() => {
                setSelectedEncounter(null);
                setFormOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              New OPD Encounter
            </Button>
          }
        />

        <OpdStats
          total={total}
          open={open}
          inProgress={inProgress}
          completed={completed}
        />

        <OpdFilters
          visitDate={visitDate}
          status={status}
          doctorId={doctorId}
          patientId={patientId}
          onVisitDateChange={(value) => {
            setVisitDate(value);
            setPageIndex(0);
          }}
          onStatusChange={(value) => {
            setStatus(value);
            setPageIndex(0);
          }}
          onDoctorChange={(value) => {
            setDoctorId(value);
            setPageIndex(0);
          }}
          onPatientChange={(value) => {
            setPatientId(value);
            setPageIndex(0);
          }}
          onReset={resetFilters}
        />

        {opdQuery.isError ? (
          <ErrorState
            title="Could not load OPD encounters"
            description="Please check your connection or try again."
            onRetry={() => opdQuery.refetch()}
          />
        ) : opdQuery.isLoading && encounters.length === 0 ? (
          <LoadingState />
        ) : (
          <DataTable
            columns={columns}
            data={encounters}
            isLoading={opdQuery.isLoading}
            search={search}
            onSearchChange={(value) => {
              setSearch(value);
              setPageIndex(0);
            }}
            searchPlaceholder="Search OPD by patient, UHID, complaint, diagnosis..."
            enableRowSelection
            pagination={{
              pageIndex,
              pageSize,
              total,
              pageCount,
            }}
            onPaginationChange={(pagination) => {
              setPageIndex(pagination.pageIndex);
              setPageSize(pagination.pageSize);
            }}
            emptyTitle="No OPD encounters found"
            emptyDescription="Try changing filters or create a new OPD encounter."
            getRowId={(row) => row.id}
          />
        )}

        <OpdWorkspaceDrawer
          open={workspaceOpen}
          encounter={selectedEncounter}
          onOpenChange={(open) => {
            setWorkspaceOpen(open);
            if (!open) setSelectedEncounter(null);
          }}
        />

        <FormDrawer
          open={formOpen}
          onOpenChange={(open) => {
            setFormOpen(open);
            if (!open) setSelectedEncounter(null);
          }}
          title={selectedEncounter ? "Edit OPD Encounter" : "New OPD Encounter"}
          description="Create or update outpatient encounter details."
          size="xl"
        >
          <OpdEncounterForm
            defaultValues={
              selectedEncounter
                ? opdEncounterToFormValues(selectedEncounter)
                : undefined
            }
            isSubmitting={
              createEncounter.isPending || updateEncounter.isPending
            }
            onSubmit={handleSubmit}
            onCancel={() => {
              setFormOpen(false);
              setSelectedEncounter(null);
            }}
          />
        </FormDrawer>

        <ConfirmDialog
          open={Boolean(completeEncounter)}
          onOpenChange={() => setCompleteEncounter(null)}
          title="Complete OPD encounter?"
          description={
            completeEncounter
              ? `This will mark the OPD encounter for ${completeEncounter.patient_name} as completed.`
              : "This OPD encounter will be completed."
          }
          confirmText="Mark Completed"
          isLoading={updateStatus.isPending}
          onConfirm={handleComplete}
        />

        <ConfirmDialog
          open={Boolean(deleteEncounter)}
          onOpenChange={() => setDeleteEncounter(null)}
          title="Delete OPD encounter?"
          description={
            deleteEncounter
              ? `This will permanently delete the OPD encounter for ${deleteEncounter.patient_name}.`
              : "This OPD encounter will be deleted."
          }
          confirmText="Delete"
          danger
          isLoading={deleteEncounterMutation.isPending}
          onConfirm={handleDelete}
        />
      </div>
    </AppShell>
  );
}