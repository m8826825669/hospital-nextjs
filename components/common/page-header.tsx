import type { ReactNode } from "react";
import { designSystem } from "@/config/design-system.config";

type PageHeaderProps = {
  title: string;
  description?: string;
  actions?: ReactNode;
};

export function PageHeader({ title, description, actions }: PageHeaderProps) {
  return (
    <div className={designSystem.page.header}>
      <div>
        <h1 className={designSystem.typography.pageTitle}>{title}</h1>

        {description && (
          <p className={`mt-1 ${designSystem.typography.description}`}>
            {description}
          </p>
        )}
      </div>

      {actions && <div className="flex items-center gap-2">{actions}</div>}
    </div>
  );
}