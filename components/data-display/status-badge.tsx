import { Badge } from "@/components/ui/badge";

type StatusBadgeProps = {
  status: string;
};

export function StatusBadge({ status }: StatusBadgeProps) {
  const normalized = status.toLowerCase();

  const variant =
    normalized.includes("active") ||
    normalized.includes("paid") ||
    normalized.includes("completed") ||
    normalized.includes("approved") ||
    normalized.includes("available")
      ? "default"
      : normalized.includes("pending") ||
          normalized.includes("waiting") ||
          normalized.includes("draft") ||
          normalized.includes("review")
        ? "secondary"
        : normalized.includes("cancelled") ||
            normalized.includes("rejected") ||
            normalized.includes("failed")
          ? "destructive"
          : "outline";

  return (
    <Badge variant={variant} className="capitalize">
      {status.replaceAll("_", " ")}
    </Badge>
  );
}