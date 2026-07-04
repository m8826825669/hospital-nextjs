import { StatusBadge } from "@/shared/components/enterprise";

export function EmergencyStatusBadge({ status }: { status: string }) {
  const variant = status === "discharged" || status === "admitted" || status === "completed" ? "success" : status === "cancelled" ? "danger" : status === "registered" || status === "ordered" ? "warning" : "info";
  return <StatusBadge label={status.replaceAll("_", " ").toUpperCase()} variant={variant} />;
}
export function EmergencyPriorityBadge({ priority }: { priority: string }) {
  const variant = priority === "stat" ? "danger" : priority === "urgent" ? "warning" : "info";
  return <StatusBadge label={priority.toUpperCase()} variant={variant} />;
}
export function AcuityBadge({ acuity }: { acuity: string }) {
  const variant = acuity === "resuscitation" || acuity === "emergent" ? "danger" : acuity === "urgent" ? "warning" : "info";
  return <StatusBadge label={acuity.replaceAll("_", " ").toUpperCase()} variant={variant} />;
}
