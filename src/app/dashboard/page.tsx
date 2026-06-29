// src/app/dashboard/page.tsx

import { AppShell } from "@/shared/components/layout/app-shell";
import {
  PageHeader,
  StatCard,
  SectionCard,
  EmptyState,
} from "@/shared/components/enterprise";
import {
  Users,
  CalendarDays,
  Stethoscope,
  IndianRupee,
} from "lucide-react";

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Enterprise Dashboard"
          description="Overview of hospital operations, activity, and performance."
        />

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Patients"
            value="0"
            description="Registered patients"
            icon={<Users className="h-5 w-5" />}
          />

          <StatCard
            title="Appointments"
            value="0"
            description="Today’s appointments"
            icon={<CalendarDays className="h-5 w-5" />}
          />

          <StatCard
            title="Doctors"
            value="0"
            description="Active consultants"
            icon={<Stethoscope className="h-5 w-5" />}
          />

          <StatCard
            title="Revenue"
            value="₹0"
            description="Today’s billing"
            icon={<IndianRupee className="h-5 w-5" />}
          />
        </div>

        <SectionCard
          title="Recent Activity"
          description="Latest actions from the HMS workspace."
        >
          <EmptyState
            title="No recent activity"
            description="Activity logs will appear here once users begin working."
          />
        </SectionCard>
      </div>
    </AppShell>
  );
}