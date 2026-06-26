import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { ui } from "@/lib/ui";

type StatCardProps = {
  title: string;
  value: string | number;
  icon: LucideIcon;
  description?: string;
  trend?: string;
  trendType?: "positive" | "negative" | "neutral";
};

export function StatCard({
  title,
  value,
  icon: Icon,
  description,
  trend,
  trendType = "neutral",
}: StatCardProps) {
  return (
    <div className={ui.card.hover}>
      <div className="p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>

          <div className="rounded-lg bg-muted p-2">
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>

        <p className="mt-4 text-2xl font-semibold tracking-tight">{value}</p>

        {(trend || description) && (
          <div className="mt-2 flex items-center gap-2 text-xs">
            {trend && (
              <span
                className={cn(
                  "font-medium",
                  trendType === "positive" && "text-success",
                  trendType === "negative" && "text-destructive",
                  trendType === "neutral" && "text-muted-foreground"
                )}
              >
                {trend}
              </span>
            )}

            {description && (
              <span className="text-muted-foreground">{description}</span>
            )}
          </div>
        )}
      </div>
    </div>
  );
}