// src/features/radiology/api/radiology.service.ts

import { apiClient } from "@/platform/api/api-client";
import type { ApiListResponse } from "@/platform/api/api.types";
import type {
  LookupOption,
  RadiologyDashboard,
  RadiologyListParams,
  RadiologyOrder,
  RadiologyReport,
  RadiologyTest,
} from "../types/radiology.types";
import type {
  RadiologyOrderFormValues,
  RadiologyReportFormValues,
  RadiologyTestFormValues,
} from "../schemas/radiology.schema";

function normalizeParams(params: RadiologyListParams = {}) {
  const { size, page_size, modality, status, priority, ...rest } = params;
  return {
    ...rest,
    page_size: page_size ?? size ?? 20,
    modality: modality === "all" ? undefined : modality,
    status: status === "all" ? undefined : status,
    priority: priority === "all" ? undefined : priority,
  };
}

export const radiologyService = {
  async getDashboard(): Promise<RadiologyDashboard> {
    const response = await apiClient.get<RadiologyDashboard>("/radiology/dashboard");
    return response.data;
  },

  async listTests(params: RadiologyListParams): Promise<ApiListResponse<RadiologyTest>> {
    const response = await apiClient.get<ApiListResponse<RadiologyTest>>("/radiology/tests", {
      params: normalizeParams(params),
    });
    return response.data;
  },

  async createTest(payload: RadiologyTestFormValues): Promise<RadiologyTest> {
    const response = await apiClient.post<RadiologyTest>("/radiology/tests", payload);
    return response.data;
  },

  async updateTest(id: string, payload: RadiologyTestFormValues): Promise<RadiologyTest> {
    const response = await apiClient.put<RadiologyTest>(`/radiology/tests/${id}`, payload);
    return response.data;
  },

  async listOrders(params: RadiologyListParams): Promise<ApiListResponse<RadiologyOrder>> {
    const response = await apiClient.get<ApiListResponse<RadiologyOrder>>("/radiology/orders", {
      params: normalizeParams(params),
    });
    return response.data;
  },

  async createOrder(payload: RadiologyOrderFormValues): Promise<RadiologyOrder> {
    const response = await apiClient.post<RadiologyOrder>("/radiology/orders", payload);
    return response.data;
  },

  async updateOrderStatus(id: string, status: string): Promise<RadiologyOrder> {
    const response = await apiClient.patch<RadiologyOrder>(`/radiology/orders/${id}/status`, { status });
    return response.data;
  },

  async listReports(params: RadiologyListParams): Promise<ApiListResponse<RadiologyReport>> {
    const response = await apiClient.get<ApiListResponse<RadiologyReport>>("/radiology/reports", {
      params: normalizeParams(params),
    });
    return response.data;
  },

  async createReport(payload: RadiologyReportFormValues): Promise<RadiologyReport> {
    const response = await apiClient.post<RadiologyReport>("/radiology/reports", payload);
    return response.data;
  },

  async updateReport(id: string, payload: RadiologyReportFormValues): Promise<RadiologyReport> {
    const response = await apiClient.put<RadiologyReport>(`/radiology/reports/${id}`, payload);
    return response.data;
  },

  async listPatientOptions(): Promise<LookupOption[]> {
    const response = await apiClient.get<ApiListResponse<{ id: string; first_name: string; last_name: string; patient_code?: string }>>("/patients", {
      params: { page: 1, page_size: 100 },
    });
    return response.data.items.map((patient) => ({
      id: patient.id,
      label: `${patient.patient_code ? `${patient.patient_code} - ` : ""}${patient.first_name} ${patient.last_name}`,
    }));
  },

  async listDoctorOptions(): Promise<LookupOption[]> {
    const response = await apiClient.get<ApiListResponse<{ id: string; first_name: string; last_name: string; specialization?: string }>>("/doctors", {
      params: { page: 1, page_size: 100 },
    });
    return response.data.items.map((doctor) => ({
      id: doctor.id,
      label: `${doctor.first_name} ${doctor.last_name}${doctor.specialization ? ` - ${doctor.specialization}` : ""}`,
    }));
  },
};
