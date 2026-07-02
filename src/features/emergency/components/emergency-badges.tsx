// src/features/emergency/components/emergency-badges.tsx

import { StatusBadge } from "@/shared/components/enterprise";
import type { ErEncounterStatus, ErSeverity } from "../types/emergency.types";

export function ErSeverityBadge({ severity }: { severity: ErSeverity }) {
  const variantMap: Record<
    ErSeverity,
    "danger" | "warning" | "info" | "muted"
  > = {
    critical: "danger",
    emergent: "danger",
    urgent: "warning",
    semi_urgent: "info",
    non_urgent: "muted",
  };

  return <StatusBadge label={severity.toUpperCase()} variant={variantMap[severity]} />;
}

export function ErStatusBadge({ status }: { status: ErEncounterStatus }) {
  const variantMap: Record<
    ErEncounterStatus,
    "info" | "warning" | "success" | "danger" | "muted"
  > = {
    arrived: "info",
    triaged: "warning",
    in_treatment: "warning",
    under_observation: "info",
    admitted: "success",
    discharged: "success",
    transferred: "info",
    left_without_being_seen: "danger",
  };

  return <StatusBadge label={status.toUpperCase()} variant={variantMap[status]} />;
}