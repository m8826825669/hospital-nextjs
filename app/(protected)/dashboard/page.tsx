import Link from "next/link";

import { ActivityFeed } from "@/components/dashboard/activity-feed";
import { MetricCard } from "@/components/dashboard/metric-card";
import { OperationalAlerts } from "@/components/dashboard/operational-alerts";
import { PageContainer } from "@/components/common/page-container";
import { PageHeader } from "@/components/common/page-header";
import { Button } from "@/components/ui/button";
import { dashboardMetrics } from "@/features/dashboard/data/dashboard-metrics.mock";

export default function DashboardPage() {
  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        description="Real-time overview of hospital operations and clinical workflows."
        actions={
          <Button asChild>
            <Link href="/patients/register">Register Patient</Link>
          </Button>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {dashboardMetrics.map((metric) => (
          <MetricCard key={metric.title} {...metric} />
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <ActivityFeed />
        <OperationalAlerts />
      </div>
    </PageContainer>
  );
}