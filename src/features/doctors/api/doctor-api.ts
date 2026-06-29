// features/doctors/api/doctor-api.ts

import { apiClient } from "@/platform/api/api-client";
import { Doctor, DoctorSchedule } from "../types/doctor";

export const doctorApi = {
  async list(q?: string): Promise<Doctor[]> {
    const response = await apiClient.get<Doctor[]>("/doctors", {
      params: q ? { q } : {},
    });

    return response.data;
  },

  async get(id: string): Promise<Doctor> {
    const response = await apiClient.get<Doctor>(`/doctors/${id}`);
    return response.data;
  },

  async schedules(id: string): Promise<DoctorSchedule[]> {
    const response = await apiClient.get<DoctorSchedule[]>(
      `/doctors/${id}/schedules`
    );

    return response.data;
  },
};