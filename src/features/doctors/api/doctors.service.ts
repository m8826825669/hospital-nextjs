// src/features/doctors/api/doctors.service.ts

import { apiClient } from "@/platform/api/api-client";
import type { ApiListResponse } from "@/platform/api/api.types";
import type {
  CreateDoctorPayload,
  Doctor,
  DoctorAvailableSlot,
  DoctorDepartment,
  DoctorListParams,
  DoctorSchedule,
  UpdateDoctorPayload,
} from "../types/doctor.types";

export const doctorsService = {
  async list(params: DoctorListParams): Promise<ApiListResponse<Doctor>> {
    const response = await apiClient.get<ApiListResponse<Doctor>>("/doctors", {
      params,
    });

    return response.data;
  },

  async getById(id: string): Promise<Doctor> {
    const response = await apiClient.get<Doctor>(`/doctors/${id}`);
    return response.data;
  },

  async create(payload: CreateDoctorPayload): Promise<Doctor> {
    const response = await apiClient.post<Doctor>("/doctors", payload);
    return response.data;
  },

  async update(id: string, payload: UpdateDoctorPayload): Promise<Doctor> {
    const response = await apiClient.patch<Doctor>(`/doctors/${id}`, payload);
    return response.data;
  },

  async remove(id: string): Promise<void> {
    await apiClient.delete(`/doctors/${id}`);
  },

  async getDepartments(id: string): Promise<DoctorDepartment[]> {
    const response = await apiClient.get<DoctorDepartment[]>(
      `/doctors/${id}/departments`
    );

    return response.data;
  },

  async addDepartment(id: string, departmentId: string): Promise<void> {
    await apiClient.post(`/doctors/${id}/departments`, {
      department_id: departmentId,
    });
  },

  async getSchedules(id: string): Promise<DoctorSchedule[]> {
    const response = await apiClient.get<DoctorSchedule[]>(
      `/doctors/${id}/schedules`
    );

    return response.data;
  },

  async createSchedule(
    id: string,
    payload: Omit<DoctorSchedule, "id" | "doctor_id">
  ): Promise<DoctorSchedule> {
    const response = await apiClient.post<DoctorSchedule>(
      `/doctors/${id}/schedules`,
      payload
    );

    return response.data;
  },

  async getAvailableSlots(
    id: string,
    params: { date: string }
  ): Promise<DoctorAvailableSlot[]> {
    const response = await apiClient.get<DoctorAvailableSlot[]>(
      `/doctors/${id}/available-slots`,
      { params }
    );

    return response.data;
  },
};