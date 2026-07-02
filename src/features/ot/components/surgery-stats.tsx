// src/features/ot/components/surgery-stats.tsx

import { Activity, CheckCircle2, Clock, Scissors } from "lucide-react";
import { StatCard } from "@/shared/components/enterprise";

interface SurgeryStatsProps {
  total: number;
  scheduled: number;
  inProgress: number;
  completed: number;
}

export function SurgeryStats({
  total,
  scheduled,
  inProgress,
  completed,
}: SurgeryStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Surgeries"
        value={total}
        description="Matching filters"
        icon={<Scissors className="h-5 w-5" />}
      />

      <StatCard
        title="Scheduled"
        value={scheduled}
        description="Planned surgeries"
        icon={<Clock className="h-5 w-5" />}
      />

      <StatCard
        title="In Progress"
        value={inProgress}
        description="Currently active"
        icon={<Activity className="h-5 w-5" />}
      />

      <StatCard
        title="Completed"
        value={completed}
        description="Finished surgeries"
        icon={<CheckCircle2 className="h-5 w-5" />}
      />
    </div>
  );
}