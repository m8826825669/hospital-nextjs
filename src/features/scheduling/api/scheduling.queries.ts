import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { schedulingService } from "./scheduling.service";
import type { SchedulingListParams } from "../types/scheduling.types";

export const schedulingKeys = {
  all: ["scheduling"] as const,
  dashboard: () => ["scheduling", "dashboard"] as const,
  resources: (params: SchedulingListParams) => ["scheduling", "resources", params] as const,
  bookings: (params: SchedulingListParams) => ["scheduling", "bookings", params] as const,
  doctorSchedules: (params: SchedulingListParams) => ["scheduling", "doctor-schedules", params] as const,
  staffRosters: (params: SchedulingListParams) => ["scheduling", "staff-rosters", params] as const,
};

export function useSchedulingDashboard() {
  return useQuery({ queryKey: schedulingKeys.dashboard(), queryFn: schedulingService.dashboard });
}
export function useResources(params: SchedulingListParams = {}) {
  return useQuery({ queryKey: schedulingKeys.resources(params), queryFn: () => schedulingService.listResources(params) });
}
export function useCreateResource() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: schedulingService.createResource, onSuccess: () => qc.invalidateQueries({ queryKey: schedulingKeys.all }) });
}
export function useBookings(params: SchedulingListParams = {}) {
  return useQuery({ queryKey: schedulingKeys.bookings(params), queryFn: () => schedulingService.listBookings(params) });
}
export function useCreateBooking() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: schedulingService.createBooking, onSuccess: () => qc.invalidateQueries({ queryKey: schedulingKeys.all }) });
}
export function useUpdateBookingStatus() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: ({ id, payload }: { id: string; payload: { status: string; notes?: string | null } }) => schedulingService.updateBookingStatus(id, payload), onSuccess: () => qc.invalidateQueries({ queryKey: schedulingKeys.all }) });
}
export function useDoctorSchedules(params: SchedulingListParams = {}) {
  return useQuery({ queryKey: schedulingKeys.doctorSchedules(params), queryFn: () => schedulingService.listDoctorSchedules(params) });
}
export function useCreateDoctorSchedule() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: schedulingService.createDoctorSchedule, onSuccess: () => qc.invalidateQueries({ queryKey: schedulingKeys.all }) });
}
export function useStaffRosters(params: SchedulingListParams = {}) {
  return useQuery({ queryKey: schedulingKeys.staffRosters(params), queryFn: () => schedulingService.listStaffRosters(params) });
}
export function useCreateStaffRoster() {
  const qc = useQueryClient();
  return useMutation({ mutationFn: schedulingService.createStaffRoster, onSuccess: () => qc.invalidateQueries({ queryKey: schedulingKeys.all }) });
}
