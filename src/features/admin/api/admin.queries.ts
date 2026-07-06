// src/features/admin/api/admin.queries.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { queryKeys } from "@/platform/api/query-keys";
import { getApiErrorMessage } from "@/platform/api/api-error";
import { adminService, DoctorPayload } from "./admin.service";

import type { AdminListParams } from "../types/admin.types";
import type {
  BedFormValues,
  DepartmentFormValues,
  HospitalSettingFormValues,
  WardFormValues,
} from "../schemas/admin.schema";

export function useDepartments(params: AdminListParams) {
  return useQuery({
    queryKey: queryKeys.admin.departments.list(params),
    queryFn: () => adminService.listDepartments(params),
  });
}

export function useCreateDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: DepartmentFormValues) =>
      adminService.createDepartment(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.admin.departments.all,
      });
      toast.success("Department created successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useUpdateDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: DepartmentFormValues }) =>
      adminService.updateDepartment(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.admin.departments.all,
      });
      toast.success("Department updated successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useDeleteDepartment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminService.deleteDepartment(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: queryKeys.admin.departments.all,
      });
      toast.success("Department deleted successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useWards(params: AdminListParams) {
  return useQuery({
    queryKey: queryKeys.admin.wards.list(params),
    queryFn: () => adminService.listWards(params),
  });
}

export function useCreateWard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: WardFormValues) => adminService.createWard(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.wards.all });
      toast.success("Ward created successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useUpdateWard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: WardFormValues }) =>
      adminService.updateWard(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.wards.all });
      toast.success("Ward updated successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useDeleteWard() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminService.deleteWard(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.wards.all });
      toast.success("Ward deleted successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useBeds(params: AdminListParams) {
  return useQuery({
    queryKey: queryKeys.admin.beds.list(params),
    queryFn: () => adminService.listBeds(params),
  });
}

export function useCreateBed() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: BedFormValues) => adminService.createBed(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.beds.all });
      toast.success("Bed created successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useUpdateBed() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: BedFormValues }) =>
      adminService.updateBed(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.beds.all });
      toast.success("Bed updated successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useDeleteBed() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminService.deleteBed(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.beds.all });
      toast.success("Bed deleted successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useHospitalSettings() {
  return useQuery({
    queryKey: queryKeys.admin.settings,
    queryFn: () => adminService.getSettings(),
    throwOnError: false,
  });
}

export function useUpdateHospitalSettings() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: HospitalSettingFormValues) =>
      adminService.updateSettings(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.settings });
      toast.success("Hospital settings updated");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useDoctors(params: AdminListParams) {
  return useQuery({
    queryKey: queryKeys.admin.doctors.list(params),
    queryFn: () => adminService.getDoctors(params),
  });
}

export function useCreateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: DoctorPayload) => adminService.createDoctor(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.doctors.all });
      toast.success("Doctor created successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useUpdateDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: DoctorPayload }) =>
      adminService.updateDoctor(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.doctors.all });
      toast.success("Doctor updated successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useDeleteDoctor() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => adminService.deleteDoctor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.admin.doctors.all });
      toast.success("Doctor deleted successfully");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

