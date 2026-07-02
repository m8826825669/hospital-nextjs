// src/features/hr/api/hr.queries.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/platform/api/query-keys";
import { getApiErrorMessage } from "@/platform/api/api-error";
import { hrService } from "./hr.service";

import type { HrListParams, LeaveStatus } from "../types/hr.types";
import type {
  AttendanceFormValues,
  EmployeeFormValues,
  LeaveFormValues,
} from "../schemas/hr.schema";

export function useEmployees(params: HrListParams) {
  return useQuery({
    queryKey: queryKeys.hr.employees.list(params),
    queryFn: () => hrService.listEmployees(params),
  });
}

export function useCreateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: EmployeeFormValues) => hrService.createEmployee(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.hr.employees.all });
      toast.success("Employee created");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: EmployeeFormValues }) =>
      hrService.updateEmployee(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.hr.employees.all });
      toast.success("Employee updated");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => hrService.deleteEmployee(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.hr.employees.all });
      toast.success("Employee deleted");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useAttendance(params: HrListParams) {
  return useQuery({
    queryKey: queryKeys.hr.attendance.list(params),
    queryFn: () => hrService.listAttendance(params),
  });
}

export function useCreateAttendance() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: AttendanceFormValues) =>
      hrService.createAttendance(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.hr.attendance.all });
      toast.success("Attendance recorded");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useLeaves(params: HrListParams) {
  return useQuery({
    queryKey: queryKeys.hr.leaves.list(params),
    queryFn: () => hrService.listLeaves(params),
  });
}

export function useCreateLeave() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LeaveFormValues) => hrService.createLeave(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.hr.leaves.all });
      toast.success("Leave request created");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useUpdateLeaveStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: LeaveStatus }) =>
      hrService.updateLeaveStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.hr.leaves.all });
      toast.success("Leave status updated");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}