// src/features/patient-portal/components/patient-portal-kpis.tsx

import { CalendarDays, CreditCard, FileText, ShieldCheck } from "lucide-react";
import { StatCard } from "@/shared/components/enterprise";
import type { PatientPortalKpis } from "../types/patient-portal.types";

export function PatientPortalKpis({ kpis }: { kpis: PatientPortalKpis }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard
        title="Upcoming Appointments"
        value={kpis.upcoming_appointments}
        description="Scheduled visits"
        icon={<CalendarDays className="h-5 w-5" />}
      />
      <StatCard
        title="Pending Reports"
        value={kpis.pending_reports}
        description="Lab/radiology reports"
        icon={<FileText className="h-5 w-5" />}
      />
      <StatCard
        title="Unpaid Bills"
        value={kpis.unpaid_bills}
        description="Bills awaiting payment"
        icon={<CreditCard className="h-5 w-5" />}
      />
      <StatCard
        title="Insurance Claims"
        value={kpis.active_claims}
        description="Active claims"
        icon={<ShieldCheck className="h-5 w-5" />}
      />
    </div>
  );
}