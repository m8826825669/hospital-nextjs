// features/doctors/hooks/use-doctors.ts

import { useQuery } from "@tanstack/react-query";
import { doctorApi } from "../api/doctor-api";

export function useDoctors(q?: string) {
  return useQuery({
    queryKey: ["doctors", q],
    queryFn: () => doctorApi.list(q),
  });
}

export function useDoctorSchedules(doctorId?: string) {
  return useQuery({
    queryKey: ["doctor-schedules", doctorId],
    queryFn: () => doctorApi.schedules(doctorId!),
    enabled: Boolean(doctorId),
  });
}