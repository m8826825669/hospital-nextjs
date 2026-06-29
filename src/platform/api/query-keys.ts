// src/platform/api/query-keys.ts

export const queryKeys = {
  doctors: {
    all: ["doctors"] as const,
    list: (params: unknown) => ["doctors", "list", params] as const,
    detail: (id: string) => ["doctors", "detail", id] as const,
    departments: (id: string) => ["doctors", id, "departments"] as const,
    schedules: (id: string) => ["doctors", id, "schedules"] as const,
    slots: (id: string, params: unknown) =>
      ["doctors", id, "available-slots", params] as const,
  },
};