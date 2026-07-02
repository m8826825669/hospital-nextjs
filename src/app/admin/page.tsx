// src/app/admin/page.tsx

"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ConfirmDialog,
  DataTable,
  ErrorState,
  FormDrawer,
  PageHeader,
  SectionCard,
} from "@/shared/components/enterprise";
import { AppShell } from "@/shared/components/layout/app-shell";

import { BedForm } from "@/features/admin/components/bed-form";
import { BedStatusBadge } from "@/features/admin/components/bed-status-badge";
import { DepartmentForm } from "@/features/admin/components/department-form";
import { HospitalSettingsForm } from "@/features/admin/components/hospital-settings-form";
import { WardForm } from "@/features/admin/components/ward-form";

import {
  useBeds,
  useCreateBed,
  useCreateDepartment,
  useCreateWard,
  useDeleteBed,
  useDeleteDepartment,
  useDeleteWard,
  useDepartments,
  useHospitalSettings,
  useUpdateBed,
  useUpdateDepartment,
  useUpdateHospitalSettings,
  useUpdateWard,
  useWards,
} from "@/features/admin/api/admin.queries";

import type { ColumnDef } from "@tanstack/react-table";
import type { Bed, Department, Ward } from "@/features/admin/types/admin.types";
import type {
  BedFormValues,
  DepartmentFormValues,
  HospitalSettingFormValues,
  WardFormValues,
} from "@/features/admin/schemas/admin.schema";
import { ActionMenu } from "@/shared/components/enterprise";

export default function AdminPage() {
  const [search, setSearch] = useState("");
  const [departmentFormOpen, setDepartmentFormOpen] = useState(false);
  const [wardFormOpen, setWardFormOpen] = useState(false);
  const [bedFormOpen, setBedFormOpen] = useState(false);

  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);
  const [selectedWard, setSelectedWard] = useState<Ward | null>(null);
  const [selectedBed, setSelectedBed] = useState<Bed | null>(null);

  const [deleteDepartment, setDeleteDepartment] =
    useState<Department | null>(null);
  const [deleteWard, setDeleteWard] = useState<Ward | null>(null);
  const [deleteBed, setDeleteBed] = useState<Bed | null>(null);

  const params = useMemo(
    () => ({
      page: 1,
      size: 100,
      search: search || undefined,
    }),
    [search]
  );

  const departmentsQuery = useDepartments(params);
  const wardsQuery = useWards(params);
  const bedsQuery = useBeds(params);
  const settingsQuery = useHospitalSettings();

  const createDepartment = useCreateDepartment();
  const updateDepartment = useUpdateDepartment();
  const deleteDepartmentMutation = useDeleteDepartment();

  const createWard = useCreateWard();
  const updateWard = useUpdateWard();
  const deleteWardMutation = useDeleteWard();

  const createBed = useCreateBed();
  const updateBed = useUpdateBed();
  const deleteBedMutation = useDeleteBed();

  const updateSettings = useUpdateHospitalSettings();

  const departmentColumns: ColumnDef<Department>[] = [
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
                setDepartmentFormOpen(true);
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
  ];

  const wardColumns: ColumnDef<Ward>[] = [
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
                setWardFormOpen(true);
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
  ];

  const bedColumns: ColumnDef<Bed>[] = [
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
                setBedFormOpen(true);
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
  ];

  async function handleDepartmentSubmit(values: DepartmentFormValues) {
    if (selectedDepartment) {
      await updateDepartment.mutateAsync({
        id: selectedDepartment.id,
        payload: values,
      });
    } else {
      await createDepartment.mutateAsync(values);
    }

    setDepartmentFormOpen(false);
    setSelectedDepartment(null);
  }

  async function handleWardSubmit(values: WardFormValues) {
    if (selectedWard) {
      await updateWard.mutateAsync({
        id: selectedWard.id,
        payload: values,
      });
    } else {
      await createWard.mutateAsync(values);
    }

    setWardFormOpen(false);
    setSelectedWard(null);
  }

  async function handleBedSubmit(values: BedFormValues) {
    if (selectedBed) {
      await updateBed.mutateAsync({
        id: selectedBed.id,
        payload: values,
      });
    } else {
      await createBed.mutateAsync(values);
    }

    setBedFormOpen(false);
    setSelectedBed(null);
  }

  async function handleSettingsSubmit(values: HospitalSettingFormValues) {
    await updateSettings.mutateAsync(values);
  }
function departmentToFormValues(department: Department): Partial<DepartmentFormValues> {
  return {
    name: department.name,
    code: department.code ?? "",
    description: department.description ?? "",
    is_active: department.is_active,
  };
}

function wardToFormValues(ward: Ward): Partial<WardFormValues> {
  return {
    name: ward.name,
    code: ward.code ?? "",
    floor: ward.floor ?? "",
    is_active: ward.is_active,
  };
}

function bedToFormValues(bed: Bed): Partial<BedFormValues> {
  return {
    ward_id: bed.ward_id,
    bed_number: bed.bed_number,
    bed_type: bed.bed_type ?? "",
    status: bed.status,
    is_active: bed.is_active,
  };
}
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Administration"
          description="Manage hospital settings, departments, wards, beds, and master data."
        />

        <input
          className="h-10 w-full rounded-md border bg-background px-3 text-sm"
          placeholder="Search master data..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <Tabs defaultValue="settings">
          <TabsList>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="departments">Departments</TabsTrigger>
            <TabsTrigger value="wards">Wards</TabsTrigger>
            <TabsTrigger value="beds">Beds</TabsTrigger>
          </TabsList>

          <TabsContent value="settings" className="mt-4">
            <SectionCard
              title="Hospital Settings"
              description="Basic hospital identity and system configuration."
            >
              {settingsQuery.isError ? (
                <ErrorState
                  title="Could not load settings"
                  description="Please check your connection or try again."
                  onRetry={() => settingsQuery.refetch()}
                />
              ) : (
                <HospitalSettingsForm
                  settings={settingsQuery.data}
                  isSubmitting={updateSettings.isPending}
                  onSubmit={handleSettingsSubmit}
                />
              )}
            </SectionCard>
          </TabsContent>

          <TabsContent value="departments" className="mt-4 space-y-4">
            <Button
              onClick={() => {
                setSelectedDepartment(null);
                setDepartmentFormOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Department
            </Button>

            <DataTable
              columns={departmentColumns}
              data={departmentsQuery.data?.items ?? []}
              isLoading={departmentsQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No departments found"
              emptyDescription="Create departments used by doctors, OPD, IPD, and billing."
            />
          </TabsContent>

          <TabsContent value="wards" className="mt-4 space-y-4">
            <Button
              onClick={() => {
                setSelectedWard(null);
                setWardFormOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Ward
            </Button>

            <DataTable
              columns={wardColumns}
              data={wardsQuery.data?.items ?? []}
              isLoading={wardsQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No wards found"
              emptyDescription="Create wards for IPD bed allocation."
            />
          </TabsContent>

          <TabsContent value="beds" className="mt-4 space-y-4">
            <Button
              onClick={() => {
                setSelectedBed(null);
                setBedFormOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Bed
            </Button>

            <DataTable
              columns={bedColumns}
              data={bedsQuery.data?.items ?? []}
              isLoading={bedsQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No beds found"
              emptyDescription="Create beds for IPD admission and transfer."
            />
          </TabsContent>
        </Tabs>

        <FormDrawer
          open={departmentFormOpen}
          onOpenChange={(open) => {
            setDepartmentFormOpen(open);
            if (!open) setSelectedDepartment(null);
          }}
          title={selectedDepartment ? "Edit Department" : "Add Department"}
          description="Create or update department master data."
          size="md"
        >
          <DepartmentForm
            defaultValues={
                selectedDepartment ? departmentToFormValues(selectedDepartment) : undefined
                }
            isSubmitting={
              createDepartment.isPending || updateDepartment.isPending
            }
            onSubmit={handleDepartmentSubmit}
            onCancel={() => {
              setDepartmentFormOpen(false);
              setSelectedDepartment(null);
            }}
          />
        </FormDrawer>

        <FormDrawer
          open={wardFormOpen}
          onOpenChange={(open) => {
            setWardFormOpen(open);
            if (!open) setSelectedWard(null);
          }}
          title={selectedWard ? "Edit Ward" : "Add Ward"}
          description="Create or update ward master data."
          size="md"
        >
          <WardForm
            defaultValues={selectedWard ? wardToFormValues(selectedWard) : undefined}
            isSubmitting={createWard.isPending || updateWard.isPending}
            onSubmit={handleWardSubmit}
            onCancel={() => {
              setWardFormOpen(false);
              setSelectedWard(null);
            }}
          />
        </FormDrawer>

        <FormDrawer
          open={bedFormOpen}
          onOpenChange={(open) => {
            setBedFormOpen(open);
            if (!open) setSelectedBed(null);
          }}
          title={selectedBed ? "Edit Bed" : "Add Bed"}
          description="Create or update bed master data."
          size="md"
        >
          <BedForm
            defaultValues={selectedBed ? bedToFormValues(selectedBed) : undefined}
            isSubmitting={createBed.isPending || updateBed.isPending}
            onSubmit={handleBedSubmit}
            onCancel={() => {
              setBedFormOpen(false);
              setSelectedBed(null);
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
    </AppShell>
  );
}