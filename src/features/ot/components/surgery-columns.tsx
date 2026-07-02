// src/features/ot/components/surgery-columns.tsx

"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  ActionMenu,
  DataTableColumnHeader,
} from "@/shared/components/enterprise";
import type { Surgery } from "../types/ot.types";
import { SurgeryStatusBadge } from "./surgery-status-badge";

export function getSurgeryColumns(params: {
  onView: (surgery: Surgery) => void;
  onEdit: (surgery: Surgery) => void;
  onStart: (surgery: Surgery) => void;
  onComplete: (surgery: Surgery) => void;
  onDelete: (surgery: Surgery) => void;
}): ColumnDef<Surgery>[] {
  return [
    {
      accessorKey: "surgery_number",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Surgery" />
      ),
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.surgery_number}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.scheduled_date}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "patient_name",
      header: "Patient",
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
      accessorKey: "procedure_name",
      header: "Procedure",
      cell: ({ row }) => row.original.procedure_name || "-",
    },
    {
      accessorKey: "surgeon_name",
      header: "Surgeon",
      cell: ({ row }) => row.original.surgeon_name || "-",
    },
    {
      accessorKey: "theatre_name",
      header: "Theatre",
      cell: ({ row }) => row.original.theatre_name || "-",
    },
    {
      accessorKey: "scheduled_start_time",
      header: "Time",
      cell: ({ row }) =>
        `${row.original.scheduled_start_time}${
          row.original.scheduled_end_time
            ? ` - ${row.original.scheduled_end_time}`
            : ""
        }`,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <SurgeryStatusBadge status={row.original.status} />,
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
              label: "Edit Surgery",
              onClick: () => params.onEdit(row.original),
            },
            {
              label: "Start Surgery",
              onClick: () => params.onStart(row.original),
            },
            {
              label: "Complete Surgery",
              onClick: () => params.onComplete(row.original),
            },
            {
              label: "Delete Surgery",
              danger: true,
              onClick: () => params.onDelete(row.original),
            },
          ]}
        />
      ),
    },
  ];
}