import { apiClient } from "@/platform/api/api-client";
import type { EmergencyDashboard, EmergencyListParams, EmergencyNote, EmergencyOrder, EmergencyTriage, EmergencyVisit, PageResponse } from "../types/emergency.types";
import type { EmergencyNoteFormValues, EmergencyOrderFormValues, EmergencyTriageFormValues, EmergencyVisitFormValues } from "../schemas/emergency.schema";

function withPageSize(params: EmergencyListParams) { return { ...params, page_size: params.page_size ?? params.size }; }

export const emergencyService = {
  dashboard: async () => { const { data } = await apiClient.get<EmergencyDashboard>("/emergency/dashboard"); return data; },
  listVisits: async (params: EmergencyListParams) => { const { data } = await apiClient.get<PageResponse<EmergencyVisit>>("/emergency/visits", { params: withPageSize(params) }); return data; },
  createVisit: async (payload: EmergencyVisitFormValues) => { const { data } = await apiClient.post<EmergencyVisit>("/emergency/visits", payload); return data; },
  updateVisitStatus: async (id: string, payload: { status: string; disposition?: string | null; disposition_time?: string | null; notes?: string | null }) => { const { data } = await apiClient.patch<EmergencyVisit>(`/emergency/visits/${id}/status`, payload); return data; },
  listTriages: async (params: EmergencyListParams) => { const { data } = await apiClient.get<PageResponse<EmergencyTriage>>("/emergency/triage", { params: withPageSize(params) }); return data; },
  createTriage: async (payload: EmergencyTriageFormValues) => { const { data } = await apiClient.post<EmergencyTriage>("/emergency/triage", payload); return data; },
  listNotes: async (params: EmergencyListParams) => { const { data } = await apiClient.get<PageResponse<EmergencyNote>>("/emergency/notes", { params: withPageSize(params) }); return data; },
  createNote: async (payload: EmergencyNoteFormValues) => { const { data } = await apiClient.post<EmergencyNote>("/emergency/notes", payload); return data; },
  listOrders: async (params: EmergencyListParams) => { const { data } = await apiClient.get<PageResponse<EmergencyOrder>>("/emergency/orders", { params: withPageSize(params) }); return data; },
  createOrder: async (payload: EmergencyOrderFormValues) => { const { data } = await apiClient.post<EmergencyOrder>("/emergency/orders", payload); return data; },
  updateOrderStatus: async (id: string, status: string) => { const { data } = await apiClient.patch<EmergencyOrder>(`/emergency/orders/${id}/status`, { status }); return data; },
};
