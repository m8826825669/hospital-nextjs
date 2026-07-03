// src/features/radiology/api/radiology.queries.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { getApiErrorMessage } from "@/platform/api/api-error";
import { radiologyService } from "./radiology.service";
import type { RadiologyListParams } from "../types/radiology.types";
import type {
  RadiologyOrderFormValues,
  RadiologyReportFormValues,
  RadiologyTestFormValues,
} from "../schemas/radiology.schema";

const radiologyKeys = {
  dashboard: ["radiology", "dashboard"] as const,
  tests: {
    all: ["radiology", "tests"] as const,
    list: (params: unknown) => ["radiology", "tests", "list", params] as const,
  },
  orders: {
    all: ["radiology", "orders"] as const,
    list: (params: unknown) => ["radiology", "orders", "list", params] as const,
  },
  reports: {
    all: ["radiology", "reports"] as const,
    list: (params: unknown) => ["radiology", "reports", "list", params] as const,
  },
  lookups: {
    patients: ["radiology", "lookups", "patients"] as const,
    doctors: ["radiology", "lookups", "doctors"] as const,
  },
};

export function useRadiologyDashboard() {
  return useQuery({ queryKey: radiologyKeys.dashboard, queryFn: () => radiologyService.getDashboard() });
}

export function useRadiologyTests(params: RadiologyListParams) {
  return useQuery({ queryKey: radiologyKeys.tests.list(params), queryFn: () => radiologyService.listTests(params) });
}

export function useCreateRadiologyTest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: RadiologyTestFormValues) => radiologyService.createTest(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: radiologyKeys.tests.all });
      queryClient.invalidateQueries({ queryKey: radiologyKeys.dashboard });
      toast.success("Radiology test created");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useUpdateRadiologyTest() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: RadiologyTestFormValues }) => radiologyService.updateTest(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: radiologyKeys.tests.all });
      toast.success("Radiology test updated");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useRadiologyOrders(params: RadiologyListParams) {
  return useQuery({ queryKey: radiologyKeys.orders.list(params), queryFn: () => radiologyService.listOrders(params) });
}

export function useCreateRadiologyOrder() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: RadiologyOrderFormValues) => radiologyService.createOrder(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: radiologyKeys.orders.all });
      queryClient.invalidateQueries({ queryKey: radiologyKeys.dashboard });
      toast.success("Radiology order created");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useUpdateRadiologyOrderStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) => radiologyService.updateOrderStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: radiologyKeys.orders.all });
      queryClient.invalidateQueries({ queryKey: radiologyKeys.dashboard });
      toast.success("Order status updated");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useRadiologyReports(params: RadiologyListParams) {
  return useQuery({ queryKey: radiologyKeys.reports.list(params), queryFn: () => radiologyService.listReports(params) });
}

export function useCreateRadiologyReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: RadiologyReportFormValues) => radiologyService.createReport(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: radiologyKeys.reports.all });
      queryClient.invalidateQueries({ queryKey: radiologyKeys.orders.all });
      queryClient.invalidateQueries({ queryKey: radiologyKeys.dashboard });
      toast.success("Radiology report created");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useUpdateRadiologyReport() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: RadiologyReportFormValues }) => radiologyService.updateReport(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: radiologyKeys.reports.all });
      queryClient.invalidateQueries({ queryKey: radiologyKeys.dashboard });
      toast.success("Radiology report updated");
    },
    onError: (error) => toast.error(getApiErrorMessage(error)),
  });
}

export function useRadiologyPatientOptions() {
  return useQuery({ queryKey: radiologyKeys.lookups.patients, queryFn: () => radiologyService.listPatientOptions() });
}

export function useRadiologyDoctorOptions() {
  return useQuery({ queryKey: radiologyKeys.lookups.doctors, queryFn: () => radiologyService.listDoctorOptions() });
}
