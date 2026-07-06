"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import type { ColumnDef } from "@tanstack/react-table";
import { BadgeCheck, ClipboardPlus, GraduationCap, Mail, Plus, Stethoscope } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ActionMenu, ConfirmDialog, DataTable, FormDrawer } from "@/shared/components/enterprise";
import { adminService } from "../api/admin.service";
import type { AdminDoctor, AdminUser, DoctorFormPayload } from "../types/admin.types";

interface DoctorsTabProps { search: string; onSearchChange: (value: string) => void; }

function DoctorForm({ users, defaultValues, isSubmitting, onSubmit, onCancel }: {
  users: AdminUser[];
  defaultValues?: Partial<DoctorFormPayload>;
  isSubmitting?: boolean;
  onSubmit: (values: DoctorFormPayload) => void;
  onCancel: () => void;
}) {
  const [values, setValues] = useState<DoctorFormPayload>({
    user_id: defaultValues?.user_id ?? "",
    registration_number: defaultValues?.registration_number ?? "",
    specialization: defaultValues?.specialization ?? "",
    qualification: defaultValues?.qualification ?? "",
    consultation_fee: defaultValues?.consultation_fee ?? 500,
    active: defaultValues?.active ?? true,
  });

  function update<K extends keyof DoctorFormPayload>(key: K, value: DoctorFormPayload[K]) {
    setValues((current: DoctorFormPayload) => ({ ...current, [key]: value }));
  }

  return (
    <form className="space-y-6" onSubmit={(event) => { event.preventDefault(); onSubmit(values); }}>
      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-start gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border border-blue-200 bg-blue-50 text-sm font-bold text-blue-700">1</div>
          <div>
            <h3 className="font-semibold text-slate-950">Doctor Identity</h3>
            <p className="text-sm text-slate-500">Attach a doctor profile to an existing hospital user.</p>
          </div>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <label className="space-y-1.5 text-sm font-medium text-slate-800 md:col-span-2">
            User Account
            <select className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm outline-none focus:border-blue-400" value={values.user_id} onChange={(e) => update("user_id", e.target.value)} required>
              <option value="">Select user account</option>
              {users.map((user) => <option key={user.id} value={user.id}>{user.first_name} {user.last_name} — {user.email}</option>)}
            </select>
          </label>
          <label className="space-y-1.5 text-sm font-medium text-slate-800">
            Registration Number
            <input className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-400" value={values.registration_number} onChange={(e) => update("registration_number", e.target.value)} placeholder="MCI-2026-0001" required />
          </label>
          <label className="space-y-1.5 text-sm font-medium text-slate-800">
            Specialization
            <input className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-400" value={values.specialization} onChange={(e) => update("specialization", e.target.value)} placeholder="Cardiology" required />
          </label>
          <label className="space-y-1.5 text-sm font-medium text-slate-800">
            Qualification
            <input className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-400" value={values.qualification ?? ""} onChange={(e) => update("qualification", e.target.value)} placeholder="MD, DM Cardiology" />
          </label>
          <label className="space-y-1.5 text-sm font-medium text-slate-800">
            Consultation Fee
            <input type="number" min={0} className="h-11 w-full rounded-xl border border-slate-200 px-3 text-sm outline-none focus:border-blue-400" value={values.consultation_fee ?? 0} onChange={(e) => update("consultation_fee", Number(e.target.value))} required />
          </label>
          <label className="flex items-center gap-3 rounded-xl border border-slate-200 p-4 text-sm font-medium text-slate-800 md:col-span-2">
            <input type="checkbox" checked={values.active ?? true} onChange={(e) => update("active", e.target.checked)} />
            Doctor is active and available for clinical workflows
          </label>
        </div>
      </div>
      <div className="sticky bottom-0 flex justify-end gap-3 border-t border-slate-200 bg-white/95 py-4">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={isSubmitting}>{isSubmitting ? "Saving..." : "Save Doctor"}</Button>
      </div>
    </form>
  );
}

export function DoctorsTab({ search, onSearchChange }: DoctorsTabProps) {
  const queryClient = useQueryClient();
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [formOpen, setFormOpen] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState<AdminDoctor | null>(null);
  const [deleteDoctor, setDeleteDoctor] = useState<AdminDoctor | null>(null);
  const params = useMemo(() => ({ page: pageIndex + 1, size: pageSize, search: search || undefined }), [pageIndex, pageSize, search]);
  const doctorsQuery = useQuery({ queryKey: ["admin", "doctors", params], queryFn: () => adminService.listAdminDoctors(params) });
  const usersQuery = useQuery({ queryKey: ["admin", "users", "doctor-form"], queryFn: () => adminService.listUsers({ page: 1, size: 100 }) });
  const createDoctor = useMutation({ mutationFn: adminService.createAdminDoctor, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "doctors"] }) });
  const updateDoctor = useMutation({ mutationFn: ({ id, payload }: { id: string; payload: Partial<DoctorFormPayload> }) => adminService.updateAdminDoctor(id, payload), onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "doctors"] }) });
  const deleteDoctorMutation = useMutation({ mutationFn: adminService.deleteAdminDoctor, onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin", "doctors"] }) });

  const doctors = doctorsQuery.data?.items ?? [];
  const stats = { total: doctorsQuery.data?.total ?? doctors.length, active: doctors.filter((d) => d.active).length, specializations: new Set(doctors.map((d) => d.specialization)).size, inactive: doctors.filter((d) => !d.active).length };
  const columns = useMemo<ColumnDef<AdminDoctor>[]>(() => [
    { id: "doctor", header: "Doctor", cell: ({ row }) => <div className="min-w-[260px]"><div className="font-semibold text-slate-950">Dr. {row.original.first_name} {row.original.last_name}</div><div className="text-xs text-slate-500">{row.original.registration_number}</div></div> },
    { id: "contact", header: "Contact", cell: ({ row }) => <div className="flex min-w-[220px] items-center gap-2 text-sm text-slate-700"><Mail className="h-4 w-4 text-slate-400" />{row.original.email}</div> },
    { accessorKey: "specialization", header: "Specialization" },
    { accessorKey: "qualification", header: "Qualification", cell: ({ row }) => row.original.qualification ?? "—" },
    { accessorKey: "consultation_fee", header: "Fee", cell: ({ row }) => `₹${row.original.consultation_fee ?? 0}` },
    { id: "status", header: "Status", cell: ({ row }) => <span className={row.original.active ? "rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700" : "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-500"}>{row.original.active ? "ACTIVE" : "INACTIVE"}</span> },
    { id: "actions", cell: ({ row }) => <ActionMenu items={[{ label: "Edit", onClick: () => { setSelectedDoctor(row.original); setFormOpen(true); } }, { label: "Delete", danger: true, onClick: () => setDeleteDoctor(row.original) }]} /> },
  ], []);

  return <div className="space-y-5">
    <div className="grid gap-4 md:grid-cols-4">{[
      ["Doctors", stats.total, Stethoscope], ["Active", stats.active, BadgeCheck], ["Specializations", stats.specializations, GraduationCap], ["Inactive", stats.inactive, ClipboardPlus]
    ].map(([label, value, Icon]) => { const I = Icon as typeof Stethoscope; return <div key={String(label)} className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm"><div className="flex justify-between text-xs font-semibold uppercase text-slate-500"><span>{String(label)}</span><I className="h-4 w-4 text-blue-600" /></div><div className="mt-3 text-2xl font-bold text-slate-950">{String(value)}</div><div className="mt-1 text-xs text-slate-500">Current doctor master data</div></div>; })}</div>
    <DataTable columns={columns} data={doctors} isLoading={doctorsQuery.isLoading} search={search} onSearchChange={(value) => { setPageIndex(0); onSearchChange(value); }} searchPlaceholder="Search doctors by name, specialization, email..." toolbarActions={<Button onClick={() => { setSelectedDoctor(null); setFormOpen(true); }}><Plus className="mr-2 h-4 w-4" />Add Doctor</Button>} pagination={{ pageIndex, pageSize, pageCount: doctorsQuery.data?.pages, total: doctorsQuery.data?.total }} onPaginationChange={(p) => { setPageIndex(p.pageIndex); setPageSize(p.pageSize); }} emptyTitle="No doctors found" emptyDescription="Create doctor profiles after employee and user account setup." />
    <FormDrawer open={formOpen} onOpenChange={(open) => { setFormOpen(open); if (!open) setSelectedDoctor(null); }} title={selectedDoctor ? "Edit Doctor" : "Add Doctor"} description="Configure clinical doctor profile, specialization, registration, and fee." size="xl"><DoctorForm users={usersQuery.data?.items ?? []} defaultValues={selectedDoctor ? { user_id: selectedDoctor.user_id, registration_number: selectedDoctor.registration_number, specialization: selectedDoctor.specialization, qualification: selectedDoctor.qualification, consultation_fee: Number(selectedDoctor.consultation_fee ?? 0), active: selectedDoctor.active } : undefined} isSubmitting={createDoctor.isPending || updateDoctor.isPending} onCancel={() => { setFormOpen(false); setSelectedDoctor(null); }} onSubmit={async (values) => { if (selectedDoctor) await updateDoctor.mutateAsync({ id: selectedDoctor.id, payload: values }); else await createDoctor.mutateAsync(values); setFormOpen(false); setSelectedDoctor(null); }} /></FormDrawer>
    <ConfirmDialog open={Boolean(deleteDoctor)} onOpenChange={() => setDeleteDoctor(null)} title="Delete doctor?" description="Verify that no active appointments, consultations, prescriptions, or schedules depend on this doctor." confirmText="Delete" danger isLoading={deleteDoctorMutation.isPending} onConfirm={async () => { if (!deleteDoctor) return; await deleteDoctorMutation.mutateAsync(deleteDoctor.id); setDeleteDoctor(null); }} />
  </div>;
}
