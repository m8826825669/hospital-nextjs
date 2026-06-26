"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";
import { useMemo, useState } from "react";

import { DataTable } from "@/components/data-table/data-table";
import { DataTablePagination } from "@/components/data-table/data-table-pagination";
import { DataTableToolbar } from "@/components/data-table/data-table-toolbar";
import { PageHeader } from "@/components/common/page-header";
import { StatusBadge } from "@/components/data-display/status-badge";
import { Button } from "@/components/ui/button";
import { usePatients } from "@/features/patients/hooks/use-patients";
import type { PatientResponse } from "@/features/patients/types/patient.types";
import { PageContainer } from "@/components/common/page-container";
import { DataTableSkeleton } from "@/components/data-table/data-table-skeleton";

export default function PatientsPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = usePatients({
    search,
    page,
    size: 10,
  });

  const patients: PatientResponse[] = Array.isArray(data)
    ? data
    : data?.items || [];

  const totalPages = data?.pages || 1;

  const columns = useMemo<ColumnDef<PatientResponse>[]>(
    () => [
      {
        accessorKey: "patient_code",
        header: "Patient Code",
        cell: ({ row }) => row.original.patient_code || "-",
      },
      {
        id: "name",
        header: "Patient Name",
        cell: ({ row }) =>
          `${row.original.first_name || ""} ${
            row.original.middle_name || ""
          } ${row.original.last_name || ""}`.trim(),
      },
      {
        accessorKey: "gender",
        header: "Gender",
      },
      {
        accessorKey: "mobile",
        header: "Mobile",
        cell: ({ row }) => row.original.mobile || "-",
      },
      {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => row.original.email || "-",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => (
          <StatusBadge status={row.original.status || "active"} />
        ),
      },
      {
        id: "actions",
        header: "",
        cell: ({ row }) => (
          <Button size="sm" variant="outline" asChild>
            <Link href={`/patients/${row.original.id}`}>View</Link>
          </Button>
        ),
      },
    ],
    []
  );

  return (
    <PageContainer>
    <div className="space-y-6">
      <PageHeader
        title="Patients"
        description="Manage registration, search, documents and patient records."
        actions={
          <Button asChild>
            <Link href="/patients/register">Register Patient</Link>
          </Button>
        }
      />

      <div className="rounded-xl border bg-background shadow-sm">
        <div className="border-b p-4">
          <DataTableToolbar
            search={search}
            onSearchChange={(value) => {
              setSearch(value);
              setPage(1);
            }}
            placeholder="Search patients by code, name or mobile..."
          />
        </div>

        {isLoading ? (
          <DataTableSkeleton columns={7} />
        ) : (
          <DataTable
            columns={columns}
            data={patients}
            emptyTitle="No patients found"
            emptyDescription="Try changing your search or register a new patient."
          />
        )}

        <DataTablePagination
          page={page}
          totalPages={totalPages}
          onPageChange={setPage}
        />
      </div>
    </div>
    </PageContainer>
  );
}