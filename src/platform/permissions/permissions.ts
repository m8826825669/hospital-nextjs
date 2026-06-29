// src/platform/permissions/permissions.ts

import type { CurrentUser } from "@/platform/auth/auth.types";

export function hasPermission(
  user: CurrentUser | null,
  permission: string
): boolean {
  if (!user) return false;
  return user.permissions.includes(permission);
}

export function hasAnyPermission(
  user: CurrentUser | null,
  permissions: string[]
): boolean {
  if (!user) return false;
  return permissions.some((permission) => user.permissions.includes(permission));
}

export function hasAllPermissions(
  user: CurrentUser | null,
  permissions: string[]
): boolean {
  if (!user) return false;
  return permissions.every((permission) =>
    user.permissions.includes(permission)
  );
}