// src/app/appointments/page.tsx

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

import { AppointmentFilters } from "@/features/appointments/components/appointment-filters";
import { AppointmentStats } from "@/features/appointments/components/appointment-stats";
import { AppointmentForm } from "@/features/appointments/components/appointment-form";
import { AppointmentWorkspaceDrawer } from "@/features/appointments/components/appointment-workspace-drawer";
import { getAppointmentColumns } from "@/features/appointments/components/appointment-columns";

import {
  useAppointments,
  useCreateAppointment,
  useDeleteAppointment,
  useUpdateAppointment,
  useUpdateAppointmentStatus,
} from "@/features/appointments/api/appointments.queries";

import {
  appointmentFormToCreatePayload,
  appointmentFormToUpdatePayload,
  appointmentToFormValues,
} from "@/features/appointments/utils/appointment.mapper";

import type {
  Appointment,
  AppointmentStatus,
  AppointmentType,
} from "@/features/appointments/types/appointment.types";
import type { AppointmentFormValues } from "@/features/appointments/schemas/appointment.schema";

export default function AppointmentsPage() {
  const today = new Date().toISOString().slice(0, 10);

  const [search, setSearch] = useState("");
  const [date, setDate] = useState(today);
  const [status, setStatus] = useState("");
  const [appointmentType, setAppointmentType] = useState("");
  const [doctorId, setDoctorId] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [selectedAppointment, setSelectedAppointment] =
    useState<Appointment | null>(null);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [deleteAppointment, setDeleteAppointment] =
    useState<Appointment | null>(null);
  const [cancelAppointment, setCancelAppointment] =
    useState<Appointment | null>(null);

  const params = useMemo(
    () => ({
      page: pageIndex + 1,
      size: pageSize,
      search: search || undefined,
      date: date || undefined,
      status: status ? (status as AppointmentStatus) : undefined,
      appointment_type: appointmentType
        ? (appointmentType as AppointmentType)
        : undefined,
      doctor_id: doctorId || undefined,
      department_id: departmentId || undefined,
    }),
    [
      pageIndex,
      pageSize,
      search,
      date,
      status,
      appointmentType,
      doctorId,
      departmentId,
    ]
  );

  const appointmentsQuery = useAppointments(params);
  const createAppointment = useCreateAppointment();
  const updateAppointment = useUpdateAppointment();
  const deleteAppointmentMutation = useDeleteAppointment();
  const updateStatus = useUpdateAppointmentStatus();

  const appointments = appointmentsQuery.data?.items ?? [];
  const total = appointmentsQuery.data?.total ?? 0;
  const pageCount = Math.ceil(total / pageSize);

  const scheduled = appointments.filter(
    (item) => item.status === "scheduled"
  ).length;
  const completed = appointments.filter(
    (item) => item.status === "completed"
  ).length;
  const cancelled = appointments.filter(
    (item) => item.status === "cancelled" || item.status === "no_show"
  ).length;

  const columns = getAppointmentColumns({
    onView: (appointment) => {
      setSelectedAppointment(appointment);
      setWorkspaceOpen(true);
    },
    onEdit: (appointment) => {
      setSelectedAppointment(appointment);
      setFormOpen(true);
    },
    onCancel: (appointment) => {
      setCancelAppointment(appointment);
    },
    onDelete: (appointment) => {
      setDeleteAppointment(appointment);
    },
  });

  function resetFilters() {
    setSearch("");
    setDate(today);
    setStatus("");
    setAppointmentType("");
    setDoctorId("");
    setDepartmentId("");
    setPageIndex(0);
  }

  async function handleSubmit(values: AppointmentFormValues) {
    if (selectedAppointment) {
      await updateAppointment.mutateAsync({
        id: selectedAppointment.id,
        payload: appointmentFormToUpdatePayload(values),
      });
    } else {
      await createAppointment.mutateAsync(
        appointmentFormToCreatePayload(values)
      );
    }

    setFormOpen(false);
    setSelectedAppointment(null);
  }

  async function handleDelete() {
    if (!deleteAppointment) return;

    await deleteAppointmentMutation.mutateAsync(deleteAppointment.id);
    setDeleteAppointment(null);
  }

  async function handleCancel() {
    if (!cancelAppointment) return;

    await updateStatus.mutateAsync({
      id: cancelAppointment.id,
      status: "cancelled",
    });

    setCancelAppointment(null);
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Appointments"
          description="Schedule, manage, check-in, and track patient appointments."
          actions={
            <Button
              onClick={() => {
                setSelectedAppointment(null);
                setFormOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Appointment
            </Button>
          }
        />

        <AppointmentStats
          total={total}
          scheduled={scheduled}
          completed={completed}
          cancelled={cancelled}
        />

        <AppointmentFilters
          date={date}
          status={status}
          appointmentType={appointmentType}
          doctorId={doctorId}
          departmentId={departmentId}
          onDateChange={(value) => {
            setDate(value);
            setPageIndex(0);
          }}
          onStatusChange={(value) => {
            setStatus(value);
            setPageIndex(0);
          }}
          onAppointmentTypeChange={(value) => {
            setAppointmentType(value);
            setPageIndex(0);
          }}
          onDoctorChange={(value) => {
            setDoctorId(value);
            setPageIndex(0);
          }}
          onDepartmentChange={(value) => {
            setDepartmentId(value);
            setPageIndex(0);
          }}
          onReset={resetFilters}
        />

        {appointmentsQuery.isError ? (
          <ErrorState
            title="Could not load appointments"
            description="Please check your connection or try again."
            onRetry={() => appointmentsQuery.refetch()}
          />
        ) : appointmentsQuery.isLoading && appointments.length === 0 ? (
          <LoadingState />
        ) : (
          <DataTable
            columns={columns}
            data={appointments}
            isLoading={appointmentsQuery.isLoading}
            search={search}
            onSearchChange={(value) => {
              setSearch(value);
              setPageIndex(0);
            }}
            searchPlaceholder="Search appointments by patient, doctor, UHID..."
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
            emptyTitle="No appointments found"
            emptyDescription="Try changing filters or create a new appointment."
            getRowId={(row) => row.id}
          />
        )}

        <AppointmentWorkspaceDrawer
          open={workspaceOpen}
          appointment={selectedAppointment}
          onOpenChange={(open) => {
            setWorkspaceOpen(open);
            if (!open) setSelectedAppointment(null);
          }}
        />

        <FormDrawer
          open={formOpen}
          onOpenChange={(open) => {
            setFormOpen(open);
            if (!open) setSelectedAppointment(null);
          }}
          title={
            selectedAppointment ? "Edit Appointment" : "Schedule Appointment"
          }
          description="Create or update patient appointment details."
          size="lg"
        >
          <AppointmentForm
            defaultValues={
              selectedAppointment
                ? appointmentToFormValues(selectedAppointment)
                : undefined
            }
            isSubmitting={
              createAppointment.isPending || updateAppointment.isPending
            }
            onSubmit={handleSubmit}
            onCancel={() => {
              setFormOpen(false);
              setSelectedAppointment(null);
            }}
          />
        </FormDrawer>

        <ConfirmDialog
          open={Boolean(cancelAppointment)}
          onOpenChange={() => setCancelAppointment(null)}
          title="Cancel appointment?"
          description={
            cancelAppointment
              ? `This will cancel the appointment for ${cancelAppointment.patient_name}.`
              : "This appointment will be cancelled."
          }
          confirmText="Cancel Appointment"
          danger
          isLoading={updateStatus.isPending}
          onConfirm={handleCancel}
        />

        <ConfirmDialog
          open={Boolean(deleteAppointment)}
          onOpenChange={() => setDeleteAppointment(null)}
          title="Delete appointment?"
          description={
            deleteAppointment
              ? `This will permanently delete the appointment for ${deleteAppointment.patient_name}.`
              : "This appointment will be deleted."
          }
          confirmText="Delete"
          danger
          isLoading={deleteAppointmentMutation.isPending}
          onConfirm={handleDelete}
        />
      </div>
    </AppShell>
  );
}