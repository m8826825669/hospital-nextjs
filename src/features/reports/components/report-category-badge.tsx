// src/features/reports/components/report-category-badge.tsx

import { StatusBadge } from "@/shared/components/enterprise";
import type { ReportCategory } from "../types/reports.types";

export function ReportCategoryBadge({
  category,
}: {
  category: ReportCategory;
}) {
  const variantMap: Record<
    ReportCategory,
    "info" | "success" | "warning" | "danger" | "muted"
  > = {
    clinical: "info",
    financial: "success",
    operations: "warning",
    inventory: "muted",
    insurance: "info",
    audit: "danger",
  };

  return (
    <StatusBadge label={category.toUpperCase()} variant={variantMap[category]} />
  );
}