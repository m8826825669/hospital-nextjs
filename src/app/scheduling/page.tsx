"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader, SectionCard } from "@/shared/components/enterprise";
import { FormDrawer } from "@/shared/components/enterprise/forms/form-drawer";
import { BookingForm } from "@/features/scheduling/components/booking-form";
import { DoctorScheduleForm } from "@/features/scheduling/components/doctor-schedule-form";
import { PriorityBadge, SchedulingStatusBadge } from "@/features/scheduling/components/scheduling-badges";
import { ResourceForm } from "@/features/scheduling/components/resource-form";
import { StaffRosterForm } from "@/features/scheduling/components/staff-roster-form";
import { useBookings, useCreateBooking, useCreateDoctorSchedule, useCreateResource, useCreateStaffRoster, useDoctorSchedules, useResources, useSchedulingDashboard, useStaffRosters } from "@/features/scheduling/api/scheduling.queries";
import type { DoctorSchedule, HospitalResource, ResourceBooking, StaffRoster } from "@/features/scheduling/types/scheduling.types";

type DrawerType = "resource" | "booking" | "doctor-schedule" | "staff-roster" | null;
type TabType = "resources" | "bookings" | "doctor" | "staff";

function MetricCard({ label, value }: { label: string; value: number | string }) {
  return <div className="rounded-xl border bg-card p-4 shadow-sm"><p className="text-xs text-muted-foreground">{label}</p><p className="mt-2 text-2xl font-semibold">{value}</p></div>;
}

function DataTableShell({ children }: { children: React.ReactNode }) {
  return <div className="overflow-x-auto rounded-xl border"><table className="w-full text-left text-sm">{children}</table></div>;
}

export default function SchedulingPage() {
  const [drawer, setDrawer] = useState<DrawerType>(null);
  const [tab, setTab] = useState<TabType>("resources");
  const listParams = useMemo(() => ({ page: 1, size: 100 }), []);

  const dashboard = useSchedulingDashboard();
  const resources = useResources(listParams);
  const bookings = useBookings(listParams);
  const doctorSchedules = useDoctorSchedules(listParams);
  const staffRosters = useStaffRosters(listParams);

  const createResource = useCreateResource();
  const createBooking = useCreateBooking();
  const createDoctorSchedule = useCreateDoctorSchedule();
  const createStaffRoster = useCreateStaffRoster();

  const resourceItems = resources.data?.items ?? [];
  const bookingItems = bookings.data?.items ?? [];
  const doctorScheduleItems = doctorSchedules.data?.items ?? [];
  const staffRosterItems = staffRosters.data?.items ?? [];

  return <div className="space-y-6">
    <PageHeader title="Scheduling & Resource Management" description="Manage hospital resources, bookings, doctor schedules, and staff rosters." />

    <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
      <MetricCard label="Resources" value={dashboard.data?.total_resources ?? 0} />
      <MetricCard label="Today Bookings" value={dashboard.data?.today_bookings ?? 0} />
      <MetricCard label="Doctor Schedules" value={dashboard.data?.active_doctor_schedules ?? 0} />
      <MetricCard label="Staff on Roster" value={dashboard.data?.staff_on_roster ?? 0} />
      <MetricCard label="Pending" value={dashboard.data?.pending_bookings ?? 0} />
      <MetricCard label="Conflicts" value={dashboard.data?.conflicts ?? 0} />
    </div>

    <div className="flex flex-wrap gap-2">
      <Button variant={tab === "resources" ? "default" : "outline"} onClick={() => setTab("resources")}>Resources</Button>
      <Button variant={tab === "bookings" ? "default" : "outline"} onClick={() => setTab("bookings")}>Bookings</Button>
      <Button variant={tab === "doctor" ? "default" : "outline"} onClick={() => setTab("doctor")}>Doctor Schedules</Button>
      <Button variant={tab === "staff" ? "default" : "outline"} onClick={() => setTab("staff")}>Staff Rosters</Button>
    </div>

    {tab === "resources" && <SectionCard title="Resources" description="Rooms, equipment, theatres, beds, and shared assets.">
      <div className="mb-4 flex justify-end"><Button onClick={() => setDrawer("resource")}>New Resource</Button></div>
      <DataTableShell><thead><tr className="border-b"><th className="p-3">Code</th><th>Name</th><th>Type</th><th>Location</th><th>Status</th></tr></thead><tbody>{resourceItems.map((item: HospitalResource) => <tr key={item.id} className="border-b"><td className="p-3 font-medium">{item.code}</td><td>{item.name}</td><td>{item.resource_type}</td><td>{item.location ?? "-"}</td><td><SchedulingStatusBadge status={item.status} /></td></tr>)}</tbody></DataTableShell>
    </SectionCard>}

    {tab === "bookings" && <SectionCard title="Bookings" description="Resource reservations with conflict-aware workflow foundation.">
      <div className="mb-4 flex justify-end"><Button onClick={() => setDrawer("booking")}>New Booking</Button></div>
      <DataTableShell><thead><tr className="border-b"><th className="p-3">Title</th><th>Type</th><th>Start</th><th>End</th><th>Priority</th><th>Status</th></tr></thead><tbody>{bookingItems.map((item: ResourceBooking) => <tr key={item.id} className="border-b"><td className="p-3 font-medium">{item.title}</td><td>{item.booking_type}</td><td>{new Date(item.start_time).toLocaleString()}</td><td>{new Date(item.end_time).toLocaleString()}</td><td><PriorityBadge priority={item.priority} /></td><td><SchedulingStatusBadge status={item.status} /></td></tr>)}</tbody></DataTableShell>
    </SectionCard>}

    {tab === "doctor" && <SectionCard title="Doctor Schedules" description="Doctor availability, OPD slots, and location planning.">
      <div className="mb-4 flex justify-end"><Button onClick={() => setDrawer("doctor-schedule")}>New Schedule</Button></div>
      <DataTableShell><thead><tr className="border-b"><th className="p-3">Doctor</th><th>Date</th><th>Time</th><th>Slot</th><th>Location</th><th>Status</th></tr></thead><tbody>{doctorScheduleItems.map((item: DoctorSchedule) => <tr key={item.id} className="border-b"><td className="p-3 font-medium">{item.doctor_id}</td><td>{item.schedule_date}</td><td>{item.start_time} - {item.end_time}</td><td>{item.slot_minutes} min</td><td>{item.location ?? "-"}</td><td><SchedulingStatusBadge status={item.status} /></td></tr>)}</tbody></DataTableShell>
    </SectionCard>}

    {tab === "staff" && <SectionCard title="Staff Rosters" description="Shift planning and department coverage.">
      <div className="mb-4 flex justify-end"><Button onClick={() => setDrawer("staff-roster")}>New Roster</Button></div>
      <DataTableShell><thead><tr className="border-b"><th className="p-3">Employee</th><th>Date</th><th>Shift</th><th>Time</th><th>Location</th><th>Status</th></tr></thead><tbody>{staffRosterItems.map((item: StaffRoster) => <tr key={item.id} className="border-b"><td className="p-3 font-medium">{item.employee_id}</td><td>{item.roster_date}</td><td>{item.shift}</td><td>{item.start_time} - {item.end_time}</td><td>{item.location ?? "-"}</td><td><SchedulingStatusBadge status={item.status} /></td></tr>)}</tbody></DataTableShell>
    </SectionCard>}

    <FormDrawer open={drawer === "resource"} title="New Resource" size="xl" onOpenChange={(open: boolean) => !open && setDrawer(null)}><ResourceForm isSubmitting={createResource.isPending} onCancel={() => setDrawer(null)} onSubmit={async (values) => { await createResource.mutateAsync(values); setDrawer(null); }} /></FormDrawer>
    <FormDrawer open={drawer === "booking"} title="New Booking" size="xl" onOpenChange={(open: boolean) => !open && setDrawer(null)}><BookingForm resources={resourceItems} isSubmitting={createBooking.isPending} onCancel={() => setDrawer(null)} onSubmit={async (values) => { await createBooking.mutateAsync(values); setDrawer(null); }} /></FormDrawer>
    <FormDrawer open={drawer === "doctor-schedule"} title="New Doctor Schedule" size="xl" onOpenChange={(open: boolean) => !open && setDrawer(null)}><DoctorScheduleForm isSubmitting={createDoctorSchedule.isPending} onCancel={() => setDrawer(null)} onSubmit={async (values) => { await createDoctorSchedule.mutateAsync(values); setDrawer(null); }} /></FormDrawer>
    <FormDrawer open={drawer === "staff-roster"} title="New Staff Roster" size="xl" onOpenChange={(open: boolean) => !open && setDrawer(null)}><StaffRosterForm isSubmitting={createStaffRoster.isPending} onCancel={() => setDrawer(null)} onSubmit={async (values) => { await createStaffRoster.mutateAsync(values); setDrawer(null); }} /></FormDrawer>
  </div>;
}
