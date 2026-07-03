// src/app/hr/page.tsx

"use client";

import { useMemo, useState, type ComponentType } from "react";
import { CalendarClock, CalendarX, Clock3, Plus, UserCheck, Users } from "lucide-react";
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

import { useDepartments } from "@/features/admin/api/admin.queries";
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
  AttendanceStatus,
  Employee,
  EmployeeStatus,
  LeaveRequest,
  LeaveStatus,
} from "@/features/hr/types/hr.types";
import type {
  AttendanceFormValues,
  EmployeeFormValues,
  LeaveFormValues,
} from "@/features/hr/schemas/hr.schema";

function employeeName(employee: Employee) {
  return `${employee.first_name} ${employee.last_name}`.trim();
}

function todayIso() {
  return new Date().toISOString().slice(0, 10);
}

function employeeToFormValues(employee: Employee): Partial<EmployeeFormValues> {
  return {
    first_name: employee.first_name,
    last_name: employee.last_name,
    email: employee.email ?? "",
    phone: employee.phone ?? "",
    department_id: employee.department_id ?? "",
    designation: employee.designation ?? "",
    employment_type: employee.employment_type,
    joining_date: employee.joining_date ?? "",
    status: employee.status,
    address: employee.address ?? "",
    is_active: employee.is_active,
  };
}

interface HrKpiCardProps {
  title: string;
  value: number | string;
  description: string;
  icon: ComponentType<{ className?: string }>;
}

function HrKpiCard({ title, value, description, icon: Icon }: HrKpiCardProps) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-semibold tracking-tight">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="rounded-lg border bg-muted/40 p-2">
          <Icon className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>
    </div>
  );
}

export default function HrPage() {
  const [search, setSearch] = useState("");
  const [selectedDate, setSelectedDate] = useState(todayIso());
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [employeeStatusFilter, setEmployeeStatusFilter] = useState<EmployeeStatus | "all">("all");
  const [attendanceStatusFilter, setAttendanceStatusFilter] = useState<AttendanceStatus | "all">("all");
  const [leaveStatusFilter, setLeaveStatusFilter] = useState<LeaveStatus | "all">("all");

  const [employeeFormOpen, setEmployeeFormOpen] = useState(false);
  const [attendanceFormOpen, setAttendanceFormOpen] = useState(false);
  const [leaveFormOpen, setLeaveFormOpen] = useState(false);

  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [deleteEmployee, setDeleteEmployee] = useState<Employee | null>(null);

  const params = useMemo(
    () => ({
      page: 1,
      size: 100,
      page_size: 100,
      search: search || undefined,
    }),
    [search]
  );

  const employeesQuery = useEmployees(params);
  const attendanceQuery = useAttendance(params);
  const leavesQuery = useLeaves(params);
  const departmentsQuery = useDepartments({ page: 1, size: 100, search: undefined });

  const createEmployee = useCreateEmployee();
  const updateEmployee = useUpdateEmployee();
  const deleteEmployeeMutation = useDeleteEmployee();

  const createAttendance = useCreateAttendance();
  const createLeave = useCreateLeave();
  const updateLeaveStatus = useUpdateLeaveStatus();

  const departments = useMemo(() => departmentsQuery.data?.items ?? [], [departmentsQuery.data]);
  const employees = useMemo(() => employeesQuery.data?.items ?? [], [employeesQuery.data]);
  const attendanceRecords = useMemo(() => attendanceQuery.data?.items ?? [], [attendanceQuery.data]);
  const leaves = useMemo(() => leavesQuery.data?.items ?? [], [leavesQuery.data]);

  const departmentNameById = useMemo(() => {
    return new Map(departments.map((department) => [department.id, department.name]));
  }, [departments]);

  const employeeById = useMemo(() => {
    return new Map(employees.map((employee) => [employee.id, employee]));
  }, [employees]);

  const filteredEmployees = useMemo(() => {
    return employees.filter((employee) => {
      const departmentMatches =
        departmentFilter === "all" || employee.department_id === departmentFilter;
      const statusMatches =
        employeeStatusFilter === "all" || employee.status === employeeStatusFilter;
      return departmentMatches && statusMatches;
    });
  }, [departmentFilter, employeeStatusFilter, employees]);

  const filteredAttendance = useMemo(() => {
    return attendanceRecords.filter((record) => {
      const employee = employeeById.get(record.employee_id);
      const dateMatches = !selectedDate || record.attendance_date === selectedDate;
      const departmentMatches =
        departmentFilter === "all" || employee?.department_id === departmentFilter;
      const statusMatches =
        attendanceStatusFilter === "all" || record.status === attendanceStatusFilter;
      return dateMatches && departmentMatches && statusMatches;
    });
  }, [attendanceRecords, attendanceStatusFilter, departmentFilter, employeeById, selectedDate]);

  const filteredLeaves = useMemo(() => {
    return leaves.filter((leave) => {
      const employee = employeeById.get(leave.employee_id);
      const departmentMatches =
        departmentFilter === "all" || employee?.department_id === departmentFilter;
      const statusMatches = leaveStatusFilter === "all" || leave.status === leaveStatusFilter;
      return departmentMatches && statusMatches;
    });
  }, [departmentFilter, employeeById, leaveStatusFilter, leaves]);

  const attendanceSummary = useMemo(() => {
    return {
      present: filteredAttendance.filter((record) => record.status === "present").length,
      late: filteredAttendance.filter((record) => record.status === "late").length,
      absent: filteredAttendance.filter((record) => record.status === "absent").length,
      halfDay: filteredAttendance.filter((record) => record.status === "half_day").length,
    };
  }, [filteredAttendance]);

  const pendingLeaves = filteredLeaves.filter((leave) => leave.status === "pending").length;

  const employeeColumns: ColumnDef<Employee>[] = [
    {
      id: "employee",
      header: "Employee",
      cell: ({ row }) => {
        const employee = row.original;
        const department =
          employee.department_name ||
          (employee.department_id ? departmentNameById.get(employee.department_id) : null) ||
          "No department";

        return (
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-xs font-semibold">
              {employee.first_name.charAt(0)}{employee.last_name.charAt(0)}
            </div>
            <div>
              <div className="font-medium">{employeeName(employee)}</div>
              <div className="text-xs text-muted-foreground">
                {employee.employee_code} · {department}
              </div>
            </div>
          </div>
        );
      },
    },
    { accessorKey: "designation", header: "Designation" },
    { accessorKey: "phone", header: "Phone" },
    { accessorKey: "employment_type", header: "Employment Type" },
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
    {
      id: "employee",
      header: "Employee",
      cell: ({ row }) => {
        const employee = employeeById.get(row.original.employee_id);
        const department = employee?.department_id
          ? departmentNameById.get(employee.department_id) || "No department"
          : "No department";

        return (
          <div>
            <div className="font-medium">
              {row.original.employee_name || (employee ? employeeName(employee) : "-")}
            </div>
            <div className="text-xs text-muted-foreground">
              {employee?.employee_code ?? "-"} · {department}
            </div>
          </div>
        );
      },
    },
    { accessorKey: "attendance_date", header: "Date" },
    { accessorKey: "check_in", header: "Check In", cell: ({ row }) => row.original.check_in || "-" },
    { accessorKey: "check_out", header: "Check Out", cell: ({ row }) => row.original.check_out || "-" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <AttendanceStatusBadge status={row.original.status} />,
    },
  ];

  const leaveColumns: ColumnDef<LeaveRequest>[] = [
    {
      id: "employee",
      header: "Employee",
      cell: ({ row }) => {
        const employee = employeeById.get(row.original.employee_id);
        return (
          <div>
            <div className="font-medium">
              {row.original.employee_name || (employee ? employeeName(employee) : "-")}
            </div>
            <div className="text-xs text-muted-foreground">{employee?.employee_code ?? "-"}</div>
          </div>
        );
      },
    },
    { accessorKey: "leave_type", header: "Leave Type" },
    { accessorKey: "start_date", header: "Start" },
    { accessorKey: "end_date", header: "End" },
    { accessorKey: "days", header: "Days" },
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
      await updateEmployee.mutateAsync({ id: selectedEmployee.id, payload: values });
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

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <HrKpiCard title="Employees" value={filteredEmployees.length} description="Active HR master records" icon={Users} />
          <HrKpiCard title="Present" value={attendanceSummary.present} description="For selected date" icon={UserCheck} />
          <HrKpiCard title="Late" value={attendanceSummary.late} description="For selected date" icon={Clock3} />
          <HrKpiCard title="Absent / Half Day" value={`${attendanceSummary.absent}/${attendanceSummary.halfDay}`} description="For selected date" icon={CalendarX} />
          <HrKpiCard title="Pending Leave" value={pendingLeaves} description="Awaiting decision" icon={CalendarClock} />
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="grid gap-3 lg:grid-cols-[1fr_180px_220px_180px]">
            <input
              className="h-10 rounded-md border bg-background px-3 text-sm"
              placeholder="Search HR records by name, code, phone, department..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <input
              className="h-10 rounded-md border bg-background px-3 text-sm"
              type="date"
              value={selectedDate}
              onChange={(event) => setSelectedDate(event.target.value)}
            />
            <select
              className="h-10 rounded-md border bg-background px-3 text-sm"
              value={departmentFilter}
              onChange={(event) => setDepartmentFilter(event.target.value)}
            >
              <option value="all">All Departments</option>
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setSearch("");
                setSelectedDate(todayIso());
                setDepartmentFilter("all");
                setEmployeeStatusFilter("all");
                setAttendanceStatusFilter("all");
                setLeaveStatusFilter("all");
              }}
            >
              Reset Filters
            </Button>
          </div>
        </div>

        <Tabs defaultValue="employees" className="space-y-6">
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 rounded-xl bg-muted/40 p-2">
            <TabsTrigger value="employees" className="h-9 flex-none px-4">Employees</TabsTrigger>
            <TabsTrigger value="attendance" className="h-9 flex-none px-4">Attendance</TabsTrigger>
            <TabsTrigger value="leaves" className="h-9 flex-none px-4">Leave</TabsTrigger>
          </TabsList>

          <TabsContent value="employees" className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <select
                className="h-10 rounded-md border bg-background px-3 text-sm"
                value={employeeStatusFilter}
                onChange={(event) => setEmployeeStatusFilter(event.target.value as EmployeeStatus | "all")}
              >
                <option value="all">All Employee Statuses</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="on_leave">On Leave</option>
                <option value="terminated">Terminated</option>
              </select>

              <Button
                onClick={() => {
                  setSelectedEmployee(null);
                  setEmployeeFormOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Employee
              </Button>
            </div>

            <DataTable
              columns={employeeColumns}
              data={filteredEmployees}
              isLoading={employeesQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No employees found"
              emptyDescription="Create employees for HR, payroll, doctors, nurses, and staff."
            />
          </TabsContent>

          <TabsContent value="attendance" className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <select
                className="h-10 rounded-md border bg-background px-3 text-sm"
                value={attendanceStatusFilter}
                onChange={(event) => setAttendanceStatusFilter(event.target.value as AttendanceStatus | "all")}
              >
                <option value="all">All Attendance Statuses</option>
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="late">Late</option>
                <option value="half_day">Half Day</option>
              </select>

              <Button onClick={() => setAttendanceFormOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Record Attendance
              </Button>
            </div>

            <DataTable
              columns={attendanceColumns}
              data={filteredAttendance}
              isLoading={attendanceQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No attendance records found"
              emptyDescription="Attendance records will appear here."
            />
          </TabsContent>

          <TabsContent value="leaves" className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <select
                className="h-10 rounded-md border bg-background px-3 text-sm"
                value={leaveStatusFilter}
                onChange={(event) => setLeaveStatusFilter(event.target.value as LeaveStatus | "all")}
              >
                <option value="all">All Leave Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
                <option value="cancelled">Cancelled</option>
              </select>

              <Button onClick={() => setLeaveFormOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Leave Request
              </Button>
            </div>

            <DataTable
              columns={leaveColumns}
              data={filteredLeaves}
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
          size="xl"
        >
          <EmployeeForm
            defaultValues={selectedEmployee ? employeeToFormValues(selectedEmployee) : undefined}
            employeeCode={selectedEmployee?.employee_code}
            departments={departments}
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
          size="lg"
        >
          <AttendanceForm
            employees={employees}
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
          size="lg"
        >
          <LeaveForm
            employees={employees}
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
              ? `This will deactivate ${employeeName(deleteEmployee)}.`
              : "This employee will be deactivated."
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
