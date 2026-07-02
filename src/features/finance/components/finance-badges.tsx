// src/features/finance/components/finance-badges.tsx

import { StatusBadge } from "@/shared/components/enterprise";
import type {
  AccountType,
  VoucherStatus,
  VoucherType,
} from "../types/finance.types";

export function AccountTypeBadge({ type }: { type: AccountType }) {
  const variantMap: Record<
    AccountType,
    "info" | "success" | "warning" | "danger" | "muted"
  > = {
    asset: "success",
    liability: "warning",
    equity: "info",
    income: "success",
    expense: "danger",
  };

  return <StatusBadge label={type.toUpperCase()} variant={variantMap[type]} />;
}

export function VoucherTypeBadge({ type }: { type: VoucherType }) {
  const variantMap: Record<VoucherType, "success" | "danger" | "info"> = {
    receipt: "success",
    payment: "danger",
    journal: "info",
  };

  return <StatusBadge label={type.toUpperCase()} variant={variantMap[type]} />;
}

export function VoucherStatusBadge({ status }: { status: VoucherStatus }) {
  const variantMap: Record<VoucherStatus, "muted" | "success" | "danger"> = {
    draft: "muted",
    posted: "success",
    cancelled: "danger",
  };

  return <StatusBadge label={status.toUpperCase()} variant={variantMap[status]} />;
}