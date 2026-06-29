// src/shared/components/enterprise/forms/form-drawer.tsx

"use client";

import { ReactNode } from "react";
import { EntityDrawer } from "../entity-drawer";

interface FormDrawerProps {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  onOpenChange: (open: boolean) => void;
}

export function FormDrawer({
  open,
  title,
  description,
  children,
  onOpenChange,
}: FormDrawerProps) {
  return (
    <EntityDrawer
      open={open}
      title={title}
      description={description}
      onOpenChange={onOpenChange}
    >
      {children}
    </EntityDrawer>
  );
}