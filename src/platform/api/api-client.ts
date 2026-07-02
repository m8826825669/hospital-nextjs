// src/platform/api/api-client.ts

import axios, {
  AxiosError,
  type AxiosInstance,
  type InternalAxiosRequestConfig,
} from "axios";
import { apiConfig } from "@/config/api.config";
import { tokenService } from "@/platform/auth/token-service";

interface RefreshResponse {
  access_token: string;
  refresh_token?: string;
}

export const apiClient: AxiosInstance = axios.create({
  baseURL: apiConfig.baseUrl,
  timeout: apiConfig.timeout,
  headers: {
    "Content-Type": "application/json",
  },
});

let isRefreshing = false;
let refreshQueue: Array<(token: string | null) => void> = [];

function resolveRefreshQueue(token: string | null) {
  refreshQueue.forEach((callback) => callback(token));
  refreshQueue = [];
}

apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = tokenService.getAccessToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as
      | (InternalAxiosRequestConfig & { _retry?: boolean })
      | undefined;

    if (
      error.response?.status !== 401 ||
      !originalRequest ||
      originalRequest._retry
    ) {
      return Promise.reject(error);
    }

    const refreshToken = tokenService.getRefreshToken();

    if (!refreshToken) {
      tokenService.clearTokens();
      return Promise.reject(error);
    }

    originalRequest._retry = true;

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        refreshQueue.push((token) => {
          if (!token) {
            reject(error);
            return;
          }

          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(apiClient(originalRequest));
        });
      });
    }

    isRefreshing = true;

    try {
      const response = await axios.post<RefreshResponse>(
        `${apiConfig.baseUrl}/auth/refresh`,
        { refresh_token: refreshToken }
      );

      tokenService.setTokens(
        response.data.access_token,
        response.data.refresh_token
      );

      resolveRefreshQueue(response.data.access_token);

      originalRequest.headers.Authorization = `Bearer ${response.data.access_token}`;

      return apiClient(originalRequest);
    } catch (refreshError) {
      tokenService.clearTokens();
      resolveRefreshQueue(null);
      return Promise.reject(refreshError);
    } finally {
      isRefreshing = false;
    }
  }
);