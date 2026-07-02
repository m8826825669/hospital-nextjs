"use client";

import {
  ErrorState,
  LoadingState,
  PageHeader,
} from "@/shared/components/enterprise";
import { AppShell } from "@/shared/components/layout/app-shell";

import {
  useAppointmentTrend,
  useDashboardActivity,
  useDashboardKpis,
  useRevenueTrend,
} from "@/features/dashboard/api/dashboard.queries";
import { ExecutiveKpis } from "@/features/dashboard/components/executive-kpis";
import { QuickActionsCard } from "@/features/dashboard/components/quick-actions-card";
import { RecentActivityCard } from "@/features/dashboard/components/recent-activity-card";
import { SimpleTrendCard } from "@/features/dashboard/components/simple-trend-card";

export default function DashboardPage() {
  const kpisQuery = useDashboardKpis();
  const revenueTrendQuery = useRevenueTrend();
  const appointmentTrendQuery = useAppointmentTrend();
  const activityQuery = useDashboardActivity();

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Executive Dashboard"
          description="Hospital-wide operational overview, revenue, patient flow, and critical work queues."
        />
        
        {kpisQuery.isError ? (
          <ErrorState
            title="Could not load dashboard"
            description="Please check your connection or try again."
            onRetry={() => kpisQuery.refetch()}
          />
        ) : kpisQuery.isLoading ? (
          <LoadingState />
        ) : kpisQuery.data ? (
          <ExecutiveKpis kpis={kpisQuery.data} />
        ) : null}

        <div className="grid gap-6 xl:grid-cols-2">
          <SimpleTrendCard
            title="Revenue Trend"
            description="Billing and pharmacy revenue trend."
            data={revenueTrendQuery.data ?? []}
          />

          <SimpleTrendCard
            title="Appointment Trend"
            description="Appointment volume trend."
            data={appointmentTrendQuery.data ?? []}
          />
        </div>

        <div className="grid gap-6 xl:grid-cols-2">
          <QuickActionsCard />

          <RecentActivityCard
            activities={activityQuery.data}
            isLoading={activityQuery.isLoading}
          />
        </div>
      </div>
    </AppShell>
  );
}