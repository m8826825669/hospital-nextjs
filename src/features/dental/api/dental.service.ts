import { apiClient } from "@/platform/api/api-client";
import type { DentalChart, DentalDashboard, DentalProcedure, DentalVisit, PaginatedDental } from "../types/dental.types";
import type { DentalChartFormValues, DentalProcedureFormValues, DentalVisitFormValues } from "../schemas/dental.schema";

export const dentalService = {
  dashboard: async () => (await apiClient.get<DentalDashboard>("/dental/dashboard")).data,
  visits: async (params: unknown) => (await apiClient.get<PaginatedDental<DentalVisit>>("/dental/visits", { params })).data,
  createVisit: async (payload: DentalVisitFormValues) => (await apiClient.post<DentalVisit>("/dental/visits", payload)).data,
  charts: async (params: unknown) => (await apiClient.get<PaginatedDental<DentalChart>>("/dental/charts", { params })).data,
  createChart: async (payload: DentalChartFormValues) => (await apiClient.post<DentalChart>("/dental/charts", payload)).data,
  procedures: async (params: unknown) => (await apiClient.get<PaginatedDental<DentalProcedure>>("/dental/procedures", { params })).data,
  createProcedure: async (payload: DentalProcedureFormValues) => (await apiClient.post<DentalProcedure>("/dental/procedures", payload)).data,
};
