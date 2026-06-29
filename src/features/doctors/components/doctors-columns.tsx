// src/features/doctors/components/doctors-columns.tsx

"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Doctor } from "../types/doctor.types";
import {
  DataTableColumnHeader,
  DataTableRowActions,
  StatusBadge,
} from "@/shared/components/enterprise";

export function getDoctorsColumns(params: {
  onView: (doctor: Doctor) => void;
  onEdit: (doctor: Doctor) => void;
  onDelete: (doctor: Doctor) => void;
}): ColumnDef<Doctor>[] {
  return [
    {
      accessorKey: "full_name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Doctor" />
      ),
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.full_name}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.email}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "specialization",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Specialization" />
      ),
    },
    {
      accessorKey: "qualification",
      header: "Qualification",
      cell: ({ row }) => row.original.qualification || "-",
    },
    {
      accessorKey: "department_names",
      header: "Departments",
      cell: ({ row }) =>
        row.original.department_names.length
          ? row.original.department_names.join(", ")
          : "-",
    },
    {
      accessorKey: "consultation_fee",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Fee" />
      ),
      cell: ({ row }) =>
        row.original.consultation_fee
          ? `₹${row.original.consultation_fee}`
          : "-",
    },
    {
      accessorKey: "is_active",
      header: "Status",
      cell: ({ row }) =>
        row.original.is_active ? (
          <StatusBadge label="Active" variant="success" />
        ) : (
          <StatusBadge label="Inactive" variant="muted" />
        ),
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <DataTableRowActions
          row={row.original}
          getActions={(doctor) => [
            {
              label: "View",
              onClick: () => params.onView(doctor),
            },
            {
              label: "Edit",
              onClick: () => params.onEdit(doctor),
            },
            {
              label: "Delete",
              danger: true,
              onClick: () => params.onDelete(doctor),
            },
          ]}
        />
      ),
    },
  ];
}