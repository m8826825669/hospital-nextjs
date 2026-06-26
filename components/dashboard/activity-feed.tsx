import { CalendarDays, CreditCard, FlaskConical, UserPlus } from "lucide-react";
import { SectionCard } from "@/components/common/section-card";

const activities = [
  {
    icon: UserPlus,
    title: "New patient registered",
    description: "Pervez Ahmad was registered",
    time: "2 min ago",
  },
  {
    icon: CalendarDays,
    title: "Appointment booked",
    description: "OPD appointment scheduled",
    time: "12 min ago",
  },
  {
    icon: CreditCard,
    title: "Payment received",
    description: "Invoice payment recorded",
    time: "24 min ago",
  },
  {
    icon: FlaskConical,
    title: "Lab report pending",
    description: "Sample awaiting approval",
    time: "40 min ago",
  },
];

export function ActivityFeed() {
  return (
    <SectionCard
      title="Recent Activity"
      description="Latest hospital workflow events."
    >
      <div className="space-y-4">
        {activities.map((activity) => {
          const Icon = activity.icon;

          return (
            <div key={activity.title} className="flex gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-muted">
                <Icon className="h-4 w-4 text-muted-foreground" />
              </div>

              <div className="flex-1">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-sm font-medium">{activity.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {activity.time}
                  </p>
                </div>

                <p className="text-sm text-muted-foreground">
                  {activity.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </SectionCard>
  );
}