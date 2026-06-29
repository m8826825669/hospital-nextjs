// src/platform/permissions/permission-guard.tsx

"use client";

import { ReactNode } from "react";
import { useAuth } from "@/platform/auth/auth-provider";
import {
  hasAllPermissions,
  hasAnyPermission,
  hasPermission,
} from "./permissions";

interface PermissionGuardProps {
  permission?: string;
  anyOf?: string[];
  allOf?: string[];
  fallback?: ReactNode;
  children: ReactNode;
}

export function PermissionGuard({
  permission,
  anyOf,
  allOf,
  fallback = null,
  children,
}: PermissionGuardProps) {
  const { user } = useAuth();

  let allowed = true;

  if (permission) {
    allowed = hasPermission(user, permission);
  }

  if (anyOf?.length) {
    allowed = hasAnyPermission(user, anyOf);
  }

  if (allOf?.length) {
    allowed = hasAllPermissions(user, allOf);
  }

  if (!allowed) return <>{fallback}</>;

  return <>{children}</>;
}