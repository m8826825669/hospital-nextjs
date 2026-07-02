// src/platform/api/normalize-list-response.ts

import type { ApiListResponse } from "./api.types";

export function normalizeListResponse<T>(data: unknown): ApiListResponse<T> {
  if (Array.isArray(data)) {
    return {
      items: data as T[],
      total: data.length,
      page: 1,
      size: data.length,
      pages: 1,
    };
  }

  const value = data as Partial<ApiListResponse<T>>;

  return {
    items: value.items ?? [],
    total: value.total ?? value.items?.length ?? 0,
    page: value.page ?? 1,
    size: value.size ?? value.items?.length ?? 0,
    pages: value.pages ?? 1,
  };
}