import type { LucideIcon } from "lucide-react";

export type TimelineItemType =
  | "registration"
  | "appointment"
  | "opd"
  | "prescription"
  | "lab"
  | "billing"
  | "insurance"
  | "ipd"
  | "system";

export type TimelineItem = {
  id: string;
  type: TimelineItemType;
  title: string;
  description?: string;
  timestamp: string;
  actor?: string;
  meta?: string;
  icon?: LucideIcon;
};
