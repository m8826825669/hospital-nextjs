// src/app/radiology/page.tsx

"use client";

import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import type { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  ActionMenu,
  ConfirmDialog,
  DataTable,
  FormDrawer,
  PageHeader,
} from "@/shared/components/enterprise";
import { AppShell } from "@/shared/components/layout/app-shell";

import {
  RadiologyModalityBadge,
  RadiologyStatusBadge,
} from "@/features/radiology/components/radiology-badges";
import { RadiologyOrderForm } from "@/features/radiology/components/radiology-order-form";
import { RadiologyReportForm } from "@/features/radiology/components/radiology-report-form";
import { RadiologyWorkspaceDrawer } from "@/features/radiology/components/radiology-workspace-drawer";

import {
  useCreateRadiologyOrder,
  useDeleteRadiologyOrder,
  useRadiologyOrders,
  useSaveRadiologyReport,
  useUpdateRadiologyOrder,
  useUpdateRadiologyStatus,
} from "@/features/radiology/api/radiology.queries";

import type {
  RadiologyModality,
  RadiologyOrder,
  RadiologyOrderStatus,
} from "@/features/radiology/types/radiology.types";
import type {
  RadiologyOrderFormValues,
  RadiologyReportFormValues,
} from "@/features/radiology/schemas/radiology.schema";

function orderToFormValues(
  order: RadiologyOrder
): Partial<RadiologyOrderFormValues> {
  return {
    patient_id: order.patient_id,
    doctor_id: order.doctor_id ?? "",
    modality: order.modality,
    study_name: order.study_name,
    body_part: order.body_part ?? "",
    order_date: order.order_date,
    scheduled_date: order.scheduled_date ?? "",
    scheduled_time: order.scheduled_time ?? "",
    priority: order.priority,
    clinical_notes: order.clinical_notes ?? "",
  };
}

function reportToFormValues(
  order: RadiologyOrder
): Partial<RadiologyReportFormValues> {
  return {
    report_text: order.report_text ?? "",
    impression: order.impression ?? "",
    radiologist_id: order.radiologist_id ?? "",
  };
}

export default function RadiologyPage() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [modality, setModality] = useState("");

  const [orderFormOpen, setOrderFormOpen] = useState(false);
  const [reportFormOpen, setReportFormOpen] = useState(false);
  const [workspaceOpen, setWorkspaceOpen] = useState(false);

  const [selectedOrder, setSelectedOrder] = useState<RadiologyOrder | null>(null);
  const [deleteOrder, setDeleteOrder] = useState<RadiologyOrder | null>(null);

  const params = useMemo(
    () => ({
      page: 1,
      size: 100,
      search: search || undefined,
      status: status ? (status as RadiologyOrderStatus) : undefined,
      modality: modality ? (modality as RadiologyModality) : undefined,
    }),
    [search, status, modality]
  );

  const ordersQuery = useRadiologyOrders(params);
  const createOrder = useCreateRadiologyOrder();
  const updateOrder = useUpdateRadiologyOrder();
  const deleteOrderMutation = useDeleteRadiologyOrder();
  const saveReport = useSaveRadiologyReport();
  const updateStatus = useUpdateRadiologyStatus();

  const columns: ColumnDef<RadiologyOrder>[] = [
    { accessorKey: "order_number", header: "Order" },
    {
      accessorKey: "patient_name",
      header: "Patient",
      cell: ({ row }) => (
        <div>
          <p className="font-medium">{row.original.patient_name}</p>
          <p className="text-xs text-muted-foreground">
            {row.original.patient_uhid || "-"}
          </p>
        </div>
      ),
    },
    { accessorKey: "study_name", header: "Study" },
    {
      accessorKey: "modality",
      header: "Modality",
      cell: ({ row }) => <RadiologyModalityBadge modality={row.original.modality} />,
    },
    { accessorKey: "order_date", header: "Order Date" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <RadiologyStatusBadge status={row.original.status} />,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <ActionMenu
          items={[
            {
              label: "Open Workspace",
              onClick: () => {
                setSelectedOrder(row.original);
                setWorkspaceOpen(true);
              },
            },
            {
              label: "Edit Order",
              onClick: () => {
                setSelectedOrder(row.original);
                setOrderFormOpen(true);
              },
            },
            {
              label: "Start Study",
              onClick: () =>
                updateStatus.mutate({
                  id: row.original.id,
                  status: "in_progress",
                }),
            },
            {
              label: "Enter Report",
              onClick: () => {
                setSelectedOrder(row.original);
                setReportFormOpen(true);
              },
            },
            {
              label: "Verify",
              onClick: () =>
                updateStatus.mutate({
                  id: row.original.id,
                  status: "verified",
                }),
            },
            {
              label: "Approve",
              onClick: () =>
                updateStatus.mutate({
                  id: row.original.id,
                  status: "approved",
                }),
            },
            {
              label: "Delete",
              danger: true,
              onClick: () => setDeleteOrder(row.original),
            },
          ]}
        />
      ),
    },
  ];

  async function handleOrderSubmit(values: RadiologyOrderFormValues) {
    if (selectedOrder) {
      await updateOrder.mutateAsync({ id: selectedOrder.id, payload: values });
    } else {
      await createOrder.mutateAsync(values);
    }

    setOrderFormOpen(false);
    setSelectedOrder(null);
  }

  async function handleReportSubmit(values: RadiologyReportFormValues) {
    if (!selectedOrder) return;

    await saveReport.mutateAsync({
      id: selectedOrder.id,
      payload: values,
    });

    setReportFormOpen(false);
    setSelectedOrder(null);
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Radiology"
          description="Manage radiology orders, imaging workflow, reporting, verification, approval, and PACS placeholders."
          actions={
            <Button
              onClick={() => {
                setSelectedOrder(null);
                setOrderFormOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Radiology Order
            </Button>
          }
        />

        <div className="grid gap-4 rounded-xl border bg-card p-4 md:grid-cols-3">
          <input
            className="h-10 rounded-md border bg-background px-3 text-sm"
            placeholder="Search radiology orders..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />

          <select
            className="h-10 rounded-md border bg-background px-3 text-sm"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
          >
            <option value="">All Status</option>
            <option value="ordered">Ordered</option>
            <option value="scheduled">Scheduled</option>
            <option value="in_progress">In Progress</option>
            <option value="reported">Reported</option>
            <option value="verified">Verified</option>
            <option value="approved">Approved</option>
            <option value="cancelled">Cancelled</option>
          </select>

          <select
            className="h-10 rounded-md border bg-background px-3 text-sm"
            value={modality}
            onChange={(event) => setModality(event.target.value)}
          >
            <option value="">All Modalities</option>
            <option value="xray">X-Ray</option>
            <option value="ct">CT</option>
            <option value="mri">MRI</option>
            <option value="ultrasound">Ultrasound</option>
            <option value="doppler">Doppler</option>
            <option value="fluoroscopy">Fluoroscopy</option>
          </select>
        </div>

        <DataTable
          columns={columns}
          data={ordersQuery.data?.items ?? []}
          isLoading={ordersQuery.isLoading}
          search={search}
          onSearchChange={setSearch}
          emptyTitle="No radiology orders found"
          emptyDescription="Create radiology orders for X-Ray, CT, MRI, ultrasound, and other imaging studies."
        />

        <RadiologyWorkspaceDrawer
          open={workspaceOpen}
          order={selectedOrder}
          onOpenChange={(open) => {
            setWorkspaceOpen(open);
            if (!open) setSelectedOrder(null);
          }}
        />

        <FormDrawer
          open={orderFormOpen}
          onOpenChange={(open) => {
            setOrderFormOpen(open);
            if (!open) setSelectedOrder(null);
          }}
          title={selectedOrder ? "Edit Radiology Order" : "New Radiology Order"}
          description="Create or update imaging order."
          size="lg"
        >
          <RadiologyOrderForm
            defaultValues={
              selectedOrder ? orderToFormValues(selectedOrder) : undefined
            }
            isSubmitting={createOrder.isPending || updateOrder.isPending}
            onSubmit={handleOrderSubmit}
            onCancel={() => {
              setOrderFormOpen(false);
              setSelectedOrder(null);
            }}
          />
        </FormDrawer>

        <FormDrawer
          open={reportFormOpen}
          onOpenChange={(open) => {
            setReportFormOpen(open);
            if (!open) setSelectedOrder(null);
          }}
          title="Radiology Report"
          description="Enter report findings and impression."
          size="lg"
        >
          {selectedOrder && (
            <RadiologyReportForm
              defaultValues={reportToFormValues(selectedOrder)}
              isSubmitting={saveReport.isPending}
              onSubmit={handleReportSubmit}
              onCancel={() => {
                setReportFormOpen(false);
                setSelectedOrder(null);
              }}
            />
          )}
        </FormDrawer>

        <ConfirmDialog
          open={Boolean(deleteOrder)}
          onOpenChange={() => setDeleteOrder(null)}
          title="Delete radiology order?"
          description={
            deleteOrder
              ? `This will permanently delete ${deleteOrder.order_number}.`
              : "This order will be deleted."
          }
          confirmText="Delete"
          danger
          isLoading={deleteOrderMutation.isPending}
          onConfirm={async () => {
            if (!deleteOrder) return;
            await deleteOrderMutation.mutateAsync(deleteOrder.id);
            setDeleteOrder(null);
          }}
        />
      </div>
    </AppShell>
  );
}