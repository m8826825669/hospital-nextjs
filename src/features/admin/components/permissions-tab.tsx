"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { KeyRound, LockKeyhole, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ActionMenu, ConfirmDialog, DataTable, FormDrawer } from "@/shared/components/enterprise";
import { adminService } from "../api/admin.service";
import type { AdminPermission, PermissionFormPayload } from "../types/admin.types";

interface PermissionsTabProps { search: string; onSearchChange: (value: string) => void; }

function PermissionForm({ defaultValues, isSubmitting, onSubmit, onCancel }: { defaultValues?: Partial<PermissionFormPayload>; isSubmitting?: boolean; onSubmit: (values: PermissionFormPayload) => void; onCancel: () => void }) {
  const [values, setValues] = useState<PermissionFormPayload>({ name: defaultValues?.name ?? "", description: defaultValues?.description ?? "" });
  return <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onSubmit(values); }}>
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start gap-3"><div className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-sm font-bold text-blue-700">1</div><div><h3 className="font-semibold text-slate-950">Permission Definition</h3><p className="text-sm text-slate-500">Define an atomic access permission used by RBAC roles.</p></div></div>
      <div className="mt-5 grid gap-4">
        <label className="space-y-1.5 text-sm font-medium text-slate-800">Permission Name<input className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-400" value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} placeholder="patient.create" required /></label>
        <label className="space-y-1.5 text-sm font-medium text-slate-800">Description<textarea className="min-h-28 w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-blue-400" value={values.description ?? ""} onChange={(e) => setValues({ ...values, description: e.target.value })} placeholder="Allows creating new patient records" /></label>
      </div>
    </div>
    <div className="rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900">Changing permission names may affect role checks in frontend and backend. Use stable names such as module.action.</div>
    <div className="sticky bottom-0 flex justify-end gap-3 border-t border-slate-200 bg-white/95 py-4"><Button type="button" variant="outline" onClick={onCancel}>Cancel</Button><Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save Permission"}</Button></div>
  </form>;
}

export function PermissionsTab({ search, onSearchChange }: PermissionsTabProps) {
  const queryClient = useQueryClient();
  const [pageIndex, setPageIndex] = useState(0); const [pageSize, setPageSize] = useState(10); const [formOpen, setFormOpen] = useState(false); const [selectedPermission, setSelectedPermission] = useState<AdminPermission | null>(null); const [deletePermission, setDeletePermission] = useState<AdminPermission | null>(null);
  const params = useMemo(() => ({ page: pageIndex + 1, size: pageSize, search: search || undefined }), [pageIndex, pageSize, search]);
  const permissionsQuery = useQuery({ queryKey: ["admin", "permissions", params], queryFn: () => adminService.listPermissions(params) });
  const createPermission = useMutation({ mutationFn: adminService.createPermission, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "permissions"] }) });
  const updatePermission = useMutation({ mutationFn: ({ id, payload }: { id: string; payload: Partial<PermissionFormPayload> }) => adminService.updatePermission(id, payload), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "permissions"] }) });
  const deletePermissionMutation = useMutation({ mutationFn: adminService.deletePermission, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "permissions"] }) });
  const permissions = permissionsQuery.data?.items ?? []; const modules = new Set(permissions.map((p) => p.name.split(".")[0]));
  const columns = useMemo<ColumnDef<AdminPermission>[]>(() => [
    { accessorKey: "name", header: "Permission", cell: ({ row }) => <div className="min-w-[260px]"><div className="font-mono text-sm font-semibold text-slate-950">{row.original.name}</div><div className="text-xs text-slate-500">{row.original.name.split(".")[0] ?? "core"}</div></div> },
    { accessorKey: "description", header: "Description", cell: ({ row }) => <div className="min-w-[360px] text-sm text-slate-600">{row.original.description ?? "No description"}</div> },
    { id: "actions", cell: ({ row }) => <ActionMenu items={[{ label: "Edit", onClick: () => { setSelectedPermission(row.original); setFormOpen(true); } }, { label: "Delete", danger: true, onClick: () => setDeletePermission(row.original) }]} /> },
  ], []);
  return <div className="space-y-5">
    <div className="grid gap-4 md:grid-cols-3">{[["Permissions", permissionsQuery.data?.total ?? permissions.length, KeyRound], ["Modules", modules.size, LockKeyhole], ["Current Page", permissions.length, KeyRound]].map(([label, value, Icon]) => { const I = Icon as typeof KeyRound; return <div key={String(label)} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex justify-between text-xs font-semibold uppercase text-slate-500"><span>{String(label)}</span><I className="h-4 w-4 text-blue-600" /></div><div className="mt-3 text-2xl font-bold text-slate-950">{String(value)}</div><div className="mt-1 text-xs text-slate-500">RBAC permission catalogue</div></div>; })}</div>
    <DataTable columns={columns} data={permissions} isLoading={permissionsQuery.isLoading} search={search} onSearchChange={(value) => { setPageIndex(0); onSearchChange(value); }} searchPlaceholder="Search permissions..." toolbarActions={<Button onClick={() => { setSelectedPermission(null); setFormOpen(true); }}><Plus className="mr-2 h-4 w-4" />Add Permission</Button>} pagination={{ pageIndex, pageSize, pageCount: permissionsQuery.data?.pages, total: permissionsQuery.data?.total }} onPaginationChange={(p) => { setPageIndex(p.pageIndex); setPageSize(p.pageSize); }} emptyTitle="No permissions found" emptyDescription="Create permission names used by RBAC role checks." />
    <FormDrawer open={formOpen} onOpenChange={(open) => { setFormOpen(open); if (!open) setSelectedPermission(null); }} title={selectedPermission ? "Edit Permission" : "Add Permission"} description="Configure permission name and description." size="lg"><PermissionForm defaultValues={selectedPermission ?? undefined} isSubmitting={createPermission.isPending || updatePermission.isPending} onCancel={() => { setFormOpen(false); setSelectedPermission(null); }} onSubmit={async (values) => { if (selectedPermission) await updatePermission.mutateAsync({ id: selectedPermission.id, payload: values }); else await createPermission.mutateAsync(values); setFormOpen(false); setSelectedPermission(null); }} /></FormDrawer>
    <ConfirmDialog open={Boolean(deletePermission)} onOpenChange={() => setDeletePermission(null)} title="Delete permission?" description="Verify no active role depends on this permission before deletion." confirmText="Delete" danger isLoading={deletePermissionMutation.isPending} onConfirm={async () => { if (!deletePermission) return; await deletePermissionMutation.mutateAsync(deletePermission.id); setDeletePermission(null); }} />
  </div>;
}
