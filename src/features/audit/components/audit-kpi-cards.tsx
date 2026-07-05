import type { AuditDashboard } from "../types/audit.types";

interface AuditKpiCardsProps {
  data: AuditDashboard;
}

export function AuditKpiCards({ data }: AuditKpiCardsProps) {
  const cards = [
    { label: "Audit Logs", value: data.total_audit_logs },
    { label: "Security Events", value: data.security_events },
    { label: "Unresolved", value: data.unresolved_security_events },
    { label: "Active Sessions", value: data.active_sessions },
    { label: "Compliance Pending", value: data.compliance_pending },
    { label: "High Risk", value: data.high_risk_events },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-6">
      {cards.map((card) => (
        <div key={card.label} className="rounded-xl border bg-card p-4 shadow-sm">
          <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{card.label}</p>
          <p className="mt-2 text-2xl font-semibold">{card.value}</p>
        </div>
      ))}
    </div>
  );
}
