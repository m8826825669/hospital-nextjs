import { apiClient } from "@/platform/api/api-client";

import type {
  CarePlan,
  MedicationAdministration,
  NursingDashboard,
  NursingListParams,
  NursingNote,
  NursingTask,
  PageResponse,
  VitalSign,
} from "../types/nursing.types";
import type {
  CarePlanFormValues,
  MedicationAdministrationFormValues,
  NursingNoteFormValues,
  NursingTaskFormValues,
  VitalSignFormValues,
} from "../schemas/nursing.schema";

function withPageSize(params: NursingListParams) {
  return { ...params, page_size: params.page_size ?? params.size };
}

export const nursingService = {
  dashboard: async () => {
    const { data } = await apiClient.get<NursingDashboard>("/nursing/dashboard");
    return data;
  },

  listVitals: async (params: NursingListParams) => {
    const { data } = await apiClient.get<PageResponse<VitalSign>>("/nursing/vitals", { params: withPageSize(params) });
    return data;
  },
  createVital: async (payload: VitalSignFormValues) => {
    const { data } = await apiClient.post<VitalSign>("/nursing/vitals", payload);
    return data;
  },

  listNotes: async (params: NursingListParams) => {
    const { data } = await apiClient.get<PageResponse<NursingNote>>("/nursing/notes", { params: withPageSize(params) });
    return data;
  },
  createNote: async (payload: NursingNoteFormValues) => {
    const { data } = await apiClient.post<NursingNote>("/nursing/notes", payload);
    return data;
  },

  listCarePlans: async (params: NursingListParams) => {
    const { data } = await apiClient.get<PageResponse<CarePlan>>("/nursing/care-plans", { params: withPageSize(params) });
    return data;
  },
  createCarePlan: async (payload: CarePlanFormValues) => {
    const { data } = await apiClient.post<CarePlan>("/nursing/care-plans", payload);
    return data;
  },

  listTasks: async (params: NursingListParams) => {
    const { data } = await apiClient.get<PageResponse<NursingTask>>("/nursing/tasks", { params: withPageSize(params) });
    return data;
  },
  createTask: async (payload: NursingTaskFormValues) => {
    const { data } = await apiClient.post<NursingTask>("/nursing/tasks", payload);
    return data;
  },
  updateTaskStatus: async (id: string, status: string) => {
    const { data } = await apiClient.patch<NursingTask>(`/nursing/tasks/${id}/status`, { status });
    return data;
  },

  listMedications: async (params: NursingListParams) => {
    const { data } = await apiClient.get<PageResponse<MedicationAdministration>>("/nursing/medication-administrations", { params: withPageSize(params) });
    return data;
  },
  createMedication: async (payload: MedicationAdministrationFormValues) => {
    const { data } = await apiClient.post<MedicationAdministration>("/nursing/medication-administrations", payload);
    return data;
  },
  updateMedicationStatus: async (id: string, status: string) => {
    const { data } = await apiClient.patch<MedicationAdministration>(`/nursing/medication-administrations/${id}/status`, { status });
    return data;
  },
};
