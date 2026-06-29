"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import { AppShell } from "@/shared/components/layout/app-shell";
import { Button } from "@/components/ui/button";

import { getPatientColumns } from "@/features/patients/components/patient-columns";
import { PatientFilters } from "@/features/patients/components/patient-filters";
import { PatientProfileDrawer } from "@/features/patients/components/patient-profile-drawer";
import { PatientForm } from "@/features/patients/components/patient-form";

import {
  useCreatePatient,
  useDeletePatient,
  usePatients,
  useUpdatePatient,
} from "@/features/patients/api/patients.queries";

import {
  patientFormToCreatePayload,
  patientFormToUpdatePayload,
  patientToFormValues,
} from "@/features/patients/utils/patient.mapper";

import type {
  Patient,
  PatientGender,
  PatientStatus,
} from "@/features/patients/types/patient.types";
import type { PatientFormValues } from "@/features/patients/schemas/patient.schema";
import {
  ConfirmDialog,
  DataTable,
  ErrorState,
  FormDrawer,
  LoadingState,
  PageHeader,
} from "@/shared/components/enterprise";
import { PermissionGuard } from "@/platform/permissions/permission-guard";
import { PatientStats } from "@/features/patients/components/patient-stats";


export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("");
  const [status, setStatus] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [city, setCity] = useState("");

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [formOpen, setFormOpen] = useState(false);
  const [deletePatient, setDeletePatient] = useState<Patient | null>(null);

  const params = useMemo(
    () => ({
      page: pageIndex + 1,
      size: pageSize,
      search: search || undefined,
      gender: gender ? (gender as PatientGender) : undefined,
      status: status ? (status as PatientStatus) : undefined,
      blood_group: bloodGroup || undefined,
      city: city || undefined,
    }),
    [pageIndex, pageSize, search, gender, status, bloodGroup, city]
  );

  const patientsQuery = usePatients(params);
  const createPatient = useCreatePatient();
  const updatePatient = useUpdatePatient();
  const removePatient = useDeletePatient();

  const patients = patientsQuery.data?.items ?? [];
  const total = patientsQuery.data?.total ?? 0;
  const pageCount = Math.ceil(total / pageSize);

  const columns = getPatientColumns({
    onView: (patient) => {
      setSelectedPatient(patient);
      setProfileOpen(true);
    },
    onEdit: (patient) => {
      setSelectedPatient(patient);
      setFormOpen(true);
    },
    onDelete: (patient) => {
      setDeletePatient(patient);
    },
  });

  const activeCount = patients.filter((patient) => patient.is_active).length;

    const insuredCount = patients.filter(
    (patient) => patient.insurance_provider_id || patient.insurance_provider_name
    ).length;

    const cityCount = new Set(
    patients.map((patient) => patient.city).filter(Boolean)
    ).size;
  function resetFilters() {
    setSearch("");
    setGender("");
    setStatus("");
    setBloodGroup("");
    setCity("");
    setPageIndex(0);
  }

  async function handleSubmit(values: PatientFormValues) {
    if (selectedPatient) {
      await updatePatient.mutateAsync({
        id: selectedPatient.id,
        payload: patientFormToUpdatePayload(values),
      });
    } else {
      await createPatient.mutateAsync(patientFormToCreatePayload(values));
    }

    setFormOpen(false);
    setSelectedPatient(null);
  }

  async function handleDelete() {
    if (!deletePatient) return;

    await removePatient.mutateAsync(deletePatient.id);
    setDeletePatient(null);
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Patients"
          description="Manage patient registration, demographics, contacts, insurance, and clinical history."
            actions={
            <PermissionGuard permission="patients.create">
                <Button
                onClick={() => {
                    setSelectedPatient(null);
                    setFormOpen(true);
                }}
                >
                <Plus className="mr-2 h-4 w-4" />
                Register Patient
                </Button>
            </PermissionGuard>
            }
        />
        <PatientStats
            total={total}
            activeCount={activeCount}
            insuredCount={insuredCount}
            cityCount={cityCount}
            />

        <PatientFilters
          gender={gender}
          status={status}
          bloodGroup={bloodGroup}
          city={city}
          onGenderChange={(value) => {
            setGender(value);
            setPageIndex(0);
          }}
          onStatusChange={(value) => {
            setStatus(value);
            setPageIndex(0);
          }}
          onBloodGroupChange={(value) => {
            setBloodGroup(value);
            setPageIndex(0);
          }}
          onCityChange={(value) => {
            setCity(value);
            setPageIndex(0);
          }}
          onReset={resetFilters}
        />
        {patientsQuery.isError ? (
  <ErrorState
    title="Could not load patients"
    description="Please check your connection or try again."
    onRetry={() => patientsQuery.refetch()}
  />
) : patientsQuery.isLoading && patients.length === 0 ? (
  <LoadingState />
) : (
  <DataTable
    columns={columns}
    data={patients}
    isLoading={patientsQuery.isLoading}
    search={search}
    onSearchChange={(value) => {
      setSearch(value);
      setPageIndex(0);
    }}
    searchPlaceholder="Search patients by name, UHID, MRN, phone..."
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
    emptyTitle="No patients found"
    emptyDescription="Try adjusting your search or register a new patient."
    getRowId={(row) => row.id}
  />
)}
        <DataTable
          columns={columns}
          data={patients}
          isLoading={patientsQuery.isLoading}
          search={search}
          onSearchChange={(value) => {
            setSearch(value);
            setPageIndex(0);
          }}
          searchPlaceholder="Search patients by name, UHID, MRN, phone..."
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
          emptyTitle="No patients found"
          emptyDescription="Try adjusting your search or register a new patient."
          getRowId={(row) => row.id}
        />

        <PatientProfileDrawer
          open={profileOpen}
          patient={selectedPatient}
          onOpenChange={(open) => {
            setProfileOpen(open);
            if (!open) setSelectedPatient(null);
          }}
        />

       <FormDrawer
            open={formOpen}
            onOpenChange={(open) => {
                setFormOpen(open);
                if (!open) setSelectedPatient(null);
            }}
            title={selectedPatient ? "Edit Patient" : "Register Patient"}
            description="Create or update patient registration information."
            size="xl"
            >
          <PatientForm
            defaultValues={
              selectedPatient ? patientToFormValues(selectedPatient) : undefined
            }
            isSubmitting={createPatient.isPending || updatePatient.isPending}
            onSubmit={handleSubmit}
            onCancel={() => {
              setFormOpen(false);
              setSelectedPatient(null);
            }}
          />
        </FormDrawer>

        <ConfirmDialog
          open={Boolean(deletePatient)}
          onOpenChange={() => setDeletePatient(null)}
          title="Delete patient?"
         description={
            deletePatient
                ? `This will remove ${deletePatient.full_name}. This action cannot be undone.`
                : "This action cannot be undone."
            }
          confirmText="Delete"
          danger
          isLoading={removePatient.isPending}
          onConfirm={handleDelete}
        />
      </div>
    </AppShell>
  );
}