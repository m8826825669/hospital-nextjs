// src/features/patients/api/patients.service.ts

import { apiClient } from "@/platform/api/api-client";
import type { ApiListResponse } from "@/platform/api/api.types";
import type {
  CreatePatientPayload,
  Patient,
  PatientDocument,
  PatientListParams,
  PatientTimelineItem,
  UpdatePatientPayload,
} from "../types/patient.types";

export const patientsService = {
  async list(params: PatientListParams): Promise<ApiListResponse<Patient>> {
    const response = await apiClient.get<ApiListResponse<Patient>>(
      "/patients",
      { params }
    );

    return response.data;
  },

  async getById(id: string): Promise<Patient> {
    const response = await apiClient.get<Patient>(`/patients/${id}`);
    return response.data;
  },

  async create(payload: CreatePatientPayload): Promise<Patient> {
    const response = await apiClient.post<Patient>("/patients", payload);
    return response.data;
  },

  async update(id: string, payload: UpdatePatientPayload): Promise<Patient> {
    const response = await apiClient.patch<Patient>(
      `/patients/${id}`,
      payload
    );

    return response.data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/patients/${id}`);
  },

  async getTimeline(id: string): Promise<PatientTimelineItem[]> {
    const response = await apiClient.get<PatientTimelineItem[]>(
      `/patients/${id}/timeline`
    );

    return response.data;
  },

  async getDocuments(id: string): Promise<PatientDocument[]> {
    const response = await apiClient.get<PatientDocument[]>(
      `/patients/${id}/documents`
    );

    return response.data;
  },
};