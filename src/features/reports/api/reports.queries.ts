// src/features/reports/api/reports.queries.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/platform/api/query-keys";
import { getApiErrorMessage } from "@/platform/api/api-error";
import { reportsService } from "./reports.service";

import type {
  ReportListParams,
  RunReportPayload,
} from "../types/reports.types";

export function useReportDefinitions(params: ReportListParams) {
  return useQuery({
    queryKey: queryKeys.reports.definitions.list(params),
    queryFn: () => reportsService.listDefinitions(params),
  });
}

export function useReportRuns(params: ReportListParams) {
  return useQuery({
    queryKey: queryKeys.reports.runs.list(params),
    queryFn: () => reportsService.listRuns(params),
  });
}

export function useReportPreview(payload?: RunReportPayload) {
  return useQuery({
    queryKey: payload
      ? queryKeys.reports.preview(payload)
      : ["reports", "preview", "empty"],
    queryFn: () => reportsService.preview(payload!),
    enabled: Boolean(payload?.report_id),
  });
}

export function useRunReport() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: RunReportPayload) => reportsService.run(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.reports.runs.all,
      });
      toast.success("Report generation started");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}