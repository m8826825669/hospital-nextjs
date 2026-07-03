// src/shared/components/enterprise/entity-drawer.tsx

"use client";

import { ReactNode } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/shared/lib/utils";

interface EntityDrawerProps {
  open: boolean;
  title: string;
  description?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg" | "xl" | "2xl" | "4xl" | "6xl" | "wide";
  onOpenChange: (open: boolean) => void;
}

const sizeClassMap = {
  sm: "sm:max-w-md",
  md: "sm:max-w-xl",
  lg: "sm:max-w-2xl",
  xl: "sm:max-w-4xl",
  "2xl": "sm:max-w-5xl",
  "4xl": "sm:max-w-6xl",
  "6xl": "sm:max-w-7xl",
  wide: "w-[92vw] max-w-[1400px]",
};

export function EntityDrawer({
  open,
  title,
  description,
  children,
  size = "md",
  onOpenChange,
}: EntityDrawerProps) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        className={cn("w-full overflow-y-auto", sizeClassMap[size])}
      >
        <SheetHeader>
          <SheetTitle>{title}</SheetTitle>
          {description && <SheetDescription>{description}</SheetDescription>}
        </SheetHeader>

        <div className="mt-6">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
