import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type FormGridProps = {
  children: ReactNode;
  columns?: 1 | 2 | 3;
  className?: string;
};

export function FormGrid({
  children,
  columns = 2,
  className,
}: FormGridProps) {
  return (
    <div
      className={cn(
        "grid gap-4",
        columns === 1 && "grid-cols-1",
        columns === 2 && "md:grid-cols-2",
        columns === 3 && "md:grid-cols-2 xl:grid-cols-3",
        className
      )}
    >
      {children}
    </div>
  );
}