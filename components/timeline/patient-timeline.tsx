import {
  Activity,
  CalendarDays,
  CreditCard,
  FileText,
  FlaskConical,
  Pill,
  ShieldCheck,
  UserPlus,
} from "lucide-react";

import type { TimelineItem, TimelineItemType } from "./timeline.types";
import { cn } from "@/lib/utils";

type PatientTimelineProps = {
  items: TimelineItem[];
};

const iconMap: Record<TimelineItemType, typeof UserPlus> = {
  registration: UserPlus,
  appointment: CalendarDays,
  opd: Activity,
  prescription: Pill,
  lab: FlaskConical,
  billing: CreditCard,
  insurance: ShieldCheck,
  ipd: FileText,
  system: FileText,
};

export function PatientTimeline({ items }: PatientTimelineProps) {
  if (!items.length) {
    return (
      <div className="rounded-xl border border-dashed bg-background p-8 text-center">
        <p className="font-medium">No activity yet</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Patient activity will appear here as workflows are completed.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-0">
      {items.map((item, index) => {
        const Icon = item.icon || iconMap[item.type];
        const isLast = index === items.length - 1;

        return (
          <div key={item.id} className="relative flex gap-4">
            <div className="flex flex-col items-center">
              <div
                className={cn(
                  "flex h-9 w-9 items-center justify-center rounded-full border bg-background shadow-sm",
                  item.type === "registration" && "border-primary text-primary",
                  item.type === "appointment" && "border-info text-info",
                  item.type === "opd" && "border-success text-success",
                  item.type === "prescription" && "border-warning text-warning",
                  item.type === "lab" && "border-info text-info",
                  item.type === "billing" && "border-success text-success",
                  item.type === "insurance" && "border-warning text-warning",
                  item.type === "ipd" && "border-primary text-primary"
                )}
              >
                <Icon className="h-4 w-4" />
              </div>

              {!isLast && <div className="h-full min-h-10 w-px bg-border" />}
            </div>

            <div className="pb-6">
              <div className="rounded-xl border bg-background p-4 shadow-sm">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="font-medium">{item.title}</p>

                    {item.description && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        {item.description}
                      </p>
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground">
                    {item.timestamp}
                  </p>
                </div>

                {(item.actor || item.meta) && (
                  <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted-foreground">
                    {item.actor && (
                      <span className="rounded-full border bg-muted px-2 py-1">
                        By {item.actor}
                      </span>
                    )}

                    {item.meta && (
                      <span className="rounded-full border bg-muted px-2 py-1">
                        {item.meta}
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}