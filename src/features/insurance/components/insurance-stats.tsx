// src/features/insurance/components/insurance-stats.tsx

import { CheckCircle2, Clock, ShieldCheck, XCircle } from "lucide-react";
import { StatCard } from "@/shared/components/enterprise";

interface InsuranceStatsProps {
  total: number;
  underReview: number;
  approved: number;
  rejected: number;
}

export function InsuranceStats({
  total,
  underReview,
  approved,
  rejected,
}: InsuranceStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Claims"
        value={total}
        description="Matching filters"
        icon={<ShieldCheck className="h-5 w-5" />}
      />

      <StatCard
        title="Under Review"
        value={underReview}
        description="Pending review"
        icon={<Clock className="h-5 w-5" />}
      />

      <StatCard
        title="Approved"
        value={approved}
        description="Approved claims"
        icon={<CheckCircle2 className="h-5 w-5" />}
      />

      <StatCard
        title="Rejected"
        value={rejected}
        description="Rejected claims"
        icon={<XCircle className="h-5 w-5" />}
      />
    </div>
  );
}