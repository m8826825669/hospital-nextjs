import { apiClient } from "@/platform/api/api-client";
import type {
  PatientPortalAppointment,
  PatientPortalBill,
  PatientPortalDashboard,
  PatientPortalProfile,
  PatientPortalReport,
} from "../types/patient-portal.types";

const baseUrl = "/patient-portal";

export const patientPortalService = {
  dashboard(patientId: string) {
    return apiClient.get<PatientPortalDashboard>(`${baseUrl}/dashboard`, {
      params: { patient_id: patientId },
    }).then((res) => res.data);
  },
  profile(patientId: string) {
    return apiClient.get<PatientPortalProfile>(`${baseUrl}/profile`, {
      params: { patient_id: patientId },
    }).then((res) => res.data);
  },
  appointments(patientId: string) {
    return apiClient.get<PatientPortalAppointment[]>(`${baseUrl}/appointments`, {
      params: { patient_id: patientId },
    }).then((res) => res.data);
  },
  reports(patientId: string) {
    return apiClient.get<PatientPortalReport[]>(`${baseUrl}/reports`, {
      params: { patient_id: patientId },
    }).then((res) => res.data);
  },
  bills(patientId: string) {
    return apiClient.get<PatientPortalBill[]>(`${baseUrl}/bills`, {
      params: { patient_id: patientId },
    }).then((res) => res.data);
  },
  prescriptions(patientId: string) {
    return apiClient.get<unknown[]>(`${baseUrl}/prescriptions`, {
      params: { patient_id: patientId },
    }).then((res) => res.data);
  },
};
