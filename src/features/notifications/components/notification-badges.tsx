import { StatusBadge } from "@/shared/components/enterprise";

type Variant = "success" | "warning" | "danger" | "info";

export function NotificationPriorityBadge({ priority }: { priority: string }) {
  const variant: Variant = priority === "critical" ? "danger" : priority === "high" ? "warning" : priority === "info" ? "info" : "success";
  return <StatusBadge label={priority.toUpperCase()} variant={variant} />;
}

export function NotificationStatusBadge({ status }: { status: string }) {
  const variant: Variant = status === "unread" ? "warning" : "success";
  return <StatusBadge label={status.toUpperCase()} variant={variant} />;
}

export function TaskStatusBadge({ status }: { status: string }) {
  const variant: Variant = status === "completed" ? "success" : status === "in_progress" ? "info" : "warning";
  return <StatusBadge label={status.replaceAll("_", " ").toUpperCase()} variant={variant} />;
}
