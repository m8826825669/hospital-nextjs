import type { ComplianceCheck } from "../types/audit.types";

interface ComplianceListProps {
  checks: ComplianceCheck[];
}

export function ComplianceList({ checks }: ComplianceListProps) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {checks.map((check) => (
        <div key={check.id} className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="font-medium">{check.code} — {check.name}</p>
              <p className="text-sm text-muted-foreground">{check.category} · {check.risk_level}</p>
            </div>
            <span className="rounded-full border px-2 py-1 text-xs uppercase">{check.status}</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-muted">
            <div className="h-2 rounded-full bg-foreground" style={{ width: `${check.score}%` }} />
          </div>
        </div>
      ))}
      {checks.length === 0 && <div className="rounded-xl border bg-card p-8 text-center text-sm text-muted-foreground md:col-span-2">No compliance checks.</div>}
    </div>
  );
}
