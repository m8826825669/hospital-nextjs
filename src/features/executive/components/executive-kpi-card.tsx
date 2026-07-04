import type { ExecutiveKpi } from "../types/executive.types";

function formatValue(kpi: ExecutiveKpi) {
  if (typeof kpi.value === "number") {
    if (kpi.unit === "INR") return `₹${kpi.value.toLocaleString("en-IN")}`;
    return `${kpi.value.toLocaleString("en-IN")}${kpi.unit === "%" ? "%" : kpi.unit ? ` ${kpi.unit}` : ""}`;
  }
  return kpi.value;
}

export function ExecutiveKpiCard({ kpi }: { kpi: ExecutiveKpi }) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <p className="text-sm text-muted-foreground">{kpi.label}</p>
      <div className="mt-2 flex items-end justify-between gap-3">
        <p className="text-2xl font-semibold tracking-tight">{formatValue(kpi)}</p>
        {typeof kpi.trend === "number" && (
          <span className={kpi.trend >= 0 ? "text-xs text-emerald-600" : "text-xs text-red-600"}>
            {kpi.trend >= 0 ? "+" : ""}{kpi.trend}%
          </span>
        )}
      </div>
    </div>
  );
}
