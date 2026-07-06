"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { KeyRound, Plus, ShieldCheck, UsersRound } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ActionMenu, ConfirmDialog, DataTable, FormDrawer } from "@/shared/components/enterprise";
import { adminService } from "../api/admin.service";
import type { AdminPermission, AdminRole, RoleFormPayload } from "../types/admin.types";

interface RolesTabProps { search: string; onSearchChange: (value: string) => void; }

function RoleForm({ permissions, defaultValues, isSubmitting, onSubmit, onCancel }: { permissions: AdminPermission[]; defaultValues?: Partial<RoleFormPayload>; isSubmitting?: boolean; onSubmit: (values: RoleFormPayload) => void; onCancel: () => void }) {
  const [values, setValues] = useState<RoleFormPayload>({ name: defaultValues?.name ?? "", description: defaultValues?.description ?? "", permission_ids: defaultValues?.permission_ids ?? [] });
  return <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onSubmit(values); }}>
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-sm font-bold text-blue-700">1</div><div><h3 className="font-semibold text-slate-950">Role Definition</h3><p className="text-sm text-slate-500">Define a reusable RBAC role for hospital users.</p></div></div>
      <div className="mt-5 grid gap-4">
        <label className="space-y-1.5 text-sm font-medium text-slate-800">Role Name<input className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-400" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} placeholder="Receptionist" required /></label>
        <label className="space-y-1.5 text-sm font-medium text-slate-800">Description<textarea className="min-h-24 w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-400" value={values.description ?? ""} onChange={(e) => setValues({ ...values, description: e.target.value })} placeholder="Role purpose and access scope" /></label>
      </div>
    </div>
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="font-semibold text-slate-950">Permission Assignment</h3><p className="mb-4 text-sm text-slate-500">Attach permissions to this role.</p>
      <div className="grid max-h-[360px] gap-3 overflow-auto pr-2 md:grid-cols-2">
        {permissions.map((permission) => <label key={permission.id} className="flex items-start gap-3 rounded-xl border border-slate-200 p-3 text-sm"><input className="mt-1" type="checkbox" checked={(values.permission_ids ?? []).includes(permission.id)} onChange={(e) => { const current = new Set(values.permission_ids ?? []); if (e.target.checked) current.add(permission.id); else current.delete(permission.id); setValues({ ...values, permission_ids: [...current] }); }} /><span><span className="font-semibold text-slate-900">{permission.name}</span><span className="block text-xs text-slate-500">{permission.description ?? "No description"}</span></span></label>)}
      </div>
    </div>
    <div className="sticky bottom-0 flex justify-end gap-3 border-t border-slate-200 bg-white/95 py-4"><Button type="button" variant="outline" onClick={onCancel}>Cancel</Button><Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save Role"}</Button></div>
  </form>;
}

export function RolesTab({ search, onSearchChange }: RolesTabProps) {
  const queryClient = useQueryClient();
  const [pageIndex, setPageIndex] = useState(0); const [pageSize, setPageSize] = useState(10); const [formOpen, setFormOpen] = useState(false); const [selectedRole, setSelectedRole] = useState<AdminRole | null>(null); const [deleteRole, setDeleteRole] = useState<AdminRole | null>(null);
  const params = useMemo(() => ({ page: pageIndex + 1, size: pageSize, search: search || undefined }), [pageIndex, pageSize, search]);
  const rolesQuery = useQuery({ queryKey: ["admin", "roles", params], queryFn: () => adminService.listRoles(params) });
  const permissionsQuery = useQuery({ queryKey: ["admin", "permissions", "role-form"], queryFn: () => adminService.listPermissions({ page: 1, size: 100 }) });
  const createRole = useMutation({ mutationFn: adminService.createRole, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "roles"] }) });
  const updateRole = useMutation({ mutationFn: ({ id, payload }: { id: string; payload: Partial<RoleFormPayload> }) => adminService.updateRole(id, payload), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "roles"] }) });
  const deleteRoleMutation = useMutation({ mutationFn: adminService.deleteRole, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "roles"] }) });
  const roles = rolesQuery.data?.items ?? []; const stats = { total: rolesQuery.data?.total ?? roles.length, withPermissions: roles.filter((r) => (r.permissions ?? []).length).length, permissions: new Set(roles.flatMap((r) => r.permissions ?? [])).size };
  const columns = useMemo<ColumnDef<AdminRole>[]>(() => [
    { accessorKey: "name", header: "Role", cell: ({ row }) => <div className="min-w-[220px]"><div className="font-semibold text-slate-950">{row.original.name}</div><div className="text-xs text-slate-500">{row.original.description ?? "No description"}</div></div> },
    { id: "permissions", header: "Permissions", cell: ({ row }) => <div className="flex min-w-[360px] flex-wrap gap-1">{(row.original.permissions ?? []).slice(0, 8).map((p: string) => <span key={p} className="rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">{p}</span>)}{(row.original.permissions?.length ?? 0) > 8 ? <span className="rounded-full bg-slate-100 px-2 py-1 text-xs font-semibold text-slate-600">+{(row.original.permissions?.length ?? 0) - 8}</span> : null}{!(row.original.permissions ?? []).length ? <span className="text-slate-400">No permissions</span> : null}</div> },
    { id: "actions", cell: ({ row }) => <ActionMenu items={[{ label: "Edit", onClick: () => { setSelectedRole(row.original); setFormOpen(true); } }, { label: "Delete", danger: true, onClick: () => setDeleteRole(row.original) }]} /> },
  ], []);
  return <div className="space-y-5">
    <div className="grid gap-4 md:grid-cols-3">{[["Roles", stats.total, ShieldCheck], ["Configured", stats.withPermissions, UsersRound], ["Unique Permissions", stats.permissions, KeyRound]].map(([label, value, Icon]) => { const I = Icon as typeof ShieldCheck; return <div key={String(label)} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex justify-between text-xs font-semibold uppercase text-slate-500"><span>{String(label)}</span><I className="h-4 w-4 text-blue-600" /></div><div className="mt-3 text-2xl font-bold text-slate-950">{String(value)}</div><div className="mt-1 text-xs text-slate-500">RBAC role catalogue</div></div>; })}</div>
    <DataTable columns={columns} data={roles} isLoading={rolesQuery.isLoading} search={search} onSearchChange={(value) => { setPageIndex(0); onSearchChange(value); }} searchPlaceholder="Search roles..." toolbarActions={<Button onClick={() => { setSelectedRole(null); setFormOpen(true); }}><Plus className="mr-2 h-4 w-4" />Add Role</Button>} pagination={{ pageIndex, pageSize, pageCount: rolesQuery.data?.pages, total: rolesQuery.data?.total }} onPaginationChange={(p) => { setPageIndex(p.pageIndex); setPageSize(p.pageSize); }} emptyTitle="No roles found" emptyDescription="Create RBAC roles before assigning users." />
    <FormDrawer open={formOpen} onOpenChange={(open) => { setFormOpen(open); if (!open) setSelectedRole(null); }} title={selectedRole ? "Edit Role" : "Add Role"} description="Configure role identity and permission assignments." size="xl"><RoleForm permissions={permissionsQuery.data?.items ?? []} defaultValues={selectedRole ? { name: selectedRole.name, description: selectedRole.description, permission_ids: permissionsQuery.data?.items.filter((p) => selectedRole.permissions?.includes(p.name)).map((p) => p.id) ?? [] } : undefined} isSubmitting={createRole.isPending || updateRole.isPending} onCancel={() => { setFormOpen(false); setSelectedRole(null); }} onSubmit={async (values) => { if (selectedRole) await updateRole.mutateAsync({ id: selectedRole.id, payload: values }); else await createRole.mutateAsync(values); setFormOpen(false); setSelectedRole(null); }} /></FormDrawer>
    <ConfirmDialog open={Boolean(deleteRole)} onOpenChange={() => setDeleteRole(null)} title="Delete role?" description="Verify no active users depend on this role before deletion." confirmText="Delete" danger isLoading={deleteRoleMutation.isPending} onConfirm={async () => { if (!deleteRole) return; await deleteRoleMutation.mutateAsync(deleteRole.id); setDeleteRole(null); }} />
  </div>;
}
