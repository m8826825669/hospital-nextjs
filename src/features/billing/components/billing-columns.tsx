// src/features/billing/components/billing-columns.tsx

"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  ActionMenu,
  DataTableColumnHeader,
} from "@/shared/components/enterprise";
import type { BillingInvoice } from "../types/billing.types";
import { BillingStatusBadge } from "./billing-status-badge";

export function getBillingColumns(params: {
  onView: (invoice: BillingInvoice) => void;
  onEdit: (invoice: BillingInvoice) => void;
  onPayment: (invoice: BillingInvoice) => void;
  onDelete: (invoice: BillingInvoice) => void;
}): ColumnDef<BillingInvoice>[] {
  return [
    {
      accessorKey: "invoice_number",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Invoice" />
      ),
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.invoice_number}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.invoice_date}
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
      accessorKey: "total_amount",
      header: "Total",
      cell: ({ row }) => `₹${row.original.total_amount}`,
    },
    {
      accessorKey: "paid_amount",
      header: "Paid",
      cell: ({ row }) => `₹${row.original.paid_amount}`,
    },
    {
      accessorKey: "balance_amount",
      header: "Balance",
      cell: ({ row }) => `₹${row.original.balance_amount}`,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <BillingStatusBadge status={row.original.status} />,
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <ActionMenu
          items={[
            { label: "Open Workspace", onClick: () => params.onView(row.original) },
            { label: "Edit Invoice", onClick: () => params.onEdit(row.original) },
            { label: "Record Payment", onClick: () => params.onPayment(row.original) },
            {
              label: "Delete Invoice",
              danger: true,
              onClick: () => params.onDelete(row.original),
            },
          ]}
        />
      ),
    },
  ];
}