// src/features/dashboard/api/dashboard.service.ts

import { apiClient } from "@/platform/api/api-client";
import type {
  DashboardActivity,
  DashboardKpis,
  DashboardTrendPoint,
} from "../types/dashboard.types";

export const dashboardService = {
  async getKpis(): Promise<DashboardKpis> {
    const response = await apiClient.get<DashboardKpis>("/dashboard/kpis");
    return response.data;
  },

  async getRevenueTrend(): Promise<DashboardTrendPoint[]> {
    const response = await apiClient.get<DashboardTrendPoint[]>(
      "/dashboard/revenue-trend"
    );
    return response.data;
  },

  async getAppointmentTrend(): Promise<DashboardTrendPoint[]> {
    const response = await apiClient.get<DashboardTrendPoint[]>(
      "/dashboard/appointment-trend"
    );
    return response.data;
  },

  async getActivity(): Promise<DashboardActivity[]> {
    const response = await apiClient.get<DashboardActivity[]>(
      "/dashboard/activity"
    );
    return response.data;
  },
};