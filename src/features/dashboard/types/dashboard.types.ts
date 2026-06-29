import type { LucideIcon } from "lucide-react";

export type DashboardMetric = {
  title: string;
  value: string | number;
  description?: string;
  trend?: string;
  trendType?: "positive" | "negative" | "neutral";
  icon: LucideIcon;
  href?: string;
};
