"use client";

import { PageHeader } from "@/shared/components/enterprise";
import { ReportRunner } from "@/features/reports/components/report-runner";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Reporting Engine"
        description="Run, export and manage enterprise HMS reports."
      />
      <ReportRunner />
    </div>
  );
}
