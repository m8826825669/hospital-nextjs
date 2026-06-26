import type { CurrentUser } from "@/features/auth/types/auth.types";

export function hasPermission(
  user: CurrentUser | undefined,
  permission?: string
) {
  if (!permission) return true;

  // Temporary fallback while backend /auth/me does not return permissions
  if (!user?.permissions || user.permissions.length === 0) {
    return true;
  }

  return user.permissions.includes(permission);
}