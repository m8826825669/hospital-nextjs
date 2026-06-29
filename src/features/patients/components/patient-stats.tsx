// src/features/patients/components/patient-stats.tsx

import { Users, UserCheck, ShieldCheck, MapPin } from "lucide-react";
import { StatCard } from "@/shared/components/enterprise";

interface PatientStatsProps {
  total: number;
  activeCount?: number;
  insuredCount?: number;
  cityCount?: number;
}

export function PatientStats({
  total,
  activeCount,
  insuredCount,
  cityCount,
}: PatientStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Patients"
        value={total}
        description="Matching current filters"
        icon={<Users className="h-5 w-5" />}
      />

      <StatCard
        title="Active"
        value={activeCount ?? "-"}
        description="Currently active patients"
        icon={<UserCheck className="h-5 w-5" />}
      />

      <StatCard
        title="Insured"
        value={insuredCount ?? "-"}
        description="Patients with insurance"
        icon={<ShieldCheck className="h-5 w-5" />}
      />

      <StatCard
        title="Cities"
        value={cityCount ?? "-"}
        description="Unique patient locations"
        icon={<MapPin className="h-5 w-5" />}
      />
    </div>
  );
}