import type { DocumentDashboard } from "../types/document.types";

function Kpi({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border bg-card p-4 shadow-sm">
      <p className="text-sm text-muted-foreground">{label}</p>
      <p className="mt-2 text-2xl font-semibold">{value}</p>
    </div>
  );
}

export function DocumentKpiCards({ data }: { data: DocumentDashboard }) {
  return (
    <div className="grid gap-4 md:grid-cols-5">
      <Kpi label="Total Documents" value={data.total_documents} />
      <Kpi label="Patient Docs" value={data.patient_documents} />
      <Kpi label="Finance Docs" value={data.finance_documents} />
      <Kpi label="HR Docs" value={data.hr_documents} />
      <Kpi label="Recent Uploads" value={data.recent_uploads} />
    </div>
  );
}
