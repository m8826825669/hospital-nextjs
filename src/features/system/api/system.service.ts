// src/features/system/api/system.service.ts

import { apiClient } from "@/platform/api/api-client";
import type { BackendHealth } from "../types/system.types";

export const systemService = {
  async health(): Promise<BackendHealth> {
    const response = await apiClient.get<BackendHealth>("/health");
    return response.data;
  },
};