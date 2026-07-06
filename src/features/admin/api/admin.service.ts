// src/features/admin/api/admin.service.ts

import { apiClient } from "@/platform/api/api-client";
import type { ApiListResponse } from "@/platform/api/api.types";
import type {
  AdminListParams,
  Bed,
  Department,
  HospitalSetting,
  Ward,
} from "../types/admin.types";
import type {
  BedFormValues,
  DepartmentFormValues,
  HospitalSettingFormValues,
  WardFormValues,
} from "../schemas/admin.schema";

export interface ListParams {
  page?: number;
  size?: number;
  search?: string;
}

export interface DepartmentPayload {
  name: string;
  code: string;
  description?: string | null;
  active?: boolean;
}


export interface DemoDataResponse {
  message: string;
  default_password?: string;
  counts: {
    departments: number;
    wards: number;
    beds: number;
    employees: number;
    doctors: number;
    roles: number;
    permissions: number;
    users: number;
  };
}

export interface DoctorPayload {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string | null;
  department_id: string;
  specialization?: string | null;
  consultation_fee?: number | null;
  active?: boolean;
}

export const adminService = {
  async listDepartments(
    params: AdminListParams
  ): Promise<ApiListResponse<Department>> {
    const response = await apiClient.get<ApiListResponse<Department>>(
      "/admin/departments",
      { params }
    );
    return response.data;
  },

  async createDepartment(payload: DepartmentFormValues): Promise<Department> {
    const response = await apiClient.post<Department>(
      "/admin/departments",
      payload
    );
    return response.data;
  },

  async updateDepartment(
    id: string,
    payload: DepartmentFormValues
  ): Promise<Department> {
    const response = await apiClient.patch<Department>(
      `/admin/departments/${id}`,
      payload
    );
    return response.data;
  },

  async deleteDepartment(id: string): Promise<void> {
    await apiClient.delete(`/admin/departments/${id}`);
  },

  async listWards(params: AdminListParams): Promise<ApiListResponse<Ward>> {
    const response = await apiClient.get<ApiListResponse<Ward>>(
      "/admin/wards",
      { params }
    );
    return response.data;
  },

  async createWard(payload: WardFormValues): Promise<Ward> {
    const response = await apiClient.post<Ward>("/admin/wards", payload);
    return response.data;
  },

  async updateWard(id: string, payload: WardFormValues): Promise<Ward> {
    const response = await apiClient.patch<Ward>(`/admin/wards/${id}`, payload);
    return response.data;
  },

  async deleteWard(id: string): Promise<void> {
    await apiClient.delete(`/admin/wards/${id}`);
  },

  async listBeds(params: AdminListParams): Promise<ApiListResponse<Bed>> {
    const response = await apiClient.get<ApiListResponse<Bed>>("/admin/beds", {
      params,
    });
    return response.data;
  },

  async createBed(payload: BedFormValues): Promise<Bed> {
    const response = await apiClient.post<Bed>("/admin/beds", payload);
    return response.data;
  },

  async updateBed(id: string, payload: BedFormValues): Promise<Bed> {
    const response = await apiClient.patch<Bed>(`/admin/beds/${id}`, payload);
    return response.data;
  },

  async deleteBed(id: string): Promise<void> {
    await apiClient.delete(`/admin/beds/${id}`);
  },

  async getSettings(): Promise<HospitalSetting> {
    const response = await apiClient.get<HospitalSetting>("/admin/settings");
    return response.data;
  },

  async updateSettings(
    payload: HospitalSettingFormValues
  ): Promise<HospitalSetting> {
    const response = await apiClient.patch<HospitalSetting>(
      "/admin/settings",
      payload
    );
    return response.data;
  },
  async generateDemoData(): Promise<DemoDataResponse> {
    const response = await apiClient.post<DemoDataResponse>(
      "/admin/demo-data"
    );
    return response.data;
  },

  async getDoctors(params: AdminListParams): Promise<ApiListResponse<DoctorPayload>> {
    const response = await apiClient.get<ApiListResponse<DoctorPayload>>(
      "/admin/doctors",
      { params }
    );
    return response.data;
  },
  async createDoctor(payload: DoctorPayload): Promise<DoctorPayload> {
    const response = await apiClient.post<DoctorPayload>(
      "/admin/doctors",
      payload
    );
    return response.data;
  },
  async updateDoctor(
    id: string,
    payload: DoctorPayload
  ): Promise<DoctorPayload> {
    const response = await apiClient.patch<DoctorPayload>(
      `/admin/doctors/${id}`,
      payload
    );
    return response.data;
  },
  async deleteDoctor(id: string): Promise<void> {
    await apiClient.delete(`/admin/doctors/${id}`);
  },
};
