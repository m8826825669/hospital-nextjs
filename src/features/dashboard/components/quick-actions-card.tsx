// src/features/dashboard/components/quick-actions-card.tsx

import Link from "next/link";
import { SectionCard } from "@/shared/components/enterprise";

const actions = [
  { label: "Register Patient", href: "/patients", description: "Create or search patient records." },
  { label: "New Appointment", href: "/appointments", description: "Schedule patient appointment." },
  { label: "OPD Encounter", href: "/opd", description: "Open outpatient encounter." },
  { label: "New Admission", href: "/ipd", description: "Start inpatient admission." },
  { label: "Lab Sample", href: "/lis", description: "Create or process lab sample." },
  { label: "Billing Invoice", href: "/billing", description: "Create or review invoice." },
];

export function QuickActionsCard() {
  return (
    <SectionCard title="Quick Actions" description="Common HMS workflows.">
      <div className="grid gap-3 md:grid-cols-2">
        {actions.map((action) => (
          <Link
            key={action.href + action.label}
            href={action.href}
            className="rounded-lg border bg-card p-3 transition hover:bg-muted/50"
          >
            <p className="font-medium">{action.label}</p>
            <p className="text-sm text-muted-foreground">{action.description}</p>
          </Link>
        ))}
      </div>
    </SectionCard>
  );
}