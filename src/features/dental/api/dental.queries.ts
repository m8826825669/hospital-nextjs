import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { dentalService } from "./dental.service";
import type { DentalChartFormValues, DentalProcedureFormValues, DentalVisitFormValues } from "../schemas/dental.schema";

const keys = {
  all: ["dental"] as const,
  dashboard: ["dental", "dashboard"] as const,
  visits: (params: unknown) => ["dental", "visits", params] as const,
  charts: (params: unknown) => ["dental", "charts", params] as const,
  procedures: (params: unknown) => ["dental", "procedures", params] as const,
};

export function useDentalDashboard() {
  return useQuery({ queryKey: keys.dashboard, queryFn: dentalService.dashboard });
}

export function useDentalVisits(params: unknown) {
  return useQuery({ queryKey: keys.visits(params), queryFn: () => dentalService.visits(params) });
}

export function useCreateDentalVisit() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: (payload: DentalVisitFormValues) => dentalService.createVisit(payload), onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.all }) });
}

export function useDentalCharts(params: unknown) {
  return useQuery({ queryKey: keys.charts(params), queryFn: () => dentalService.charts(params) });
}

export function useCreateDentalChart() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: (payload: DentalChartFormValues) => dentalService.createChart(payload), onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.all }) });
}

export function useDentalProcedures(params: unknown) {
  return useQuery({ queryKey: keys.procedures(params), queryFn: () => dentalService.procedures(params) });
}

export function useCreateDentalProcedure() {
  const queryClient = useQueryClient();
  return useMutation({ mutationFn: (payload: DentalProcedureFormValues) => dentalService.createProcedure(payload), onSuccess: () => queryClient.invalidateQueries({ queryKey: keys.all }) });
}
