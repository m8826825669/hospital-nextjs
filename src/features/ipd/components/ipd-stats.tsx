// src/features/ipd/components/ipd-stats.tsx

import { BedDouble, CheckCircle2, MoveRight, UsersRound } from "lucide-react";
import { StatCard } from "@/shared/components/enterprise";

interface IpdStatsProps {
  total: number;
  admitted: number;
  transferred: number;
  discharged: number;
}

export function IpdStats({
  total,
  admitted,
  transferred,
  discharged,
}: IpdStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Admissions"
        value={total}
        description="Matching filters"
        icon={<UsersRound className="h-5 w-5" />}
      />

      <StatCard
        title="Admitted"
        value={admitted}
        description="Currently admitted"
        icon={<BedDouble className="h-5 w-5" />}
      />

      <StatCard
        title="Transferred"
        value={transferred}
        description="Moved between beds"
        icon={<MoveRight className="h-5 w-5" />}
      />

      <StatCard
        title="Discharged"
        value={discharged}
        description="Completed admissions"
        icon={<CheckCircle2 className="h-5 w-5" />}
      />
    </div>
  );
}