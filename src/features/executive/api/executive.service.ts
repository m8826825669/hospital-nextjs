import { apiClient } from "@/shared/api/api-client";
import type { ExecutiveDashboard, ReportDefinition, ReportRunRequest, ReportRunResult } from "../types/executive.types";

export const executiveService = {
  dashboard: async () => {
    const response = await apiClient.get<ExecutiveDashboard>("/executive/dashboard");
    return response.data;
  },

  reports: async () => {
    const response = await apiClient.get<ReportDefinition[]>("/executive/reports");
    return response.data;
  },

  runReport: async (payload: ReportRunRequest) => {
    const response = await apiClient.post<ReportRunResult>("/executive/reports/run", payload);
    return response.data;
  },
};
