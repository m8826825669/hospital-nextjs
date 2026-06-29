// src/platform/auth/auth-service.ts

import { apiClient } from "@/platform/api/api-client";
import type { CurrentUser, LoginPayload, LoginResponse } from "./auth.types";

export const authService = {
  async login(payload: LoginPayload): Promise<LoginResponse> {
    const response = await apiClient.post<LoginResponse>("/auth/login", payload);
    return response.data;
  },

  async me(): Promise<CurrentUser> {
    const response = await apiClient.get<CurrentUser>("/auth/me");
    return response.data;
  },

  async logout(): Promise<void> {
    await apiClient.post("/auth/logout").catch(() => undefined);
  },
};