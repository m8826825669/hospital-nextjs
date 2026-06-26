import type { ReactNode } from "react";
import { ui } from "@/lib/ui";

type SectionCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
  actions?: ReactNode;
};

export function SectionCard({
  title,
  description,
  children,
  actions,
}: SectionCardProps) {
  return (
    <section className={ui.card.base}>
      <div className={ui.section.header}>
        <div>
          <h2 className="font-semibold">{title}</h2>

          {description && (
            <p className="mt-1 text-sm text-muted-foreground">
              {description}
            </p>
          )}
        </div>

        {actions}
      </div>

      <div className={ui.section.body}>{children}</div>
    </section>
  );
}