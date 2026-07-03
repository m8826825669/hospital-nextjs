// src/features/hr/api/hr.service.ts

import { apiClient } from "@/platform/api/api-client";
import type { ApiListResponse } from "@/platform/api/api.types";
import type {
  AttendanceRecord,
  Employee,
  HrListParams,
  LeaveRequest,
  LeaveStatus,
} from "../types/hr.types";
import type {
  AttendanceFormValues,
  EmployeeFormValues,
  LeaveFormValues,
} from "../schemas/hr.schema";

export const hrService = {
  async listEmployees(params: HrListParams): Promise<ApiListResponse<Employee>> {
    const response = await apiClient.get<ApiListResponse<Employee>>("/hr/employees", { params });
    return response.data;
  },

  async createEmployee(payload: EmployeeFormValues): Promise<Employee> {
    const response = await apiClient.post<Employee>("/hr/employees", payload);
    return response.data;
  },

  async updateEmployee(id: string, payload: EmployeeFormValues): Promise<Employee> {
    const response = await apiClient.put<Employee>(`/hr/employees/${id}`, payload);
    return response.data;
  },

  async deleteEmployee(id: string): Promise<void> {
    await apiClient.delete(`/hr/employees/${id}`);
  },

  async listAttendance(params: HrListParams): Promise<ApiListResponse<AttendanceRecord>> {
    const response = await apiClient.get<ApiListResponse<AttendanceRecord>>("/hr/attendance", { params });
    return response.data;
  },

  async createAttendance(payload: AttendanceFormValues): Promise<AttendanceRecord> {
    const response = await apiClient.post<AttendanceRecord>("/hr/attendance", payload);
    return response.data;
  },

  async listLeaves(params: HrListParams): Promise<ApiListResponse<LeaveRequest>> {
    const response = await apiClient.get<ApiListResponse<LeaveRequest>>("/hr/leave-requests", { params });
    return response.data;
  },

  async createLeave(payload: LeaveFormValues): Promise<LeaveRequest> {
    const response = await apiClient.post<LeaveRequest>("/hr/leave-requests", payload);
    return response.data;
  },

  async updateLeaveStatus(id: string, status: LeaveStatus): Promise<LeaveRequest> {
    const response = await apiClient.patch<LeaveRequest>(`/hr/leave-requests/${id}/decision`, { status });
    return response.data;
  },
};
