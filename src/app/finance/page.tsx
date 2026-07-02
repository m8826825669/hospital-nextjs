// src/app/finance/page.tsx

"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ActionMenu,
  ConfirmDialog,
  DataTable,
  FormDrawer,
  PageHeader,
} from "@/shared/components/enterprise";
import { AppShell } from "@/shared/components/layout/app-shell";

import { AccountForm } from "@/features/finance/components/account-form";
import { VoucherForm } from "@/features/finance/components/voucher-form";
import {
  AccountTypeBadge,
  VoucherStatusBadge,
  VoucherTypeBadge,
} from "@/features/finance/components/finance-badges";

import {
  useAccounts,
  useCancelVoucher,
  useCreateAccount,
  useCreateVoucher,
  useDeleteAccount,
  useLedger,
  usePostVoucher,
  useUpdateAccount,
  useVouchers,
} from "@/features/finance/api/finance.queries";

import type {
  Account,
  LedgerEntry,
  Voucher,
} from "@/features/finance/types/finance.types";
import type {
  AccountFormValues,
  VoucherFormValues,
} from "@/features/finance/schemas/finance.schema";

function accountToFormValues(account: Account): Partial<AccountFormValues> {
  return {
    code: account.code,
    name: account.name,
    type: account.type,
    parent_id: account.parent_id ?? "",
    is_active: account.is_active,
  };
}

export default function FinancePage() {
  const [search, setSearch] = useState("");

  const [accountFormOpen, setAccountFormOpen] = useState(false);
  const [voucherFormOpen, setVoucherFormOpen] = useState(false);

  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [deleteAccount, setDeleteAccount] = useState<Account | null>(null);

  const params = useMemo(
    () => ({
      page: 1,
      size: 100,
      search: search || undefined,
    }),
    [search]
  );

  const accountsQuery = useAccounts(params);
  const vouchersQuery = useVouchers(params);
  const ledgerQuery = useLedger(params);

  const createAccount = useCreateAccount();
  const updateAccount = useUpdateAccount();
  const deleteAccountMutation = useDeleteAccount();

  const createVoucher = useCreateVoucher();
  const postVoucher = usePostVoucher();
  const cancelVoucher = useCancelVoucher();

  const accountColumns: ColumnDef<Account>[] = [
    { accessorKey: "code", header: "Code" },
    { accessorKey: "name", header: "Account" },
    {
      accessorKey: "type",
      header: "Type",
      cell: ({ row }) => <AccountTypeBadge type={row.original.type} />,
    },
    { accessorKey: "parent_name", header: "Parent" },
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

  const voucherColumns: ColumnDef<Voucher>[] = [
    { accessorKey: "voucher_number", header: "Voucher" },
    {
      accessorKey: "voucher_type",
      header: "Type",
      cell: ({ row }) => (
        <VoucherTypeBadge type={row.original.voucher_type} />
      ),
    },
    { accessorKey: "voucher_date", header: "Date" },
    { accessorKey: "account_name", header: "Account" },
    {
      accessorKey: "amount",
      header: "Amount",
      cell: ({ row }) => `₹${row.original.amount}`,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <VoucherStatusBadge status={row.original.status} />
      ),
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <ActionMenu
          items={[
            {
              label: "Post Voucher",
              onClick: () => postVoucher.mutate(row.original.id),
            },
            {
              label: "Cancel Voucher",
              danger: true,
              onClick: () => cancelVoucher.mutate(row.original.id),
            },
          ]}
        />
      ),
    },
  ];

  const ledgerColumns: ColumnDef<LedgerEntry>[] = [
    { accessorKey: "voucher_date", header: "Date" },
    { accessorKey: "voucher_number", header: "Voucher" },
    { accessorKey: "account_name", header: "Account" },
    { accessorKey: "description", header: "Description" },
    {
      accessorKey: "debit",
      header: "Debit",
      cell: ({ row }) => `₹${row.original.debit}`,
    },
    {
      accessorKey: "credit",
      header: "Credit",
      cell: ({ row }) => `₹${row.original.credit}`,
    },
    {
      accessorKey: "balance",
      header: "Balance",
      cell: ({ row }) => `₹${row.original.balance}`,
    },
  ];

  async function handleAccountSubmit(values: AccountFormValues) {
    if (selectedAccount) {
      await updateAccount.mutateAsync({
        id: selectedAccount.id,
        payload: values,
      });
    } else {
      await createAccount.mutateAsync(values);
    }

    setAccountFormOpen(false);
    setSelectedAccount(null);
  }

  async function handleVoucherSubmit(values: VoucherFormValues) {
    await createVoucher.mutateAsync(values);
    setVoucherFormOpen(false);
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Finance"
          description="Manage chart of accounts, vouchers, general ledger, receipts, payments, and journals."
        />

        <input
          className="h-10 w-full rounded-md border bg-background px-3 text-sm"
          placeholder="Search finance records..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <Tabs defaultValue="accounts">
          <TabsList>
            <TabsTrigger value="accounts">Chart of Accounts</TabsTrigger>
            <TabsTrigger value="vouchers">Vouchers</TabsTrigger>
            <TabsTrigger value="ledger">General Ledger</TabsTrigger>
          </TabsList>

          <TabsContent value="accounts" className="mt-4 space-y-4">
            <Button
              onClick={() => {
                setSelectedAccount(null);
                setAccountFormOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Account
            </Button>

            <DataTable
              columns={accountColumns}
              data={accountsQuery.data?.items ?? []}
              isLoading={accountsQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No accounts found"
              emptyDescription="Create accounts for finance posting and ledger."
            />
          </TabsContent>

          <TabsContent value="vouchers" className="mt-4 space-y-4">
            <Button onClick={() => setVoucherFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Voucher
            </Button>

            <DataTable
              columns={voucherColumns}
              data={vouchersQuery.data?.items ?? []}
              isLoading={vouchersQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No vouchers found"
              emptyDescription="Receipts, payments, and journals will appear here."
            />
          </TabsContent>

          <TabsContent value="ledger" className="mt-4 space-y-4">
            <DataTable
              columns={ledgerColumns}
              data={ledgerQuery.data?.items ?? []}
              isLoading={ledgerQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No ledger entries found"
              emptyDescription="Posted vouchers will appear in the general ledger."
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
          size="md"
        >
          <AccountForm
            defaultValues={
              selectedAccount ? accountToFormValues(selectedAccount) : undefined
            }
            isSubmitting={createAccount.isPending || updateAccount.isPending}
            onSubmit={handleAccountSubmit}
            onCancel={() => {
              setAccountFormOpen(false);
              setSelectedAccount(null);
            }}
          />
        </FormDrawer>

        <FormDrawer
          open={voucherFormOpen}
          onOpenChange={setVoucherFormOpen}
          title="New Voucher"
          description="Create receipt, payment, or journal voucher."
          size="md"
        >
          <VoucherForm
            isSubmitting={createVoucher.isPending}
            onSubmit={handleVoucherSubmit}
            onCancel={() => setVoucherFormOpen(false)}
          />
        </FormDrawer>

        <ConfirmDialog
          open={Boolean(deleteAccount)}
          onOpenChange={() => setDeleteAccount(null)}
          title="Delete account?"
          description={
            deleteAccount
              ? `This will permanently delete ${deleteAccount.name}.`
              : "This account will be deleted."
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
      </div>
    </AppShell>
  );
}