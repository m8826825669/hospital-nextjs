// src/features/billing/components/billing-status-badge.tsx

import { StatusBadge } from "@/shared/components/enterprise";
import type { BillingInvoiceStatus } from "../types/billing.types";

export function BillingStatusBadge({
  status,
}: {
  status: BillingInvoiceStatus;
}) {
  const labelMap: Record<BillingInvoiceStatus, string> = {
    draft: "Draft",
    issued: "Issued",
    partially_paid: "Partially Paid",
    paid: "Paid",
    cancelled: "Cancelled",
    settled: "Settled",
  };

  const variantMap: Record<
    BillingInvoiceStatus,
    "info" | "warning" | "success" | "danger" | "muted"
  > = {
    draft: "muted",
    issued: "info",
    partially_paid: "warning",
    paid: "success",
    cancelled: "danger",
    settled: "success",
  };

  return <StatusBadge label={labelMap[status]} variant={variantMap[status]} />;
}