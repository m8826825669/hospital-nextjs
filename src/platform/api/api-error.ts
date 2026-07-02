// src/platform/api/api-error.ts

import { AxiosError } from "axios";

interface ApiErrorPayload {
  detail?: string | { msg?: string }[];
  message?: string;
  error?: string;
}

export function getApiErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as ApiErrorPayload | undefined;

    if (typeof data?.detail === "string") return data.detail;

    if (Array.isArray(data?.detail)) {
      return data.detail
        .map((item) => item.msg)
        .filter(Boolean)
        .join(", ");
    }

    return data?.message || data?.error || error.message;
  }

  if (error instanceof Error) return error.message;

  return "Something went wrong";
}