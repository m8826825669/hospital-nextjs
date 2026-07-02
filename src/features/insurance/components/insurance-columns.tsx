// src/features/insurance/components/insurance-columns.tsx

"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  ActionMenu,
  DataTableColumnHeader,
} from "@/shared/components/enterprise";
import type { InsuranceClaim } from "../types/insurance.types";
import { InsurancePriorityBadge } from "./insurance-priority-badge";
import { InsuranceStatusBadge } from "./insurance-status-badge";

export function getInsuranceColumns(params: {
  onView: (claim: InsuranceClaim) => void;
  onEdit: (claim: InsuranceClaim) => void;
  onReview: (claim: InsuranceClaim) => void;
  onSettle: (claim: InsuranceClaim) => void;
  onDelete: (claim: InsuranceClaim) => void;
}): ColumnDef<InsuranceClaim>[] {
  return [
    {
      accessorKey: "claim_number",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Claim" />
      ),
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.claim_number}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.claim_date}
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
      accessorKey: "provider_name",
      header: "Provider",
      cell: ({ row }) => row.original.provider_name || "-",
    },
    {
      accessorKey: "policy_number",
      header: "Policy",
      cell: ({ row }) => row.original.policy_number || "-",
    },
    {
      accessorKey: "claim_amount",
      header: "Claim Amount",
      cell: ({ row }) => `₹${row.original.claim_amount}`,
    },
    {
      accessorKey: "approved_amount",
      header: "Approved",
      cell: ({ row }) =>
        row.original.approved_amount != null
          ? `₹${row.original.approved_amount}`
          : "-",
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => (
        <InsurancePriorityBadge priority={row.original.priority} />
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <InsuranceStatusBadge status={row.original.status} />,
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
              label: "Edit Claim",
              onClick: () => params.onEdit(row.original),
            },
            {
              label: "Review Claim",
              onClick: () => params.onReview(row.original),
            },
            {
              label: "Settle Claim",
              onClick: () => params.onSettle(row.original),
            },
            {
              label: "Delete Claim",
              danger: true,
              onClick: () => params.onDelete(row.original),
            },
          ]}
        />
      ),
    },
  ];
}