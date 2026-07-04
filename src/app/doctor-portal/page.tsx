"use client";

import { CalendarDays, ClipboardList, FileText, Search, Stethoscope, Users } from "lucide-react";

import { AppShell } from "@/shared/components/layout/app-shell";
import { PageHeader, SectionCard, StatusBadge } from "@/shared/components/enterprise";
import { Button } from "@/components/ui/button";
import { useDoctorPortalDashboard } from "@/features/doctor-portal/api/doctor-portal.queries";
import { DoctorAppointmentStatusBadge } from "@/features/doctor-portal/components/doctor-portal-badges";

function KpiCard({ title, value, icon: Icon }: { title: string; value: number; icon: typeof CalendarDays }) {
  return (
    <SectionCard className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-semibold">{value}</p>
        </div>
        <div className="rounded-xl bg-muted p-3">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </SectionCard>
  );
}

export default function DoctorPortalPage() {
  const dashboardQuery = useDoctorPortalDashboard();
  const data = dashboardQuery.data;
  const stats = data?.stats;

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Doctor Portal"
          description="Review today’s queue, patient summaries, pending results, orders, prescriptions, and follow-ups."
          actions={
            <div className="flex gap-2">
              <Button variant="outline"><Search className="mr-2 h-4 w-4" />Find Patient</Button>
              <Button><Stethoscope className="mr-2 h-4 w-4" />Start Consultation</Button>
            </div>
          }
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <KpiCard title="Appointments" value={stats?.today_appointments ?? 0} icon={CalendarDays} />
          <KpiCard title="Waiting" value={stats?.waiting_patients ?? 0} icon={Users} />
          <KpiCard title="Completed" value={stats?.completed_consultations ?? 0} icon={Stethoscope} />
          <KpiCard title="Pending Results" value={stats?.pending_results ?? 0} icon={FileText} />
          <KpiCard title="Follow-ups" value={stats?.pending_followups ?? 0} icon={ClipboardList} />
        </div>

        <div className="grid gap-6 xl:grid-cols-[1.3fr_0.7fr]">
          <SectionCard title="Today’s Patient Queue" description="Appointments and waiting patients for the doctor." className="p-5">
            <div className="space-y-3">
              {(data?.appointments ?? []).map((appointment) => (
                <div key={appointment.id} className="flex items-center justify-between rounded-xl border p-4">
                  <div>
                    <div className="font-medium">{appointment.patient_name}</div>
                    <div className="text-sm text-muted-foreground">
                      {appointment.patient_code ?? "-"} · {appointment.visit_type ?? "Visit"} · {appointment.reason ?? "No reason"}
                    </div>
                  </div>
                  <DoctorAppointmentStatusBadge status={appointment.status} />
                </div>
              ))}
              {!dashboardQuery.isLoading && (data?.appointments ?? []).length === 0 && (
                <p className="text-sm text-muted-foreground">No appointments found.</p>
              )}
            </div>
          </SectionCard>

          <SectionCard title="Pending Results" description="Reports/results needing doctor review." className="p-5">
            <div className="space-y-3">
              {(data?.pending_results ?? []).map((result) => (
                <div key={result.id} className="rounded-xl border p-4">
                  <div className="flex items-center justify-between">
                    <div className="font-medium">{result.order_name}</div>
                    <StatusBadge label={result.order_type.toUpperCase()} variant="info" />
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">{result.patient_name}</div>
                  {result.summary && <div className="mt-2 text-sm">{result.summary}</div>}
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <SectionCard title="Recent Patients" description="Patients recently seen or assigned." className="p-5">
            <div className="space-y-3">
              {(data?.recent_patients ?? []).map((patient) => (
                <div key={patient.id} className="rounded-xl border p-4">
                  <div className="font-medium">{patient.first_name} {patient.last_name}</div>
                  <div className="text-sm text-muted-foreground">
                    {patient.patient_code ?? "-"} · {patient.gender ?? "-"} · {patient.age ?? "-"} yrs
                  </div>
                  {patient.active_problem && <div className="mt-2 text-sm">Active problem: {patient.active_problem}</div>}
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Follow-ups" description="Follow-ups requiring action." className="p-5">
            <div className="space-y-3">
              {(data?.followups ?? []).map((followup) => (
                <div key={followup.id} className="flex items-center justify-between rounded-xl border p-4">
                  <div>
                    <div className="font-medium">{followup.patient_name}</div>
                    <div className="text-sm text-muted-foreground">{followup.reason ?? "Follow-up"} · {followup.follow_up_date}</div>
                  </div>
                  <StatusBadge label={followup.status.toUpperCase()} variant="warning" />
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </AppShell>
  );
}
