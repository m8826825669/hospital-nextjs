// src/app/finance/page.tsx

"use client";

import { useMemo, useState } from "react";
import { BookOpen, Building2, Calculator, Plus, Scale } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ActionMenu,
  ConfirmDialog,
  DataTable,
  FormDrawer,
  PageHeader,
  StatCard,
} from "@/shared/components/enterprise";
import { AppShell } from "@/shared/components/layout/app-shell";

import { useDepartments } from "@/features/admin/api/admin.queries";
import { AccountForm } from "@/features/finance/components/account-form";
import { CostCenterForm } from "@/features/finance/components/cost-center-form";
import { JournalEntryForm } from "@/features/finance/components/journal-entry-form";
import {
  AccountTypeBadge,
  JournalStatusBadge,
} from "@/features/finance/components/finance-badges";
import {
  useAccounts,
  useCostCenters,
  useCreateAccount,
  useCreateCostCenter,
  useCreateJournalEntry,
  useDeleteAccount,
  useDeleteCostCenter,
  useFinanceDashboard,
  useJournalEntries,
  useUpdateAccount,
  useUpdateCostCenter,
} from "@/features/finance/api/finance.queries";
import type {
  CostCenter,
  FinanceAccount,
  JournalEntry,
  AccountType,
  JournalStatus,
} from "@/features/finance/types/finance.types";
import type {
  AccountFormValues,
  CostCenterFormValues,
  JournalEntryFormValues,
} from "@/features/finance/schemas/finance.schema";

function formatCurrency(value: number | undefined) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 2,
  }).format(value ?? 0);
}

function accountToFormValues(account: FinanceAccount): Partial<AccountFormValues> {
  return {
    code: account.code,
    name: account.name,
    account_type: account.account_type,
    parent_id: account.parent_id ?? "",
    description: account.description ?? "",
    is_active: account.is_active,
  };
}

function costCenterToFormValues(costCenter: CostCenter): Partial<CostCenterFormValues> {
  return {
    code: costCenter.code,
    name: costCenter.name,
    department_id: costCenter.department_id ?? "",
    description: costCenter.description ?? "",
    is_active: costCenter.is_active,
  };
}

export default function FinancePage() {
  const today = new Date().toISOString().slice(0, 10);
  const [search, setSearch] = useState("");
  const [accountType, setAccountType] = useState("all");
  const [journalStatus, setJournalStatus] = useState("all");
  const [entryDate, setEntryDate] = useState(today);

  const [accountFormOpen, setAccountFormOpen] = useState(false);
  const [costCenterFormOpen, setCostCenterFormOpen] = useState(false);
  const [journalFormOpen, setJournalFormOpen] = useState(false);

  const [selectedAccount, setSelectedAccount] = useState<FinanceAccount | null>(null);
  const [selectedCostCenter, setSelectedCostCenter] = useState<CostCenter | null>(null);
  const [deleteAccount, setDeleteAccount] = useState<FinanceAccount | null>(null);
  const [deleteCostCenter, setDeleteCostCenter] = useState<CostCenter | null>(null);

  const params = useMemo(
    () => ({
      page: 1,
      size: 100,
      search: search || undefined,
    }),
    [search]
  );

 const accountParams = useMemo(
  () => ({
    page: 1,
    size: 100,
    search: search || undefined,
    account_type: accountType === "all" ? undefined : (accountType as AccountType),
  }),
  [search, accountType]
);

const journalParams = useMemo(
  () => ({
    page: 1,
    size: 100,
    search: search || undefined,
    status: journalStatus === "all" ? undefined : (journalStatus as JournalStatus),
  }),
  [search, journalStatus]
);

  const departmentsQuery = useDepartments({ page: 1, size: 100 });
  const dashboardQuery = useFinanceDashboard();
  const accountsQuery = useAccounts(accountParams);
  const costCentersQuery = useCostCenters(params);
  const journalEntriesQuery = useJournalEntries(journalParams);

  const createAccount = useCreateAccount();
  const updateAccount = useUpdateAccount();
  const deleteAccountMutation = useDeleteAccount();
  const createCostCenter = useCreateCostCenter();
  const updateCostCenter = useUpdateCostCenter();
  const deleteCostCenterMutation = useDeleteCostCenter();
  const createJournalEntry = useCreateJournalEntry();

  const dashboard = dashboardQuery.data;
  const departments = departmentsQuery.data?.items ?? [];
  const accounts = accountsQuery.data?.items ?? [];
  const costCenters = costCentersQuery.data?.items ?? [];

  const accountColumns: ColumnDef<FinanceAccount>[] = [
    { accessorKey: "code", header: "Code" },
    { accessorKey: "name", header: "Account" },
    {
      accessorKey: "account_type",
      header: "Type",
      cell: ({ row }) => <AccountTypeBadge type={row.original.account_type} />,
    },
    { accessorKey: "description", header: "Description" },
    {
      accessorKey: "is_active",
      header: "Active",
      cell: ({ row }) => (row.original.is_active ? "Yes" : "No"),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <ActionMenu
          items={[
            {
              label: "Edit",
              onClick: () => {
                setSelectedAccount(row.original);
                setAccountFormOpen(true);
              },
            },
            {
              label: "Delete",
              danger: true,
              onClick: () => setDeleteAccount(row.original),
            },
          ]}
        />
      ),
    },
  ];

  const costCenterColumns: ColumnDef<CostCenter>[] = [
    { accessorKey: "code", header: "Code" },
    { accessorKey: "name", header: "Cost Center" },
    {
      accessorKey: "department_id",
      header: "Department",
      cell: ({ row }) => {
        const department = departments.find((item) => item.id === row.original.department_id);
        return department?.name ?? "-";
      },
    },
    { accessorKey: "description", header: "Description" },
    {
      accessorKey: "is_active",
      header: "Active",
      cell: ({ row }) => (row.original.is_active ? "Yes" : "No"),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <ActionMenu
          items={[
            {
              label: "Edit",
              onClick: () => {
                setSelectedCostCenter(row.original);
                setCostCenterFormOpen(true);
              },
            },
            {
              label: "Delete",
              danger: true,
              onClick: () => setDeleteCostCenter(row.original),
            },
          ]}
        />
      ),
    },
  ];

  const journalColumns: ColumnDef<JournalEntry>[] = [
    { accessorKey: "entry_number", header: "Entry No" },
    { accessorKey: "entry_date", header: "Date" },
    { accessorKey: "reference", header: "Reference" },
    { accessorKey: "description", header: "Description" },
    {
      accessorKey: "total_debit",
      header: "Debit",
      cell: ({ row }) => formatCurrency(row.original.total_debit),
    },
    {
      accessorKey: "total_credit",
      header: "Credit",
      cell: ({ row }) => formatCurrency(row.original.total_credit),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <JournalStatusBadge status={row.original.status} />,
    },
  ];

  async function handleAccountSubmit(values: AccountFormValues) {
    if (selectedAccount) {
      await updateAccount.mutateAsync({ id: selectedAccount.id, payload: values });
    } else {
      await createAccount.mutateAsync(values);
    }

    setAccountFormOpen(false);
    setSelectedAccount(null);
  }

  async function handleCostCenterSubmit(values: CostCenterFormValues) {
    if (selectedCostCenter) {
      await updateCostCenter.mutateAsync({ id: selectedCostCenter.id, payload: values });
    } else {
      await createCostCenter.mutateAsync(values);
    }

    setCostCenterFormOpen(false);
    setSelectedCostCenter(null);
  }

  async function handleJournalSubmit(values: JournalEntryFormValues) {
    await createJournalEntry.mutateAsync(values);
    setJournalFormOpen(false);
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Finance"
          description="Manage chart of accounts, cost centers, journal entries, and finance controls."
        />

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <StatCard
            title="Accounts"
            value={dashboard?.total_accounts ?? 0}
            description="Chart of accounts"
            icon={<BookOpen className="h-5 w-5" />}
          />
          <StatCard
            title="Cost Centers"
            value={dashboard?.active_cost_centers ?? 0}
            description="Active centers"
            icon={<Building2 className="h-5 w-5" />}
          />
          <StatCard
            title="Journal Entries"
            value={dashboard?.journal_entries ?? 0}
            description="Finance postings"
            icon={<Calculator className="h-5 w-5" />}
          />
          <StatCard
            title="Total Debit"
            value={formatCurrency(dashboard?.total_debit)}
            description="Posted value"
            icon={<Scale className="h-5 w-5" />}
          />
          <StatCard
            title="Balance Diff"
            value={formatCurrency(dashboard?.balance_difference)}
            description="Debit - credit"
            icon={<Scale className="h-5 w-5" />}
          />
        </div>

        <div className="rounded-xl border bg-card p-4 shadow-sm">
          <div className="grid gap-3 lg:grid-cols-[1fr_180px_180px_180px]">
            <input
              className="h-10 rounded-md border bg-background px-3 text-sm"
              placeholder="Search finance records by code, name, reference..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <select
              className="h-10 rounded-md border bg-background px-3 text-sm"
              value={accountType}
              onChange={(event) => setAccountType(event.target.value)}
            >
              <option value="all">All Account Types</option>
              <option value="asset">Asset</option>
              <option value="liability">Liability</option>
              <option value="equity">Equity</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            <select
              className="h-10 rounded-md border bg-background px-3 text-sm"
              value={journalStatus}
              onChange={(event) => setJournalStatus(event.target.value)}
            >
              <option value="all">All Journal Statuses</option>
              <option value="draft">Draft</option>
              <option value="posted">Posted</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <input
              className="h-10 rounded-md border bg-background px-3 text-sm"
              type="date"
              value={entryDate}
              onChange={(event) => setEntryDate(event.target.value)}
            />
          </div>
        </div>

        <Tabs defaultValue="accounts" className="space-y-6">
          <TabsList className="flex h-auto w-full flex-wrap justify-start gap-2 rounded-xl bg-muted/40 p-2">
            <TabsTrigger className="h-9 flex-none px-4" value="accounts">Chart of Accounts</TabsTrigger>
            <TabsTrigger className="h-9 flex-none px-4" value="cost-centers">Cost Centers</TabsTrigger>
            <TabsTrigger className="h-9 flex-none px-4" value="journals">Journal Entries</TabsTrigger>
          </TabsList>

          <TabsContent value="accounts" className="space-y-4">
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  setSelectedAccount(null);
                  setAccountFormOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Account
              </Button>
            </div>
            <DataTable
              columns={accountColumns}
              data={accounts}
              isLoading={accountsQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No accounts found"
              emptyDescription="Create accounts for ledger and finance posting."
            />
          </TabsContent>

          <TabsContent value="cost-centers" className="space-y-4">
            <div className="flex justify-end">
              <Button
                onClick={() => {
                  setSelectedCostCenter(null);
                  setCostCenterFormOpen(true);
                }}
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Cost Center
              </Button>
            </div>
            <DataTable
              columns={costCenterColumns}
              data={costCenters}
              isLoading={costCentersQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No cost centers found"
              emptyDescription="Create cost centers for department-wise accounting."
            />
          </TabsContent>

          <TabsContent value="journals" className="space-y-4">
            <div className="flex justify-end">
              <Button onClick={() => setJournalFormOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                New Journal Entry
              </Button>
            </div>
            <DataTable
              columns={journalColumns}
              data={journalEntriesQuery.data?.items ?? []}
              isLoading={journalEntriesQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No journal entries found"
              emptyDescription="Balanced journal entries will appear here."
            />
          </TabsContent>
        </Tabs>

        <FormDrawer
          open={accountFormOpen}
          onOpenChange={(open) => {
            setAccountFormOpen(open);
            if (!open) setSelectedAccount(null);
          }}
          title={selectedAccount ? "Edit Account" : "Add Account"}
          description="Create or update chart of accounts."
          size="lg"
        >
          <AccountForm
            accounts={accounts}
            defaultValues={selectedAccount ? accountToFormValues(selectedAccount) : undefined}
            isSubmitting={createAccount.isPending || updateAccount.isPending}
            onSubmit={handleAccountSubmit}
            onCancel={() => {
              setAccountFormOpen(false);
              setSelectedAccount(null);
            }}
          />
        </FormDrawer>

        <FormDrawer
          open={costCenterFormOpen}
          onOpenChange={(open) => {
            setCostCenterFormOpen(open);
            if (!open) setSelectedCostCenter(null);
          }}
          title={selectedCostCenter ? "Edit Cost Center" : "Add Cost Center"}
          description="Create department or operational cost centers."
          size="lg"
        >
          <CostCenterForm
            departments={departments}
            defaultValues={selectedCostCenter ? costCenterToFormValues(selectedCostCenter) : undefined}
            isSubmitting={createCostCenter.isPending || updateCostCenter.isPending}
            onSubmit={handleCostCenterSubmit}
            onCancel={() => {
              setCostCenterFormOpen(false);
              setSelectedCostCenter(null);
            }}
          />
        </FormDrawer>

        <FormDrawer
          open={journalFormOpen}
          onOpenChange={setJournalFormOpen}
          title="New Journal Entry"
          description="Create a balanced accounting journal entry."
          size="wide"
        >
          <JournalEntryForm
            accounts={accounts}
            costCenters={costCenters}
            isSubmitting={createJournalEntry.isPending}
            onSubmit={handleJournalSubmit}
            onCancel={() => setJournalFormOpen(false)}
          />
        </FormDrawer>

        <ConfirmDialog
          open={Boolean(deleteAccount)}
          onOpenChange={() => setDeleteAccount(null)}
          title="Delete account?"
          description={
            deleteAccount
              ? `This will deactivate ${deleteAccount.name}.`
              : "This account will be deactivated."
          }
          confirmText="Delete"
          danger
          isLoading={deleteAccountMutation.isPending}
          onConfirm={async () => {
            if (!deleteAccount) return;
            await deleteAccountMutation.mutateAsync(deleteAccount.id);
            setDeleteAccount(null);
          }}
        />

        <ConfirmDialog
          open={Boolean(deleteCostCenter)}
          onOpenChange={() => setDeleteCostCenter(null)}
          title="Delete cost center?"
          description={
            deleteCostCenter
              ? `This will deactivate ${deleteCostCenter.name}.`
              : "This cost center will be deactivated."
          }
          confirmText="Delete"
          danger
          isLoading={deleteCostCenterMutation.isPending}
          onConfirm={async () => {
            if (!deleteCostCenter) return;
            await deleteCostCenterMutation.mutateAsync(deleteCostCenter.id);
            setDeleteCostCenter(null);
          }}
        />
      </div>
    </AppShell>
  );
}
