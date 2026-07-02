// src/features/opd/components/opd-columns.tsx

"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  ActionMenu,
  DataTableColumnHeader,
} from "@/shared/components/enterprise";
import type { OpdEncounter } from "../types/opd.types";
import { OpdStatusBadge } from "./opd-status-badge";

export function getOpdColumns(params: {
  onView: (encounter: OpdEncounter) => void;
  onEdit: (encounter: OpdEncounter) => void;
  onComplete: (encounter: OpdEncounter) => void;
  onDelete: (encounter: OpdEncounter) => void;
}): ColumnDef<OpdEncounter>[] {
  return [
    {
      accessorKey: "visit_date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Visit Date" />
      ),
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.visit_date}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.visit_time || "-"}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "patient_name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Patient" />
      ),
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.patient_name}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.patient_uhid || "-"}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "doctor_name",
      header: "Doctor",
      cell: ({ row }) => row.original.doctor_name || "-",
    },
    {
      accessorKey: "chief_complaint",
      header: "Chief Complaint",
      cell: ({ row }) => row.original.chief_complaint || "-",
    },
    {
      accessorKey: "diagnosis",
      header: "Diagnosis",
      cell: ({ row }) => row.original.diagnosis || "-",
    },
    {
      accessorKey: "follow_up_date",
      header: "Follow-up",
      cell: ({ row }) => row.original.follow_up_date || "-",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <OpdStatusBadge status={row.original.status} />,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <ActionMenu
          items={[
            {
              label: "Open Workspace",
              onClick: () => params.onView(row.original),
            },
            {
              label: "Edit Encounter",
              onClick: () => params.onEdit(row.original),
            },
            {
              label: "Mark Completed",
              onClick: () => params.onComplete(row.original),
            },
            {
              label: "Delete Encounter",
              danger: true,
              onClick: () => params.onDelete(row.original),
            },
          ]}
        />
      ),
    },
  ];
}