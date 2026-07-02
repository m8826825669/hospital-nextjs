// src/features/appointments/components/appointment-columns.tsx

"use client";

import type { ColumnDef } from "@tanstack/react-table";
import {
  ActionMenu,
  DataTableColumnHeader,
} from "@/shared/components/enterprise";
import type { Appointment } from "../types/appointment.types";
import { AppointmentStatusBadge } from "./appointment-status-badge";
import { AppointmentTypeBadge } from "./appointment-type-badge";

export function getAppointmentColumns(params: {
  onView: (appointment: Appointment) => void;
  onEdit: (appointment: Appointment) => void;
  onCancel: (appointment: Appointment) => void;
  onDelete: (appointment: Appointment) => void;
}): ColumnDef<Appointment>[] {
  return [
    {
      accessorKey: "appointment_date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date" />
      ),
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.appointment_date}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.start_time}
            {row.original.end_time ? ` - ${row.original.end_time}` : ""}
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
      accessorKey: "department_name",
      header: "Department",
      cell: ({ row }) => row.original.department_name || "-",
    },
    {
      accessorKey: "appointment_type",
      header: "Type",
      cell: ({ row }) => (
        <AppointmentTypeBadge type={row.original.appointment_type} />
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <AppointmentStatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "token_number",
      header: "Token",
      cell: ({ row }) => row.original.token_number || "-",
    },
    {
      accessorKey: "consultation_fee",
      header: "Fee",
      cell: ({ row }) =>
        row.original.consultation_fee !== null &&
        row.original.consultation_fee !== undefined
          ? `₹${row.original.consultation_fee}`
          : "-",
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) => (
        <ActionMenu
          items={[
            {
              label: "View Details",
              onClick: () => params.onView(row.original),
            },
            {
              label: "Edit Appointment",
              onClick: () => params.onEdit(row.original),
            },
            {
              label: "Cancel Appointment",
              danger: true,
              onClick: () => params.onCancel(row.original),
            },
            {
              label: "Delete Appointment",
              danger: true,
              onClick: () => params.onDelete(row.original),
            },
          ]}
        />
      ),
    },
  ];
}