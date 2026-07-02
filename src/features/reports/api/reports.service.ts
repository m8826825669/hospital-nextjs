// src/features/reports/api/reports.service.ts

import { apiClient } from "@/platform/api/api-client";
import type { ApiListResponse } from "@/platform/api/api.types";
import type {
  ReportDefinition,
  ReportListParams,
  ReportPreviewRow,
  ReportRun,
  RunReportPayload,
} from "../types/reports.types";

export const reportsService = {
  async listDefinitions(
    params: ReportListParams
  ): Promise<ApiListResponse<ReportDefinition>> {
    const response = await apiClient.get<ApiListResponse<ReportDefinition>>(
      "/reports/definitions",
      { params }
    );

    return response.data;
  },

  async listRuns(
    params: ReportListParams
  ): Promise<ApiListResponse<ReportRun>> {
    const response = await apiClient.get<ApiListResponse<ReportRun>>(
      "/reports/runs",
      { params }
    );

    return response.data;
  },

  async preview(payload: RunReportPayload): Promise<ReportPreviewRow[]> {
    const response = await apiClient.post<ReportPreviewRow[]>(
      "/reports/preview",
      payload
    );

    return response.data;
  },

  async run(payload: RunReportPayload): Promise<ReportRun> {
    const response = await apiClient.post<ReportRun>("/reports/run", payload);
    return response.data;
  },
};