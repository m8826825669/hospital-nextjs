// src/app/pharmacy/page.tsx

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

import { MedicineFilters } from "@/features/pharmacy/components/medicine-filters";
import { MedicineForm } from "@/features/pharmacy/components/medicine-form";
import { MedicineWorkspaceDrawer } from "@/features/pharmacy/components/medicine-workspace-drawer";
import { getMedicineColumns } from "@/features/pharmacy/components/medicine-columns";

import {
  useCreateMedicine,
  useDeleteMedicine,
  useMedicines,
  useUpdateMedicine,
} from "@/features/pharmacy/api/pharmacy.queries";

import {
  medicineFormToCreatePayload,
  medicineFormToUpdatePayload,
  medicineToFormValues,
} from "@/features/pharmacy/utils/medicine.mapper";

import type {
  Medicine,
  MedicineStatus,
} from "@/features/pharmacy/types/pharmacy.types";
import type { MedicineFormValues } from "@/features/pharmacy/schemas/medicine.schema";

export default function PharmacyPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [categoryId, setCategoryId] = useState("");

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [selectedMedicine, setSelectedMedicine] = useState<Medicine | null>(null);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteMedicine, setDeleteMedicine] = useState<Medicine | null>(null);

  const params = useMemo(
    () => ({
      page: pageIndex + 1,
      size: pageSize,
      search: search || undefined,
      status: status ? (status as MedicineStatus) : undefined,
      category_id: categoryId || undefined,
    }),
    [pageIndex, pageSize, search, status, categoryId]
  );

  const medicinesQuery = useMedicines(params);
  const createMedicine = useCreateMedicine();
  const updateMedicine = useUpdateMedicine();
  const deleteMedicineMutation = useDeleteMedicine();

  const medicines = medicinesQuery.data?.items ?? [];
  const total = medicinesQuery.data?.total ?? 0;
  const pageCount = Math.ceil(total / pageSize);

  const columns = getMedicineColumns({
    onView: (medicine) => {
      setSelectedMedicine(medicine);
      setWorkspaceOpen(true);
    },
    onEdit: (medicine) => {
      setSelectedMedicine(medicine);
      setFormOpen(true);
    },
    onDelete: (medicine) => {
      setDeleteMedicine(medicine);
    },
  });

  function resetFilters() {
    setSearch("");
    setStatus("");
    setCategoryId("");
    setPageIndex(0);
  }

  async function handleSubmit(values: MedicineFormValues) {
    if (selectedMedicine) {
      await updateMedicine.mutateAsync({
        id: selectedMedicine.id,
        payload: medicineFormToUpdatePayload(values),
      });
    } else {
      await createMedicine.mutateAsync(medicineFormToCreatePayload(values));
    }

    setFormOpen(false);
    setSelectedMedicine(null);
  }

  async function handleDelete() {
    if (!deleteMedicine) return;

    await deleteMedicineMutation.mutateAsync(deleteMedicine.id);
    setDeleteMedicine(null);
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Pharmacy"
          description="Manage medicine master, batches, stock transactions, dispensing, and pharmacy billing."
          actions={
            <Button
              onClick={() => {
                setSelectedMedicine(null);
                setFormOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Medicine
            </Button>
          }
        />

        <MedicineFilters
          status={status}
          categoryId={categoryId}
          onStatusChange={(value) => {
            setStatus(value);
            setPageIndex(0);
          }}
          onCategoryChange={(value) => {
            setCategoryId(value);
            setPageIndex(0);
          }}
          onReset={resetFilters}
        />

        {medicinesQuery.isError ? (
          <ErrorState
            title="Could not load medicines"
            description="Please check your connection or try again."
            onRetry={() => medicinesQuery.refetch()}
          />
        ) : medicinesQuery.isLoading && medicines.length === 0 ? (
          <LoadingState />
        ) : (
          <DataTable
            columns={columns}
            data={medicines}
            isLoading={medicinesQuery.isLoading}
            search={search}
            onSearchChange={(value) => {
              setSearch(value);
              setPageIndex(0);
            }}
            searchPlaceholder="Search medicines by name, generic, brand..."
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
            emptyTitle="No medicines found"
            emptyDescription="Try changing filters or add a new medicine."
            getRowId={(row) => row.id}
          />
        )}

        <MedicineWorkspaceDrawer
          open={workspaceOpen}
          medicine={selectedMedicine}
          onOpenChange={(open) => {
            setWorkspaceOpen(open);
            if (!open) setSelectedMedicine(null);
          }}
        />

        <FormDrawer
          open={formOpen}
          onOpenChange={(open) => {
            setFormOpen(open);
            if (!open) setSelectedMedicine(null);
          }}
          title={selectedMedicine ? "Edit Medicine" : "Add Medicine"}
          description="Create or update medicine master information."
          size="lg"
        >
          <MedicineForm
            defaultValues={
              selectedMedicine ? medicineToFormValues(selectedMedicine) : undefined
            }
            isSubmitting={createMedicine.isPending || updateMedicine.isPending}
            onSubmit={handleSubmit}
            onCancel={() => {
              setFormOpen(false);
              setSelectedMedicine(null);
            }}
          />
        </FormDrawer>

        <ConfirmDialog
          open={Boolean(deleteMedicine)}
          onOpenChange={() => setDeleteMedicine(null)}
          title="Delete medicine?"
          description={
            deleteMedicine
              ? `This will permanently delete ${deleteMedicine.name}.`
              : "This medicine will be deleted."
          }
          confirmText="Delete"
          danger
          isLoading={deleteMedicineMutation.isPending}
          onConfirm={handleDelete}
        />
      </div>
    </AppShell>
  );
}