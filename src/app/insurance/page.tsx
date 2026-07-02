// src/app/insurance/page.tsx

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

import { InsuranceFilters } from "@/features/insurance/components/insurance-filters";
import { InsuranceStats } from "@/features/insurance/components/insurance-stats";
import { InsuranceClaimForm } from "@/features/insurance/components/insurance-claim-form";
import { InsuranceReviewForm } from "@/features/insurance/components/insurance-review-form";
import { InsuranceSettlementForm } from "@/features/insurance/components/insurance-settlement-form";
import { InsuranceWorkspaceDrawer } from "@/features/insurance/components/insurance-workspace-drawer";
import { getInsuranceColumns } from "@/features/insurance/components/insurance-columns";

import {
  useCreateInsuranceClaim,
  useDeleteInsuranceClaim,
  useInsuranceClaims,
  useReviewInsuranceClaim,
  useSettleInsuranceClaim,
  useUpdateInsuranceClaim,
} from "@/features/insurance/api/insurance.queries";

import {
  insuranceClaimFormToCreatePayload,
  insuranceClaimFormToUpdatePayload,
  insuranceClaimToFormValues,
  insuranceReviewFormToPayload,
  insuranceSettlementFormToPayload,
} from "@/features/insurance/utils/insurance.mapper";

import type {
  InsuranceClaim,
  InsuranceClaimPriority,
  InsuranceClaimStatus,
} from "@/features/insurance/types/insurance.types";
import type {
  InsuranceClaimFormValues,
  InsuranceReviewFormValues,
  InsuranceSettlementFormValues,
} from "@/features/insurance/schemas/insurance.schema";

export default function InsurancePage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [providerId, setProviderId] = useState("");
  const [patientId, setPatientId] = useState("");
  const [claimDate, setClaimDate] = useState("");

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [selectedClaim, setSelectedClaim] = useState<InsuranceClaim | null>(
    null
  );
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [claimFormOpen, setClaimFormOpen] = useState(false);
  const [reviewFormOpen, setReviewFormOpen] = useState(false);
  const [settlementFormOpen, setSettlementFormOpen] = useState(false);
  const [deleteClaim, setDeleteClaim] = useState<InsuranceClaim | null>(null);

  const params = useMemo(
    () => ({
      page: pageIndex + 1,
      size: pageSize,
      search: search || undefined,
      status: status ? (status as InsuranceClaimStatus) : undefined,
      priority: priority ? (priority as InsuranceClaimPriority) : undefined,
      provider_id: providerId || undefined,
      patient_id: patientId || undefined,
      claim_date: claimDate || undefined,
    }),
    [
      pageIndex,
      pageSize,
      search,
      status,
      priority,
      providerId,
      patientId,
      claimDate,
    ]
  );

  const claimsQuery = useInsuranceClaims(params);
  const createClaim = useCreateInsuranceClaim();
  const updateClaim = useUpdateInsuranceClaim();
  const reviewClaim = useReviewInsuranceClaim();
  const settleClaim = useSettleInsuranceClaim();
  const deleteClaimMutation = useDeleteInsuranceClaim();

  const claims = claimsQuery.data?.items ?? [];
  const total = claimsQuery.data?.total ?? 0;
  const pageCount = Math.ceil(total / pageSize);

  const underReview = claims.filter(
    (claim) => claim.status === "under_review"
  ).length;
  const approved = claims.filter((claim) => claim.status === "approved").length;
  const rejected = claims.filter((claim) => claim.status === "rejected").length;

  const columns = getInsuranceColumns({
    onView: (claim) => {
      setSelectedClaim(claim);
      setWorkspaceOpen(true);
    },
    onEdit: (claim) => {
      setSelectedClaim(claim);
      setClaimFormOpen(true);
    },
    onReview: (claim) => {
      setSelectedClaim(claim);
      setReviewFormOpen(true);
    },
    onSettle: (claim) => {
      setSelectedClaim(claim);
      setSettlementFormOpen(true);
    },
    onDelete: (claim) => {
      setDeleteClaim(claim);
    },
  });

  function resetFilters() {
    setSearch("");
    setStatus("");
    setPriority("");
    setProviderId("");
    setPatientId("");
    setClaimDate("");
    setPageIndex(0);
  }

  async function handleClaimSubmit(values: InsuranceClaimFormValues) {
    if (selectedClaim) {
      await updateClaim.mutateAsync({
        id: selectedClaim.id,
        payload: insuranceClaimFormToUpdatePayload(values),
      });
    } else {
      await createClaim.mutateAsync(insuranceClaimFormToCreatePayload(values));
    }

    setClaimFormOpen(false);
    setSelectedClaim(null);
  }

  async function handleReviewSubmit(values: InsuranceReviewFormValues) {
    if (!selectedClaim) return;

    await reviewClaim.mutateAsync({
      id: selectedClaim.id,
      payload: insuranceReviewFormToPayload(values),
    });

    setReviewFormOpen(false);
    setSelectedClaim(null);
  }

  async function handleSettlementSubmit(values: InsuranceSettlementFormValues) {
    if (!selectedClaim) return;

    await settleClaim.mutateAsync({
      id: selectedClaim.id,
      payload: insuranceSettlementFormToPayload(values),
    });

    setSettlementFormOpen(false);
    setSelectedClaim(null);
  }

  async function handleDelete() {
    if (!deleteClaim) return;

    await deleteClaimMutation.mutateAsync(deleteClaim.id);
    setDeleteClaim(null);
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Insurance"
          description="Manage insurance claims, review workflow, approvals, rejections, and settlements."
          actions={
            <Button
              onClick={() => {
                setSelectedClaim(null);
                setClaimFormOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Claim
            </Button>
          }
        />

        <InsuranceStats
          total={total}
          underReview={underReview}
          approved={approved}
          rejected={rejected}
        />

        <InsuranceFilters
          status={status}
          priority={priority}
          providerId={providerId}
          patientId={patientId}
          claimDate={claimDate}
          onStatusChange={(value) => {
            setStatus(value);
            setPageIndex(0);
          }}
          onPriorityChange={(value) => {
            setPriority(value);
            setPageIndex(0);
          }}
          onProviderChange={(value) => {
            setProviderId(value);
            setPageIndex(0);
          }}
          onPatientChange={(value) => {
            setPatientId(value);
            setPageIndex(0);
          }}
          onClaimDateChange={(value) => {
            setClaimDate(value);
            setPageIndex(0);
          }}
          onReset={resetFilters}
        />

        {claimsQuery.isError ? (
          <ErrorState
            title="Could not load insurance claims"
            description="Please check your connection or try again."
            onRetry={() => claimsQuery.refetch()}
          />
        ) : claimsQuery.isLoading && claims.length === 0 ? (
          <LoadingState />
        ) : (
          <DataTable
            columns={columns}
            data={claims}
            isLoading={claimsQuery.isLoading}
            search={search}
            onSearchChange={(value) => {
              setSearch(value);
              setPageIndex(0);
            }}
            searchPlaceholder="Search claims by patient, provider, policy, claim number..."
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
            emptyTitle="No insurance claims found"
            emptyDescription="Try changing filters or create a new claim."
            getRowId={(row) => row.id}
          />
        )}

        <InsuranceWorkspaceDrawer
          open={workspaceOpen}
          claim={selectedClaim}
          onOpenChange={(open) => {
            setWorkspaceOpen(open);
            if (!open) setSelectedClaim(null);
          }}
        />

        <FormDrawer
          open={claimFormOpen}
          onOpenChange={(open) => {
            setClaimFormOpen(open);
            if (!open) setSelectedClaim(null);
          }}
          title={selectedClaim ? "Edit Claim" : "New Insurance Claim"}
          description="Create or update insurance claim details."
          size="xl"
        >
          <InsuranceClaimForm
            defaultValues={
              selectedClaim
                ? insuranceClaimToFormValues(selectedClaim)
                : undefined
            }
            isSubmitting={createClaim.isPending || updateClaim.isPending}
            onSubmit={handleClaimSubmit}
            onCancel={() => {
              setClaimFormOpen(false);
              setSelectedClaim(null);
            }}
          />
        </FormDrawer>

        <FormDrawer
          open={reviewFormOpen}
          onOpenChange={(open) => {
            setReviewFormOpen(open);
            if (!open) setSelectedClaim(null);
          }}
          title="Review Claim"
          description="Approve, reject, or move claim under review."
          size="md"
        >
          <InsuranceReviewForm
            isSubmitting={reviewClaim.isPending}
            onSubmit={handleReviewSubmit}
            onCancel={() => {
              setReviewFormOpen(false);
              setSelectedClaim(null);
            }}
          />
        </FormDrawer>

        <FormDrawer
          open={settlementFormOpen}
          onOpenChange={(open) => {
            setSettlementFormOpen(open);
            if (!open) setSelectedClaim(null);
          }}
          title="Settle Claim"
          description="Record insurance settlement details."
          size="md"
        >
          <InsuranceSettlementForm
            isSubmitting={settleClaim.isPending}
            onSubmit={handleSettlementSubmit}
            onCancel={() => {
              setSettlementFormOpen(false);
              setSelectedClaim(null);
            }}
          />
        </FormDrawer>

        <ConfirmDialog
          open={Boolean(deleteClaim)}
          onOpenChange={() => setDeleteClaim(null)}
          title="Delete claim?"
          description={
            deleteClaim
              ? `This will permanently delete claim ${deleteClaim.claim_number}.`
              : "This claim will be deleted."
          }
          confirmText="Delete"
          danger
          isLoading={deleteClaimMutation.isPending}
          onConfirm={handleDelete}
        />
      </div>
    </AppShell>
  );
}