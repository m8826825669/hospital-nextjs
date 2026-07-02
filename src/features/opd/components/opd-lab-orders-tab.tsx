// src/features/opd/components/opd-lab-orders-tab.tsx

"use client";

import { FlaskConical } from "lucide-react";
import { EmptyState, SectionCard, StatusBadge } from "@/shared/components/enterprise";
import type { OpdEncounter } from "../types/opd.types";
import { useOpdLabOrders } from "../api/opd.queries";

export function OpdLabOrdersTab({ encounter }: { encounter: OpdEncounter }) {
  const labOrdersQuery = useOpdLabOrders(encounter.id);

  return (
    <SectionCard title="Lab Orders" description="Lab tests ordered from OPD.">
      {labOrdersQuery.isLoading ? (
        <p className="text-sm text-muted-foreground">Loading lab orders...</p>
      ) : labOrdersQuery.data?.length ? (
        <div className="space-y-2">
          {labOrdersQuery.data.map((order) => (
            <div
              key={order.id}
              className="flex items-center justify-between rounded-lg border bg-card p-3 text-sm"
            >
              <div className="flex items-center gap-3">
                <FlaskConical className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="font-medium">{order.test_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {order.notes || "-"}
                  </p>
                </div>
              </div>

              {order.priority && (
                <StatusBadge
                  label={order.priority}
                  variant={order.priority === "urgent" ? "warning" : "info"}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="No lab orders"
          description="Lab orders from this OPD visit will appear here."
        />
      )}
    </SectionCard>
  );
}