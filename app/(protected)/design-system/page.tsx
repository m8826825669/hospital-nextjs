import {
  Activity,
  AlertTriangle,
  CheckCircle2,
  Info,
  Users,
} from "lucide-react";

import { PageHeader } from "@/components/common/page-header";
import { SectionCard } from "@/components/common/section-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { StatusBadge } from "@/components/data-display/status-badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DesignSystemPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Design System"
        description="Reusable enterprise UI foundations for HMS SaaS."
        actions={<Button>Primary Action</Button>}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          title="Patients"
          value="1,284"
          icon={Users}
          trend="+8%"
          trendType="positive"
          description="this week"
        />

        <StatCard
          title="Clinical Activity"
          value="Active"
          icon={Activity}
          description="all services online"
        />
      </div>

      <SectionCard
        title="Status System"
        description="Standardized operational statuses."
      >
        <div className="flex flex-wrap gap-2">
          <StatusBadge status="active" />
          <StatusBadge status="pending" />
          <StatusBadge status="approved" />
          <StatusBadge status="rejected" />
          <StatusBadge status="under_review" />
        </div>
      </SectionCard>

      <SectionCard title="Buttons">
        <div className="flex flex-wrap gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="destructive">Destructive</Button>
          <Button variant="ghost">Ghost</Button>
        </div>
      </SectionCard>

      <SectionCard title="Form Controls">
        <div className="grid gap-4 md:grid-cols-2">
          <Input placeholder="Patient name" />
          <Input placeholder="Phone number" />
        </div>
      </SectionCard>

      <SectionCard title="Semantic Colors">
        <div className="grid gap-3 md:grid-cols-3">
          <div className="rounded-xl bg-success p-4 text-success-foreground">
            <CheckCircle2 className="mb-2 h-5 w-5" />
            Success
          </div>

          <div className="rounded-xl bg-warning p-4 text-warning-foreground">
            <AlertTriangle className="mb-2 h-5 w-5" />
            Warning
          </div>

          <div className="rounded-xl bg-info p-4 text-info-foreground">
            <Info className="mb-2 h-5 w-5" />
            Information
          </div>
        </div>
      </SectionCard>
    </div>
  );
}