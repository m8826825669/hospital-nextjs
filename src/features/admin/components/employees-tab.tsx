"use client";

import { useMemo, useState } from "react";
import { BriefcaseBusiness, Mail, Phone, Plus, UserRoundCheck, Users } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  ActionMenu,
  ConfirmDialog,
  DataTable,
  FormDrawer,
} from "@/shared/components/enterprise";
import { useDepartments } from "../api/admin.queries";
import {
  useCreateEmployee,
  useDeleteEmployee,
  useEmployees,
  useUpdateEmployee,
} from "@/features/hr/api/hr.queries";
import { EmployeeForm } from "@/features/hr/components/employee-form";
import { EmployeeStatusBadge } from "@/features/hr/components/hr-status-badges";
import type { Employee } from "@/features/hr/types/hr.types";
import type { EmployeeFormInput, EmployeeFormValues } from "@/features/hr/schemas/hr.schema";

interface EmployeesTabProps {
  search: string;
  onSearchChange: (value: string) => void;
}

function employeeToFormValues(employee: Employee): Partial<EmployeeFormInput> {
  return {
    first_name: employee.first_name ?? "",
    last_name: employee.last_name ?? "",
    email: employee.email ?? "",
    phone: employee.phone ?? "",
    department_id: employee.department_id ?? "",
    designation: employee.designation ?? "",
    employment_type: employee.employment_type ?? "full_time",
    joining_date: employee.joining_date ?? "",
    status: employee.status ?? "active",
    address: employee.address ?? "",
    is_active: employee.is_active ?? true,
  };
}

function formatEmploymentType(value: string) {
  return value
    .split("_")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function EmployeesTab({ search, onSearchChange }: EmployeesTabProps) {
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [deleteEmployee, setDeleteEmployee] = useState<Employee | null>(null);

  const params = useMemo(
    () => ({
      page: pageIndex + 1,
      page_size: pageSize,
      search: search || undefined,
    }),
    [pageIndex, pageSize, search]
  );

  const employeesQuery = useEmployees(params);
  const departmentsQuery = useDepartments({ page: 1, size: 100 });
  const createEmployee = useCreateEmployee();
  const updateEmployee = useUpdateEmployee();
  const deleteEmployeeMutation = useDeleteEmployee();

  const departments = useMemo(
    () => departmentsQuery.data?.items ?? [],
    [departmentsQuery.data?.items]
  );
  const departmentNameById = useMemo(() => {
    return new Map(departments.map((department) => [department.id, department.name]));
  }, [departments]);

  const employeeStats = useMemo(() => {
    const employees = employeesQuery.data?.items ?? [];
    return {
      total: employeesQuery.data?.total ?? employees.length,
      active: employees.filter((employee) => employee.status === "active" && employee.is_active).length,
      clinical: employees.filter((employee) =>
        /doctor|nurse|surgeon|physician|radiologist|pathologist|consultant/i.test(
          employee.designation ?? ""
        )
      ).length,
      inactive: employees.filter((employee) => !employee.is_active || employee.status === "inactive").length,
    };
  }, [employeesQuery.data]);

  const columns = useMemo<ColumnDef<Employee>[]>(
    () => [
      {
        id: "employee",
        header: "Employee",
        cell: ({ row }) => {
          const employee = row.original;
          return (
            <div className="flex min-w-[260px] items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-sm font-bold text-blue-700">
                {employee.first_name?.[0]}
                {employee.last_name?.[0]}
              </div>
              <div>
                <div className="font-semibold text-slate-950">
                  {employee.first_name} {employee.last_name}
                </div>
                <div className="text-xs text-slate-500">{employee.employee_code}</div>
              </div>
            </div>
          );
        },
      },
      {
        id: "contact",
        header: "Contact",
        cell: ({ row }) => {
          const employee = row.original;
          return (
            <div className="min-w-[220px] space-y-1 text-sm">
              {employee.email ? (
                <div className="flex items-center gap-2 text-slate-700">
                  <Mail className="h-3.5 w-3.5 text-slate-400" />
                  {employee.email}
                </div>
              ) : null}
              {employee.phone ? (
                <div className="flex items-center gap-2 text-slate-600">
                  <Phone className="h-3.5 w-3.5 text-slate-400" />
                  {employee.phone}
                </div>
              ) : null}
              {!employee.email && !employee.phone ? (
                <span className="text-slate-400">Not provided</span>
              ) : null}
            </div>
          );
        },
      },
      {
        id: "department",
        header: "Department",
        cell: ({ row }) => {
          const employee = row.original;
          const departmentName =
            employee.department_name ||
            (employee.department_id ? departmentNameById.get(employee.department_id) : undefined);
          return (
            <div className="min-w-[180px]">
              <div className="font-medium text-slate-800">{departmentName ?? "Unassigned"}</div>
              <div className="text-xs text-slate-500">{employee.designation || "No designation"}</div>
            </div>
          );
        },
      },
      {
        accessorKey: "employment_type",
        header: "Type",
        cell: ({ row }) => formatEmploymentType(row.original.employment_type),
      },
      {
        accessorKey: "joining_date",
        header: "Joining Date",
        cell: ({ row }) => row.original.joining_date || "—",
      },
      {
        accessorKey: "status",
        header: "Status",
        cell: ({ row }) => <EmployeeStatusBadge status={row.original.status} />,
      },
      {
        id: "actions",
        cell: ({ row }) => (
          <ActionMenu
            items={[
              {
                label: "Edit",
                onClick: () => {
                  setSelectedEmployee(row.original);
                  setFormOpen(true);
                },
              },
              {
                label: "Delete",
                danger: true,
                onClick: () => setDeleteEmployee(row.original),
              },
            ]}
          />
        ),
      },
    ],
    [departmentNameById]
  );

  async function handleSubmit(values: EmployeeFormValues) {
    const payload = {
      ...values,
      email: values.email || undefined,
      phone: values.phone || undefined,
      department_id: values.department_id || undefined,
      designation: values.designation || undefined,
      joining_date: values.joining_date || undefined,
      address: values.address || undefined,
    };

    if (selectedEmployee) {
      await updateEmployee.mutateAsync({ id: selectedEmployee.id, payload });
    } else {
      await createEmployee.mutateAsync(payload);
    }

    setFormOpen(false);
    setSelectedEmployee(null);
  }

  return (
    <div className="space-y-5">
      <div className="grid gap-4 md:grid-cols-4">
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Employees</div>
            <Users className="h-4 w-4 text-blue-600" />
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-950">{employeeStats.total}</div>
          <div className="mt-1 text-xs text-slate-500">Total employee records</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Active</div>
            <UserRoundCheck className="h-4 w-4 text-emerald-600" />
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-950">{employeeStats.active}</div>
          <div className="mt-1 text-xs text-slate-500">Active on current page</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Clinical</div>
            <BriefcaseBusiness className="h-4 w-4 text-violet-600" />
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-950">{employeeStats.clinical}</div>
          <div className="mt-1 text-xs text-slate-500">Clinical roles on current page</div>
        </div>
        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">Inactive</div>
            <Users className="h-4 w-4 text-slate-500" />
          </div>
          <div className="mt-3 text-2xl font-bold text-slate-950">{employeeStats.inactive}</div>
          <div className="mt-1 text-xs text-slate-500">Inactive on current page</div>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={employeesQuery.data?.items ?? []}
        isLoading={employeesQuery.isLoading}
        search={search}
        onSearchChange={(value) => {
          setPageIndex(0);
          onSearchChange(value);
        }}
        searchPlaceholder="Search employees by name, code, email, phone..."
        toolbarActions={
          <Button
            onClick={() => {
              setSelectedEmployee(null);
              setFormOpen(true);
            }}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Employee
          </Button>
        }
        pagination={{
          pageIndex,
          pageSize,
          pageCount: employeesQuery.data?.pages,
          total: employeesQuery.data?.total,
        }}
        onPaginationChange={(pagination) => {
          setPageIndex(pagination.pageIndex);
          setPageSize(pagination.pageSize);
        }}
        emptyTitle="No employees found"
        emptyDescription="Create employee master records before assigning doctors, nurses, technicians, and administrative users."
      />

      <FormDrawer
        open={formOpen}
        onOpenChange={(open) => {
          setFormOpen(open);
          if (!open) setSelectedEmployee(null);
        }}
        title={selectedEmployee ? "Edit Employee" : "Add Employee"}
        description="Create or update employee master data used by HR, doctor setup, rosters, and access management."
        size="xl"
      >
        <EmployeeForm
          defaultValues={
            selectedEmployee ? employeeToFormValues(selectedEmployee) : undefined
          }
          employeeCode={selectedEmployee?.employee_code}
          departments={departments}
          isSubmitting={createEmployee.isPending || updateEmployee.isPending}
          onSubmit={handleSubmit}
          onCancel={() => {
            setFormOpen(false);
            setSelectedEmployee(null);
          }}
        />
      </FormDrawer>

      <ConfirmDialog
        open={Boolean(deleteEmployee)}
        onOpenChange={() => setDeleteEmployee(null)}
        title="Delete employee?"
        description={
          deleteEmployee
            ? `This will permanently delete ${deleteEmployee.first_name} ${deleteEmployee.last_name}. Verify that no active doctor profile, roster, payroll, attendance, or user account depends on this employee.`
            : "This employee will be deleted."
        }
        confirmText="Delete"
        danger
        isLoading={deleteEmployeeMutation.isPending}
        onConfirm={async () => {
          if (!deleteEmployee) return;
          await deleteEmployeeMutation.mutateAsync(deleteEmployee.id);
          setDeleteEmployee(null);
        }}
      />
    </div>
  );
}
