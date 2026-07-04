import { useMutation, useQuery } from "@tanstack/react-query";
import { executiveService } from "./executive.service";
import type { ReportRunRequest } from "../types/executive.types";

export function useExecutiveDashboard() {
  return useQuery({
    queryKey: ["executive", "dashboard"],
    queryFn: executiveService.dashboard,
  });
}

export function useReportDefinitions() {
  return useQuery({
    queryKey: ["executive", "reports"],
    queryFn: executiveService.reports,
  });
}

export function useRunExecutiveReport() {
  return useMutation({
    mutationFn: (payload: ReportRunRequest) => executiveService.runReport(payload),
  });
}
