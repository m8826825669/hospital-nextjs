// src/features/security/api/security.service.ts

import { apiClient } from "@/platform/api/api-client";
import type { ApiListResponse } from "@/platform/api/api.types";
import type {
  Permission,
  Role,
  RolePermission,
  SecurityAuditLog,
  SecurityListParams,
  SecurityUser,
  UserSession,
} from "../types/security.types";
import type {
  PasswordPolicyFormValues,
  RoleFormValues,
  SecurityUserFormValues,
} from "../schemas/security.schema";

export const securityService = {
  async listUsers(
    params: SecurityListParams
  ): Promise<ApiListResponse<SecurityUser>> {
    const response = await apiClient.get<ApiListResponse<SecurityUser>>(
      "/security/users",
      { params }
    );
    return response.data;
  },

  async createUser(payload: SecurityUserFormValues): Promise<SecurityUser> {
    const response = await apiClient.post<SecurityUser>(
      "/security/users",
      payload
    );
    return response.data;
  },

  async updateUser(
    id: string,
    payload: SecurityUserFormValues
  ): Promise<SecurityUser> {
    const response = await apiClient.patch<SecurityUser>(
      `/security/users/${id}`,
      payload
    );
    return response.data;
  },

  async deleteUser(id: string): Promise<void> {
    await apiClient.delete(`/security/users/${id}`);
  },

  async listRoles(params: SecurityListParams): Promise<ApiListResponse<Role>> {
    const response = await apiClient.get<ApiListResponse<Role>>(
      "/security/roles",
      { params }
    );
    return response.data;
  },

  async createRole(payload: RoleFormValues): Promise<Role> {
    const response = await apiClient.post<Role>("/security/roles", payload);
    return response.data;
  },

  async updateRole(id: string, payload: RoleFormValues): Promise<Role> {
    const response = await apiClient.patch<Role>(
      `/security/roles/${id}`,
      payload
    );
    return response.data;
  },

  async deleteRole(id: string): Promise<void> {
    await apiClient.delete(`/security/roles/${id}`);
  },

  async listPermissions(
    params: SecurityListParams
  ): Promise<ApiListResponse<Permission>> {
    const response = await apiClient.get<ApiListResponse<Permission>>(
      "/security/permissions",
      { params }
    );
    return response.data;
  },

  async getRolePermissions(roleId: string): Promise<RolePermission[]> {
    const response = await apiClient.get<RolePermission[]>(
      `/security/roles/${roleId}/permissions`
    );
    return response.data;
  },

  async updateRolePermissions(
    roleId: string,
    permissionIds: string[]
  ): Promise<void> {
    await apiClient.put(`/security/roles/${roleId}/permissions`, {
      permission_ids: permissionIds,
    });
  },

  async listSessions(
    params: SecurityListParams
  ): Promise<ApiListResponse<UserSession>> {
    const response = await apiClient.get<ApiListResponse<UserSession>>(
      "/security/sessions",
      { params }
    );
    return response.data;
  },

  async revokeSession(id: string): Promise<void> {
    await apiClient.patch(`/security/sessions/${id}/revoke`);
  },

  async listAuditLogs(
    params: SecurityListParams
  ): Promise<ApiListResponse<SecurityAuditLog>> {
    const response = await apiClient.get<ApiListResponse<SecurityAuditLog>>(
      "/security/audit-logs",
      { params }
    );
    return response.data;
  },

  async getPasswordPolicy(): Promise<PasswordPolicyFormValues> {
    const response = await apiClient.get<PasswordPolicyFormValues>(
      "/security/password-policy"
    );
    return response.data;
  },

  async updatePasswordPolicy(
    payload: PasswordPolicyFormValues
  ): Promise<PasswordPolicyFormValues> {
    const response = await apiClient.patch<PasswordPolicyFormValues>(
      "/security/password-policy",
      payload
    );
    return response.data;
  },
};