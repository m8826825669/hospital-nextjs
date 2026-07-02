// src/app/inventory/page.tsx

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

import { GrnForm } from "@/features/inventory/components/grn-form";
import {
  AdjustmentTypeBadge,
  GrnStatusBadge,
  PurchaseOrderStatusBadge,
  VendorStatusBadge,
} from "@/features/inventory/components/inventory-badges";
import { PurchaseOrderForm } from "@/features/inventory/components/purchase-order-form";
import { StockAdjustmentForm } from "@/features/inventory/components/stock-adjustment-form";
import { VendorForm } from "@/features/inventory/components/vendor-form";
import { WarehouseForm } from "@/features/inventory/components/warehouse-form";

import {
  useCreateGrn,
  useCreatePurchaseOrder,
  useCreateStockAdjustment,
  useCreateVendor,
  useCreateWarehouse,
  useDeleteVendor,
  useDeleteWarehouse,
  useGrns,
  usePurchaseOrders,
  useStockAdjustments,
  useUpdateVendor,
  useUpdateWarehouse,
  useVendors,
  useWarehouses,
} from "@/features/inventory/api/inventory.queries";

import type {
  Grn,
  PurchaseOrder,
  StockAdjustment,
  Vendor,
  Warehouse,
} from "@/features/inventory/types/inventory.types";
import type {
  GrnFormValues,
  PurchaseOrderFormValues,
  StockAdjustmentFormValues,
  VendorFormValues,
  WarehouseFormValues,
} from "@/features/inventory/schemas/inventory.schema";

function vendorToFormValues(vendor: Vendor): Partial<VendorFormValues> {
  return {
    name: vendor.name,
    code: vendor.code ?? "",
    contact_person: vendor.contact_person ?? "",
    phone: vendor.phone ?? "",
    email: vendor.email ?? "",
    address: vendor.address ?? "",
    status: vendor.status,
    is_active: vendor.is_active,
  };
}

function warehouseToFormValues(
  warehouse: Warehouse
): Partial<WarehouseFormValues> {
  return {
    name: warehouse.name,
    code: warehouse.code ?? "",
    location: warehouse.location ?? "",
    is_active: warehouse.is_active,
  };
}

export default function InventoryPage() {
  const [search, setSearch] = useState("");

  const [vendorFormOpen, setVendorFormOpen] = useState(false);
  const [warehouseFormOpen, setWarehouseFormOpen] = useState(false);
  const [poFormOpen, setPoFormOpen] = useState(false);
  const [grnFormOpen, setGrnFormOpen] = useState(false);
  const [adjustmentFormOpen, setAdjustmentFormOpen] = useState(false);

  const [selectedVendor, setSelectedVendor] = useState<Vendor | null>(null);
  const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(
    null
  );

  const [deleteVendor, setDeleteVendor] = useState<Vendor | null>(null);
  const [deleteWarehouse, setDeleteWarehouse] = useState<Warehouse | null>(null);

  const params = useMemo(
    () => ({
      page: 1,
      size: 100,
      search: search || undefined,
    }),
    [search]
  );

  const vendorsQuery = useVendors(params);
  const warehousesQuery = useWarehouses(params);
  const purchaseOrdersQuery = usePurchaseOrders(params);
  const grnsQuery = useGrns(params);
  const adjustmentsQuery = useStockAdjustments(params);

  const createVendor = useCreateVendor();
  const updateVendor = useUpdateVendor();
  const deleteVendorMutation = useDeleteVendor();

  const createWarehouse = useCreateWarehouse();
  const updateWarehouse = useUpdateWarehouse();
  const deleteWarehouseMutation = useDeleteWarehouse();

  const createPurchaseOrder = useCreatePurchaseOrder();
  const createGrn = useCreateGrn();
  const createAdjustment = useCreateStockAdjustment();

  const vendorColumns: ColumnDef<Vendor>[] = [
    { accessorKey: "name", header: "Vendor" },
    { accessorKey: "code", header: "Code" },
    { accessorKey: "contact_person", header: "Contact" },
    { accessorKey: "phone", header: "Phone" },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <VendorStatusBadge status={row.original.status} />,
    },
    {
      id: "actions",
      cell: ({ row }) => (
        <ActionMenu
          items={[
            {
              label: "Edit",
              onClick: () => {
                setSelectedVendor(row.original);
                setVendorFormOpen(true);
              },
            },
            {
              label: "Delete",
              danger: true,
              onClick: () => setDeleteVendor(row.original),
            },
          ]}
        />
      ),
    },
  ];

  const warehouseColumns: ColumnDef<Warehouse>[] = [
    { accessorKey: "name", header: "Warehouse" },
    { accessorKey: "code", header: "Code" },
    { accessorKey: "location", header: "Location" },
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
                setSelectedWarehouse(row.original);
                setWarehouseFormOpen(true);
              },
            },
            {
              label: "Delete",
              danger: true,
              onClick: () => setDeleteWarehouse(row.original),
            },
          ]}
        />
      ),
    },
  ];

  const poColumns: ColumnDef<PurchaseOrder>[] = [
    { accessorKey: "po_number", header: "PO Number" },
    { accessorKey: "vendor_name", header: "Vendor" },
    { accessorKey: "order_date", header: "Order Date" },
    { accessorKey: "expected_date", header: "Expected" },
    {
      accessorKey: "total_amount",
      header: "Total",
      cell: ({ row }) => `₹${row.original.total_amount}`,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <PurchaseOrderStatusBadge status={row.original.status} />
      ),
    },
  ];

  const grnColumns: ColumnDef<Grn>[] = [
    { accessorKey: "grn_number", header: "GRN Number" },
    { accessorKey: "po_number", header: "PO Number" },
    { accessorKey: "vendor_name", header: "Vendor" },
    { accessorKey: "received_date", header: "Received Date" },
    {
      accessorKey: "total_amount",
      header: "Total",
      cell: ({ row }) => `₹${row.original.total_amount}`,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => <GrnStatusBadge status={row.original.status} />,
    },
  ];

  const adjustmentColumns: ColumnDef<StockAdjustment>[] = [
    { accessorKey: "item_name", header: "Item" },
    { accessorKey: "warehouse_name", header: "Warehouse" },
    { accessorKey: "adjustment_date", header: "Date" },
    {
      accessorKey: "adjustment_type",
      header: "Type",
      cell: ({ row }) => <AdjustmentTypeBadge type={row.original.adjustment_type} />,
    },
    { accessorKey: "quantity", header: "Quantity" },
    { accessorKey: "reason", header: "Reason" },
  ];

  async function handleVendorSubmit(values: VendorFormValues) {
    if (selectedVendor) {
      await updateVendor.mutateAsync({
        id: selectedVendor.id,
        payload: values,
      });
    } else {
      await createVendor.mutateAsync(values);
    }

    setVendorFormOpen(false);
    setSelectedVendor(null);
  }

  async function handleWarehouseSubmit(values: WarehouseFormValues) {
    if (selectedWarehouse) {
      await updateWarehouse.mutateAsync({
        id: selectedWarehouse.id,
        payload: values,
      });
    } else {
      await createWarehouse.mutateAsync(values);
    }

    setWarehouseFormOpen(false);
    setSelectedWarehouse(null);
  }

  async function handlePoSubmit(values: PurchaseOrderFormValues) {
    await createPurchaseOrder.mutateAsync(values);
    setPoFormOpen(false);
  }

  async function handleGrnSubmit(values: GrnFormValues) {
    await createGrn.mutateAsync(values);
    setGrnFormOpen(false);
  }

  async function handleAdjustmentSubmit(values: StockAdjustmentFormValues) {
    await createAdjustment.mutateAsync(values);
    setAdjustmentFormOpen(false);
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <PageHeader
          title="Inventory & Procurement"
          description="Manage vendors, warehouses, purchase orders, GRN, stock transfers, adjustments, and expiry."
        />

        <input
          className="h-10 w-full rounded-md border bg-background px-3 text-sm"
          placeholder="Search inventory records..."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />

        <Tabs defaultValue="vendors">
          <TabsList>
            <TabsTrigger value="vendors">Vendors</TabsTrigger>
            <TabsTrigger value="warehouses">Warehouses</TabsTrigger>
            <TabsTrigger value="po">Purchase Orders</TabsTrigger>
            <TabsTrigger value="grn">GRN</TabsTrigger>
            <TabsTrigger value="adjustments">Adjustments</TabsTrigger>
          </TabsList>

          <TabsContent value="vendors" className="mt-4 space-y-4">
            <Button
              onClick={() => {
                setSelectedVendor(null);
                setVendorFormOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Vendor
            </Button>

            <DataTable
              columns={vendorColumns}
              data={vendorsQuery.data?.items ?? []}
              isLoading={vendorsQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No vendors found"
              emptyDescription="Create vendors for procurement and purchase orders."
            />
          </TabsContent>

          <TabsContent value="warehouses" className="mt-4 space-y-4">
            <Button
              onClick={() => {
                setSelectedWarehouse(null);
                setWarehouseFormOpen(true);
              }}
            >
              <Plus className="mr-2 h-4 w-4" />
              Add Warehouse
            </Button>

            <DataTable
              columns={warehouseColumns}
              data={warehousesQuery.data?.items ?? []}
              isLoading={warehousesQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No warehouses found"
              emptyDescription="Create warehouses for inventory storage."
            />
          </TabsContent>

          <TabsContent value="po" className="mt-4 space-y-4">
            <Button onClick={() => setPoFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Purchase Order
            </Button>

            <DataTable
              columns={poColumns}
              data={purchaseOrdersQuery.data?.items ?? []}
              isLoading={purchaseOrdersQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No purchase orders found"
              emptyDescription="Purchase orders will appear here."
            />
          </TabsContent>

          <TabsContent value="grn" className="mt-4 space-y-4">
            <Button onClick={() => setGrnFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New GRN
            </Button>

            <DataTable
              columns={grnColumns}
              data={grnsQuery.data?.items ?? []}
              isLoading={grnsQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No GRN records found"
              emptyDescription="Goods receipt notes will appear here."
            />
          </TabsContent>

          <TabsContent value="adjustments" className="mt-4 space-y-4">
            <Button onClick={() => setAdjustmentFormOpen(true)}>
              <Plus className="mr-2 h-4 w-4" />
              New Adjustment
            </Button>

            <DataTable
              columns={adjustmentColumns}
              data={adjustmentsQuery.data?.items ?? []}
              isLoading={adjustmentsQuery.isLoading}
              search={search}
              onSearchChange={setSearch}
              emptyTitle="No stock adjustments found"
              emptyDescription="Stock increase, decrease, damage, expiry, and correction entries will appear here."
            />
          </TabsContent>
        </Tabs>

        <FormDrawer
          open={vendorFormOpen}
          onOpenChange={(open) => {
            setVendorFormOpen(open);
            if (!open) setSelectedVendor(null);
          }}
          title={selectedVendor ? "Edit Vendor" : "Add Vendor"}
          description="Create or update vendor details."
          size="lg"
        >
          <VendorForm
            defaultValues={selectedVendor ? vendorToFormValues(selectedVendor) : undefined}
            isSubmitting={createVendor.isPending || updateVendor.isPending}
            onSubmit={handleVendorSubmit}
            onCancel={() => {
              setVendorFormOpen(false);
              setSelectedVendor(null);
            }}
          />
        </FormDrawer>

        <FormDrawer
          open={warehouseFormOpen}
          onOpenChange={(open) => {
            setWarehouseFormOpen(open);
            if (!open) setSelectedWarehouse(null);
          }}
          title={selectedWarehouse ? "Edit Warehouse" : "Add Warehouse"}
          description="Create or update warehouse details."
          size="md"
        >
          <WarehouseForm
            defaultValues={
              selectedWarehouse
                ? warehouseToFormValues(selectedWarehouse)
                : undefined
            }
            isSubmitting={createWarehouse.isPending || updateWarehouse.isPending}
            onSubmit={handleWarehouseSubmit}
            onCancel={() => {
              setWarehouseFormOpen(false);
              setSelectedWarehouse(null);
            }}
          />
        </FormDrawer>

        <FormDrawer open={poFormOpen} onOpenChange={setPoFormOpen} title="New Purchase Order" description="Create purchase order." size="md">
          <PurchaseOrderForm
            isSubmitting={createPurchaseOrder.isPending}
            onSubmit={handlePoSubmit}
            onCancel={() => setPoFormOpen(false)}
          />
        </FormDrawer>

        <FormDrawer open={grnFormOpen} onOpenChange={setGrnFormOpen} title="New GRN" description="Create goods receipt note." size="md">
          <GrnForm
            isSubmitting={createGrn.isPending}
            onSubmit={handleGrnSubmit}
            onCancel={() => setGrnFormOpen(false)}
          />
        </FormDrawer>

        <FormDrawer open={adjustmentFormOpen} onOpenChange={setAdjustmentFormOpen} title="Stock Adjustment" description="Record stock adjustment." size="md">
          <StockAdjustmentForm
            isSubmitting={createAdjustment.isPending}
            onSubmit={handleAdjustmentSubmit}
            onCancel={() => setAdjustmentFormOpen(false)}
          />
        </FormDrawer>

        <ConfirmDialog
          open={Boolean(deleteVendor)}
          onOpenChange={() => setDeleteVendor(null)}
          title="Delete vendor?"
          description={
            deleteVendor
              ? `This will permanently delete ${deleteVendor.name}.`
              : "This vendor will be deleted."
          }
          confirmText="Delete"
          danger
          isLoading={deleteVendorMutation.isPending}
          onConfirm={async () => {
            if (!deleteVendor) return;
            await deleteVendorMutation.mutateAsync(deleteVendor.id);
            setDeleteVendor(null);
          }}
        />

        <ConfirmDialog
          open={Boolean(deleteWarehouse)}
          onOpenChange={() => setDeleteWarehouse(null)}
          title="Delete warehouse?"
          description={
            deleteWarehouse
              ? `This will permanently delete ${deleteWarehouse.name}.`
              : "This warehouse will be deleted."
          }
          confirmText="Delete"
          danger
          isLoading={deleteWarehouseMutation.isPending}
          onConfirm={async () => {
            if (!deleteWarehouse) return;
            await deleteWarehouseMutation.mutateAsync(deleteWarehouse.id);
            setDeleteWarehouse(null);
          }}
        />
      </div>
    </AppShell>
  );
}