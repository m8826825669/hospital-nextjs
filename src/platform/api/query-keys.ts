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

  patients: {
    all: ["patients"] as const,
    list: (params: unknown) => ["patients", "list", params] as const,
    detail: (id: string) => ["patients", "detail", id] as const,
    timeline: (id: string) => ["patients", id, "timeline"] as const,
    documents: (id: string) => ["patients", id, "documents"] as const,
  },
  // src/platform/api/query-keys.ts

  appointments: {
    all: ["appointments"] as const,
    list: (params: unknown) => ["appointments", "list", params] as const,
    detail: (id: string) => ["appointments", "detail", id] as const,
    slots: (params: unknown) => ["appointments", "slots", params] as const,
  },
};


