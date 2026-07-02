// src/features/opd/components/opd-stats.tsx

import { ClipboardPlus, CheckCircle2, Clock } from "lucide-react";
import { StatCard } from "@/shared/components/enterprise";

interface OpdStatsProps {
  total: number;
  open: number;
  inProgress: number;
  completed: number;
}

export function OpdStats({
  total,
  open,
  inProgress,
  completed,
}: OpdStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total OPD"
        value={total}
        description="Matching current filters"
        icon={<ClipboardPlus className="h-5 w-5" />}
      />

      <StatCard
        title="Open"
        value={open}
        description="Open encounters"
        icon={<Clock className="h-5 w-5" />}
      />

      <StatCard
        title="In Progress"
        value={inProgress}
        description="Currently active encounters"
        icon={<ClipboardPlus className="h-5 w-5" />}
      />

      <StatCard
        title="Completed"
        value={completed}
        description="Closed consultations"
        icon={<CheckCircle2 className="h-5 w-5" />}
      />
    </div>
  );
}