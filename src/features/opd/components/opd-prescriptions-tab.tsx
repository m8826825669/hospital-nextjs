// src/features/opd/components/opd-prescriptions-tab.tsx

"use client";

import { Pill } from "lucide-react";
import { EmptyState, SectionCard } from "@/shared/components/enterprise";
import type { OpdEncounter } from "../types/opd.types";
import { useOpdPrescriptions } from "../api/opd.queries";

export function OpdPrescriptionsTab({
  encounter,
}: {
  encounter: OpdEncounter;
}) {
  const prescriptionsQuery = useOpdPrescriptions(encounter.id);

  return (
    <SectionCard title="Prescriptions" description="Medicines prescribed in OPD.">
      {prescriptionsQuery.isLoading ? (
        <p className="text-sm text-muted-foreground">
          Loading prescriptions...
        </p>
      ) : prescriptionsQuery.data?.length ? (
        <div className="space-y-2">
          {prescriptionsQuery.data.map((item) => (
            <div
              key={item.id}
              className="flex items-start gap-3 rounded-lg border bg-card p-3 text-sm"
            >
              <Pill className="mt-0.5 h-4 w-4 text-muted-foreground" />
              <div>
                <p className="font-medium">{item.medicine_name}</p>
                <p className="text-xs text-muted-foreground">
                  {[item.dosage, item.frequency, item.duration]
                    .filter(Boolean)
                    .join(" • ") || "-"}
                </p>
                {item.instructions && (
                  <p className="mt-1 text-sm text-muted-foreground">
                    {item.instructions}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No prescriptions"
          description="Prescribed medicines will appear here."
        />
      )}
    </SectionCard>
  );
}