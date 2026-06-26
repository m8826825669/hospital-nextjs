import { AlertTriangle, CheckCircle2, FlaskConical, Pill } from "lucide-react";

import { SectionCard } from "@/components/common/section-card";
import { StatusBadge } from "@/components/data-display/status-badge";

const alerts = [
  {
    icon: CheckCircle2,
    title: "Patient Registration",
    status: "active",
  },
  {
    icon: CheckCircle2,
    title: "Appointments",
    status: "active",
  },
  {
    icon: FlaskConical,
    title: "Laboratory Reports",
    status: "pending",
  },
  {
    icon: Pill,
    title: "Pharmacy Stock",
    status: "stable",
  },
  {
    icon: AlertTriangle,
    title: "Insurance Claims",
    status: "under_review",
  },
];

export function OperationalAlerts() {
  return (
    <SectionCard
      title="Operational Alerts"
      description="Current system-wide workflow status."
    >
      <div className="space-y-3">
        {alerts.map((alert) => {
          const Icon = alert.icon;

          return (
            <div
              key={alert.title}
              className="flex items-center justify-between rounded-xl border bg-muted/20 p-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-background">
                  <Icon className="h-4 w-4 text-muted-foreground" />
                </div>

                <p className="text-sm font-medium">{alert.title}</p>
              </div>

              <StatusBadge status={alert.status} />
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}