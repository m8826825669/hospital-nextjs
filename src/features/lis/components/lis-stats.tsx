// src/features/lis/components/lis-stats.tsx

import { CheckCircle2, FlaskConical, Microscope, ShieldCheck } from "lucide-react";
import { StatCard } from "@/shared/components/enterprise";

interface LisStatsProps {
  total: number;
  processing: number;
  verified: number;
  approved: number;
}

export function LisStats({
  total,
  processing,
  verified,
  approved,
}: LisStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Samples"
        value={total}
        description="Matching filters"
        icon={<FlaskConical className="h-5 w-5" />}
      />

      <StatCard
        title="Processing"
        value={processing}
        description="In lab workflow"
        icon={<Microscope className="h-5 w-5" />}
      />

      <StatCard
        title="Verified"
        value={verified}
        description="Verified results"
        icon={<ShieldCheck className="h-5 w-5" />}
      />

      <StatCard
        title="Approved"
        value={approved}
        description="Approved reports"
        icon={<CheckCircle2 className="h-5 w-5" />}
      />
    </div>
  );
}