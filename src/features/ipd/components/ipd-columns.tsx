// src/features/ipd/components/ipd-columns.tsx

"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  ActionMenu,
  DataTableColumnHeader,
} from "@/shared/components/enterprise";
import type { IpdAdmission } from "../types/ipd.types";
import { IpdStatusBadge } from "./ipd-status-badge";

export function getIpdColumns(params: {
  onView: (admission: IpdAdmission) => void;
  onEdit: (admission: IpdAdmission) => void;
  onTransfer: (admission: IpdAdmission) => void;
  onDischarge: (admission: IpdAdmission) => void;
  onDelete: (admission: IpdAdmission) => void;
}): ColumnDef<IpdAdmission>[] {
  return [
    {
      accessorKey: "admission_number",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Admission" />
      ),
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.admission_number}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.admission_date}
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
            {row.original.patient_uhid || row.original.patient_phone || "-"}
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
      accessorKey: "ward_name",
      header: "Ward",
      cell: ({ row }) => row.original.ward_name || "-",
    },
    {
      accessorKey: "bed_number",
      header: "Bed",
      cell: ({ row }) => row.original.bed_number || "-",
    },
    {
      accessorKey: "diagnosis",
      header: "Diagnosis",
      cell: ({ row }) => row.original.diagnosis || "-",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <IpdStatusBadge status={row.original.status} />,
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
              label: "Edit Admission",
              onClick: () => params.onEdit(row.original),
            },
            {
              label: "Transfer Bed",
              onClick: () => params.onTransfer(row.original),
            },
            {
              label: "Discharge Patient",
              onClick: () => params.onDischarge(row.original),
            },
            {
              label: "Delete Admission",
              danger: true,
              onClick: () => params.onDelete(row.original),
            },
          ]}
        />
      ),
    },
  ];
}