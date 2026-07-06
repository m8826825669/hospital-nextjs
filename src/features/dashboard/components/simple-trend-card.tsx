// src/features/dashboard/components/simple-trend-card.tsx

import { SectionCard } from "@/shared/components/enterprise";
import type { DashboardTrendPoint } from "../types/dashboard.types";

interface SimpleTrendCardProps {
  title: string;
  description?: string;
  data: DashboardTrendPoint[];
}

export function SimpleTrendCard({
  title,
  description,
  data,
}: SimpleTrendCardProps) {
  const max = Math.max(...data.map((item) => item.value), 1);

  return (
    <SectionCard title={title} description={description}>
      <div className="space-y-3">
        {data.map((item, i) => (
          <div key={`${item.label}-${i}`} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{item.label}</span>
              <span className="font-medium">{item.value}</span>
            </div>

            <div className="h-2 rounded-full bg-muted">
              <div
                className="h-2 rounded-full bg-primary"
                style={{
                  width: `${Math.max((item.value / max) * 100, 4)}%`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </SectionCard>
  );
}