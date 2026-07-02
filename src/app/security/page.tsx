// src/app/security/page.tsx

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
  SectionCard,
} from "@/shared/components/enterprise";
import { AppShell } from "@/shared/components/layout/app-shell";

import { PasswordPolicyForm } from "@/features/security/components/password-policy-form";
import { PermissionMatrix } from "@/features/security/components/permission-matrix";
import { RoleForm } from "@/features/security/components/role-form";
import {
  SessionStatusBadge,
  UserStatusBadge,
} from "@/features/security/components/security-badges";
import { SecurityUserForm } from "@/features/security/components/security-user-form";

import {
  useCreateSecurityRole,
  useCreateSecurityUser,
  useDeleteSecurityRole,
  useDeleteSecurityUser,
  usePasswordPolicy,
  useRevokeSession,
  useRolePermissions,
  useSecurityAuditLogs,
  useSecurityPermissions,
  useSecurityRoles,
  useSecuritySessions,
  useSecurityUsers,
  useUpdatePasswordPolicy,
  useUpdateRolePermissions,
  useUpdateSecurityRole,
  useUpdateSecurityUser,
} from "@/features/security/api/security.queries";

import type {
  Permission,
  Role,
  SecurityAuditLog,
  SecurityUser,
  UserSession,
} from "@/features/security/types/security.types";
import type {
  PasswordPolicyFormValues,
  RoleFormValues,
  SecurityUserFormValues,
} from "@/features/security/schemas/security.schema";

function userToFormValues(user: SecurityUser): Partial<SecurityUserFormValues> {
  return {
    full_name: user.full_name,
    email: user.email,
    phone: user.phone ?? "",
    status: user.status,
    is_active: user.is_active,
    mfa_enabled: user.mfa_enabled ?? false,
  };
}

function roleToFormValues(role: Role): Partial<RoleFormValues> {
  return {
    name: role.name,
    code: role.code,
    description: role.description ?? "",
    is_active: role.is_active,
  };
}

export default function SecurityPage() {
  const [search, setSearch] = useState("");
  const [selectedRoleId, setSelectedRoleId] = useState("");

  const [userFormOpen, setUserFormOpen] = useState(false);
  const [roleFormOpen, setRoleFormOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<SecurityUser | null>(null);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const [deleteUser, setDeleteUser] = useState<SecurityUser | null>(null);
  const [deleteRole, setDeleteRole] = useState<Role | null>(null);

  const params = useMemo(
    () => ({
      page: 1,
      size: 100,
      search: search || undefined,
    }),
    [search]
  );

  const usersQuery = useSecurityUsers(params);
  const rolesQuery = useSecurityRoles(params);
  const permissionsQuery = useSecurityPermissions(params);
  const rolePermissionsQuery = useRolePermissions(selectedRoleId);
  const sessionsQuery = useSecuritySessions(params);
  const auditLogsQuery = useSecurityAuditLogs(params);
  const passwordPolicyQuery = usePasswordPolicy();

  const createUser = useCreateSecurityUser();
  const updateUser = useUpdateSecurityUser();
  const deleteUserMutation = useDeleteSecurityUser();

  const createRole = useCreateSecurityRole();
  const updateRole = useUpdateSecurityRole();
  const deleteRoleMutation = useDeleteSecurityRole();

  const updateRolePermissions = useUpdateRolePermissions();
  const revokeSession = useRevokeSession();
  const updatePasswordPolicy = useUpdatePasswordPolicy();

  const userColumns: ColumnDef<SecurityUser>[] = [
    { accessorKey: "full_name", header: "User" },
    { accessorKey: "email", header: "Email" },
    {
      accessorKey: "roles",
      header: "Roles",
      cell: ({ row }) => row.original.roles?.join(", ") || "-",
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <UserStatusBadge status={row.original.status} />,
    },
    {
      accessorKey: "mfa_enabled",
      header: "MFA",
      cell: ({ row }) => (row.original.mfa_enabled ? "Enabled" : "Disabled"),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <ActionMenu
          items={[
            {
              label: "Edit",
              onClick: () => {
                setSelectedUser(row.original);
                setUserFormOpen(true);
              },
            },
            {
              label: "Delete",
              danger: true,
              onClick: () => setDeleteUser(row.original),
            },
          ]}
        />
      ),
    },
  ];

  const roleColumns: ColumnDef<Role>[] = [
    { accessorKey: "name", header: "Role" },
    { accessorKey: "code", header: "Code" },
    {
      accessorKey: "is_active",
      header: "Active",
      cell: ({ row }) => (row.original.is_active ? "Yes" : "No"),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <ActionMenu
          items={[
            {
              label: "Select Permissions",
              onClick: () => setSelectedRoleId(row.original.id),
            },
            {
              label: "Edit",
              onClick: () => {
                setSelectedRole(row.original);
                setRoleFormOpen(true);
              },
            },
            {
              label: "Delete",
              danger: true,
              onClick: () => setDeleteRole(row.original),
            },
          ]}
        />
      ),
    },
  ];

  const permissionColumns: ColumnDef<Permission>[] = [
    { accessorKey: "module", header: "Module" },
    { accessorKey: "action", header: "Action" },
    { accessorKey: "code", header: "Code" },
    { accessorKey: "description", header: "Description" },
  ];

  const sessionColumns: ColumnDef<UserSession>[] = [
    { accessorKey: "user_name", header: "User" },
    { accessorKey: "ip_address", header: "IP" },
    { accessorKey: "last_seen_at", header: "Last Seen" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <SessionStatusBadge status={row.original.status} />,
    },
    {
      id: "actions",
      cell: ({ row }) =>
        row.original.status === "active" ? (
          <ActionMenu
            items={[
              {
                label: "Revoke",
                danger: true,
                onClick: () => revokeSession.mutate(row.original.id),
              },
            ]}
          />
        ) : null,
    },
  ];

  const auditColumns: ColumnDef<SecurityAuditLog>[] = [
    { accessorKey: "created_at", header: "Date" },
    { accessorKey: "actor_name", header: "Actor" },
    { accessorKey: "module", header: "Module" },
    { accessorKey: "action", header: "Action" },
    { accessorKey: "description", header: "Description" },
    { accessorKey: "ip_address", header: "IP" },
  ];

  async function handleUserSubmit(values: SecurityUserFormValues) {
    if (selectedUser) {
      await updateUser.mutateAsync({ id: selectedUser.id, payload: values });
    } else {
      await createUser.mutateAsync(values);
    }

    setUserFormOpen(false);
    setSelectedUser(null);
  }

  async function handleRoleSubmit(values: RoleFormValues) {
    if (selectedRole) {
      await updateRole.mutateAsync({ id: selectedRole.id, payload: values });
    } else {
      await createRole.mutateAsync(values);
    }

    setRoleFormOpen(false);
    setSelectedRole(null);
  }

  async function handlePolicySubmit(values: PasswordPolicyFormValues) {
    await updatePasswordPolicy.mutateAsync(values);
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Enterprise Security"
          description="Manage users, roles, permission matrix, sessions, audit logs, password policies, and MFA foundation."
        />

        <input
          className="h-10 w-full rounded-md border bg-background px-3 text-sm"
          placeholder="Search security records..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <Tabs defaultValue="users">
          <TabsList>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="roles">Roles & Permissions</TabsTrigger>
            <TabsTrigger value="permissions">Permission Catalog</TabsTrigger>
            <TabsTrigger value="sessions">Sessions</TabsTrigger>
            <TabsTrigger value="audit">Audit Logs</TabsTrigger>
            <TabsTrigger value="policy">Password Policy</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="mt-4 space-y-4">
            <Button
              onClick={() => {
                setSelectedUser(null);
                setUserFormOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>

            <DataTable
              columns={userColumns}
              data={usersQuery.data?.items ?? []}
              isLoading={usersQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No users found"
              emptyDescription="Create platform users and manage access."
            />
          </TabsContent>

          <TabsContent value="roles" className="mt-4 space-y-4">
            <Button
              onClick={() => {
                setSelectedRole(null);
                setRoleFormOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Role
            </Button>

            <DataTable
              columns={roleColumns}
              data={rolesQuery.data?.items ?? []}
              isLoading={rolesQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No roles found"
              emptyDescription="Create roles and configure permissions."
            />

            <PermissionMatrix
              roleId={selectedRoleId}
              permissions={permissionsQuery.data?.items ?? []}
              rolePermissions={rolePermissionsQuery.data ?? []}
              isSaving={updateRolePermissions.isPending}
              onSave={(permissionIds) => {
                if (!selectedRoleId) return;
                updateRolePermissions.mutate({
                  roleId: selectedRoleId,
                  permissionIds,
                });
              }}
            />
          </TabsContent>

          <TabsContent value="permissions" className="mt-4">
            <DataTable
              columns={permissionColumns}
              data={permissionsQuery.data?.items ?? []}
              isLoading={permissionsQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No permissions found"
              emptyDescription="Permission catalog will appear here."
            />
          </TabsContent>

          <TabsContent value="sessions" className="mt-4">
            <DataTable
              columns={sessionColumns}
              data={sessionsQuery.data?.items ?? []}
              isLoading={sessionsQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No sessions found"
              emptyDescription="Active and historical user sessions will appear here."
            />
          </TabsContent>

          <TabsContent value="audit" className="mt-4">
            <DataTable
              columns={auditColumns}
              data={auditLogsQuery.data?.items ?? []}
              isLoading={auditLogsQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No audit logs found"
              emptyDescription="Security audit events will appear here."
            />
          </TabsContent>

          <TabsContent value="policy" className="mt-4">
            <SectionCard
              title="Password Policy"
              description="Configure password complexity, expiry, and lockout rules."
            >
              <PasswordPolicyForm
                policy={passwordPolicyQuery.data}
                isSubmitting={updatePasswordPolicy.isPending}
                onSubmit={handlePolicySubmit}
              />
            </SectionCard>
          </TabsContent>
        </Tabs>

        <FormDrawer
          open={userFormOpen}
          onOpenChange={(open) => {
            setUserFormOpen(open);
            if (!open) setSelectedUser(null);
          }}
          title={selectedUser ? "Edit User" : "Add User"}
          description="Create or update platform user."
          size="md"
        >
          <SecurityUserForm
            defaultValues={selectedUser ? userToFormValues(selectedUser) : undefined}
            isSubmitting={createUser.isPending || updateUser.isPending}
            onSubmit={handleUserSubmit}
            onCancel={() => {
              setUserFormOpen(false);
              setSelectedUser(null);
            }}
          />
        </FormDrawer>

        <FormDrawer
          open={roleFormOpen}
          onOpenChange={(open) => {
            setRoleFormOpen(open);
            if (!open) setSelectedRole(null);
          }}
          title={selectedRole ? "Edit Role" : "Add Role"}
          description="Create or update role."
          size="md"
        >
          <RoleForm
            defaultValues={selectedRole ? roleToFormValues(selectedRole) : undefined}
            isSubmitting={createRole.isPending || updateRole.isPending}
            onSubmit={handleRoleSubmit}
            onCancel={() => {
              setRoleFormOpen(false);
              setSelectedRole(null);
            }}
          />
        </FormDrawer>

        <ConfirmDialog
          open={Boolean(deleteUser)}
          onOpenChange={() => setDeleteUser(null)}
          title="Delete user?"
          description={
            deleteUser
              ? `This will permanently delete ${deleteUser.full_name}.`
              : "This user will be deleted."
          }
          confirmText="Delete"
          danger
          isLoading={deleteUserMutation.isPending}
          onConfirm={async () => {
            if (!deleteUser) return;
            await deleteUserMutation.mutateAsync(deleteUser.id);
            setDeleteUser(null);
          }}
        />

        <ConfirmDialog
          open={Boolean(deleteRole)}
          onOpenChange={() => setDeleteRole(null)}
          title="Delete role?"
          description={
            deleteRole
              ? `This will permanently delete ${deleteRole.name}.`
              : "This role will be deleted."
          }
          confirmText="Delete"
          danger
          isLoading={deleteRoleMutation.isPending}
          onConfirm={async () => {
            if (!deleteRole) return;
            await deleteRoleMutation.mutateAsync(deleteRole.id);
            setDeleteRole(null);
          }}
        />
      </div>
    </AppShell>
  );
}