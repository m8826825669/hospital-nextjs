// src/app/billing/page.tsx

"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";

import {
  ConfirmDialog,
  DataTable,
  ErrorState,
  FormDrawer,
  LoadingState,
  PageHeader,
} from "@/shared/components/enterprise";
import { AppShell } from "@/shared/components/layout/app-shell";
import { Button } from "@/components/ui/button";

import { BillingFilters } from "@/features/billing/components/billing-filters";
import { BillingStats } from "@/features/billing/components/billing-stats";
import { BillingInvoiceForm } from "@/features/billing/components/billing-invoice-form";
import { BillingPaymentForm } from "@/features/billing/components/billing-payment-form";
import { BillingWorkspaceDrawer } from "@/features/billing/components/billing-workspace-drawer";
import { getBillingColumns } from "@/features/billing/components/billing-columns";

import {
  useBillingInvoices,
  useCreateBillingInvoice,
  useCreateBillingPayment,
  useDeleteBillingInvoice,
  useUpdateBillingInvoice,
} from "@/features/billing/api/billing.queries";

import {
  billingInvoiceFormToCreatePayload,
  billingInvoiceFormToUpdatePayload,
  billingInvoiceToFormValues,
  billingPaymentFormToCreatePayload,
} from "@/features/billing/utils/billing.mapper";

import type {
  BillingInvoice,
  BillingInvoiceStatus,
} from "@/features/billing/types/billing.types";
import type {
  BillingInvoiceFormValues,
  BillingPaymentFormValues,
} from "@/features/billing/schemas/billing.schema";

export default function BillingPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [patientId, setPatientId] = useState("");
  const [invoiceDate, setInvoiceDate] = useState("");

  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const [selectedInvoice, setSelectedInvoice] =
    useState<BillingInvoice | null>(null);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);
  const [invoiceFormOpen, setInvoiceFormOpen] = useState(false);
  const [paymentFormOpen, setPaymentFormOpen] = useState(false);
  const [deleteInvoice, setDeleteInvoice] = useState<BillingInvoice | null>(
    null
  );

  const params = useMemo(
    () => ({
      page: pageIndex + 1,
      size: pageSize,
      search: search || undefined,
      status: status ? (status as BillingInvoiceStatus) : undefined,
      patient_id: patientId || undefined,
      invoice_date: invoiceDate || undefined,
    }),
    [pageIndex, pageSize, search, status, patientId, invoiceDate]
  );

  const invoicesQuery = useBillingInvoices(params);
  const createInvoice = useCreateBillingInvoice();
  const updateInvoice = useUpdateBillingInvoice();
  const createPayment = useCreateBillingPayment();
  const deleteInvoiceMutation = useDeleteBillingInvoice();

  const invoices = invoicesQuery.data?.items ?? [];
  const total = invoicesQuery.data?.total ?? 0;
  const pageCount = Math.ceil(total / pageSize);

  const paidInvoices = invoices.filter((invoice) => invoice.status === "paid").length;
  const pendingInvoices = invoices.filter(
    (invoice) =>
      invoice.status === "issued" || invoice.status === "partially_paid"
  ).length;
  const revenue = invoices.reduce(
    (sum, invoice) => sum + invoice.paid_amount,
    0
  );

  const columns = getBillingColumns({
    onView: (invoice) => {
      setSelectedInvoice(invoice);
      setWorkspaceOpen(true);
    },
    onEdit: (invoice) => {
      setSelectedInvoice(invoice);
      setInvoiceFormOpen(true);
    },
    onPayment: (invoice) => {
      setSelectedInvoice(invoice);
      setPaymentFormOpen(true);
    },
    onDelete: (invoice) => {
      setDeleteInvoice(invoice);
    },
  });

  function resetFilters() {
    setSearch("");
    setStatus("");
    setPatientId("");
    setInvoiceDate("");
    setPageIndex(0);
  }

  async function handleInvoiceSubmit(values: BillingInvoiceFormValues) {
    if (selectedInvoice) {
      await updateInvoice.mutateAsync({
        id: selectedInvoice.id,
        payload: billingInvoiceFormToUpdatePayload(values),
      });
    } else {
      await createInvoice.mutateAsync(
        billingInvoiceFormToCreatePayload(values)
      );
    }

    setInvoiceFormOpen(false);
    setSelectedInvoice(null);
  }

  async function handlePaymentSubmit(values: BillingPaymentFormValues) {
    await createPayment.mutateAsync(billingPaymentFormToCreatePayload(values));
    setPaymentFormOpen(false);
    setSelectedInvoice(null);
  }

  async function handleDelete() {
    if (!deleteInvoice) return;

    await deleteInvoiceMutation.mutateAsync(deleteInvoice.id);
    setDeleteInvoice(null);
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Billing"
          description="Manage invoices, invoice items, payments, settlements, and balances."
          actions={
            <Button
              onClick={() => {
                setSelectedInvoice(null);
                setInvoiceFormOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Invoice
            </Button>
          }
        />

        <BillingStats
          totalInvoices={total}
          paidInvoices={paidInvoices}
          pendingInvoices={pendingInvoices}
          revenue={revenue}
        />

        <BillingFilters
          status={status}
          patientId={patientId}
          invoiceDate={invoiceDate}
          onStatusChange={(value) => {
            setStatus(value);
            setPageIndex(0);
          }}
          onPatientChange={(value) => {
            setPatientId(value);
            setPageIndex(0);
          }}
          onInvoiceDateChange={(value) => {
            setInvoiceDate(value);
            setPageIndex(0);
          }}
          onReset={resetFilters}
        />

        {invoicesQuery.isError ? (
          <ErrorState
            title="Could not load billing invoices"
            description="Please check your connection or try again."
            onRetry={() => invoicesQuery.refetch()}
          />
        ) : invoicesQuery.isLoading && invoices.length === 0 ? (
          <LoadingState />
        ) : (
          <DataTable
            columns={columns}
            data={invoices}
            isLoading={invoicesQuery.isLoading}
            search={search}
            onSearchChange={(value) => {
              setSearch(value);
              setPageIndex(0);
            }}
            searchPlaceholder="Search invoice, patient, UHID..."
            enableRowSelection
            pagination={{
              pageIndex,
              pageSize,
              total,
              pageCount,
            }}
            onPaginationChange={(pagination) => {
              setPageIndex(pagination.pageIndex);
              setPageSize(pagination.pageSize);
            }}
            emptyTitle="No invoices found"
            emptyDescription="Try changing filters or create a new invoice."
            getRowId={(row) => row.id}
          />
        )}

        <BillingWorkspaceDrawer
          open={workspaceOpen}
          invoice={selectedInvoice}
          onOpenChange={(open) => {
            setWorkspaceOpen(open);
            if (!open) setSelectedInvoice(null);
          }}
        />

        <FormDrawer
          open={invoiceFormOpen}
          onOpenChange={(open) => {
            setInvoiceFormOpen(open);
            if (!open) setSelectedInvoice(null);
          }}
          title={selectedInvoice ? "Edit Invoice" : "New Invoice"}
          description="Create or update billing invoice."
          size="lg"
        >
          <BillingInvoiceForm
            defaultValues={
              selectedInvoice
                ? billingInvoiceToFormValues(selectedInvoice)
                : undefined
            }
            isSubmitting={createInvoice.isPending || updateInvoice.isPending}
            onSubmit={handleInvoiceSubmit}
            onCancel={() => {
              setInvoiceFormOpen(false);
              setSelectedInvoice(null);
            }}
          />
        </FormDrawer>

        <FormDrawer
          open={paymentFormOpen}
          onOpenChange={(open) => {
            setPaymentFormOpen(open);
            if (!open) setSelectedInvoice(null);
          }}
          title="Record Payment"
          description="Record patient payment against invoice."
          size="md"
        >
          {selectedInvoice && (
            <BillingPaymentForm
              invoiceId={selectedInvoice.id}
              isSubmitting={createPayment.isPending}
              onSubmit={handlePaymentSubmit}
              onCancel={() => {
                setPaymentFormOpen(false);
                setSelectedInvoice(null);
              }}
            />
          )}
        </FormDrawer>

        <ConfirmDialog
          open={Boolean(deleteInvoice)}
          onOpenChange={() => setDeleteInvoice(null)}
          title="Delete invoice?"
          description={
            deleteInvoice
              ? `This will permanently delete invoice ${deleteInvoice.invoice_number}.`
              : "This invoice will be deleted."
          }
          confirmText="Delete"
          danger
          isLoading={deleteInvoiceMutation.isPending}
          onConfirm={handleDelete}
        />
      </div>
    </AppShell>
  );
}