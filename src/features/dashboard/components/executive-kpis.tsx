// src/features/dashboard/components/executive-kpis.tsx

import {
  BedDouble,
  CalendarDays,
  FlaskConical,
  IndianRupee,
  Pill,
  ShieldCheck,
  Stethoscope,
  Users,
} from "lucide-react";
import { StatCard } from "@/shared/components/enterprise";
import type { DashboardKpis } from "../types/dashboard.types";

export function ExecutiveKpis({ kpis }: { kpis: DashboardKpis }) {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard title="Patients" value={kpis.total_patients} description="Total registered patients" icon={<Users className="h-5 w-5" />} />
      <StatCard title="Appointments" value={kpis.today_appointments} description="Today's appointments" icon={<CalendarDays className="h-5 w-5" />} />
      <StatCard title="OPD Queue" value={kpis.opd_queue} description="Active OPD encounters" icon={<Stethoscope className="h-5 w-5" />} />
      <StatCard title="IPD Occupancy" value={kpis.ipd_occupancy} description="Current admissions" icon={<BedDouble className="h-5 w-5" />} />
      <StatCard title="Pending Labs" value={kpis.pending_lab_samples} description="Samples awaiting action" icon={<FlaskConical className="h-5 w-5" />} />
      <StatCard title="Pharmacy Revenue" value={`₹${kpis.pharmacy_revenue}`} description="Visible pharmacy revenue" icon={<Pill className="h-5 w-5" />} />
      <StatCard title="Billing Revenue" value={`₹${kpis.billing_revenue}`} description="Visible billing revenue" icon={<IndianRupee className="h-5 w-5" />} />
      <StatCard title="Insurance Claims" value={kpis.pending_insurance_claims} description="Pending insurance claims" icon={<ShieldCheck className="h-5 w-5" />} />
    </div>
  );
}