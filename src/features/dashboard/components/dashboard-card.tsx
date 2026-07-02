// src/features/dashboard/components/dashboard-card.tsx

import type { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardCardProps {
  title: string;
  description?: string;
  children: ReactNode;
  action?: ReactNode;
}

export function DashboardCard({
  title,
  description,
  children,
  action,
}: DashboardCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div>
          <CardTitle>{title}</CardTitle>
          {description ? (
            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          ) : null}
        </div>
        {action}
      </CardHeader>

      <CardContent>{children}</CardContent>
    </Card>
  );
}