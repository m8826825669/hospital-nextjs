// src/features/finance/components/finance-badges.tsx

import { StatusBadge } from "@/shared/components/enterprise";
import type { AccountType, JournalStatus } from "../types/finance.types";

export function AccountTypeBadge({ type }: { type: AccountType | string }) {
  const tone =
    type === "asset" ? "info" :
    type === "liability" ? "warning" :
    type === "income" ? "success" :
    type === "expense" ? "danger" :
    "info";

  return <StatusBadge label={type.toUpperCase()} variant={tone} />;
}

export function JournalStatusBadge({ status }: { status: JournalStatus | string }) {
  const tone =
    status === "posted" ? "success" :
    status === "draft" ? "warning" :
    status === "cancelled" ? "danger" :
    "info";

  return <StatusBadge label={status.toUpperCase()} variant={tone} />;
}
