"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Mail, Stethoscope } from "lucide-react";

import { Doctor } from "@/features/doctors/types/doctor";
import { DoctorStatusBadge } from "./doctor-status-badge";

import { DataTable } from "@/shared/components/enterprise/datatable";
import { ActionMenu } from "@/shared/components/enterprise/action-menu";

type Props = {
  data: Doctor[];
  onView: (doctor: Doctor) => void;
};

export function DoctorsTable({ data, onView }: Props) {
  const columns: ColumnDef<Doctor>[] = [
    {
      header: "Doctor",
      cell: ({ row }) => {
        const doctor = row.original;

        return (
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Stethoscope className="h-5 w-5" />
            </div>

            <div>
              <p className="font-medium">
                Dr. {doctor.first_name} {doctor.last_name}
              </p>
              <p className="text-xs text-muted-foreground">
                {doctor.registration_number}
              </p>
            </div>
          </div>
        );
      },
    },
    {
      header: "Email",
      cell: ({ row }) => (
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Mail className="h-4 w-4" />
          {row.original.email}
        </div>
      ),
    },
    {
      accessorKey: "specialization",
      header: "Specialization",
    },
    {
      header: "Departments",
      cell: ({ row }) =>
        row.original.department_names?.length
          ? row.original.department_names.join(", ")
          : "-",
    },
    {
      header: "Fee",
      cell: ({ row }) => `₹${row.original.consultation_fee ?? 0}`,
    },
    {
      header: "Status",
      cell: ({ row }) => (
        <DoctorStatusBadge active={row.original.active} />
      ),
    },
    {
      header: "",
      id: "actions",
      cell: ({ row }) => (
        <ActionMenu
          items={[
            {
              label: "View Profile",
              onClick: () => onView(row.original),
            },
            {
              label: "Edit",
              onClick: () => {},
            },
            {
              label: "Schedule",
              onClick: () => onView(row.original),
            },
          ]}
        />
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={data}
      searchPlaceholder="Search doctors..."
      emptyTitle="No doctors found"
      emptyDescription="Try changing your search or add a new doctor."
    />
  );
}