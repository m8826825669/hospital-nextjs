// src/shared/components/enterprise/workspace/entity-workspace-drawer.tsx

"use client";

import { ReactNode } from "react";
import { EntityDrawer } from "../entity-drawer";
import { cn } from "@/shared/lib/utils";

interface EntityWorkspaceDrawerProps {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  onOpenChange: (open: boolean) => void;
  size?: "xl" | "2xl" | "4xl" | "6xl" | "wide";
  className?: string;
}

export function EntityWorkspaceDrawer({
  open,
  title,
  description,
  children,
  onOpenChange,
  size = "xl",
  className,
}: EntityWorkspaceDrawerProps) {
  return (
    <EntityDrawer
      open={open}
      title={title}
      description={description}
      size={size}
      onOpenChange={onOpenChange}
    >
      <div className={cn("space-y-5 pb-6", className)}>{children}</div>
    </EntityDrawer>
  );
}
