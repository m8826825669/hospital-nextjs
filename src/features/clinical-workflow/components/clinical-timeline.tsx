// src/features/clinical-workflow/components/clinical-timeline.tsx

"use client";

import Link from "next/link";
import { Activity } from "lucide-react";
import { EmptyState, SectionCard } from "@/shared/components/enterprise";
import type { ClinicalTimelineItem } from "../types/clinical-workflow.types";
import { ClinicalTimelineBadge } from "./clinical-timeline-badge";

interface ClinicalTimelineProps {
  items?: ClinicalTimelineItem[];
  isLoading?: boolean;
}

export function ClinicalTimeline({ items, isLoading }: ClinicalTimelineProps) {
  if (isLoading) {
    return (
      <SectionCard title="Unified Clinical Timeline">
        <p className="text-sm text-muted-foreground">Loading timeline...</p>
      </SectionCard>
    );
  }

  if (!items?.length) {
    return (
      <SectionCard title="Unified Clinical Timeline">
        <EmptyState
          title="No clinical timeline"
          description="Patient activities across appointments, OPD, IPD, ER, lab, radiology, pharmacy, billing, and insurance will appear here."
        />
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Unified Clinical Timeline"
      description="Cross-module patient journey."
    >
      <div className="space-y-3">
        {items.map((item) => {
          const content = (
            <div className="rounded-xl border bg-card p-4">
              <div className="flex items-start gap-3">
                <div className="mt-1 rounded-full bg-muted p-2">
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="font-medium">{item.title}</p>
                    <ClinicalTimelineBadge type={item.type} />
                    {item.status && (
                      <span className="text-xs text-muted-foreground">
                        {item.status}
                      </span>
                    )}
                  </div>

                  {item.description && (
                    <p className="mt-1 text-sm text-muted-foreground">
                      {item.description}
                    </p>
                  )}

                  <p className="mt-2 text-xs text-muted-foreground">
                    {item.module} • {item.actor_name || "System"} •{" "}
                    {item.occurred_at}
                  </p>
                </div>
              </div>
            </div>
          );

          return item.reference_url ? (
            <Link key={item.id} href={item.reference_url}>
              {content}
            </Link>
          ) : (
            <div key={item.id}>{content}</div>
          );
        })}
      </div>
    </SectionCard>
  );
}