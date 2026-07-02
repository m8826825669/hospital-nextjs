// src/features/inventory/components/inventory-badges.tsx

import { StatusBadge } from "@/shared/components/enterprise";
import type {
  GrnStatus,
  PurchaseOrderStatus,
  StockAdjustmentType,
  VendorStatus,
} from "../types/inventory.types";

export function VendorStatusBadge({ status }: { status: VendorStatus }) {
  return (
    <StatusBadge
      label={status.toUpperCase()}
      variant={status === "active" ? "success" : "muted"}
    />
  );
}

export function PurchaseOrderStatusBadge({
  status,
}: {
  status: PurchaseOrderStatus;
}) {
  const variantMap: Record<
    PurchaseOrderStatus,
    "muted" | "info" | "warning" | "success" | "danger"
  > = {
    draft: "muted",
    submitted: "info",
    approved: "success",
    partially_received: "warning",
    received: "success",
    cancelled: "danger",
  };

  return <StatusBadge label={status.toUpperCase()} variant={variantMap[status]} />;
}

export function GrnStatusBadge({ status }: { status: GrnStatus }) {
  const variantMap: Record<GrnStatus, "muted" | "success" | "danger"> = {
    draft: "muted",
    posted: "success",
    cancelled: "danger",
  };

  return <StatusBadge label={status.toUpperCase()} variant={variantMap[status]} />;
}

export function AdjustmentTypeBadge({
  type,
}: {
  type: StockAdjustmentType;
}) {
  const variantMap: Record<StockAdjustmentType, "info" | "warning" | "danger" | "muted" | "success"> = {
    increase: "success",
    decrease: "warning",
    damage: "danger",
    expiry: "danger",
    correction: "info",
  };

  return <StatusBadge label={type.toUpperCase()} variant={variantMap[type]} />;
}