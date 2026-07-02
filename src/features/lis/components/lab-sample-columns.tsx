// src/features/lis/components/lab-sample-columns.tsx

"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  ActionMenu,
  DataTableColumnHeader,
} from "@/shared/components/enterprise";
import type { LabSample } from "../types/lis.types";
import { LabPriorityBadge } from "./lab-priority-badge";
import { LabSampleStatusBadge } from "./lab-sample-status-badge";

export function getLabSampleColumns(params: {
  onView: (sample: LabSample) => void;
  onEdit: (sample: LabSample) => void;
  onResult: (sample: LabSample) => void;
  onVerify: (sample: LabSample) => void;
  onApprove: (sample: LabSample) => void;
  onDelete: (sample: LabSample) => void;
}): ColumnDef<LabSample>[] {
  return [
    {
      accessorKey: "sample_number",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Sample" />
      ),
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.sample_number}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.sample_type || "-"}
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
      accessorKey: "test_name",
      header: "Test/Profile",
      cell: ({ row }) =>
        row.original.test_name || row.original.profile_name || "-",
    },
    {
      accessorKey: "doctor_name",
      header: "Doctor",
      cell: ({ row }) => row.original.doctor_name || "-",
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => <LabPriorityBadge priority={row.original.priority} />,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <LabSampleStatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "collected_at",
      header: "Collected",
      cell: ({ row }) => row.original.collected_at || "-",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <ActionMenu
          items={[
            { label: "Open Workspace", onClick: () => params.onView(row.original) },
            { label: "Edit Sample", onClick: () => params.onEdit(row.original) },
            { label: "Enter Result", onClick: () => params.onResult(row.original) },
            { label: "Verify", onClick: () => params.onVerify(row.original) },
            { label: "Approve", onClick: () => params.onApprove(row.original) },
            {
              label: "Delete Sample",
              danger: true,
              onClick: () => params.onDelete(row.original),
            },
          ]}
        />
      ),
    },
  ];
}