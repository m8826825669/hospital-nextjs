import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { ArrowDownRight, ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

type MetricCardProps = {
  title: string;
  value: string | number;
  description?: string;
  trend?: string;
  trendType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  href?: string;
};

export function MetricCard({
  title,
  value,
  description,
  trend,
  trendType = "neutral",
  icon: Icon,
  href,
}: MetricCardProps) {
  const card = (
    <div className="group rounded-2xl border bg-background p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>

          <p className="mt-3 text-3xl font-semibold tracking-tight">
            {value}
          </p>
        </div>

        <div className="rounded-xl bg-muted p-2.5 text-muted-foreground transition group-hover:bg-primary group-hover:text-primary-foreground">
          <Icon className="h-5 w-5" />
        </div>
      </div>

      {(trend || description) && (
        <div className="mt-4 flex flex-wrap items-center gap-2 text-xs">
          {trend && (
            <span
              className={cn(
                "inline-flex items-center gap-1 rounded-full px-2 py-1 font-medium",
                trendType === "positive" &&
                  "bg-success/10 text-success",
                trendType === "negative" &&
                  "bg-destructive/10 text-destructive",
                trendType === "neutral" &&
                  "bg-muted text-muted-foreground"
              )}
            >
              {trendType === "positive" && (
                <ArrowUpRight className="h-3 w-3" />
              )}

              {trendType === "negative" && (
                <ArrowDownRight className="h-3 w-3" />
              )}

              {trend}
            </span>
          )}

          {description && (
            <span className="text-muted-foreground">{description}</span>
          )}
        </div>
      )}

      <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-muted">
        <div
          className={cn(
            "h-full rounded-full",
            trendType === "positive" && "w-3/4 bg-success",
            trendType === "negative" && "w-1/3 bg-destructive",
            trendType === "neutral" && "w-1/2 bg-primary"
          )}
        />
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block">
        {card}
      </Link>
    );
  }

  return card;
}