"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { authStorage } from "@/lib/auth-storage";
import { getCurrentUserApi, loginApi } from "../api/auth.api";
import type { LoginRequest } from "../types/auth.types";

export function useCurrentUser() {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: getCurrentUserApi,
    retry: false,
    enabled: typeof window !== "undefined" && !!authStorage.getAccessToken(),
  });
}

export function useLogin() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: LoginRequest) => loginApi(payload),
    onSuccess: async (tokens) => {
      authStorage.setTokens(tokens.access_token, tokens.refresh_token);
      await queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      router.replace("/dashboard");
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return () => {
    authStorage.clearTokens();
    queryClient.clear();
    router.replace("/login");
  };
}