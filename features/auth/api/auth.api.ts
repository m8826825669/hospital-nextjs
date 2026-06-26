import { apiClient } from "@/lib/api-client";
import type { AuthTokens, CurrentUser, LoginRequest } from "../types/auth.types";

export async function loginApi(payload: LoginRequest): Promise<AuthTokens> {
  const response = await apiClient.post<AuthTokens>("/auth/login", {
    email: payload.email,
    password: payload.password,
  });

  return response.data;
}

export async function getCurrentUserApi(): Promise<CurrentUser> {
  const response = await apiClient.get<CurrentUser>("/auth/me");
  return response.data;
}