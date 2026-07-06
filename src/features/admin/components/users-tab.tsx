"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { Mail, Plus, ShieldCheck, UserRoundCog, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ActionMenu, ConfirmDialog, DataTable, FormDrawer } from "@/shared/components/enterprise";
import { adminService } from "../api/admin.service";
import type { AdminRole, AdminUser, UserFormPayload } from "../types/admin.types";

interface UsersTabProps { search: string; onSearchChange: (value: string) => void; }

function UserForm({ roles, defaultValues, isSubmitting, onSubmit, onCancel }: { roles: AdminRole[]; defaultValues?: Partial<UserFormPayload>; isSubmitting?: boolean; onSubmit: (values: UserFormPayload) => void; onCancel: () => void }) {
  const [values, setValues] = useState<UserFormPayload>({ first_name: defaultValues?.first_name ?? "", last_name: defaultValues?.last_name ?? "", email: defaultValues?.email ?? "", password: defaultValues?.password ?? "ChangeMe@123", active: defaultValues?.active ?? true, role_ids: defaultValues?.role_ids ?? [] });
  return <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onSubmit(values); }}>
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-sm font-bold text-blue-700">1</div><div><h3 className="font-semibold text-slate-950">User Identity</h3><p className="text-sm text-slate-500">Create a login account for hospital staff and administrators.</p></div></div>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        <label className="space-y-1.5 text-sm font-medium text-slate-800">First Name<input className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-400" value={values.first_name} onChange={(e) => setValues({ ...values, first_name: e.target.value })} required /></label>
        <label className="space-y-1.5 text-sm font-medium text-slate-800">Last Name<input className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-400" value={values.last_name} onChange={(e) => setValues({ ...values, last_name: e.target.value })} required /></label>
        <label className="space-y-1.5 text-sm font-medium text-slate-800 md:col-span-2">Email<input type="email" className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-400" value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} required /></label>
        <label className="space-y-1.5 text-sm font-medium text-slate-800 md:col-span-2">Temporary Password<input className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-400" value={values.password ?? ""} onChange={(e) => setValues({ ...values, password: e.target.value })} placeholder="ChangeMe@123" /></label>
      </div>
    </div>
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <h3 className="font-semibold text-slate-950">Role Assignment</h3><p className="mb-4 text-sm text-slate-500">Assign one or more RBAC roles.</p>
      <div className="grid gap-3 md:grid-cols-2">
        {roles.map((role) => <label key={role.id} className="flex items-center gap-3 rounded-xl border border-slate-200 p-3 text-sm"><input type="checkbox" checked={(values.role_ids ?? []).includes(role.id)} onChange={(e) => { const current = new Set(values.role_ids ?? []); if (e.target.checked) current.add(role.id); else current.delete(role.id); setValues({ ...values, role_ids: [...current] }); }} /> <span className="font-medium">{role.name}</span></label>)}
      </div>
      <label className="mt-4 flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-sm font-medium"><input type="checkbox" checked={values.active ?? true} onChange={(e) => setValues({ ...values, active: e.target.checked })} /> User account is active</label>
    </div>
    <div className="sticky bottom-0 flex justify-end gap-3 border-t border-slate-200 bg-white/95 py-4"><Button type="button" variant="outline" onClick={onCancel}>Cancel</Button><Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save User"}</Button></div>
  </form>;
}

export function UsersTab({ search, onSearchChange }: UsersTabProps) {
  const queryClient = useQueryClient();
  const [pageIndex, setPageIndex] = useState(0); const [pageSize, setPageSize] = useState(10); const [formOpen, setFormOpen] = useState(false); const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null); const [deleteUser, setDeleteUser] = useState<AdminUser | null>(null);
  const params = useMemo(() => ({ page: pageIndex + 1, size: pageSize, search: search || undefined }), [pageIndex, pageSize, search]);
  const usersQuery = useQuery({ queryKey: ["admin", "users", params], queryFn: () => adminService.listUsers(params) });
  const rolesQuery = useQuery({ queryKey: ["admin", "roles", "user-form"], queryFn: () => adminService.listRoles({ page: 1, size: 100 }) });
  const createUser = useMutation({ mutationFn: adminService.createUser, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "users"] }) });
  const updateUser = useMutation({ mutationFn: ({ id, payload }: { id: string; payload: Partial<UserFormPayload> }) => adminService.updateUser(id, payload), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "users"] }) });
  const deleteUserMutation = useMutation({ mutationFn: adminService.deleteUser, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "users"] }) });
  const users = usersQuery.data?.items ?? []; const stats = { total: usersQuery.data?.total ?? users.length, active: users.filter((u) => u.active).length, inactive: users.filter((u) => !u.active).length, roles: new Set(users.flatMap((u) => u.roles ?? [])).size };
  const columns = useMemo<ColumnDef<AdminUser>[]>(() => [
    { id: "user", header: "User", cell: ({ row }) => <div className="flex min-w-[260px] items-center gap-3"><div className="flex h-10 w-10 items-center justify-center rounded-xl border border-blue-100 bg-blue-50 text-sm font-bold text-blue-700">{row.original.first_name?.[0]}{row.original.last_name?.[0]}</div><div><div className="font-semibold text-slate-950">{row.original.first_name} {row.original.last_name}</div><div className="text-xs text-slate-500">{row.original.id.slice(0, 8)}</div></div></div> },
    { id: "email", header: "Email", cell: ({ row }) => <div className="flex min-w-[240px] items-center gap-2 text-sm"><Mail className="h-4 w-4 text-slate-400" />{row.original.email}</div> },
    { id: "roles", header: "Roles", cell: ({ row }) => <div className="flex min-w-[220px] flex-wrap gap-1">{(row.original.roles ?? []).length ? row.original.roles?.map((role: string) => <span key={role} className="rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-700">{role}</span>) : <span className="text-slate-400">No role</span>}</div> },
    { id: "status", header: "Status", cell: ({ row }) => <span className={row.original.active ? "rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700" : "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500"}>{row.original.active ? "ACTIVE" : "INACTIVE"}</span> },
    { id: "actions", cell: ({ row }) => <ActionMenu items={[{ label: "Edit", onClick: () => { setSelectedUser(row.original); setFormOpen(true); } }, { label: "Delete", danger: true, onClick: () => setDeleteUser(row.original) }]} /> },
  ], []);
  return <div className="space-y-5">
    <div className="grid gap-4 md:grid-cols-4">{[["Users", stats.total, Users], ["Active", stats.active, UserRoundCog], ["Roles Used", stats.roles, ShieldCheck], ["Inactive", stats.inactive, Users]].map(([label, value, Icon]) => { const I = Icon as typeof Users; return <div key={String(label)} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex justify-between text-xs font-semibold uppercase text-slate-500"><span>{String(label)}</span><I className="h-4 w-4 text-blue-600" /></div><div className="mt-3 text-2xl font-bold text-slate-950">{String(value)}</div><div className="mt-1 text-xs text-slate-500">Access management</div></div>; })}</div>
    <DataTable columns={columns} data={users} isLoading={usersQuery.isLoading} search={search} onSearchChange={(value) => { setPageIndex(0); onSearchChange(value); }} searchPlaceholder="Search users by name, email, role..." toolbarActions={<Button onClick={() => { setSelectedUser(null); setFormOpen(true); }}><Plus className="mr-2 h-4 w-4" />Add User</Button>} pagination={{ pageIndex, pageSize, pageCount: usersQuery.data?.pages, total: usersQuery.data?.total }} onPaginationChange={(p) => { setPageIndex(p.pageIndex); setPageSize(p.pageSize); }} emptyTitle="No users found" emptyDescription="Create user accounts for admins, doctors, reception, HR, finance, nursing, and support staff." />
    <FormDrawer open={formOpen} onOpenChange={(open) => { setFormOpen(open); if (!open) setSelectedUser(null); }} title={selectedUser ? "Edit User" : "Add User"} description="Create or update account identity and RBAC roles." size="xl"><UserForm roles={rolesQuery.data?.items ?? []} defaultValues={selectedUser ? { first_name: selectedUser.first_name, last_name: selectedUser.last_name, email: selectedUser.email, active: selectedUser.active } : undefined} isSubmitting={createUser.isPending || updateUser.isPending} onCancel={() => { setFormOpen(false); setSelectedUser(null); }} onSubmit={async (values) => { if (selectedUser) await updateUser.mutateAsync({ id: selectedUser.id, payload: values }); else await createUser.mutateAsync(values); setFormOpen(false); setSelectedUser(null); }} /></FormDrawer>
    <ConfirmDialog open={Boolean(deleteUser)} onOpenChange={() => setDeleteUser(null)} title="Delete user?" description="This disables access data and should only be done after checking role assignments and active sessions." confirmText="Delete" danger isLoading={deleteUserMutation.isPending} onConfirm={async () => { if (!deleteUser) return; await deleteUserMutation.mutateAsync(deleteUser.id); setDeleteUser(null); }} />
  </div>;
}
