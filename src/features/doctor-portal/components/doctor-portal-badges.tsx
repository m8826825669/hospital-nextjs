import { StatusBadge } from "@/shared/components/enterprise";

export function DoctorAppointmentStatusBadge({ status }: { status: string }) {
  const variant = status === "completed" ? "success" : status === "waiting" ? "warning" : "info";
  return <StatusBadge label={status.replaceAll("_", " ").toUpperCase()} variant={variant} />;
}

export function DoctorPriorityBadge({ priority }: { priority?: string | null }) {
  const value = priority ?? "routine";
  const variant = value === "stat" || value === "urgent" ? "danger" : "info";
  return <StatusBadge label={value.toUpperCase()} variant={variant} />;
}
