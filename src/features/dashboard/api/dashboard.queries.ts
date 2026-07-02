// src/features/dashboard/api/dashboard.queries.ts

import { useQuery } from "@tanstack/react-query";
import { queryKeys } from "@/platform/api/query-keys";
import { dashboardService } from "./dashboard.service";

export function useDashboardKpis() {
  return useQuery({
    queryKey: queryKeys.dashboard.kpis,
    queryFn: dashboardService.getKpis,
  });
}

export function useRevenueTrend() {
  return useQuery({
    queryKey: queryKeys.dashboard.revenueTrend,
    queryFn: dashboardService.getRevenueTrend,
  });
}

export function useAppointmentTrend() {
  return useQuery({
    queryKey: queryKeys.dashboard.appointmentTrend,
    queryFn: dashboardService.getAppointmentTrend,
  });
}

export function useDashboardActivity() {
  return useQuery({
    queryKey: queryKeys.dashboard.activity,
    queryFn: dashboardService.getActivity,
  });
}