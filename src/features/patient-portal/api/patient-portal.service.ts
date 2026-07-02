// src/features/patient-portal/api/patient-portal.service.ts

import { apiClient } from "@/platform/api/api-client";
import type { ApiListResponse } from "@/platform/api/api.types";
import type {
  PatientPortalKpis,
  PatientPortalListParams,
  PatientPortalProfile,
  PortalAppointment,
  PortalBill,
  PortalInsuranceClaim,
  PortalLabReport,
  PortalPrescription,
  PortalRadiologyReport,
} from "../types/patient-portal.types";
import type { PatientPortalProfileFormValues } from "../schemas/patient-portal.schema";

export const patientPortalService = {
  async getKpis(): Promise<PatientPortalKpis> {
    const response = await apiClient.get<PatientPortalKpis>("/patient-portal/kpis");
    return response.data;
  },

  async getProfile(): Promise<PatientPortalProfile> {
    const response = await apiClient.get<PatientPortalProfile>("/patient-portal/profile");
    return response.data;
  },

  async updateProfile(
    payload: PatientPortalProfileFormValues
  ): Promise<PatientPortalProfile> {
    const response = await apiClient.patch<PatientPortalProfile>(
      "/patient-portal/profile",
      payload
    );
    return response.data;
  },

  async listAppointments(
    params: PatientPortalListParams
  ): Promise<ApiListResponse<PortalAppointment>> {
    const response = await apiClient.get<ApiListResponse<PortalAppointment>>(
      "/patient-portal/appointments",
      { params }
    );
    return response.data;
  },

  async listPrescriptions(
    params: PatientPortalListParams
  ): Promise<ApiListResponse<PortalPrescription>> {
    const response = await apiClient.get<ApiListResponse<PortalPrescription>>(
      "/patient-portal/prescriptions",
      { params }
    );
    return response.data;
  },

  async listLabReports(
    params: PatientPortalListParams
  ): Promise<ApiListResponse<PortalLabReport>> {
    const response = await apiClient.get<ApiListResponse<PortalLabReport>>(
      "/patient-portal/lab-reports",
      { params }
    );
    return response.data;
  },

  async listRadiologyReports(
    params: PatientPortalListParams
  ): Promise<ApiListResponse<PortalRadiologyReport>> {
    const response = await apiClient.get<ApiListResponse<PortalRadiologyReport>>(
      "/patient-portal/radiology-reports",
      { params }
    );
    return response.data;
  },

  async listBills(
    params: PatientPortalListParams
  ): Promise<ApiListResponse<PortalBill>> {
    const response = await apiClient.get<ApiListResponse<PortalBill>>(
      "/patient-portal/bills",
      { params }
    );
    return response.data;
  },

  async listClaims(
    params: PatientPortalListParams
  ): Promise<ApiListResponse<PortalInsuranceClaim>> {
    const response = await apiClient.get<ApiListResponse<PortalInsuranceClaim>>(
      "/patient-portal/insurance-claims",
      { params }
    );
    return response.data;
  },
};