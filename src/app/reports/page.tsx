// src/app/reports/page.tsx

"use client";

import { useMemo, useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ErrorState,
  FormDrawer,
  PageHeader,
  SectionCard,
} from "@/shared/components/enterprise";
import { AppShell } from "@/shared/components/layout/app-shell";

import { ReportCatalog } from "@/features/reports/components/report-catalog";
import { ReportFilters } from "@/features/reports/components/report-filters";
import { ReportRunsList } from "@/features/reports/components/report-runs-list";
import { RunReportForm } from "@/features/reports/components/run-report-form";

import {
  useReportDefinitions,
  useReportRuns,
  useRunReport,
} from "@/features/reports/api/reports.queries";

import { runReportFormToPayload } from "@/features/reports/utils/reports.mapper";

import type {
  ReportCategory,
  ReportDefinition,
} from "@/features/reports/types/reports.types";
import type { RunReportFormValues } from "@/features/reports/schemas/reports.schema";

export default function ReportsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [module, setModule] = useState("");

  const [selectedReport, setSelectedReport] =
    useState<ReportDefinition | null>(null);
  const [runDrawerOpen, setRunDrawerOpen] = useState(false);

  const params = useMemo(
    () => ({
      page: 1,
      size: 100,
      search: search || undefined,
      category: category ? (category as ReportCategory) : undefined,
      module: module || undefined,
    }),
    [search, category, module]
  );

  const reportsQuery = useReportDefinitions(params);
  const runsQuery = useReportRuns({ page: 1, size: 50 });
  const runReport = useRunReport();

  function resetFilters() {
    setSearch("");
    setCategory("");
    setModule("");
  }

  async function handleRunReport(values: RunReportFormValues) {
    await runReport.mutateAsync(runReportFormToPayload(values));
    setRunDrawerOpen(false);
    setSelectedReport(null);
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Reports & BI"
          description="Generate clinical, financial, operational, inventory, insurance, and audit reports."
        />

        <ReportFilters
          category={category}
          module={module}
          onCategoryChange={setCategory}
          onModuleChange={setModule}
          onReset={resetFilters}
        />

        <Tabs defaultValue="catalog">
          <TabsList>
            <TabsTrigger value="catalog">Report Catalog</TabsTrigger>
            <TabsTrigger value="history">Generated Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="catalog" className="mt-4 space-y-4">
            <input
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              placeholder="Search reports..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            <SectionCard
              title="Report Catalog"
              description="Available reports across HMS modules."
            >
              {reportsQuery.isError ? (
                <ErrorState
                  title="Could not load reports"
                  description="Please check your connection or try again."
                  onRetry={() => reportsQuery.refetch()}
                />
              ) : (
                <ReportCatalog
                  reports={reportsQuery.data?.items ?? []}
                  isLoading={reportsQuery.isLoading}
                  onRun={(report) => {
                    setSelectedReport(report);
                    setRunDrawerOpen(true);
                  }}
                />
              )}
            </SectionCard>
          </TabsContent>

          <TabsContent value="history" className="mt-4">
            <SectionCard
              title="Generated Reports"
              description="Recent report generation history and exports."
            >
              {runsQuery.isError ? (
                <ErrorState
                  title="Could not load report history"
                  description="Please check your connection or try again."
                  onRetry={() => runsQuery.refetch()}
                />
              ) : (
                <ReportRunsList
                  runs={runsQuery.data?.items ?? []}
                  isLoading={runsQuery.isLoading}
                />
              )}
            </SectionCard>
          </TabsContent>
        </Tabs>

        <FormDrawer
          open={runDrawerOpen}
          onOpenChange={(open) => {
            setRunDrawerOpen(open);
            if (!open) setSelectedReport(null);
          }}
          title={selectedReport ? `Run ${selectedReport.name}` : "Run Report"}
          description="Configure report filters and export format."
          size="lg"
        >
          {selectedReport && (
            <RunReportForm
              reportId={selectedReport.id}
              isSubmitting={runReport.isPending}
              onSubmit={handleRunReport}
              onCancel={() => {
                setRunDrawerOpen(false);
                setSelectedReport(null);
              }}
            />
          )}
        </FormDrawer>
      </div>
    </AppShell>
  );
}