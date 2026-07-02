// src/features/appointments/components/appointment-stats.tsx

import { CalendarDays, CheckCircle2, Clock, XCircle } from "lucide-react";
import { StatCard } from "@/shared/components/enterprise";

interface AppointmentStatsProps {
  total: number;
  scheduled: number;
  completed: number;
  cancelled: number;
}

export function AppointmentStats({
  total,
  scheduled,
  completed,
  cancelled,
}: AppointmentStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total"
        value={total}
        description="Matching current filters"
        icon={<CalendarDays className="h-5 w-5" />}
      />

      <StatCard
        title="Scheduled"
        value={scheduled}
        description="Upcoming appointments"
        icon={<Clock className="h-5 w-5" />}
      />

      <StatCard
        title="Completed"
        value={completed}
        description="Completed visits"
        icon={<CheckCircle2 className="h-5 w-5" />}
      />

      <StatCard
        title="Cancelled"
        value={cancelled}
        description="Cancelled or no-show"
        icon={<XCircle className="h-5 w-5" />}
      />
    </div>
  );
}