// src/features/clinical-workflow/components/clinical-workflow-launcher.tsx

"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { SectionCard } from "@/shared/components/enterprise";
import { clinicalWorkflowActions } from "../constants/clinical-workflow.constants";

export function ClinicalWorkflowLauncher({
  patientId,
}: {
  patientId?: string;
}) {
  return (
    <SectionCard
      title="Clinical Workflow Launcher"
      description="Move patient across clinical, diagnostic, pharmacy, and billing workflows."
    >
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
        {clinicalWorkflowActions.map((action) => {
          const href = patientId
            ? `${action.href}?patient_id=${encodeURIComponent(patientId)}`
            : action.href;

          return (
            <Link
              key={action.id}
              href={href}
              className="rounded-xl border bg-card p-4 transition hover:bg-muted/50"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-medium">{action.label}</p>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {action.description}
                  </p>
                </div>

                <ArrowRight className="mt-1 h-4 w-4 text-muted-foreground" />
              </div>
            </Link>
          );
        })}
      </div>
    </SectionCard>
  );
}