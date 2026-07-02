// src/app/ipd/page.tsx

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

import { IpdFilters } from "@/features/ipd/components/ipd-filters";
import { IpdStats } from "@/features/ipd/components/ipd-stats";
import { IpdAdmissionForm } from "@/features/ipd/components/ipd-admission-form";
import { IpdTransferForm } from "@/features/ipd/components/ipd-transfer-form";
import { IpdDischargeForm } from "@/features/ipd/components/ipd-discharge-form";
import { IpdWorkspaceDrawer } from "@/features/ipd/components/ipd-workspace-drawer";
import { getIpdColumns } from "@/features/ipd/components/ipd-columns";

import {
  useCreateIpdAdmission,
  useDeleteIpdAdmission,
  useDischargeIpdAdmission,
  useIpdAdmissions,
  useTransferIpdAdmission,
  useUpdateIpdAdmission,
} from "@/features/ipd/api/ipd.queries";

import {
  ipdAdmissionToFormValues,
  ipdDischargeFormToPayload,
  ipdFormToCreatePayload,
  ipdFormToUpdatePayload,
  ipdTransferFormToPayload,
} from "@/features/ipd/utils/ipd.mapper";

import type {
  IpdAdmission,
  IpdAdmissionStatus,
} from "@/features/ipd/types/ipd.types";
import type {
  IpdAdmissionFormValues,
  IpdDischargeFormValues,
  IpdTransferFormValues,
} from "@/features/ipd/schemas/ipd.schema";

export default function IpdPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [admissionDate, setAdmissionDate] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [wardId, setWardId] = useState("");

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [selectedAdmission, setSelectedAdmission] =
    useState<IpdAdmission | null>(null);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [admissionFormOpen, setAdmissionFormOpen] = useState(false);
  const [transferFormOpen, setTransferFormOpen] = useState(false);
  const [dischargeFormOpen, setDischargeFormOpen] = useState(false);
  const [deleteAdmission, setDeleteAdmission] =
    useState<IpdAdmission | null>(null);

  const params = useMemo(
    () => ({
      page: pageIndex + 1,
      size: pageSize,
      search: search || undefined,
      status: status ? (status as IpdAdmissionStatus) : undefined,
      admission_date: admissionDate || undefined,
      doctor_id: doctorId || undefined,
      patient_id: patientId || undefined,
      ward_id: wardId || undefined,
    }),
    [
      pageIndex,
      pageSize,
      search,
      status,
      admissionDate,
      doctorId,
      patientId,
      wardId,
    ]
  );

  const admissionsQuery = useIpdAdmissions(params);
  const createAdmission = useCreateIpdAdmission();
  const updateAdmission = useUpdateIpdAdmission();
  const transferAdmission = useTransferIpdAdmission();
  const dischargeAdmission = useDischargeIpdAdmission();
  const deleteAdmissionMutation = useDeleteIpdAdmission();

  const admissions = admissionsQuery.data?.items ?? [];
  const total = admissionsQuery.data?.total ?? 0;
  const pageCount = Math.ceil(total / pageSize);

  const admitted = admissions.filter((item) => item.status === "admitted").length;
  const transferred = admissions.filter(
    (item) => item.status === "transferred"
  ).length;
  const discharged = admissions.filter(
    (item) => item.status === "discharged"
  ).length;

  const columns = getIpdColumns({
    onView: (admission) => {
      setSelectedAdmission(admission);
      setWorkspaceOpen(true);
    },
    onEdit: (admission) => {
      setSelectedAdmission(admission);
      setAdmissionFormOpen(true);
    },
    onTransfer: (admission) => {
      setSelectedAdmission(admission);
      setTransferFormOpen(true);
    },
    onDischarge: (admission) => {
      setSelectedAdmission(admission);
      setDischargeFormOpen(true);
    },
    onDelete: (admission) => {
      setDeleteAdmission(admission);
    },
  });

  function resetFilters() {
    setSearch("");
    setStatus("");
    setAdmissionDate("");
    setDoctorId("");
    setPatientId("");
    setWardId("");
    setPageIndex(0);
  }

  async function handleAdmissionSubmit(values: IpdAdmissionFormValues) {
    if (selectedAdmission) {
      await updateAdmission.mutateAsync({
        id: selectedAdmission.id,
        payload: ipdFormToUpdatePayload(values),
      });
    } else {
      await createAdmission.mutateAsync(ipdFormToCreatePayload(values));
    }

    setAdmissionFormOpen(false);
    setSelectedAdmission(null);
  }

  async function handleTransferSubmit(values: IpdTransferFormValues) {
    if (!selectedAdmission) return;

    await transferAdmission.mutateAsync({
      id: selectedAdmission.id,
      payload: ipdTransferFormToPayload(values),
    });

    setTransferFormOpen(false);
    setSelectedAdmission(null);
  }

  async function handleDischargeSubmit(values: IpdDischargeFormValues) {
    if (!selectedAdmission) return;

    await dischargeAdmission.mutateAsync({
      id: selectedAdmission.id,
      payload: ipdDischargeFormToPayload(values),
    });

    setDischargeFormOpen(false);
    setSelectedAdmission(null);
  }

  async function handleDelete() {
    if (!deleteAdmission) return;

    await deleteAdmissionMutation.mutateAsync(deleteAdmission.id);
    setDeleteAdmission(null);
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="IPD"
          description="Manage admissions, beds, transfers, discharge, and inpatient status history."
          actions={
            <Button
              onClick={() => {
                setSelectedAdmission(null);
                setAdmissionFormOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Admission
            </Button>
          }
        />

        <IpdStats
          total={total}
          admitted={admitted}
          transferred={transferred}
          discharged={discharged}
        />

        <IpdFilters
          status={status}
          admissionDate={admissionDate}
          doctorId={doctorId}
          patientId={patientId}
          wardId={wardId}
          onStatusChange={(value) => {
            setStatus(value);
            setPageIndex(0);
          }}
          onAdmissionDateChange={(value) => {
            setAdmissionDate(value);
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
          onWardChange={(value) => {
            setWardId(value);
            setPageIndex(0);
          }}
          onReset={resetFilters}
        />

        {admissionsQuery.isError ? (
          <ErrorState
            title="Could not load IPD admissions"
            description="Please check your connection or try again."
            onRetry={() => admissionsQuery.refetch()}
          />
        ) : admissionsQuery.isLoading && admissions.length === 0 ? (
          <LoadingState />
        ) : (
          <DataTable
            columns={columns}
            data={admissions}
            isLoading={admissionsQuery.isLoading}
            search={search}
            onSearchChange={(value) => {
              setSearch(value);
              setPageIndex(0);
            }}
            searchPlaceholder="Search admissions by patient, UHID, doctor, bed..."
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
            emptyTitle="No IPD admissions found"
            emptyDescription="Try changing filters or create a new admission."
            getRowId={(row) => row.id}
          />
        )}

        <IpdWorkspaceDrawer
          open={workspaceOpen}
          admission={selectedAdmission}
          onOpenChange={(open) => {
            setWorkspaceOpen(open);
            if (!open) setSelectedAdmission(null);
          }}
        />

        <FormDrawer
          open={admissionFormOpen}
          onOpenChange={(open) => {
            setAdmissionFormOpen(open);
            if (!open) setSelectedAdmission(null);
          }}
          title={selectedAdmission ? "Edit Admission" : "New IPD Admission"}
          description="Create or update inpatient admission details."
          size="xl"
        >
          <IpdAdmissionForm
            defaultValues={
              selectedAdmission
                ? ipdAdmissionToFormValues(selectedAdmission)
                : undefined
            }
            isSubmitting={createAdmission.isPending || updateAdmission.isPending}
            onSubmit={handleAdmissionSubmit}
            onCancel={() => {
              setAdmissionFormOpen(false);
              setSelectedAdmission(null);
            }}
          />
        </FormDrawer>

        <FormDrawer
          open={transferFormOpen}
          onOpenChange={(open) => {
            setTransferFormOpen(open);
            if (!open) setSelectedAdmission(null);
          }}
          title="Transfer Patient"
          description="Transfer patient to a different ward or bed."
          size="md"
        >
          <IpdTransferForm
            isSubmitting={transferAdmission.isPending}
            onSubmit={handleTransferSubmit}
            onCancel={() => {
              setTransferFormOpen(false);
              setSelectedAdmission(null);
            }}
          />
        </FormDrawer>

        <FormDrawer
          open={dischargeFormOpen}
          onOpenChange={(open) => {
            setDischargeFormOpen(open);
            if (!open) setSelectedAdmission(null);
          }}
          title="Discharge Patient"
          description="Complete inpatient discharge process."
          size="md"
        >
          <IpdDischargeForm
            isSubmitting={dischargeAdmission.isPending}
            onSubmit={handleDischargeSubmit}
            onCancel={() => {
              setDischargeFormOpen(false);
              setSelectedAdmission(null);
            }}
          />
        </FormDrawer>

        <ConfirmDialog
          open={Boolean(deleteAdmission)}
          onOpenChange={() => setDeleteAdmission(null)}
          title="Delete admission?"
          description={
            deleteAdmission
              ? `This will permanently delete admission ${deleteAdmission.admission_number}.`
              : "This admission will be deleted."
          }
          confirmText="Delete"
          danger
          isLoading={deleteAdmissionMutation.isPending}
          onConfirm={handleDelete}
        />
      </div>
    </AppShell>
  );
}