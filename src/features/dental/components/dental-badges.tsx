import { StatusBadge } from "@/shared/components/enterprise";

export function DentalStatusBadge({ status }: { status: string }) {
  const variant = status === "completed" ? "success" : status === "cancelled" ? "danger" : status === "in_progress" || status === "in_treatment" ? "warning" : "info";
  return <StatusBadge label={status.replaceAll("_", " ").toUpperCase()} variant={variant} />;
}

export function ToothConditionBadge({ condition }: { condition: string }) {
  const variant = condition === "healthy" ? "success" : condition === "missing" || condition === "caries" ? "danger" : "info";
  return <StatusBadge label={condition.replaceAll("_", " ").toUpperCase()} variant={variant} />;
}
