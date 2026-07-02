// src/features/dashboard/components/dashboard-grid.tsx

import type { ReactNode } from "react";

interface DashboardGridProps {
  children: ReactNode;
  className?: string;
}

export function DashboardGrid({ children, className }: DashboardGridProps) {
  return (
    <div className={`grid gap-4 md:grid-cols-2 xl:grid-cols-4 ${className ?? ""}`}>
      {children}
    </div>
  );
}