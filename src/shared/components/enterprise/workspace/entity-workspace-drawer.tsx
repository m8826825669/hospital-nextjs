// src/shared/components/enterprise/workspace/entity-workspace-drawer.tsx

"use client";

import { ReactNode } from "react";
import { EntityDrawer } from "../entity-drawer";

interface EntityWorkspaceDrawerProps {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  onOpenChange: (open: boolean) => void;
}

export function EntityWorkspaceDrawer({
  open,
  title,
  description,
  children,
  onOpenChange,
}: EntityWorkspaceDrawerProps) {
  return (
    <EntityDrawer
      open={open}
      title={title}
      description={description}
      size="xl"
      onOpenChange={onOpenChange}
    >
      <div className="space-y-6">{children}</div>
    </EntityDrawer>
  );
}