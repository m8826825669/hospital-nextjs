import { StatusBadge } from "@/shared/components/enterprise";

export function SchedulingStatusBadge({ status }: { status: string }) {
  const variant = status === "completed" ? "success" : status === "cancelled" ? "danger" : status === "maintenance" ? "warning" : "info";
  return <StatusBadge label={status.replaceAll("_", " ").toUpperCase()} variant={variant} />;
}

export function PriorityBadge({ priority }: { priority: string }) {
  const variant = priority === "stat" ? "danger" : priority === "urgent" ? "warning" : "info";
  return <StatusBadge label={priority.toUpperCase()} variant={variant} />;
}
