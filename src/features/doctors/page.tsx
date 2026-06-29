// src/app/doctors/page.tsx

"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { AppShell } from "@/shared/components/layout/app-shell";
import {
  ConfirmDialog,
  DataTable,
  FormDrawer,
  PageHeader,
} from "@/shared/components/enterprise";

import { Button } from "@/components/ui/button";
import { getDoctorsColumns } from "@/features/doctors/components/doctors-columns";
import { DoctorForm } from "@/features/doctors/components/doctor-form";
import { DoctorDetailDrawer } from "@/features/doctors/components/doctor-detail-drawer";
import { DoctorFilters } from "@/features/doctors/components/doctor-filters";

import {
  useCreateDoctor,
  useDeleteDoctor,
  useDoctors,
  useUpdateDoctor,
} from "@/features/doctors/api/doctors.queries";

import type { Doctor } from "@/features/doctors/types/doctor.types";
import type { DoctorFormValues } from "@/features/doctors/schemas/doctor.schema";

import {
  doctorFormToCreatePayload,
  doctorFormToUpdatePayload,
  doctorToFormValues,
} from "@/features/doctors/utils/doctor.mapper";

export default function DoctorsPage() {
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [activeOnly, setActiveOnly] = useState(false);

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [formOpen, setFormOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [deleteDoctor, setDeleteDoctor] = useState<Doctor | null>(null);

  const params = useMemo(
    () => ({
      page: pageIndex + 1,
      size: pageSize,
      search: search || undefined,
      specialization: specialization || undefined,
      department_id: departmentId || undefined,
      is_active: activeOnly ? true : undefined,
    }),
    [pageIndex, pageSize, search, specialization, departmentId, activeOnly]
  );

  const doctorsQuery = useDoctors(params);
  const createDoctor = useCreateDoctor();
  const updateDoctor = useUpdateDoctor();
  const removeDoctor = useDeleteDoctor();

  const doctors = doctorsQuery.data?.items ?? [];
  const total = doctorsQuery.data?.total ?? 0;
  const pageCount = Math.ceil(total / pageSize);

  const columns = getDoctorsColumns({
    onView: (doctor) => {
      setSelectedDoctor(doctor);
      setDetailOpen(true);
    },
    onEdit: (doctor) => {
      setSelectedDoctor(doctor);
      setFormOpen(true);
    },
    onDelete: (doctor) => {
      setDeleteDoctor(doctor);
    },
  });

  async function handleSubmit(values: DoctorFormValues) {
    if (selectedDoctor) {
      await updateDoctor.mutateAsync({
        id: selectedDoctor.id,
        payload: doctorFormToUpdatePayload(values),
      });
    } else {
      await createDoctor.mutateAsync(doctorFormToCreatePayload(values));
    }

    setFormOpen(false);
    setSelectedDoctor(null);
  }

  async function handleDelete() {
    if (!deleteDoctor) return;

    await removeDoctor.mutateAsync(deleteDoctor.id);
    setDeleteDoctor(null);
  }

  function resetFilters() {
    setSearch("");
    setSpecialization("");
    setDepartmentId("");
    setActiveOnly(false);
    setPageIndex(0);
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Doctors"
          description="Manage doctors, departments, schedules, and availability."
          actions={
            <Button
              onClick={() => {
                setSelectedDoctor(null);
                setFormOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Doctor
            </Button>
          }
        />

        <DoctorFilters
          specialization={specialization}
          departmentId={departmentId}
          activeOnly={activeOnly}
          onSpecializationChange={(value) => {
            setSpecialization(value);
            setPageIndex(0);
          }}
          onDepartmentChange={(value) => {
            setDepartmentId(value);
            setPageIndex(0);
          }}
          onActiveOnlyChange={(value) => {
            setActiveOnly(value);
            setPageIndex(0);
          }}
          onReset={resetFilters}
        />

        <DataTable
          columns={columns}
          data={doctors}
          isLoading={doctorsQuery.isLoading}
          search={search}
          onSearchChange={(value) => {
            setSearch(value);
            setPageIndex(0);
          }}
          searchPlaceholder="Search doctors..."
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
          emptyTitle="No doctors found"
          emptyDescription="Try adjusting your search or add a new doctor."
          getRowId={(row) => row.id}
        />

        <DoctorDetailDrawer
          open={detailOpen}
          doctor={selectedDoctor}
          onOpenChange={(open) => {
            setDetailOpen(open);
            if (!open) setSelectedDoctor(null);
          }}
        />

        <FormDrawer
          open={formOpen}
          onOpenChange={(open) => {
            setFormOpen(open);
            if (!open) setSelectedDoctor(null);
          }}
          title={selectedDoctor ? "Edit Doctor" : "Add Doctor"}
          description="Create or update doctor profile information."
        >
          <DoctorForm
            defaultValues={
                selectedDoctor ? doctorToFormValues(selectedDoctor) : undefined
            }
            isSubmitting={createDoctor.isPending || updateDoctor.isPending}
            onSubmit={handleSubmit}
            onCancel={() => {
                setFormOpen(false);
                setSelectedDoctor(null);
            }}
            />
        </FormDrawer>

        <ConfirmDialog
          open={Boolean(deleteDoctor)}
          onOpenChange={() => setDeleteDoctor(null)}
          title="Delete doctor?"
          description={`This will remove ${deleteDoctor?.full_name}. This action cannot be undone.`}
          confirmText="Delete"
          danger
          isLoading={removeDoctor.isPending}
          onConfirm={handleDelete}
        />
      </div>
    </AppShell>
  );
}