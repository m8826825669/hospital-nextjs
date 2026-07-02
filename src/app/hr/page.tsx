// src/app/hr/page.tsx

"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ActionMenu,
  ConfirmDialog,
  DataTable,
  FormDrawer,
  PageHeader,
} from "@/shared/components/enterprise";
import { AppShell } from "@/shared/components/layout/app-shell";

import { AttendanceForm } from "@/features/hr/components/attendance-form";
import { EmployeeForm } from "@/features/hr/components/employee-form";
import { LeaveForm } from "@/features/hr/components/leave-form";
import {
  AttendanceStatusBadge,
  EmployeeStatusBadge,
  LeaveStatusBadge,
} from "@/features/hr/components/hr-status-badges";

import {
  useAttendance,
  useCreateAttendance,
  useCreateEmployee,
  useCreateLeave,
  useDeleteEmployee,
  useEmployees,
  useLeaves,
  useUpdateEmployee,
  useUpdateLeaveStatus,
} from "@/features/hr/api/hr.queries";

import type {
  AttendanceRecord,
  Employee,
  LeaveRequest,
} from "@/features/hr/types/hr.types";
import type {
  AttendanceFormValues,
  EmployeeFormValues,
  LeaveFormValues,
} from "@/features/hr/schemas/hr.schema";

function employeeToFormValues(employee: Employee): Partial<EmployeeFormValues> {
  return {
    employee_code: employee.employee_code,
    full_name: employee.full_name,
    email: employee.email ?? "",
    phone: employee.phone ?? "",
    department_id: employee.department_id ?? "",
    designation: employee.designation ?? "",
    joining_date: employee.joining_date ?? "",
    status: employee.status,
    is_active: employee.is_active,
  };
}

export default function HrPage() {
  const [search, setSearch] = useState("");

  const [employeeFormOpen, setEmployeeFormOpen] = useState(false);
  const [attendanceFormOpen, setAttendanceFormOpen] = useState(false);
  const [leaveFormOpen, setLeaveFormOpen] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [deleteEmployee, setDeleteEmployee] = useState<Employee | null>(null);

  const params = useMemo(
    () => ({
      page: 1,
      size: 100,
      search: search || undefined,
    }),
    [search]
  );

  const employeesQuery = useEmployees(params);
  const attendanceQuery = useAttendance(params);
  const leavesQuery = useLeaves(params);

  const createEmployee = useCreateEmployee();
  const updateEmployee = useUpdateEmployee();
  const deleteEmployeeMutation = useDeleteEmployee();

  const createAttendance = useCreateAttendance();
  const createLeave = useCreateLeave();
  const updateLeaveStatus = useUpdateLeaveStatus();

  const employeeColumns: ColumnDef<Employee>[] = [
    { accessorKey: "employee_code", header: "Code" },
    { accessorKey: "full_name", header: "Employee" },
    { accessorKey: "department_name", header: "Department" },
    { accessorKey: "designation", header: "Designation" },
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
                setEmployeeFormOpen(true);
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
  ];

  const attendanceColumns: ColumnDef<AttendanceRecord>[] = [
    { accessorKey: "employee_name", header: "Employee" },
    { accessorKey: "attendance_date", header: "Date" },
    { accessorKey: "check_in", header: "Check In" },
    { accessorKey: "check_out", header: "Check Out" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <AttendanceStatusBadge status={row.original.status} />,
    },
  ];

  const leaveColumns: ColumnDef<LeaveRequest>[] = [
    { accessorKey: "employee_name", header: "Employee" },
    { accessorKey: "leave_type", header: "Leave Type" },
    { accessorKey: "start_date", header: "Start" },
    { accessorKey: "end_date", header: "End" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <LeaveStatusBadge status={row.original.status} />,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <ActionMenu
          items={[
            {
              label: "Approve",
              onClick: () =>
                updateLeaveStatus.mutate({
                  id: row.original.id,
                  status: "approved",
                }),
            },
            {
              label: "Reject",
              danger: true,
              onClick: () =>
                updateLeaveStatus.mutate({
                  id: row.original.id,
                  status: "rejected",
                }),
            },
          ]}
        />
      ),
    },
  ];

  async function handleEmployeeSubmit(values: EmployeeFormValues) {
    if (selectedEmployee) {
      await updateEmployee.mutateAsync({
        id: selectedEmployee.id,
        payload: values,
      });
    } else {
      await createEmployee.mutateAsync(values);
    }

    setEmployeeFormOpen(false);
    setSelectedEmployee(null);
  }

  async function handleAttendanceSubmit(values: AttendanceFormValues) {
    await createAttendance.mutateAsync(values);
    setAttendanceFormOpen(false);
  }

  async function handleLeaveSubmit(values: LeaveFormValues) {
    await createLeave.mutateAsync(values);
    setLeaveFormOpen(false);
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Human Resources"
          description="Manage employees, attendance, leave, shifts, and duty roster."
        />

        <input
          className="h-10 w-full rounded-md border bg-background px-3 text-sm"
          placeholder="Search HR records..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <Tabs defaultValue="employees">
          <TabsList>
            <TabsTrigger value="employees">Employees</TabsTrigger>
            <TabsTrigger value="attendance">Attendance</TabsTrigger>
            <TabsTrigger value="leaves">Leave</TabsTrigger>
          </TabsList>

          <TabsContent value="employees" className="mt-4 space-y-4">
            <Button
              onClick={() => {
                setSelectedEmployee(null);
                setEmployeeFormOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Employee
            </Button>

            <DataTable
              columns={employeeColumns}
              data={employeesQuery.data?.items ?? []}
              isLoading={employeesQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No employees found"
              emptyDescription="Create employees for HR, payroll, doctors, nurses, and staff."
            />
          </TabsContent>

          <TabsContent value="attendance" className="mt-4 space-y-4">
            <Button onClick={() => setAttendanceFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              Record Attendance
            </Button>

            <DataTable
              columns={attendanceColumns}
              data={attendanceQuery.data?.items ?? []}
              isLoading={attendanceQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No attendance records found"
              emptyDescription="Attendance records will appear here."
            />
          </TabsContent>

          <TabsContent value="leaves" className="mt-4 space-y-4">
            <Button onClick={() => setLeaveFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Leave Request
            </Button>

            <DataTable
              columns={leaveColumns}
              data={leavesQuery.data?.items ?? []}
              isLoading={leavesQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No leave requests found"
              emptyDescription="Leave requests and approvals will appear here."
            />
          </TabsContent>
        </Tabs>

        <FormDrawer
          open={employeeFormOpen}
          onOpenChange={(open) => {
            setEmployeeFormOpen(open);
            if (!open) setSelectedEmployee(null);
          }}
          title={selectedEmployee ? "Edit Employee" : "Add Employee"}
          description="Create or update employee information."
          size="lg"
        >
          <EmployeeForm
            defaultValues={
              selectedEmployee ? employeeToFormValues(selectedEmployee) : undefined
            }
            isSubmitting={createEmployee.isPending || updateEmployee.isPending}
            onSubmit={handleEmployeeSubmit}
            onCancel={() => {
              setEmployeeFormOpen(false);
              setSelectedEmployee(null);
            }}
          />
        </FormDrawer>

        <FormDrawer
          open={attendanceFormOpen}
          onOpenChange={setAttendanceFormOpen}
          title="Record Attendance"
          description="Create employee attendance entry."
          size="md"
        >
          <AttendanceForm
            isSubmitting={createAttendance.isPending}
            onSubmit={handleAttendanceSubmit}
            onCancel={() => setAttendanceFormOpen(false)}
          />
        </FormDrawer>

        <FormDrawer
          open={leaveFormOpen}
          onOpenChange={setLeaveFormOpen}
          title="Leave Request"
          description="Create employee leave request."
          size="md"
        >
          <LeaveForm
            isSubmitting={createLeave.isPending}
            onSubmit={handleLeaveSubmit}
            onCancel={() => setLeaveFormOpen(false)}
          />
        </FormDrawer>

        <ConfirmDialog
          open={Boolean(deleteEmployee)}
          onOpenChange={() => setDeleteEmployee(null)}
          title="Delete employee?"
          description={
            deleteEmployee
              ? `This will permanently delete ${deleteEmployee.full_name}.`
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
    </AppShell>
  );
}