"use client";

import { PageHeader } from "@/shared/components/enterprise";
import { useExecutiveDashboard } from "@/features/executive/api/executive.queries";
import { ExecutiveKpiCard } from "@/features/executive/components/executive-kpi-card";
import { ExecutiveSection } from "@/features/executive/components/executive-section";

export default function ExecutiveDashboardPage() {
  const dashboardQuery = useExecutiveDashboard();
  const data = dashboardQuery.data;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Executive Dashboard"
        description="Hospital-wide operational, clinical, financial and workforce KPIs."
      />

      {dashboardQuery.isLoading && <p className="text-sm text-muted-foreground">Loading executive dashboard...</p>}

      {data && (
        <>
          <ExecutiveSection title="Hospital Overview">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {data.hospital.map((kpi) => <ExecutiveKpiCard key={kpi.key} kpi={kpi} />)}
            </div>
          </ExecutiveSection>

          <ExecutiveSection title="Financial Performance">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {data.finance.map((kpi) => <ExecutiveKpiCard key={kpi.key} kpi={kpi} />)}
            </div>
          </ExecutiveSection>

          <ExecutiveSection title="Clinical Operations">
            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {data.clinical.map((kpi) => <ExecutiveKpiCard key={kpi.key} kpi={kpi} />)}
            </div>
          </ExecutiveSection>

          <div className="grid gap-6 xl:grid-cols-3">
            <ExecutiveSection title="Inventory">
              <div className="grid gap-4">
                {data.inventory.map((kpi) => <ExecutiveKpiCard key={kpi.key} kpi={kpi} />)}
              </div>
            </ExecutiveSection>
            <ExecutiveSection title="Human Resources">
              <div className="grid gap-4">
                {data.hr.map((kpi) => <ExecutiveKpiCard key={kpi.key} kpi={kpi} />)}
              </div>
            </ExecutiveSection>
            <ExecutiveSection title="Emergency Department">
              <div className="grid gap-4">
                {data.emergency.map((kpi) => <ExecutiveKpiCard key={kpi.key} kpi={kpi} />)}
              </div>
            </ExecutiveSection>
          </div>
        </>
      )}
    </div>
  );
}
