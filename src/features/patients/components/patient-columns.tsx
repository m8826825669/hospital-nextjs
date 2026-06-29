// src/features/patients/components/patient-columns.tsx

"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  ActionMenu,
  DataTableColumnHeader,
} from "@/shared/components/enterprise";

import type { Patient } from "../types/patient.types";
import { PatientAvatar } from "./patient-avatar";
import { PatientStatusBadge } from "./patient-status-badge";

export function getPatientColumns(params: {
  onView: (patient: Patient) => void;
  onEdit: (patient: Patient) => void;
  onDelete: (patient: Patient) => void;
}): ColumnDef<Patient>[] {
  return [
    {
      accessorKey: "full_name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Patient" />
      ),
      cell: ({ row }) => {
        const patient = row.original;

        return (
          <div className="flex items-center gap-3">
            <PatientAvatar patient={patient} />

            <div>
              <p className="font-medium">{patient.full_name}</p>
              <p className="text-xs text-muted-foreground">
                {patient.phone || patient.email || "No contact"}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      accessorKey: "uhid",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="UHID" />
      ),
      cell: ({ row }) => row.original.uhid || "-",
    },
    {
      accessorKey: "mrn",
      header: "MRN",
      cell: ({ row }) => row.original.mrn || "-",
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => row.original.gender || "-",
    },
    {
      accessorKey: "age",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Age" />
      ),
      cell: ({ row }) =>
        row.original.age !== undefined && row.original.age !== null
          ? row.original.age
          : "-",
    },
    {
      accessorKey: "blood_group",
      header: "Blood Group",
      cell: ({ row }) => row.original.blood_group || "-",
    },
    {
      accessorKey: "city",
      header: "City",
      cell: ({ row }) => row.original.city || "-",
    },
    {
      accessorKey: "primary_doctor_name",
      header: "Primary Doctor",
      cell: ({ row }) => row.original.primary_doctor_name || "-",
    },
    {
      accessorKey: "insurance_provider_name",
      header: "Insurance",
      cell: ({ row }) => row.original.insurance_provider_name || "-",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <PatientStatusBadge status={row.original.status} />,
    },
    {
  id: "actions",
  enableHiding: false,
  cell: ({ row }) => (
    <ActionMenu
      items={[
        {
          label: "View Profile",
          onClick: () => params.onView(row.original),
        },
        {
          label: "Edit Patient",
          onClick: () => params.onEdit(row.original),
        },
        {
          label: "Delete Patient",
          danger: true,
          onClick: () => params.onDelete(row.original),
        },
      ]}
    />
  ),
},
  ];
}