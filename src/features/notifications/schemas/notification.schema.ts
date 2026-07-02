// src/features/notifications/schemas/notification.schemas.ts

import { z } from "zod";

export const notificationFiltersSchema = z.object({
  status: z.enum(["all", "unread", "read", "archived"]).default("all"),
  priority: z.enum(["all", "low", "normal", "high", "urgent"]).default("all"),
  module: z
    .enum([
      "all",
      "auth",
      "patients",
      "appointments",
      "opd",
      "ipd",
      "ot",
      "lis",
      "pharmacy",
      "billing",
      "insurance",
      "system",
    ])
    .default("all"),
  search: z.string().optional(),
});

export const taskFiltersSchema = z.object({
  status: z
    .enum(["all", "open", "in_progress", "completed", "cancelled"])
    .default("all"),
  priority: z.enum(["all", "low", "normal", "high", "urgent"]).default("all"),
  module: notificationFiltersSchema.shape.module,
  search: z.string().optional(),
});

export const activityFiltersSchema = z.object({
  module: notificationFiltersSchema.shape.module,
  search: z.string().optional(),
});

export type NotificationFiltersFormValues = z.output<
  typeof notificationFiltersSchema
>;

export type TaskFiltersFormValues = z.output<typeof taskFiltersSchema>;

export type ActivityFiltersFormValues = z.output<typeof activityFiltersSchema>;