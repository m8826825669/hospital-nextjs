// src/features/pharmacy/components/medicine-workspace-drawer.tsx

"use client";

import {
  EntityHeader,
  EntityInfoGrid,
  EntityMetaItem,
  EntityWorkspaceDrawer,
  EntityWorkspaceTabs,
  SectionCard,
  EntityActivityList,
} from "@/shared/components/enterprise";
import { Boxes, Factory, Pill } from "lucide-react";
import type { Medicine } from "../types/pharmacy.types";
import { MedicineStatusBadge } from "./medicine-status-badge";
import {
  useMedicineBatches,
  useMedicineTransactions,
} from "../api/pharmacy.queries";

interface MedicineWorkspaceDrawerProps {
  open: boolean;
  medicine: Medicine | null;
  onOpenChange: (open: boolean) => void;
}

export function MedicineWorkspaceDrawer({
  open,
  medicine,
  onOpenChange,
}: MedicineWorkspaceDrawerProps) {
  return (
    <EntityWorkspaceDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={medicine ? "Medicine Workspace" : "Medicine"}
      description="Medicine details, batches, stock movements, and activity."
    >
      {!medicine ? null : <MedicineWorkspaceContent medicine={medicine} />}
    </EntityWorkspaceDrawer>
  );
}

function MedicineWorkspaceContent({ medicine }: { medicine: Medicine }) {
  const batchesQuery = useMedicineBatches(medicine.id);
  const transactionsQuery = useMedicineTransactions(medicine.id);

  return (
    <>
      <EntityHeader
        title={medicine.name}
        subtitle={medicine.generic_name || medicine.brand_name || "Medicine Master"}
        status={<MedicineStatusBadge status={medicine.status} />}
        meta={
          <>
            <EntityMetaItem icon={<Pill />} label="Form" value={medicine.dosage_form} />
            <EntityMetaItem icon={<Boxes />} label="Strength" value={medicine.strength} />
            <EntityMetaItem icon={<Factory />} label="Manufacturer" value={medicine.manufacturer} />
            <EntityMetaItem label="Category" value={medicine.category_name} />
          </>
        }
      />

      <EntityWorkspaceTabs
        defaultValue="overview"
        tabs={[
          {
            value: "overview",
            label: "Overview",
            content: (
              <SectionCard title="Medicine Summary">
                <EntityInfoGrid
                  items={[
                    { label: "Name", value: medicine.name },
                    { label: "Generic Name", value: medicine.generic_name },
                    { label: "Brand Name", value: medicine.brand_name },
                    { label: "Category", value: medicine.category_name },
                    { label: "Dosage Form", value: medicine.dosage_form },
                    { label: "Strength", value: medicine.strength },
                    { label: "Unit", value: medicine.unit },
                    { label: "Reorder Level", value: medicine.reorder_level },
                  ]}
                />
              </SectionCard>
            ),
          },
          {
            value: "batches",
            label: "Batches",
            content: (
              <SectionCard title="Batches">
                {batchesQuery.isLoading ? (
                  <p className="text-sm text-muted-foreground">Loading batches...</p>
                ) : batchesQuery.data?.length ? (
                  <div className="space-y-2">
                    {batchesQuery.data.map((batch) => (
                      <div key={batch.id} className="rounded-lg border bg-card p-3 text-sm">
                        <p className="font-medium">{batch.batch_number}</p>
                        <p className="text-xs text-muted-foreground">
                          Exp: {batch.expiry_date} • Qty: {batch.quantity_available} • ₹{batch.selling_price}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EntityActivityList items={[]} emptyTitle="No batches" emptyDescription="Medicine batches will appear here." />
                )}
              </SectionCard>
            ),
          },
          {
            value: "transactions",
            label: "Stock",
            content: (
              <SectionCard title="Stock Transactions">
                <EntityActivityList
                  isLoading={transactionsQuery.isLoading}
                  items={transactionsQuery.data?.map((item) => ({
                    id: item.id,
                    title: `${item.transaction_type} — ${item.quantity}`,
                    description: item.notes || item.batch_number || "",
                    created_at: item.created_at,
                  }))}
                  emptyTitle="No stock transactions"
                  emptyDescription="Purchases, sales, returns, and adjustments will appear here."
                />
              </SectionCard>
            ),
          },
        ]}
      />
    </>
  );
}