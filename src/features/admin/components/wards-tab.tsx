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
  useCreateWard,
  useDeleteWard,
  useUpdateWard,
  useWards,
} from "../api/admin.queries";
import { WardForm } from "./ward-form";
import { wardToFormValues } from "./admin-mappers";
import type { WardFormValues } from "../schemas/admin.schema";
import type { Ward } from "../types/admin.types";

interface WardsTabProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function WardsTab({ search, onSearchChange }: WardsTabProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null);
  const [deleteWard, setDeleteWard] = useState<Ward | null>(null);

  const params = useMemo(
    () => ({
      page: pageIndex + 1,
      size: pageSize,
      search: search || undefined,
    }),
    [pageIndex, pageSize, search]
  );

  const wardsQuery = useWards(params);
  const createWard = useCreateWard();
  const updateWard = useUpdateWard();
  const deleteWardMutation = useDeleteWard();

  const columns = useMemo<ColumnDef<Ward>[]>(
    () => [
      { accessorKey: "name", header: "Ward" },
      { accessorKey: "code", header: "Code" },
      { accessorKey: "floor", header: "Floor" },
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
                  setSelectedWard(row.original);
                  setFormOpen(true);
                },
              },
              {
                label: "Delete",
                danger: true,
                onClick: () => setDeleteWard(row.original),
              },
            ]}
          />
        ),
      },
    ],
    []
  );

  async function handleSubmit(values: WardFormValues) {
    if (selectedWard) {
      await updateWard.mutateAsync({ id: selectedWard.id, payload: values });
    } else {
      await createWard.mutateAsync(values);
    }

    setFormOpen(false);
    setSelectedWard(null);
  }

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={wardsQuery.data?.items ?? []}
        isLoading={wardsQuery.isLoading}
        search={search}
        onSearchChange={(value) => {
          setPageIndex(0);
          onSearchChange(value);
        }}
        searchPlaceholder="Search wards..."
        toolbarActions={
          <Button
            onClick={() => {
              setSelectedWard(null);
              setFormOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Ward
          </Button>
        }
        pagination={{
          pageIndex,
          pageSize,
          pageCount: wardsQuery.data?.pages,
          total: wardsQuery.data?.total,
        }}
        onPaginationChange={(pagination) => {
          setPageIndex(pagination.pageIndex);
          setPageSize(pagination.pageSize);
        }}
        emptyTitle="No wards found"
        emptyDescription="Create wards for IPD bed allocation."
      />

      <FormDrawer
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setSelectedWard(null);
        }}
        title={selectedWard ? "Edit Ward" : "Add Ward"}
        description="Create or update ward master data."
        size="md"
      >
        <WardForm
          defaultValues={selectedWard ? wardToFormValues(selectedWard) : undefined}
          isSubmitting={createWard.isPending || updateWard.isPending}
          onSubmit={handleSubmit}
          onCancel={() => {
            setFormOpen(false);
            setSelectedWard(null);
          }}
        />
      </FormDrawer>

      <ConfirmDialog
        open={Boolean(deleteWard)}
        onOpenChange={() => setDeleteWard(null)}
        title="Delete ward?"
        description={
          deleteWard
            ? `This will permanently delete ${deleteWard.name}.`
            : "This ward will be deleted."
        }
        confirmText="Delete"
        danger
        isLoading={deleteWardMutation.isPending}
        onConfirm={async () => {
          if (!deleteWard) return;
          await deleteWardMutation.mutateAsync(deleteWard.id);
          setDeleteWard(null);
        }}
      />
    </div>
  );
}
