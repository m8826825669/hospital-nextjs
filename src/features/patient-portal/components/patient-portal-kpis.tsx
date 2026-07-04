import { CalendarDays, CreditCard, FileText, Pill } from "lucide-react";
import { SectionCard } from "@/shared/components/enterprise";
import type { PatientPortalDashboard } from "../types/patient-portal.types";

interface Props {
  dashboard?: PatientPortalDashboard;
}

export function PatientPortalKpis({ dashboard }: Props) {
  const cards = [
    { label: "Appointments", value: dashboard?.upcoming_appointments ?? 0, icon: CalendarDays },
    { label: "Reports", value: dashboard?.pending_reports ?? 0, icon: FileText },
    { label: "Prescriptions", value: dashboard?.active_prescriptions ?? 0, icon: Pill },
    { label: "Unpaid Bills", value: dashboard?.unpaid_bills ?? 0, icon: CreditCard },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <SectionCard key={card.label} className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{card.label}</p>
                <p className="text-2xl font-semibold">{card.value}</p>
              </div>
              <Icon className="h-5 w-5 text-muted-foreground" />
            </div>
          </SectionCard>
        );
      })}
    </div>
  );
}
