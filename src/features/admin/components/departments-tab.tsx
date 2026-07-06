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
  useCreateDepartment,
  useDeleteDepartment,
  useDepartments,
  useUpdateDepartment,
} from "../api/admin.queries";
import { DepartmentForm } from "./department-form";
import { departmentToFormValues } from "./admin-mappers";
import type { DepartmentFormValues } from "../schemas/admin.schema";
import type { Department } from "../types/admin.types";

interface DepartmentsTabProps {
  search: string;
  onSearchChange: (value: string) => void;
}

export function DepartmentsTab({ search, onSearchChange }: DepartmentsTabProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);
  const [deleteDepartment, setDeleteDepartment] =
    useState<Department | null>(null);

  const params = useMemo(
    () => ({
      page: pageIndex + 1,
      size: pageSize,
      search: search || undefined,
    }),
    [pageIndex, pageSize, search]
  );

  const departmentsQuery = useDepartments(params);
  const createDepartment = useCreateDepartment();
  const updateDepartment = useUpdateDepartment();
  const deleteDepartmentMutation = useDeleteDepartment();

  const columns = useMemo<ColumnDef<Department>[]>(
    () => [
      { accessorKey: "name", header: "Department" },
      { accessorKey: "code", header: "Code" },
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
                  setSelectedDepartment(row.original);
                  setFormOpen(true);
                },
              },
              {
                label: "Delete",
                danger: true,
                onClick: () => setDeleteDepartment(row.original),
              },
            ]}
          />
        ),
      },
    ],
    []
  );

  async function handleSubmit(values: DepartmentFormValues) {
    if (selectedDepartment) {
      await updateDepartment.mutateAsync({
        id: selectedDepartment.id,
        payload: values,
      });
    } else {
      await createDepartment.mutateAsync(values);
    }

    setFormOpen(false);
    setSelectedDepartment(null);
  }

  return (
    <div className="space-y-4">
      <DataTable
        columns={columns}
        data={departmentsQuery.data?.items ?? []}
        isLoading={departmentsQuery.isLoading}
        search={search}
        onSearchChange={(value) => {
          setPageIndex(0);
          onSearchChange(value);
        }}
        searchPlaceholder="Search departments..."
        toolbarActions={
          <Button
            onClick={() => {
              setSelectedDepartment(null);
              setFormOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Department
          </Button>
        }
        pagination={{
          pageIndex,
          pageSize,
          pageCount: departmentsQuery.data?.pages,
          total: departmentsQuery.data?.total,
        }}
        onPaginationChange={(pagination) => {
          setPageIndex(pagination.pageIndex);
          setPageSize(pagination.pageSize);
        }}
        emptyTitle="No departments found"
        emptyDescription="Create departments used by doctors, OPD, IPD, and billing."
      />

      <FormDrawer
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setSelectedDepartment(null);
        }}
        title={selectedDepartment ? "Edit Department" : "Add Department"}
        description="Create or update department master data."
        size="md"
      >
        <DepartmentForm
          defaultValues={
            selectedDepartment
              ? departmentToFormValues(selectedDepartment)
              : undefined
          }
          isSubmitting={createDepartment.isPending || updateDepartment.isPending}
          onSubmit={handleSubmit}
          onCancel={() => {
            setFormOpen(false);
            setSelectedDepartment(null);
          }}
        />
      </FormDrawer>

      <ConfirmDialog
        open={Boolean(deleteDepartment)}
        onOpenChange={() => setDeleteDepartment(null)}
        title="Delete department?"
        description={
          deleteDepartment
            ? `This will permanently delete ${deleteDepartment.name}.`
            : "This department will be deleted."
        }
        confirmText="Delete"
        danger
        isLoading={deleteDepartmentMutation.isPending}
        onConfirm={async () => {
          if (!deleteDepartment) return;
          await deleteDepartmentMutation.mutateAsync(deleteDepartment.id);
          setDeleteDepartment(null);
        }}
      />
    </div>
  );
}
