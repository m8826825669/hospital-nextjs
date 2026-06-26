"use client";

import type { ReactNode } from "react";
import { useCurrentUser } from "@/features/auth/hooks/use-auth";
import { hasPermission } from "@/lib/permissions";

type PermissionGuardProps = {
  permission: string;
  children: ReactNode;
  fallback?: ReactNode;
};

export function PermissionGuard({
  permission,
  children,
  fallback = null,
}: PermissionGuardProps) {
  const { data: user } = useCurrentUser();

  if (!hasPermission(user, permission)) {
    return fallback;
  }

  return <>{children}</>;
}