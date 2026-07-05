import { apiClient } from "@/platform/api/api-client";
import type { DoctorSchedule, HospitalResource, PageResponse, ResourceBooking, SchedulingDashboard, SchedulingListParams, StaffRoster } from "../types/scheduling.types";
import type { BookingFormValues, DoctorScheduleFormValues, ResourceFormValues, StaffRosterFormValues } from "../schemas/scheduling.schema";

function withPageSize(params: SchedulingListParams = {}) {
  return { ...params, page_size: params.page_size ?? params.size };
}

export const schedulingService = {
  dashboard: async () => {
    const { data } = await apiClient.get<SchedulingDashboard>("/scheduling/dashboard");
    return data;
  },
  listResources: async (params: SchedulingListParams = {}) => {
    const { data } = await apiClient.get<PageResponse<HospitalResource>>("/scheduling/resources", { params: withPageSize(params) });
    return data;
  },
  createResource: async (payload: ResourceFormValues) => {
    const { data } = await apiClient.post<HospitalResource>("/scheduling/resources", payload);
    return data;
  },
  listBookings: async (params: SchedulingListParams = {}) => {
    const { data } = await apiClient.get<PageResponse<ResourceBooking>>("/scheduling/bookings", { params: withPageSize(params) });
    return data;
  },
  createBooking: async (payload: BookingFormValues) => {
    const { data } = await apiClient.post<ResourceBooking>("/scheduling/bookings", payload);
    return data;
  },
  updateBookingStatus: async (id: string, payload: { status: string; notes?: string | null }) => {
    const { data } = await apiClient.patch<ResourceBooking>(`/scheduling/bookings/${id}/status`, payload);
    return data;
  },
  listDoctorSchedules: async (params: SchedulingListParams = {}) => {
    const { data } = await apiClient.get<PageResponse<DoctorSchedule>>("/scheduling/doctor-schedules", { params: withPageSize(params) });
    return data;
  },
  createDoctorSchedule: async (payload: DoctorScheduleFormValues) => {
    const { data } = await apiClient.post<DoctorSchedule>("/scheduling/doctor-schedules", payload);
    return data;
  },
  listStaffRosters: async (params: SchedulingListParams = {}) => {
    const { data } = await apiClient.get<PageResponse<StaffRoster>>("/scheduling/staff-rosters", { params: withPageSize(params) });
    return data;
  },
  createStaffRoster: async (payload: StaffRosterFormValues) => {
    const { data } = await apiClient.post<StaffRoster>("/scheduling/staff-rosters", payload);
    return data;
  },
};
