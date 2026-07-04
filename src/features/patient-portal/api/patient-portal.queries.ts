import { useQuery } from "@tanstack/react-query";
import { patientPortalService } from "./patient-portal.service";

const keys = {
  all: ["patient-portal"] as const,
  dashboard: (patientId: string) => ["patient-portal", "dashboard", patientId] as const,
  appointments: (patientId: string) => ["patient-portal", "appointments", patientId] as const,
  reports: (patientId: string) => ["patient-portal", "reports", patientId] as const,
  bills: (patientId: string) => ["patient-portal", "bills", patientId] as const,
};

export function usePatientPortalDashboard(patientId?: string) {
  return useQuery({
    queryKey: keys.dashboard(patientId ?? ""),
    queryFn: () => patientPortalService.dashboard(patientId ?? ""),
    enabled: Boolean(patientId),
  });
}

export function usePatientPortalAppointments(patientId?: string) {
  return useQuery({
    queryKey: keys.appointments(patientId ?? ""),
    queryFn: () => patientPortalService.appointments(patientId ?? ""),
    enabled: Boolean(patientId),
  });
}

export function usePatientPortalReports(patientId?: string) {
  return useQuery({
    queryKey: keys.reports(patientId ?? ""),
    queryFn: () => patientPortalService.reports(patientId ?? ""),
    enabled: Boolean(patientId),
  });
}

export function usePatientPortalBills(patientId?: string) {
  return useQuery({
    queryKey: keys.bills(patientId ?? ""),
    queryFn: () => patientPortalService.bills(patientId ?? ""),
    enabled: Boolean(patientId),
  });
}
