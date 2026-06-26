import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FormActionsProps = {
  children: ReactNode;
  align?: "left" | "right" | "between";
  className?: string;
};

export function FormActions({
  children,
  align = "right",
  className,
}: FormActionsProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 border-t pt-5",
        align === "left" && "justify-start",
        align === "right" && "justify-end",
        align === "between" && "justify-between",
        className
      )}
    >
      {children}
    </div>
  );
}