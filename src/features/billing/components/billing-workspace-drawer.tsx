// src/features/billing/components/billing-workspace-drawer.tsx

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
import { IndianRupee, Receipt, UserRound, Wallet } from "lucide-react";
import type { BillingInvoice } from "../types/billing.types";
import { BillingStatusBadge } from "./billing-status-badge";
import {
  useBillingInvoiceItems,
  useBillingInvoicePayments,
} from "../api/billing.queries";

interface BillingWorkspaceDrawerProps {
  open: boolean;
  invoice: BillingInvoice | null;
  onOpenChange: (open: boolean) => void;
}

export function BillingWorkspaceDrawer({
  open,
  invoice,
  onOpenChange,
}: BillingWorkspaceDrawerProps) {
  return (
    <EntityWorkspaceDrawer
      open={open}
      onOpenChange={onOpenChange}
      title={invoice ? "Billing Workspace" : "Billing"}
      description="Invoice details, items, payments, and settlement."
    >
      {!invoice ? null : <BillingWorkspaceContent invoice={invoice} />}
    </EntityWorkspaceDrawer>
  );
}

function BillingWorkspaceContent({ invoice }: { invoice: BillingInvoice }) {
  const itemsQuery = useBillingInvoiceItems(invoice.id);
  const paymentsQuery = useBillingInvoicePayments(invoice.id);

  return (
    <>
      <EntityHeader
        title={invoice.invoice_number}
        subtitle={`${invoice.patient_name} • ${invoice.invoice_date}`}
        status={<BillingStatusBadge status={invoice.status} />}
        meta={
          <>
            <EntityMetaItem
              icon={<UserRound />}
              label="Patient"
              value={invoice.patient_name}
            />
            <EntityMetaItem
              icon={<Receipt />}
              label="Total"
              value={`₹${invoice.total_amount}`}
            />
            <EntityMetaItem
              icon={<Wallet />}
              label="Paid"
              value={`₹${invoice.paid_amount}`}
            />
            <EntityMetaItem
              icon={<IndianRupee />}
              label="Balance"
              value={`₹${invoice.balance_amount}`}
            />
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
              <SectionCard title="Invoice Summary">
                <EntityInfoGrid
                  items={[
                    { label: "Invoice Number", value: invoice.invoice_number },
                    { label: "Patient", value: invoice.patient_name },
                    { label: "UHID", value: invoice.patient_uhid },
                    { label: "Invoice Date", value: invoice.invoice_date },
                    { label: "Due Date", value: invoice.due_date },
                    { label: "Subtotal", value: `₹${invoice.subtotal}` },
                    { label: "Discount", value: `₹${invoice.discount_amount}` },
                    { label: "Tax", value: `₹${invoice.tax_amount}` },
                    { label: "Total", value: `₹${invoice.total_amount}` },
                    { label: "Paid", value: `₹${invoice.paid_amount}` },
                    { label: "Balance", value: `₹${invoice.balance_amount}` },
                    { label: "Notes", value: invoice.notes },
                  ]}
                />
              </SectionCard>
            ),
          },
          {
            value: "items",
            label: "Items",
            content: (
              <SectionCard title="Invoice Items">
                {itemsQuery.isLoading ? (
                  <p className="text-sm text-muted-foreground">
                    Loading invoice items...
                  </p>
                ) : itemsQuery.data?.length ? (
                  <div className="space-y-2">
                    {itemsQuery.data.map((item) => (
                      <div
                        key={item.id}
                        className="rounded-lg border bg-card p-3 text-sm"
                      >
                        <p className="font-medium">{item.description}</p>
                        <p className="text-xs text-muted-foreground">
                          Qty: {item.quantity} • Unit: ₹{item.unit_price} •
                          Total: ₹{item.total_amount}
                        </p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <EntityActivityList
                    items={[]}
                    emptyTitle="No invoice items"
                    emptyDescription="Invoice line items will appear here."
                  />
                )}
              </SectionCard>
            ),
          },
          {
            value: "payments",
            label: "Payments",
            content: (
              <SectionCard title="Payments">
                <EntityActivityList
                  isLoading={paymentsQuery.isLoading}
                  items={paymentsQuery.data?.map((payment) => ({
                    id: payment.id,
                    title: `${payment.method} — ₹${payment.amount}`,
                    description: payment.reference_number || payment.notes || "",
                    created_at: payment.payment_date,
                    created_by_name: payment.received_by_name,
                  }))}
                  emptyTitle="No payments recorded"
                  emptyDescription="Payments and settlement activity will appear here."
                />
              </SectionCard>
            ),
          },
        ]}
      />
    </>
  );
}