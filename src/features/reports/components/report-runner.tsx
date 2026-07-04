"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { SelectField, TextField } from "@/shared/components/enterprise";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useReportDefinitions, useRunExecutiveReport } from "@/features/executive/api/executive.queries";

interface ReportFormValues {
  report_key: string;
  date_from: string;
  date_to: string;
}

export function ReportRunner() {
  const reportsQuery = useReportDefinitions();
  const runReport = useRunExecutiveReport();
  const [selectedCategory, setSelectedCategory] = useState("all");

  const form = useForm<ReportFormValues>({
    defaultValues: { report_key: "executive_summary", date_from: "", date_to: "" },
  });

  const reports = reportsQuery.data ?? [];
  const categories = useMemo(() => ["all", ...Array.from(new Set(reports.map((r) => r.category)))], [reports]);
  const filteredReports = selectedCategory === "all" ? reports : reports.filter((r) => r.category === selectedCategory);

  return (
    <div className="space-y-6">
      <div className="rounded-xl border bg-card p-5 shadow-sm">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold">Reporting Engine</h2>
            <p className="text-sm text-muted-foreground">Run operational, clinical, finance, HR, inventory and executive reports.</p>
          </div>
          <select
            className="rounded-md border bg-background px-3 py-2 text-sm"
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>{category === "all" ? "All Categories" : category}</option>
            ))}
          </select>
        </div>

        <Form {...form}>
          <form
            className="grid gap-4 md:grid-cols-4"
            onSubmit={form.handleSubmit((values) => runReport.mutate(values))}
          >
            <SelectField
              form={form}
              name="report_key"
              label="Report"
              options={filteredReports.map((r) => ({ label: r.title, value: r.key }))}
            />
            <TextField form={form} name="date_from" label="From" type="date" />
            <TextField form={form} name="date_to" label="To" type="date" />
            <div className="flex items-end">
              <Button type="submit" disabled={runReport.isPending}>
                {runReport.isPending ? "Running..." : "Run Report"}
              </Button>
            </div>
          </form>
        </Form>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {filteredReports.map((report) => (
          <div key={report.key} className="rounded-xl border bg-card p-5 shadow-sm">
            <p className="text-sm font-semibold">{report.title}</p>
            <p className="mt-1 text-sm text-muted-foreground">{report.description}</p>
            <p className="mt-3 text-xs text-muted-foreground">Exports: {report.export_formats.join(", ").toUpperCase()}</p>
          </div>
        ))}
      </div>

      {runReport.data && (
        <div className="rounded-xl border bg-card p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-semibold">{runReport.data.title}</h3>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">CSV</Button>
              <Button variant="outline" size="sm">Excel</Button>
              <Button variant="outline" size="sm">PDF</Button>
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left">
                  {runReport.data.columns.map((column) => <th key={column} className="py-2">{column}</th>)}
                </tr>
              </thead>
              <tbody>
                {runReport.data.rows.map((row, index) => (
                  <tr key={index} className="border-b last:border-0">
                    {runReport.data.columns.map((column) => <td key={column} className="py-2">{String(row[column] ?? "-")}</td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
