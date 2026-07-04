import { apiClient } from "@/platform/api/api-client";
import type { DoctorPortalAppointment, DoctorPortalDashboard, DoctorPortalPatientSummary } from "../types/doctor-portal.types";

export const doctorPortalService = {
  getDashboard: async () => {
    const response = await apiClient.get<DoctorPortalDashboard>("/doctor-portal/dashboard");
    return response.data;
  },
  getAppointments: async (status?: string) => {
    const response = await apiClient.get<DoctorPortalAppointment[]>("/doctor-portal/appointments", {
      params: { status: status || undefined },
    });
    return response.data;
  },
  getPatients: async (search?: string) => {
    const response = await apiClient.get<DoctorPortalPatientSummary[]>("/doctor-portal/patients", {
      params: { search: search || undefined },
    });
    return response.data;
  },
};
