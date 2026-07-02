// src/features/security/components/permission-matrix.tsx

"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SectionCard } from "@/shared/components/enterprise";
import type { Permission, RolePermission } from "../types/security.types";

interface PermissionMatrixProps {
  roleId?: string;
  permissions: Permission[];
  rolePermissions: RolePermission[];
  isSaving?: boolean;
  onSave: (permissionIds: string[]) => void;
}

export function PermissionMatrix({
  roleId,
  permissions,
  rolePermissions,
  isSaving,
  onSave,
}: PermissionMatrixProps) {
  const initialAllowed = useMemo(
    () =>
      rolePermissions
        .filter((item) => item.allowed)
        .map((item) => item.permission_id),
    [rolePermissions]
  );

  const [selected, setSelected] = useState<string[]>(initialAllowed);

  const grouped = useMemo(() => {
    return permissions.reduce<Record<string, Permission[]>>((acc, permission) => {
      acc[permission.module] = acc[permission.module] ?? [];
      acc[permission.module].push(permission);
      return acc;
    }, {});
  }, [permissions]);

  function toggle(permissionId: string) {
    setSelected((current) =>
      current.includes(permissionId)
        ? current.filter((id) => id !== permissionId)
        : [...current, permissionId]
    );
  }

  if (!roleId) {
    return (
      <SectionCard title="Permission Matrix">
        <p className="text-sm text-muted-foreground">
          Select a role to manage permissions.
        </p>
      </SectionCard>
    );
  }

  return (
    <SectionCard
      title="Permission Matrix"
      description="Grant or revoke permissions for the selected role."
    >
      <div className="space-y-6">
        {Object.entries(grouped).map(([module, items]) => (
          <div key={module} className="rounded-xl border p-4">
            <h3 className="mb-3 font-medium capitalize">{module}</h3>

            <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {items.map((permission) => (
                <label
                  key={permission.id}
                  className="flex items-start gap-3 rounded-lg border p-3 text-sm"
                >
                  <Checkbox
                    checked={selected.includes(permission.id)}
                    onCheckedChange={() => toggle(permission.id)}
                  />
                  <span>
                    <span className="block font-medium">{permission.action}</span>
                    <span className="text-xs text-muted-foreground">
                      {permission.code}
                    </span>
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}

        <Button disabled={isSaving} onClick={() => onSave(selected)}>
          Save Permissions
        </Button>
      </div>
    </SectionCard>
  );
}