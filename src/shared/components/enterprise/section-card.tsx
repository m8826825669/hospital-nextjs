// src/shared/components/enterprise/section-card.tsx

import { ReactNode } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface SectionCardProps {
  title?: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
  className?: string;
}

export function SectionCard({
  title,
  description,
  actions,
  children,
  className,
}: SectionCardProps) {
  return (
    <Card className={className}>
      {(title || description || actions) && (
        <CardHeader className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            {title && <CardTitle>{title}</CardTitle>}
            {description && (
              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            )}
          </div>

          {actions && <div>{actions}</div>}
        </CardHeader>
      )}

      <CardContent>{children}</CardContent>
    </Card>
  );
}