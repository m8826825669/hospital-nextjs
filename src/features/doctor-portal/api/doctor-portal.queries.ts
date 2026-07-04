import { useQuery } from "@tanstack/react-query";
import { doctorPortalService } from "./doctor-portal.service";

export const doctorPortalKeys = {
  all: ["doctor-portal"] as const,
  dashboard: () => ["doctor-portal", "dashboard"] as const,
  appointments: (status?: string) => ["doctor-portal", "appointments", status] as const,
  patients: (search?: string) => ["doctor-portal", "patients", search] as const,
};

export function useDoctorPortalDashboard() {
  return useQuery({
    queryKey: doctorPortalKeys.dashboard(),
    queryFn: doctorPortalService.getDashboard,
  });
}

export function useDoctorPortalAppointments(status?: string) {
  return useQuery({
    queryKey: doctorPortalKeys.appointments(status),
    queryFn: () => doctorPortalService.getAppointments(status),
  });
}

export function useDoctorPortalPatients(search?: string) {
  return useQuery({
    queryKey: doctorPortalKeys.patients(search),
    queryFn: () => doctorPortalService.getPatients(search),
  });
}
