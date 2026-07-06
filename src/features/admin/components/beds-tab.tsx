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
} from "@/shared/components/enterprise";
import {
  useBeds,
  useCreateBed,
  useDeleteBed,
  useUpdateBed,
} from "../api/admin.queries";
import { BedForm } from "./bed-form";
import { BedStatusBadge } from "./bed-status-badge";
import { bedToFormValues } from "./admin-mappers";
import type { BedFormValues } from "../schemas/admin.schema";
import type { Bed } from "../types/admin.types";

interface BedsTabProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function BedsTab({ search, onSearchChange }: BedsTabProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);
  const [deleteBed, setDeleteBed] = useState<Bed | null>(null);

  const params = useMemo(
    () => ({
      page: pageIndex + 1,
      size: pageSize,
      search: search || undefined,
    }),
    [pageIndex, pageSize, search]
  );

  const bedsQuery = useBeds(params);
  const createBed = useCreateBed();
  const updateBed = useUpdateBed();
  const deleteBedMutation = useDeleteBed();

  const columns = useMemo<ColumnDef<Bed>[]>(
    () => [
      { accessorKey: "bed_number", header: "Bed" },
      { accessorKey: "ward_name", header: "Ward" },
      { accessorKey: "bed_type", header: "Type" },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <BedStatusBadge status={row.original.status} />,
      },
      {
        accessorKey: "is_active",
        header: "Active",
        cell: ({ row }) => (row.original.is_active ? "Yes" : "No"),
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <ActionMenu
            items={[
              {
                label: "Edit",
                onClick: () => {
                  setSelectedBed(row.original);
                  setFormOpen(true);
                },
              },
              {
                label: "Delete",
                danger: true,
                onClick: () => setDeleteBed(row.original),
              },
            ]}
          />
        ),
      },
    ],
    []
  );

  async function handleSubmit(values: BedFormValues) {
    if (selectedBed) {
      await updateBed.mutateAsync({ id: selectedBed.id, payload: values });
    } else {
      await createBed.mutateAsync(values);
    }

    setFormOpen(false);
    setSelectedBed(null);
  }

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={bedsQuery.data?.items ?? []}
        isLoading={bedsQuery.isLoading}
        search={search}
        onSearchChange={(value) => {
          setPageIndex(0);
          onSearchChange(value);
        }}
        searchPlaceholder="Search beds..."
        toolbarActions={
          <Button
            onClick={() => {
              setSelectedBed(null);
              setFormOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Bed
          </Button>
        }
        pagination={{
          pageIndex,
          pageSize,
          pageCount: bedsQuery.data?.pages,
          total: bedsQuery.data?.total,
        }}
        onPaginationChange={(pagination) => {
          setPageIndex(pagination.pageIndex);
          setPageSize(pagination.pageSize);
        }}
        emptyTitle="No beds found"
        emptyDescription="Create beds for IPD admission and transfer."
      />

      <FormDrawer
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setSelectedBed(null);
        }}
        title={selectedBed ? "Edit Bed" : "Add Bed"}
        description="Create or update bed master data."
        size="md"
      >
        <BedForm
          defaultValues={selectedBed ? bedToFormValues(selectedBed) : undefined}
          isSubmitting={createBed.isPending || updateBed.isPending}
          onSubmit={handleSubmit}
          onCancel={() => {
            setFormOpen(false);
            setSelectedBed(null);
          }}
        />
      </FormDrawer>

      <ConfirmDialog
        open={Boolean(deleteBed)}
        onOpenChange={() => setDeleteBed(null)}
        title="Delete bed?"
        description={
          deleteBed
            ? `This will permanently delete bed ${deleteBed.bed_number}.`
            : "This bed will be deleted."
        }
        confirmText="Delete"
        danger
        isLoading={deleteBedMutation.isPending}
        onConfirm={async () => {
          if (!deleteBed) return;
          await deleteBedMutation.mutateAsync(deleteBed.id);
          setDeleteBed(null);
        }}
      />
    </div>
  );
}
