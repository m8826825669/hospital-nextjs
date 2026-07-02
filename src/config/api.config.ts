// src/config/api.config.ts

export const apiConfig = {
  baseUrl:
    process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:8000/api/v1",
  timeout: 30000,
};