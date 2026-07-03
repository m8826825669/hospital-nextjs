import { StatusBadge } from "@/shared/components/enterprise";

export function NursingStatusBadge({ status }: { status: string }) {
  const variant = status === "completed" || status === "administered" || status === "active" ? "success" : status === "urgent" || status === "stat" || status === "missed" ? "danger" : status === "in_progress" || status === "scheduled" || status === "held" ? "warning" : "info";
  return <StatusBadge label={status.replaceAll("_", " ").toUpperCase()} variant={variant} />;
}

export function NursingPriorityBadge({ priority }: { priority: string }) {
  const variant = priority === "stat" ? "danger" : priority === "urgent" ? "warning" : "info";
  return <StatusBadge label={priority.toUpperCase()} variant={variant} />;
}
