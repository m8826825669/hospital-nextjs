"use client";

import { useMemo, useState } from "react";
import { Activity, Building2, DoorOpen, Layers3, Plus } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  ActionMenu,
  ConfirmDialog,
  DataTable,
  FormDrawer,
  StatusBadge,
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

function WardStatCard({
  label,
  value,
  helper,
  icon: Icon,
}: {
  label: string;
  value: string | number;
  helper: string;
  icon: typeof Building2;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
            {label}
          </p>
          <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
            {value}
          </p>
          <p className="mt-1 text-xs text-slate-500">{helper}</p>
        </div>
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
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
    [pageIndex, pageSize, search],
  );

  const wardsQuery = useWards(params);
  const createWard = useCreateWard();
  const updateWard = useUpdateWard();
  const deleteWardMutation = useDeleteWard();

  const wards = wardsQuery.data?.items ?? [];
  const activeCount = wards.filter(
    (ward) => ward.active ?? ward.is_active,
  ).length;
  const totalCount = wardsQuery.data?.total ?? wards.length;
  const wardTypeCount = new Set(
    wards.map((ward) => ward.ward_type ?? "General"),
  ).size;

  const columns = useMemo<ColumnDef<Ward>[]>(
    () => [
      {
        accessorKey: "name",
        header: "Ward",
        cell: ({ row }) => (
          <div className="flex items-center gap-3 py-1">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <Building2 className="h-4 w-4" />
            </div>
            <div>
              <div className="font-semibold text-slate-950">
                {row.original.name}
              </div>
              <div className="text-xs text-slate-500">
                {row.original.ward_type ?? "General Ward"}
              </div>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "ward_type",
        header: "Type",
        cell: ({ row }) => (
          <span className="inline-flex rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700">
            {row.original.ward_type ?? "General"}
          </span>
        ),
      },
      {
        accessorKey: "floor",
        header: "Floor",
        cell: ({ row }) => (
          <span className="font-medium text-slate-700">
            {row.original.floor || "Not assigned"}
          </span>
        ),
      },
      {
        accessorKey: "active",
        header: "Status",
        cell: ({ row }) => {
          const active = row.original.active ?? row.original.is_active ?? false;
          return (
            <StatusBadge
              label={active ? "Active" : "Inactive"}
              variant={active ? "success" : "muted"}
            />
          );
        },
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <div className="flex justify-end">
            <ActionMenu
              items={[
                {
                  label: "Edit ward",
                  onClick: () => {
                    setSelectedWard(row.original);
                    setFormOpen(true);
                  },
                },
                {
                  label: "Delete ward",
                  danger: true,
                  onClick: () => setDeleteWard(row.original),
                },
              ]}
            />
          </div>
        ),
      },
    ],
    [],
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
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-3">
        <WardStatCard
          label="Total wards"
          value={totalCount}
          helper="Configured inpatient locations"
          icon={Building2}
        />
        <WardStatCard
          label="Active wards"
          value={activeCount}
          helper="Visible for admission workflows"
          icon={Activity}
        />
        <WardStatCard
          label="Ward types"
          value={wardTypeCount}
          helper="Clinical and operational categories"
          icon={Layers3}
        />
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 flex flex-col gap-3 border-b border-slate-100 pb-5 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <DoorOpen className="h-6 w-6" />
            </div>
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-slate-950">
                Ward Master
              </h2>
              <p className="text-sm text-slate-500">
                Manage clinical ward locations used by admissions, IPD, nursing,
                and bed allocation.
              </p>
            </div>
          </div>

          <Button
            onClick={() => {
              setSelectedWard(null);
              setFormOpen(true);
            }}
            className="h-11 rounded-xl px-5 shadow-lg shadow-blue-100"
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Ward
          </Button>
        </div>

        <DataTable
          columns={columns}
          data={wards}
          isLoading={wardsQuery.isLoading}
          search={search}
          onSearchChange={(value) => {
            setPageIndex(0);
            onSearchChange(value);
          }}
          searchPlaceholder="Search by ward name, type, or floor..."
          enableColumnVisibility={false}
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
          emptyDescription="Create wards for IPD admission, nursing allocation, and bed management."
        />
      </div>

      <FormDrawer
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setSelectedWard(null);
        }}
        title={selectedWard ? "Edit Ward" : "Add Ward"}
        description="Configure ward master data for admissions, bed allocation, and inpatient workflows."
        size="xl"
      >
        <WardForm
          defaultValues={
            selectedWard ? wardToFormValues(selectedWard) : undefined
          }
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
