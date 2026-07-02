// src/features/security/components/security-badges.tsx

import { StatusBadge } from "@/shared/components/enterprise";
import type { SessionStatus, UserStatus } from "../types/security.types";

export function UserStatusBadge({ status }: { status: UserStatus }) {
  const variantMap: Record<UserStatus, "success" | "muted" | "danger"> = {
    active: "success",
    inactive: "muted",
    locked: "danger",
  };

  return <StatusBadge label={status.toUpperCase()} variant={variantMap[status]} />;
}

export function SessionStatusBadge({ status }: { status: SessionStatus }) {
  const variantMap: Record<SessionStatus, "success" | "muted" | "danger"> = {
    active: "success",
    expired: "muted",
    revoked: "danger",
  };

  return <StatusBadge label={status.toUpperCase()} variant={variantMap[status]} />;
}