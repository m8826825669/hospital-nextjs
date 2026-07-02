// src/features/pharmacy/components/medicine-columns.tsx

"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  ActionMenu,
  DataTableColumnHeader,
} from "@/shared/components/enterprise";
import type { Medicine } from "../types/pharmacy.types";
import { MedicineStatusBadge } from "./medicine-status-badge";

export function getMedicineColumns(params: {
  onView: (medicine: Medicine) => void;
  onEdit: (medicine: Medicine) => void;
  onDelete: (medicine: Medicine) => void;
}): ColumnDef<Medicine>[] {
  return [
    {
      accessorKey: "name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Medicine" />
      ),
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.name}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.generic_name || row.original.brand_name || "-"}
          </p>
        </div>
      ),
    },
    {
      accessorKey: "category_name",
      header: "Category",
      cell: ({ row }) => row.original.category_name || "-",
    },
    {
      accessorKey: "dosage_form",
      header: "Form",
      cell: ({ row }) => row.original.dosage_form || "-",
    },
    {
      accessorKey: "strength",
      header: "Strength",
      cell: ({ row }) => row.original.strength || "-",
    },
    {
      accessorKey: "unit",
      header: "Unit",
      cell: ({ row }) => row.original.unit || "-",
    },
    {
      accessorKey: "reorder_level",
      header: "Reorder Level",
      cell: ({ row }) => row.original.reorder_level ?? "-",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <MedicineStatusBadge status={row.original.status} />,
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
              label: "Edit Medicine",
              onClick: () => params.onEdit(row.original),
            },
            {
              label: "Delete Medicine",
              danger: true,
              onClick: () => params.onDelete(row.original),
            },
          ]}
        />
      ),
    },
  ];
}