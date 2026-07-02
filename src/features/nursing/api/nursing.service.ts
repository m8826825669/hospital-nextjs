// src/features/nursing/api/nursing.service.ts

import { apiClient } from "@/platform/api/api-client";
import type { ApiListResponse } from "@/platform/api/api.types";
import type {
  MedicationAdministration,
  NursingListParams,
  NursingNote,
  NursingPatient,
  NursingTask,
  NursingTaskStatus,
  VitalRecord,
} from "../types/nursing.types";
import type {
  NursingNoteFormValues,
  NursingTaskFormValues,
  VitalFormValues,
} from "../schemas/nursing.schema";

export const nursingService = {
  async listPatients(
    params: NursingListParams
  ): Promise<ApiListResponse<NursingPatient>> {
    const response = await apiClient.get<ApiListResponse<NursingPatient>>(
      "/nursing/patients",
      { params }
    );
    return response.data;
  },

  async listVitals(
    params: NursingListParams
  ): Promise<ApiListResponse<VitalRecord>> {
    const response = await apiClient.get<ApiListResponse<VitalRecord>>(
      "/nursing/vitals",
      { params }
    );
    return response.data;
  },

  async createVital(payload: VitalFormValues): Promise<VitalRecord> {
    const response = await apiClient.post<VitalRecord>(
      "/nursing/vitals",
      payload
    );
    return response.data;
  },

  async listMedications(
    params: NursingListParams
  ): Promise<ApiListResponse<MedicationAdministration>> {
    const response =
      await apiClient.get<ApiListResponse<MedicationAdministration>>(
        "/nursing/medications",
        { params }
      );
    return response.data;
  },

  async updateMedicationStatus(
    id: string,
    status: MedicationAdministration["status"]
  ): Promise<MedicationAdministration> {
    const response = await apiClient.patch<MedicationAdministration>(
      `/nursing/medications/${id}/status`,
      { status }
    );
    return response.data;
  },

  async listNotes(
    params: NursingListParams
  ): Promise<ApiListResponse<NursingNote>> {
    const response = await apiClient.get<ApiListResponse<NursingNote>>(
      "/nursing/notes",
      { params }
    );
    return response.data;
  },

  async createNote(payload: NursingNoteFormValues): Promise<NursingNote> {
    const response = await apiClient.post<NursingNote>(
      "/nursing/notes",
      payload
    );
    return response.data;
  },

  async listTasks(
    params: NursingListParams
  ): Promise<ApiListResponse<NursingTask>> {
    const response = await apiClient.get<ApiListResponse<NursingTask>>(
      "/nursing/tasks",
      { params }
    );
    return response.data;
  },

  async createTask(payload: NursingTaskFormValues): Promise<NursingTask> {
    const response = await apiClient.post<NursingTask>(
      "/nursing/tasks",
      payload
    );
    return response.data;
  },

  async updateTaskStatus(
    id: string,
    status: NursingTaskStatus
  ): Promise<NursingTask> {
    const response = await apiClient.patch<NursingTask>(
      `/nursing/tasks/${id}/status`,
      { status }
    );
    return response.data;
  },
};