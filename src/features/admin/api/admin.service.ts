// src/features/admin/api/admin.service.ts

import { apiClient } from "@/platform/api/api-client";
import type { ApiListResponse } from "@/platform/api/api.types";
import type {
  AdminListParams,
  Bed,
  Department,
  HospitalSetting,
  Ward,
  AdminDoctor,
  AdminUser,
  AdminRole,
  AdminPermission,
  DoctorFormPayload,
  UserFormPayload,
  RoleFormPayload,
  PermissionFormPayload,
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

function toBackendListParams(params: AdminListParams) {
  return {
    page: params.page,
    page_size: params.size,
    search: params.search,
    is_active: params.is_active,
  };
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
      { params: toBackendListParams(params) }
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
      { params: toBackendListParams(params) }
    );
    return response.data;
  },

  async createWard(payload: WardFormValues): Promise<Ward> {
    const response = await apiClient.post<Ward>("/admin/wards", {
      name: payload.name,
      ward_type: payload.ward_type,
      floor: payload.floor || null,
      active: payload.active,
    });
    return response.data;
  },

  async updateWard(id: string, payload: WardFormValues): Promise<Ward> {
    const response = await apiClient.patch<Ward>(`/admin/wards/${id}`, {
      name: payload.name,
      ward_type: payload.ward_type,
      floor: payload.floor || null,
      active: payload.active,
    });
    return response.data;
  },

  async deleteWard(id: string): Promise<void> {
    await apiClient.delete(`/admin/wards/${id}`);
  },

  async listBeds(params: AdminListParams): Promise<ApiListResponse<Bed>> {
    const response = await apiClient.get<ApiListResponse<Bed>>("/admin/beds", {
      params: toBackendListParams(params),
    });
    return response.data;
  },

  async createBed(payload: BedFormValues): Promise<Bed> {
    const response = await apiClient.post<Bed>("/admin/beds", {
      ward_id: payload.ward_id,
      bed_number: payload.bed_number,
      bed_type: payload.bed_type,
      status: payload.status,
      active: payload.active,
    });
    return response.data;
  },

  async updateBed(id: string, payload: BedFormValues): Promise<Bed> {
    const response = await apiClient.patch<Bed>(`/admin/beds/${id}`, {
      ward_id: payload.ward_id,
      bed_number: payload.bed_number,
      bed_type: payload.bed_type,
      status: payload.status,
      active: payload.active,
    });
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


  async listAdminDoctors(params: AdminListParams): Promise<ApiListResponse<AdminDoctor>> {
    const response = await apiClient.get<ApiListResponse<AdminDoctor>>(
      "/admin/doctors",
      { params: toBackendListParams(params) }
    );
    return response.data;
  },

  async createAdminDoctor(payload: DoctorFormPayload): Promise<AdminDoctor> {
    const response = await apiClient.post<AdminDoctor>("/admin/doctors", payload);
    return response.data;
  },

  async updateAdminDoctor(id: string, payload: Partial<DoctorFormPayload>): Promise<AdminDoctor> {
    const response = await apiClient.patch<AdminDoctor>(`/admin/doctors/${id}`, payload);
    return response.data;
  },

  async deleteAdminDoctor(id: string): Promise<void> {
    await apiClient.delete(`/admin/doctors/${id}`);
  },

  async listUsers(params: AdminListParams): Promise<ApiListResponse<AdminUser>> {
    const response = await apiClient.get<ApiListResponse<AdminUser>>(
      "/admin/users",
      { params: toBackendListParams(params) }
    );
    return response.data;
  },

  async createUser(payload: UserFormPayload): Promise<AdminUser> {
    const response = await apiClient.post<AdminUser>("/admin/users", payload);
    return response.data;
  },

  async updateUser(id: string, payload: Partial<UserFormPayload>): Promise<AdminUser> {
    const response = await apiClient.patch<AdminUser>(`/admin/users/${id}`, payload);
    return response.data;
  },

  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/admin/users/${id}`);
  },

  async listRoles(params: AdminListParams): Promise<ApiListResponse<AdminRole>> {
    const response = await apiClient.get<ApiListResponse<AdminRole>>(
      "/admin/roles",
      { params: toBackendListParams(params) }
    );
    return response.data;
  },

  async createRole(payload: RoleFormPayload): Promise<AdminRole> {
    const response = await apiClient.post<AdminRole>("/admin/roles", payload);
    return response.data;
  },

  async updateRole(id: string, payload: Partial<RoleFormPayload>): Promise<AdminRole> {
    const response = await apiClient.patch<AdminRole>(`/admin/roles/${id}`, payload);
    return response.data;
  },

  async deleteRole(id: string): Promise<void> {
    await apiClient.delete(`/admin/roles/${id}`);
  },

  async listPermissions(params: AdminListParams): Promise<ApiListResponse<AdminPermission>> {
    const response = await apiClient.get<ApiListResponse<AdminPermission>>(
      "/admin/permissions",
      { params: toBackendListParams(params) }
    );
    return response.data;
  },

  async createPermission(payload: PermissionFormPayload): Promise<AdminPermission> {
    const response = await apiClient.post<AdminPermission>("/admin/permissions", payload);
    return response.data;
  },

  async updatePermission(id: string, payload: Partial<PermissionFormPayload>): Promise<AdminPermission> {
    const response = await apiClient.patch<AdminPermission>(`/admin/permissions/${id}`, payload);
    return response.data;
  },

  async deletePermission(id: string): Promise<void> {
    await apiClient.delete(`/admin/permissions/${id}`);
  },

  async getDoctors(params: AdminListParams): Promise<ApiListResponse<DoctorPayload>> {
    const response = await apiClient.get<ApiListResponse<DoctorPayload>>(
      "/admin/doctors",
      { params: toBackendListParams(params) }
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
