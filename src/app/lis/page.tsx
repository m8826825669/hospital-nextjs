// src/app/lis/page.tsx

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

import { LabSampleFilters } from "@/features/lis/components/lab-sample-filters";
import { LisStats } from "@/features/lis/components/lis-stats";
import { LabSampleForm } from "@/features/lis/components/lab-sample-form";
import { LabResultEntryForm } from "@/features/lis/components/lab-result-entry-form";
import { LisWorkspaceDrawer } from "@/features/lis/components/lis-workspace-drawer";
import { getLabSampleColumns } from "@/features/lis/components/lab-sample-columns";

import {
  useCreateLabSample,
  useDeleteLabSample,
  useEnterLabResults,
  useLabSamples,
  useUpdateLabSample,
  useUpdateLabSampleStatus,
} from "@/features/lis/api/lis.queries";

import {
  labResultEntryToPayload,
  labSampleFormToCreatePayload,
  labSampleFormToUpdatePayload,
  labSampleToFormValues,
} from "@/features/lis/utils/lis.mapper";

import type {
  LabPriority,
  LabSample,
  LabSampleStatus,
} from "@/features/lis/types/lis.types";
import type {
  LabResultEntryValues,
  LabSampleFormValues,
} from "@/features/lis/schemas/lis.schema";

export default function LisPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [sampleDate, setSampleDate] = useState("");
  const [patientId, setPatientId] = useState("");
  const [doctorId, setDoctorId] = useState("");

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [selectedSample, setSelectedSample] = useState<LabSample | null>(null);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [sampleFormOpen, setSampleFormOpen] = useState(false);
  const [resultFormOpen, setResultFormOpen] = useState(false);
  const [verifySample, setVerifySample] = useState<LabSample | null>(null);
  const [approveSample, setApproveSample] = useState<LabSample | null>(null);
  const [deleteSample, setDeleteSample] = useState<LabSample | null>(null);

  const params = useMemo(
    () => ({
      page: pageIndex + 1,
      size: pageSize,
      search: search || undefined,
      status: status ? (status as LabSampleStatus) : undefined,
      priority: priority ? (priority as LabPriority) : undefined,
      sample_date: sampleDate || undefined,
      patient_id: patientId || undefined,
      doctor_id: doctorId || undefined,
    }),
    [pageIndex, pageSize, search, status, priority, sampleDate, patientId, doctorId]
  );

  const samplesQuery = useLabSamples(params);
  const createSample = useCreateLabSample();
  const updateSample = useUpdateLabSample();
  const deleteSampleMutation = useDeleteLabSample();
  const enterResults = useEnterLabResults();
  const updateStatus = useUpdateLabSampleStatus();

  const samples = samplesQuery.data?.items ?? [];
  const total = samplesQuery.data?.total ?? 0;
  const pageCount = Math.ceil(total / pageSize);

  const processing = samples.filter((item) => item.status === "processing").length;
  const verified = samples.filter((item) => item.status === "verified").length;
  const approved = samples.filter((item) => item.status === "approved").length;

  const columns = getLabSampleColumns({
    onView: (sample) => {
      setSelectedSample(sample);
      setWorkspaceOpen(true);
    },
    onEdit: (sample) => {
      setSelectedSample(sample);
      setSampleFormOpen(true);
    },
    onResult: (sample) => {
      setSelectedSample(sample);
      setResultFormOpen(true);
    },
    onVerify: (sample) => {
      setVerifySample(sample);
    },
    onApprove: (sample) => {
      setApproveSample(sample);
    },
    onDelete: (sample) => {
      setDeleteSample(sample);
    },
  });

  function resetFilters() {
    setSearch("");
    setStatus("");
    setPriority("");
    setSampleDate("");
    setPatientId("");
    setDoctorId("");
    setPageIndex(0);
  }

  async function handleSampleSubmit(values: LabSampleFormValues) {
    if (selectedSample) {
      await updateSample.mutateAsync({
        id: selectedSample.id,
        payload: labSampleFormToUpdatePayload(values),
      });
    } else {
      await createSample.mutateAsync(labSampleFormToCreatePayload(values));
    }

    setSampleFormOpen(false);
    setSelectedSample(null);
  }

  async function handleResultSubmit(values: LabResultEntryValues) {
    await enterResults.mutateAsync(labResultEntryToPayload(values));
    setResultFormOpen(false);
    setSelectedSample(null);
  }

  async function handleVerify() {
    if (!verifySample) return;

    await updateStatus.mutateAsync({
      id: verifySample.id,
      status: "verified",
    });

    setVerifySample(null);
  }

  async function handleApprove() {
    if (!approveSample) return;

    await updateStatus.mutateAsync({
      id: approveSample.id,
      status: "approved",
    });

    setApproveSample(null);
  }

  async function handleDelete() {
    if (!deleteSample) return;

    await deleteSampleMutation.mutateAsync(deleteSample.id);
    setDeleteSample(null);
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Laboratory"
          description="Manage samples, result entry, verification, approval, and reports."
          actions={
            <Button
              onClick={() => {
                setSelectedSample(null);
                setSampleFormOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Sample
            </Button>
          }
        />

        <LisStats
          total={total}
          processing={processing}
          verified={verified}
          approved={approved}
        />

        <LabSampleFilters
          status={status}
          priority={priority}
          sampleDate={sampleDate}
          patientId={patientId}
          doctorId={doctorId}
          onStatusChange={(value) => {
            setStatus(value);
            setPageIndex(0);
          }}
          onPriorityChange={(value) => {
            setPriority(value);
            setPageIndex(0);
          }}
          onSampleDateChange={(value) => {
            setSampleDate(value);
            setPageIndex(0);
          }}
          onPatientChange={(value) => {
            setPatientId(value);
            setPageIndex(0);
          }}
          onDoctorChange={(value) => {
            setDoctorId(value);
            setPageIndex(0);
          }}
          onReset={resetFilters}
        />

        {samplesQuery.isError ? (
          <ErrorState
            title="Could not load lab samples"
            description="Please check your connection or try again."
            onRetry={() => samplesQuery.refetch()}
          />
        ) : samplesQuery.isLoading && samples.length === 0 ? (
          <LoadingState />
        ) : (
          <DataTable
            columns={columns}
            data={samples}
            isLoading={samplesQuery.isLoading}
            search={search}
            onSearchChange={(value) => {
              setSearch(value);
              setPageIndex(0);
            }}
            searchPlaceholder="Search samples by patient, UHID, test, profile..."
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
            emptyTitle="No lab samples found"
            emptyDescription="Try changing filters or create a new sample."
            getRowId={(row) => row.id}
          />
        )}

        <LisWorkspaceDrawer
          open={workspaceOpen}
          sample={selectedSample}
          onOpenChange={(open) => {
            setWorkspaceOpen(open);
            if (!open) setSelectedSample(null);
          }}
        />

        <FormDrawer
          open={sampleFormOpen}
          onOpenChange={(open) => {
            setSampleFormOpen(open);
            if (!open) setSelectedSample(null);
          }}
          title={selectedSample ? "Edit Sample" : "New Lab Sample"}
          description="Create or update laboratory sample details."
          size="lg"
        >
          <LabSampleForm
            defaultValues={
              selectedSample ? labSampleToFormValues(selectedSample) : undefined
            }
            isSubmitting={createSample.isPending || updateSample.isPending}
            onSubmit={handleSampleSubmit}
            onCancel={() => {
              setSampleFormOpen(false);
              setSelectedSample(null);
            }}
          />
        </FormDrawer>

        <FormDrawer
          open={resultFormOpen}
          onOpenChange={(open) => {
            setResultFormOpen(open);
            if (!open) setSelectedSample(null);
          }}
          title="Enter Lab Result"
          description="Enter result value, remarks, and abnormal flag."
          size="md"
        >
          {selectedSample && (
            <LabResultEntryForm
              sampleId={selectedSample.id}
              defaultTestId={selectedSample.test_id ?? undefined}
              isSubmitting={enterResults.isPending}
              onSubmit={handleResultSubmit}
              onCancel={() => {
                setResultFormOpen(false);
                setSelectedSample(null);
              }}
            />
          )}
        </FormDrawer>

        <ConfirmDialog
          open={Boolean(verifySample)}
          onOpenChange={() => setVerifySample(null)}
          title="Verify result?"
          description={
            verifySample
              ? `This will verify sample ${verifySample.sample_number}.`
              : "This sample will be verified."
          }
          confirmText="Verify"
          isLoading={updateStatus.isPending}
          onConfirm={handleVerify}
        />

        <ConfirmDialog
          open={Boolean(approveSample)}
          onOpenChange={() => setApproveSample(null)}
          title="Approve report?"
          description={
            approveSample
              ? `This will approve report for sample ${approveSample.sample_number}.`
              : "This report will be approved."
          }
          confirmText="Approve"
          isLoading={updateStatus.isPending}
          onConfirm={handleApprove}
        />

        <ConfirmDialog
          open={Boolean(deleteSample)}
          onOpenChange={() => setDeleteSample(null)}
          title="Delete sample?"
          description={
            deleteSample
              ? `This will permanently delete sample ${deleteSample.sample_number}.`
              : "This sample will be deleted."
          }
          confirmText="Delete"
          danger
          isLoading={deleteSampleMutation.isPending}
          onConfirm={handleDelete}
        />
      </div>
    </AppShell>
  );
}