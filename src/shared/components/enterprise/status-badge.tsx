// src/shared/components/enterprise/status-badge.tsx

import { Badge } from "@/components/ui/badge";

type StatusVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "muted";

interface StatusBadgeProps {
  label: string;
  variant?: StatusVariant;
}

const variantClassMap: Record<StatusVariant, string> = {
  default: "",
  success: "bg-emerald-100 text-emerald-700 hover:bg-emerald-100",
  warning: "bg-amber-100 text-amber-700 hover:bg-amber-100",
  danger: "bg-red-100 text-red-700 hover:bg-red-100",
  info: "bg-blue-100 text-blue-700 hover:bg-blue-100",
  muted: "bg-muted text-muted-foreground hover:bg-muted",
};

export function StatusBadge({
  label,
  variant = "default",
}: StatusBadgeProps) {
  return (
    <Badge className={variantClassMap[variant]} variant="secondary">
      {label}
    </Badge>
  );
}