"use client";

import { useMemo, useState } from "react";
import { BookOpen, CalendarDays, Landmark, Scale } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataTable } from "@/shared/components/enterprise";
import {
  useCashBankBookReport,
  useDayBookReport,
  useLedgerReport,
  useTrialBalanceReport,
} from "../api/finance-reports.queries";
import type { FinanceAccount } from "../types/finance.types";
import type {
  CashBankBookAccount,
  DayBookEntry,
  LedgerLine,
  TrialBalanceLine,
} from "../types/finance-reports.types";

interface FinanceReportsPanelProps {
  accounts: FinanceAccount[];
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value || 0);
}

function SummaryCard({ title, value, description, icon: Icon }: { title: string; value: string; description: string; icon: typeof Scale }) {
  return (
    <div className="rounded-xl border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="mt-2 text-2xl font-semibold">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{description}</p>
        </div>
        <div className="rounded-xl bg-muted p-3 text-muted-foreground">
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}

export function FinanceReportsPanel({ accounts }: FinanceReportsPanelProps) {
  const today = new Date().toISOString().slice(0, 10);
  const firstDay = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().slice(0, 10);

  const [accountId, setAccountId] = useState("all");
  const [fromDate, setFromDate] = useState(firstDay);
  const [toDate, setToDate] = useState(today);
  const [asOfDate, setAsOfDate] = useState(today);

  const periodParams = useMemo(
    () => ({
      from_date: fromDate || undefined,
      to_date: toDate || undefined,
      account_id: accountId === "all" ? undefined : accountId,
    }),
    [accountId, fromDate, toDate]
  );

  const trialBalanceQuery = useTrialBalanceReport({ as_of_date: asOfDate || undefined });
  const ledgerQuery = useLedgerReport(periodParams);
  const dayBookQuery = useDayBookReport(periodParams);
  const cashBankBookQuery = useCashBankBookReport(periodParams);

  const ledgerColumns: ColumnDef<LedgerLine>[] = [
    { accessorKey: "entry_date", header: "Date" },
    { accessorKey: "entry_number", header: "Entry" },
    { accessorKey: "account_name", header: "Account" },
    { accessorKey: "description", header: "Description" },
    { accessorKey: "debit", header: "Debit", cell: ({ row }) => formatCurrency(row.original.debit) },
    { accessorKey: "credit", header: "Credit", cell: ({ row }) => formatCurrency(row.original.credit) },
    { accessorKey: "running_balance", header: "Balance", cell: ({ row }) => formatCurrency(row.original.running_balance) },
  ];

  const trialColumns: ColumnDef<TrialBalanceLine>[] = [
    { accessorKey: "account_code", header: "Code" },
    { accessorKey: "account_name", header: "Account" },
    { accessorKey: "account_type", header: "Type" },
    { accessorKey: "debit", header: "Debit", cell: ({ row }) => formatCurrency(row.original.debit) },
    { accessorKey: "credit", header: "Credit", cell: ({ row }) => formatCurrency(row.original.credit) },
    { accessorKey: "balance", header: "Balance", cell: ({ row }) => formatCurrency(row.original.balance) },
  ];

  const dayBookColumns: ColumnDef<DayBookEntry>[] = [
    { accessorKey: "entry_date", header: "Date" },
    { accessorKey: "entry_number", header: "Entry" },
    { accessorKey: "reference", header: "Reference" },
    { accessorKey: "description", header: "Description" },
    { accessorKey: "status", header: "Status" },
    { accessorKey: "total_debit", header: "Debit", cell: ({ row }) => formatCurrency(row.original.total_debit) },
    { accessorKey: "total_credit", header: "Credit", cell: ({ row }) => formatCurrency(row.original.total_credit) },
  ];

  const cashBankColumns: ColumnDef<CashBankBookAccount>[] = [
    { accessorKey: "account_code", header: "Code" },
    { accessorKey: "account_name", header: "Cash/Bank Account" },
    { accessorKey: "total_debit", header: "Receipts", cell: ({ row }) => formatCurrency(row.original.total_debit) },
    { accessorKey: "total_credit", header: "Payments", cell: ({ row }) => formatCurrency(row.original.total_credit) },
    { accessorKey: "balance", header: "Balance", cell: ({ row }) => formatCurrency(row.original.balance) },
  ];

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        <SummaryCard title="Trial Debit" value={formatCurrency(trialBalanceQuery.data?.total_debit ?? 0)} description="As of selected date" icon={Scale} />
        <SummaryCard title="Trial Credit" value={formatCurrency(trialBalanceQuery.data?.total_credit ?? 0)} description="As of selected date" icon={Scale} />
        <SummaryCard title="Day Book Debit" value={formatCurrency(dayBookQuery.data?.total_debit ?? 0)} description="Selected period" icon={CalendarDays} />
        <SummaryCard title="Cash/Bank" value={formatCurrency(cashBankBookQuery.data?.balance ?? 0)} description="Current movement balance" icon={Landmark} />
      </div>

      <div className="rounded-xl border bg-card p-4 shadow-sm">
        <div className="grid gap-4 md:grid-cols-4">
          <select className="h-10 rounded-md border bg-background px-3 text-sm" value={accountId} onChange={(event) => setAccountId(event.target.value)}>
            <option value="all">All Accounts</option>
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>{account.code} - {account.name}</option>
            ))}
          </select>
          <input className="h-10 rounded-md border bg-background px-3 text-sm" type="date" value={fromDate} onChange={(event) => setFromDate(event.target.value)} />
          <input className="h-10 rounded-md border bg-background px-3 text-sm" type="date" value={toDate} onChange={(event) => setToDate(event.target.value)} />
          <input className="h-10 rounded-md border bg-background px-3 text-sm" type="date" value={asOfDate} onChange={(event) => setAsOfDate(event.target.value)} />
        </div>
      </div>

      <Tabs defaultValue="trial-balance" className="space-y-4">
        <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 rounded-xl bg-muted/40 p-2">
          <TabsTrigger value="trial-balance"><Scale className="mr-2 h-4 w-4" />Trial Balance</TabsTrigger>
          <TabsTrigger value="ledger"><BookOpen className="mr-2 h-4 w-4" />Ledger</TabsTrigger>
          <TabsTrigger value="day-book"><CalendarDays className="mr-2 h-4 w-4" />Day Book</TabsTrigger>
          <TabsTrigger value="cash-bank"><Landmark className="mr-2 h-4 w-4" />Cash/Bank Book</TabsTrigger>
        </TabsList>

        <TabsContent value="trial-balance">
          <DataTable columns={trialColumns} data={trialBalanceQuery.data?.lines ?? []} isLoading={trialBalanceQuery.isLoading} emptyTitle="No trial balance data" emptyDescription="Post journal entries to generate a trial balance." />
        </TabsContent>
        <TabsContent value="ledger">
          <DataTable columns={ledgerColumns} data={ledgerQuery.data?.lines ?? []} isLoading={ledgerQuery.isLoading} emptyTitle="No ledger entries" emptyDescription="Select a period or account after posting journals." />
        </TabsContent>
        <TabsContent value="day-book">
          <DataTable columns={dayBookColumns} data={dayBookQuery.data?.entries ?? []} isLoading={dayBookQuery.isLoading} emptyTitle="No day book entries" emptyDescription="Journal entries will appear here by date." />
        </TabsContent>
        <TabsContent value="cash-bank">
          <DataTable columns={cashBankColumns} data={cashBankBookQuery.data?.accounts ?? []} isLoading={cashBankBookQuery.isLoading} emptyTitle="No cash/bank movement" emptyDescription="Asset accounts with posted entries will appear here." />
        </TabsContent>
      </Tabs>
    </div>
  );
}
