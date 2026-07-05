"use client";

import { useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AuditKpiCards } from "@/features/audit/components/audit-kpi-cards";
import { AuditLogTable } from "@/features/audit/components/audit-log-table";
import { ComplianceList } from "@/features/audit/components/compliance-list";
import { SecurityEventList } from "@/features/audit/components/security-event-list";
import { auditModuleOptions } from "@/features/audit/constants/audit.constants";
import { auditService } from "@/features/audit/api/audit.service";
import type { AuditDashboard, AuditLogListResponse, ComplianceCheck, SecurityEventListResponse } from "@/features/audit/types/audit.types";

const emptyDashboard: AuditDashboard = {
  total_audit_logs: 0,
  security_events: 0,
  unresolved_security_events: 0,
  active_sessions: 0,
  compliance_pending: 0,
  high_risk_events: 0,
};

const emptyLogs: AuditLogListResponse = { items: [], total: 0, page: 1, page_size: 20, pages: 0 };
const emptyEvents: SecurityEventListResponse = { items: [], total: 0, page: 1, page_size: 20, pages: 0 };

export default function AuditPage() {
  const [module, setModule] = useState("all");
  const [severity, setSeverity] = useState("all");

  const logParams = useMemo(() => ({ page: 1, page_size: 20, module }), [module]);
  const securityParams = useMemo(() => ({ page: 1, page_size: 20, severity }), [severity]);

  const dashboardQuery = useQuery({ queryKey: ["audit", "dashboard"], queryFn: auditService.dashboard });
  const logsQuery = useQuery({ queryKey: ["audit", "logs", logParams], queryFn: () => auditService.logs(logParams) });
  const eventsQuery = useQuery({ queryKey: ["audit", "security-events", securityParams], queryFn: () => auditService.securityEvents(securityParams) });
  const checksQuery = useQuery({ queryKey: ["audit", "compliance-checks"], queryFn: () => auditService.complianceChecks() });

  const dashboard = dashboardQuery.data ?? emptyDashboard;
  const logs = logsQuery.data ?? emptyLogs;
  const events = eventsQuery.data ?? emptyEvents;
  const checks: ComplianceCheck[] = checksQuery.data ?? [];

  return (
    <main className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Audit & Compliance Center</h1>
        <p className="text-sm text-muted-foreground">Monitor user activity, data changes, security events, sessions and compliance checks.</p>
      </div>

      <AuditKpiCards data={dashboard} />

      <section className="grid gap-6 xl:grid-cols-[1fr_420px]">
        <div className="space-y-4">
          <div className="flex flex-col gap-3 rounded-xl border bg-card p-4 shadow-sm md:flex-row md:items-center">
            <select className="h-10 rounded-md border bg-background px-3 text-sm" value={module} onChange={(event) => setModule(event.target.value)}>
              {auditModuleOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
            </select>
            <div className="text-sm text-muted-foreground">{logs.total} audit records</div>
          </div>
          <AuditLogTable logs={logs.items} />
        </div>

        <aside className="space-y-4">
          <div className="rounded-xl border bg-card p-4 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="font-semibold">Security Events</h2>
              <select className="h-9 rounded-md border bg-background px-2 text-sm" value={severity} onChange={(event) => setSeverity(event.target.value)}>
                <option value="all">All</option>
                <option value="info">Info</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="critical">Critical</option>
              </select>
            </div>
            <SecurityEventList events={events.items} />
          </div>
        </aside>
      </section>

      <section className="space-y-3">
        <div>
          <h2 className="text-lg font-semibold">Compliance Checks</h2>
          <p className="text-sm text-muted-foreground">Track compliance evidence, access review and control checks.</p>
        </div>
        <ComplianceList checks={checks} />
      </section>
    </main>
  );
}
