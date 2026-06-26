import { apiClient } from "@/lib/api-client";
import type {
  PatientCreateRequest,
  PatientResponse,
} from "../types/patient.types";

type PatientListParams = {
  search?: string;
  page?: number;
  size?: number;
};

export async function createPatientApi(
  payload: PatientCreateRequest
): Promise<PatientResponse> {
  const response = await apiClient.post<PatientResponse>("/patients", payload);
  return response.data;
}

export async function getPatientsApi(params: PatientListParams = {}) {
  const response = await apiClient.get("/patients", {
    params: {
      search: params.search || undefined,
      page: params.page || 1,
      size: params.size || 10,
    },
  });

  return response.data;
}

export async function getPatientByIdApi(id: string): Promise<PatientResponse> {
  const response = await apiClient.get<PatientResponse>(`/patients/${id}`);
  return response.data;
}