// src/app/ot/page.tsx

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

import { SurgeryFilters } from "@/features/ot/components/surgery-filters";
import { SurgeryStats } from "@/features/ot/components/surgery-stats";
import { SurgeryForm } from "@/features/ot/components/surgery-form";
import { CompleteSurgeryForm } from "@/features/ot/components/complete-surgery-form";
import { SurgeryWorkspaceDrawer } from "@/features/ot/components/surgery-workspace-drawer";
import { getSurgeryColumns } from "@/features/ot/components/surgery-columns";

import {
  useCompleteSurgery,
  useCreateSurgery,
  useDeleteSurgery,
  useStartSurgery,
  useSurgeries,
  useUpdateSurgery,
} from "@/features/ot/api/ot.queries";

import {
  completeSurgeryFormToPayload,
  surgeryFormToCreatePayload,
  surgeryFormToUpdatePayload,
  surgeryToFormValues,
} from "@/features/ot/utils/ot.mapper";

import type { Surgery, SurgeryStatus } from "@/features/ot/types/ot.types";
import type {
  CompleteSurgeryFormValues,
  SurgeryFormValues,
} from "@/features/ot/schemas/ot.schema";

export default function OtPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [scheduledDate, setScheduledDate] = useState("");
  const [surgeonId, setSurgeonId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [theatreId, setTheatreId] = useState("");

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [selectedSurgery, setSelectedSurgery] = useState<Surgery | null>(null);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [completeFormOpen, setCompleteFormOpen] = useState(false);
  const [startSurgeryTarget, setStartSurgeryTarget] = useState<Surgery | null>(
    null
  );
  const [deleteSurgery, setDeleteSurgery] = useState<Surgery | null>(null);

  const params = useMemo(
    () => ({
      page: pageIndex + 1,
      size: pageSize,
      search: search || undefined,
      status: status ? (status as SurgeryStatus) : undefined,
      scheduled_date: scheduledDate || undefined,
      surgeon_id: surgeonId || undefined,
      patient_id: patientId || undefined,
      theatre_id: theatreId || undefined,
    }),
    [
      pageIndex,
      pageSize,
      search,
      status,
      scheduledDate,
      surgeonId,
      patientId,
      theatreId,
    ]
  );

  const surgeriesQuery = useSurgeries(params);
  const createSurgery = useCreateSurgery();
  const updateSurgery = useUpdateSurgery();
  const startSurgery = useStartSurgery();
  const completeSurgery = useCompleteSurgery();
  const deleteSurgeryMutation = useDeleteSurgery();

  const surgeries = surgeriesQuery.data?.items ?? [];
  const total = surgeriesQuery.data?.total ?? 0;
  const pageCount = Math.ceil(total / pageSize);

  const scheduled = surgeries.filter((item) => item.status === "scheduled").length;
  const inProgress = surgeries.filter(
    (item) => item.status === "in_progress"
  ).length;
  const completed = surgeries.filter((item) => item.status === "completed").length;

  const columns = getSurgeryColumns({
    onView: (surgery) => {
      setSelectedSurgery(surgery);
      setWorkspaceOpen(true);
    },
    onEdit: (surgery) => {
      setSelectedSurgery(surgery);
      setFormOpen(true);
    },
    onStart: (surgery) => {
      setStartSurgeryTarget(surgery);
    },
    onComplete: (surgery) => {
      setSelectedSurgery(surgery);
      setCompleteFormOpen(true);
    },
    onDelete: (surgery) => {
      setDeleteSurgery(surgery);
    },
  });

  function resetFilters() {
    setSearch("");
    setStatus("");
    setScheduledDate("");
    setSurgeonId("");
    setPatientId("");
    setTheatreId("");
    setPageIndex(0);
  }

  async function handleSubmit(values: SurgeryFormValues) {
    if (selectedSurgery) {
      await updateSurgery.mutateAsync({
        id: selectedSurgery.id,
        payload: surgeryFormToUpdatePayload(values),
      });
    } else {
      await createSurgery.mutateAsync(surgeryFormToCreatePayload(values));
    }

    setFormOpen(false);
    setSelectedSurgery(null);
  }

  async function handleStart() {
    if (!startSurgeryTarget) return;

    await startSurgery.mutateAsync(startSurgeryTarget.id);
    setStartSurgeryTarget(null);
  }

  async function handleComplete(values: CompleteSurgeryFormValues) {
    if (!selectedSurgery) return;

    await completeSurgery.mutateAsync({
      id: selectedSurgery.id,
      payload: completeSurgeryFormToPayload(values),
    });

    setCompleteFormOpen(false);
    setSelectedSurgery(null);
  }

  async function handleDelete() {
    if (!deleteSurgery) return;

    await deleteSurgeryMutation.mutateAsync(deleteSurgery.id);
    setDeleteSurgery(null);
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Operation Theatre"
          description="Manage theatres, surgery scheduling, procedure workflow, and OT status history."
          actions={
            <Button
              onClick={() => {
                setSelectedSurgery(null);
                setFormOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Schedule Surgery
            </Button>
          }
        />

        <SurgeryStats
          total={total}
          scheduled={scheduled}
          inProgress={inProgress}
          completed={completed}
        />

        <SurgeryFilters
          status={status}
          scheduledDate={scheduledDate}
          surgeonId={surgeonId}
          patientId={patientId}
          theatreId={theatreId}
          onStatusChange={(value) => {
            setStatus(value);
            setPageIndex(0);
          }}
          onScheduledDateChange={(value) => {
            setScheduledDate(value);
            setPageIndex(0);
          }}
          onSurgeonChange={(value) => {
            setSurgeonId(value);
            setPageIndex(0);
          }}
          onPatientChange={(value) => {
            setPatientId(value);
            setPageIndex(0);
          }}
          onTheatreChange={(value) => {
            setTheatreId(value);
            setPageIndex(0);
          }}
          onReset={resetFilters}
        />

        {surgeriesQuery.isError ? (
          <ErrorState
            title="Could not load surgeries"
            description="Please check your connection or try again."
            onRetry={() => surgeriesQuery.refetch()}
          />
        ) : surgeriesQuery.isLoading && surgeries.length === 0 ? (
          <LoadingState />
        ) : (
          <DataTable
            columns={columns}
            data={surgeries}
            isLoading={surgeriesQuery.isLoading}
            search={search}
            onSearchChange={(value) => {
              setSearch(value);
              setPageIndex(0);
            }}
            searchPlaceholder="Search surgeries by patient, procedure, surgeon..."
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
            emptyTitle="No surgeries found"
            emptyDescription="Try changing filters or schedule a new surgery."
            getRowId={(row) => row.id}
          />
        )}

        <SurgeryWorkspaceDrawer
          open={workspaceOpen}
          surgery={selectedSurgery}
          onOpenChange={(open) => {
            setWorkspaceOpen(open);
            if (!open) setSelectedSurgery(null);
          }}
        />

        <FormDrawer
          open={formOpen}
          onOpenChange={(open) => {
            setFormOpen(open);
            if (!open) setSelectedSurgery(null);
          }}
          title={selectedSurgery ? "Edit Surgery" : "Schedule Surgery"}
          description="Create or update surgery scheduling information."
          size="xl"
        >
          <SurgeryForm
            defaultValues={
              selectedSurgery ? surgeryToFormValues(selectedSurgery) : undefined
            }
            isSubmitting={createSurgery.isPending || updateSurgery.isPending}
            onSubmit={handleSubmit}
            onCancel={() => {
              setFormOpen(false);
              setSelectedSurgery(null);
            }}
          />
        </FormDrawer>

        <FormDrawer
          open={completeFormOpen}
          onOpenChange={(open) => {
            setCompleteFormOpen(open);
            if (!open) setSelectedSurgery(null);
          }}
          title="Complete Surgery"
          description="Record final surgery completion notes."
          size="md"
        >
          <CompleteSurgeryForm
            isSubmitting={completeSurgery.isPending}
            onSubmit={handleComplete}
            onCancel={() => {
              setCompleteFormOpen(false);
              setSelectedSurgery(null);
            }}
          />
        </FormDrawer>

        <ConfirmDialog
          open={Boolean(startSurgeryTarget)}
          onOpenChange={() => setStartSurgeryTarget(null)}
          title="Start surgery?"
          description={
            startSurgeryTarget
              ? `This will mark ${startSurgeryTarget.procedure_name} as in progress.`
              : "This surgery will be started."
          }
          confirmText="Start Surgery"
          isLoading={startSurgery.isPending}
          onConfirm={handleStart}
        />

        <ConfirmDialog
          open={Boolean(deleteSurgery)}
          onOpenChange={() => setDeleteSurgery(null)}
          title="Delete surgery?"
          description={
            deleteSurgery
              ? `This will permanently delete surgery ${deleteSurgery.surgery_number}.`
              : "This surgery will be deleted."
          }
          confirmText="Delete"
          danger
          isLoading={deleteSurgeryMutation.isPending}
          onConfirm={handleDelete}
        />
      </div>
    </AppShell>
  );
}