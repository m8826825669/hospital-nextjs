// src/features/security/api/security.queries.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/platform/api/query-keys";
import { getApiErrorMessage } from "@/platform/api/api-error";
import { securityService } from "./security.service";
import type { SecurityListParams } from "../types/security.types";
import type {
  PasswordPolicyFormValues,
  RoleFormValues,
  SecurityUserFormValues,
} from "../schemas/security.schema";

export function useSecurityUsers(params: SecurityListParams) {
  return useQuery({
    queryKey: queryKeys.security.users.list(params),
    queryFn: () => securityService.listUsers(params),
  });
}

export function useCreateSecurityUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: SecurityUserFormValues) =>
      securityService.createUser(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.security.users.all });
      toast.success("User created");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useUpdateSecurityUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: SecurityUserFormValues }) =>
      securityService.updateUser(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.security.users.all });
      toast.success("User updated");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useDeleteSecurityUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => securityService.deleteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.security.users.all });
      toast.success("User deleted");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useSecurityRoles(params: SecurityListParams) {
  return useQuery({
    queryKey: queryKeys.security.roles.list(params),
    queryFn: () => securityService.listRoles(params),
  });
}

export function useCreateSecurityRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RoleFormValues) => securityService.createRole(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.security.roles.all });
      toast.success("Role created");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useUpdateSecurityRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: RoleFormValues }) =>
      securityService.updateRole(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.security.roles.all });
      toast.success("Role updated");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useDeleteSecurityRole() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => securityService.deleteRole(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.security.roles.all });
      toast.success("Role deleted");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useSecurityPermissions(params: SecurityListParams) {
  return useQuery({
    queryKey: queryKeys.security.permissions.list(params),
    queryFn: () => securityService.listPermissions(params),
  });
}

export function useRolePermissions(roleId?: string) {
  return useQuery({
    queryKey: roleId
      ? queryKeys.security.permissions.roleMatrix(roleId)
      : ["security", "role-permissions", "empty"],
    queryFn: () => securityService.getRolePermissions(roleId!),
    enabled: Boolean(roleId),
  });
}

export function useUpdateRolePermissions() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      roleId,
      permissionIds,
    }: {
      roleId: string;
      permissionIds: string[];
    }) => securityService.updateRolePermissions(roleId, permissionIds),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.security.permissions.roleMatrix(variables.roleId),
      });
      toast.success("Role permissions updated");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useSecuritySessions(params: SecurityListParams) {
  return useQuery({
    queryKey: queryKeys.security.sessions.list(params),
    queryFn: () => securityService.listSessions(params),
  });
}

export function useRevokeSession() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => securityService.revokeSession(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.security.sessions.all });
      toast.success("Session revoked");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useSecurityAuditLogs(params: SecurityListParams) {
  return useQuery({
    queryKey: queryKeys.security.audit.list(params),
    queryFn: () => securityService.listAuditLogs(params),
  });
}

export function usePasswordPolicy() {
  return useQuery({
    queryKey: queryKeys.security.passwordPolicy,
    queryFn: () => securityService.getPasswordPolicy(),
  });
}

export function useUpdatePasswordPolicy() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: PasswordPolicyFormValues) =>
      securityService.updatePasswordPolicy(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.security.passwordPolicy,
      });
      toast.success("Password policy updated");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}