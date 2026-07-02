// src/features/billing/components/billing-stats.tsx

import { Receipt, CheckCircle2, AlertCircle, IndianRupee } from "lucide-react";
import { StatCard } from "@/shared/components/enterprise";

interface BillingStatsProps {
  totalInvoices: number;
  paidInvoices: number;
  pendingInvoices: number;
  revenue: number;
}

export function BillingStats({
  totalInvoices,
  paidInvoices,
  pendingInvoices,
  revenue,
}: BillingStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Invoices"
        value={totalInvoices}
        description="Matching filters"
        icon={<Receipt className="h-5 w-5" />}
      />

      <StatCard
        title="Paid"
        value={paidInvoices}
        description="Paid invoices"
        icon={<CheckCircle2 className="h-5 w-5" />}
      />

      <StatCard
        title="Pending"
        value={pendingInvoices}
        description="Open balances"
        icon={<AlertCircle className="h-5 w-5" />}
      />

      <StatCard
        title="Revenue"
        value={`₹${revenue}`}
        description="Visible invoice total"
        icon={<IndianRupee className="h-5 w-5" />}
      />
    </div>
  );
}