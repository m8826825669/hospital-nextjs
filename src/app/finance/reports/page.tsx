"use client";

import { PageHeader } from "@/shared/components/enterprise";
import { AppShell } from "@/shared/components/layout/app-shell";
import { useAccounts } from "@/features/finance/api/finance.queries";
import { FinanceReportsPanel } from "@/features/finance/components/finance-reports-panel";

export default function FinanceReportsPage() {
  const accountsQuery = useAccounts({ page: 1, size: 500 });

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Finance Reports"
          description="Review ledger, trial balance, day book, and cash/bank movement."
        />
        <FinanceReportsPanel accounts={accountsQuery.data?.items ?? []} />
      </div>
    </AppShell>
  );
}
